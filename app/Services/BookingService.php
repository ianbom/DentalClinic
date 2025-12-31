<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\DoctorTimeOff;
use App\Models\DoctorWorkingPeriod;
use App\Models\Notification;
use App\Services\WhatsappService;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class BookingService
{
 
    public function getAvailableSlotsForDoctor(int $doctorId, int $daysAhead = 30)
    {
        $doctor = Doctor::with(['workingPeriods', 'timeOff'])->findOrFail($doctorId);
        
        $startDate = Carbon::today();
        $endDate = Carbon::today()->addDays($daysAhead);
        
        $availableSlots = [];
        
        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
            $daySlots = $this->getSlotsForDate($doctor, $date);

        

            if (!empty($daySlots)) {
                $availableSlots[$date->format('Y-m-d')] = [
                    'date' => $date->format('Y-m-d'),
                    'day_name' => $this->getDayName($date->dayOfWeek),
                    'formatted_date' => $this->formatDateIndonesian($date),
                    'slots' => $daySlots,
                ];
            }
            
        }
        
        return $availableSlots;
    }

    /**
     * Format date to Indonesian locale (e.g., "Rabu, 2 Desember 2025")
     */
    private function formatDateIndonesian(Carbon $date): string
    {
        $dayName = $this->getDayName($date->dayOfWeek);
        $day = $date->day;
        $monthName = $this->getMonthName($date->month);
        $year = $date->year;
        
        return "{$dayName}, {$day} {$monthName} {$year}";
    }

    /**
     * Get Indonesian month name
     */
    private function getMonthName(int $month): string
    {
        $months = [
            1 => 'Januari',
            2 => 'Februari',
            3 => 'Maret',
            4 => 'April',
            5 => 'Mei',
            6 => 'Juni',
            7 => 'Juli',
            8 => 'Agustus',
            9 => 'September',
            10 => 'Oktober',
            11 => 'November',
            12 => 'Desember',
        ];
        
        return $months[$month] ?? '';
    }

    /**
     * Get available slots for a specific date
     */
    public function getSlotsForDate(Doctor $doctor, Carbon $date): array
    {
        $dayName = $this->getDayName($date->dayOfWeek);
        
        // Get working periods for this day
        $workingPeriods = $doctor->workingPeriods
            ->where('day_of_week', $dayName)
            ->where('is_active', true);
        
        if ($workingPeriods->isEmpty()) {
            return [];
        }
        
        // Check if doctor has time off on this date
        // The 'date' field is now cast as 'date:Y-m-d' string, so compare directly
        $dateString = $date->format('Y-m-d');
        $timeOffs = $doctor->timeOff->filter(function ($timeOff) use ($dateString) {
            // Since date is cast as 'date:Y-m-d', it's a Carbon object but serializes to Y-m-d
            // Use format to get the date string for comparison
            return $timeOff->date->format('Y-m-d') === $dateString;
        });
        
        // Get existing bookings for this date
        $bookedSlots = Booking::where('doctor_id', $doctor->id)
            ->where('booking_date', $date->format('Y-m-d'))
            ->where('is_active', 1)
            ->pluck('start_time')
            ->map(fn($time) => substr($time, 0, 5))
            ->toArray();
        
        $slots = [];
        
        foreach ($workingPeriods as $period) {
            $startTime = Carbon::parse($period->start_time);
            $endTime = Carbon::parse($period->end_time);
            
            // Generate slots with alternating intervals: 45 min, 15 min
            // Output: 8:00, 8:45, 9:00, 9:45, 10:00, ...
            // Slots ending with :00 are for LONG (Pengobatan - 45 min duration)
            // Slots ending with :45 are for SHORT (Konsultasi - 15 min duration)
            $isLongSlot = true; // First slot (e.g., 8:00) is for long service
            
            while ($startTime->lt($endTime)) {
                $slotTime = $startTime->format('H:i');
                $slotMinute = (int) $startTime->format('i');
                
                // Determine slot type based on minute
                // :00 slots are for LONG service, :45 slots are for SHORT service
                $slotType = ($slotMinute === 0) ? 'long' : 'short';
                
                // Check if slot is during time off
                $slotDuration = $slotType === 'long' ? 45 : 15;
                $slotEnd = $startTime->copy()->addMinutes($slotDuration);
                
                $isDuringTimeOff = $this->isSlotDuringTimeOff($timeOffs, $slotTime, $slotEnd->format('H:i'));
                
                // Check if slot is already booked
                $isBooked = in_array($slotTime, $bookedSlots);
                
                // Check if slot is in the past (for today)
                $isPast = $date->isToday() && Carbon::parse($slotTime)->lt(Carbon::now());
                
                // Check if there's enough time remaining for this slot
                $hasEnoughTime = $slotEnd->lte($endTime);
                
                $isAvailable = !$isDuringTimeOff && !$isBooked && !$isPast && $hasEnoughTime;
                
                $slots[] = [
                    'time' => $slotTime,
                    'available' => $isAvailable,
                    'reason' => $isDuringTimeOff ? 'time_off' : ($isBooked ? 'booked' : ($isPast ? 'past' : null)),
                    'slot_type' => $slotType, // 'long' for :00, 'short' for :45
                    'available_for_short' => $slotType === 'short' && $isAvailable,
                    'available_for_long' => $slotType === 'long' && $isAvailable,
                ];
                
                // Alternate between 45 min and 15 min intervals
                if ($isLongSlot) {
                    $startTime->addMinutes(45); // Next slot after 45 min (e.g., 8:00 -> 8:45)
                } else {
                    $startTime->addMinutes(15); // Next slot after 15 min (e.g., 8:45 -> 9:00)
                }
                $isLongSlot = !$isLongSlot; // Toggle
            }
        }
        
        // Sort by time
        usort($slots, fn($a, $b) => strcmp($a['time'], $b['time']));
    

        return $slots;
    }

    /**
     * Check if a slot is during time off
     */
    private function isSlotDuringTimeOff(Collection $timeOffs, string $slotStart, string $slotEnd): bool
    {
        foreach ($timeOffs as $timeOff) {
            $offStart = substr($timeOff->start_time, 0, 5);
            $offEnd = substr($timeOff->end_time, 0, 5);
            
            // Check if slot overlaps with time off
            if ($slotStart < $offEnd && $slotEnd > $offStart) {
                return true;
            }
        }
        
        return false;
    }

    /**
     * Get Indonesian day name from day of week (0 = Sunday)
     */
    private function getDayName(int $dayOfWeek): string
    {
        $days = [
            0 => 'Minggu',
            1 => 'Senin',
            2 => 'Selasa',
            3 => 'Rabu',
            4 => 'Kamis',
            5 => 'Jumat',
            6 => 'Sabtu',
        ];
        
        return $days[$dayOfWeek] ?? '';
    }

    /**
     * Check if a specific slot is available
     */
    public function isSlotAvailable(int $doctorId, string $date, string $time): bool
    {
        $doctor = Doctor::with(['workingPeriods', 'timeOff'])->findOrFail($doctorId);
        $dateCarbon = Carbon::parse($date);
        
        $slots = $this->getSlotsForDate($doctor, $dateCarbon);
        
        foreach ($slots as $slot) {
            if ($slot['time'] === $time) {
                return $slot['available'];
            }
        }
        
        return false;
    }

    /**
     * Create a new booking with patient details
     * 
     * @throws \Exception if slot is not available
     */
    public function createBooking(array $data): Booking
    {
        $doctorId = $data['doctor_id'];
        $bookingDate = $data['booking_date'];
        $startTime = $data['start_time'];

        // Validate slot is available
        if (!$this->isSlotAvailable($doctorId, $bookingDate, $startTime)) {
            throw new \Exception('Jadwal yang dipilih sudah tidak tersedia. Silakan pilih jadwal lain.');
        }

        // Find or create/update patient by NIK
        $patient = Patient::where('patient_nik', $data['patient_nik'])->first();
        
        if ($patient) {
            // Update existing patient data if there are changes
            $patient->update([
                'patient_name' => $data['patient_name'],
                'patient_email' => $data['patient_email'] ?? $patient->patient_email,
                'patient_phone' => $data['patient_phone'],
                'patient_birthdate' => $data['patient_birthdate'] ?? $patient->patient_birthdate,
                'patient_address' => $data['patient_address'] ?? $patient->patient_address,
            ]);
        } else {
            // Create new patient
            $patient = Patient::create([
                'medical_records' => Patient::generateMedicalRecords(),
                'patient_name' => $data['patient_name'],
                'patient_nik' => $data['patient_nik'],
                'patient_email' => $data['patient_email'] ?? null,
                'patient_phone' => $data['patient_phone'],
                'patient_birthdate' => $data['patient_birthdate'] ?? null,
                'patient_address' => $data['patient_address'] ?? null,
            ]);
        }

        // Generate unique booking code
        $bookingCode = $this->generateBookingCode();

        // Create booking with patient_id
        $booking = Booking::create([
            'code' => $bookingCode,
            'doctor_id' => $doctorId,
            'patient_id' => $patient->id,
            'service' => $data['service'] ?? 'Konsultasi',
            'type' => $data['type'] ?? 'short',
            'booking_date' => $bookingDate,
            'start_time' => $startTime,
            'status' => 'confirmed',
            'is_active' => true,
        ]);

        return $booking->load('patient', 'doctor');
    }

    /**
     * Generate unique booking code
     */
    private function generateBookingCode(): string
    {
        $prefix = 'BK';
        $date = Carbon::now()->format('Ymd');
        $random = strtoupper(substr(md5(uniqid()), 0, 6));
        
        return "{$prefix}{$date}{$random}";
    }

    /**
     * Send booking confirmation WhatsApp notification
     */
    public function sendBookingConfirmation(int $bookingId, string $phone)
    {
        $booking = Booking::with(['doctor', 'patient'])->findOrFail($bookingId);
        
        $whatsappService = new WhatsappService();
        
        $bookingDetails = [
            'patient_name' => $booking->patient->patient_name,
            'doctor_name' => $booking->doctor->name,
            'date' => $this->formatDateIndonesian(Carbon::parse($booking->booking_date)),
            'time' => substr($booking->start_time, 0, 5),
            'code' => $booking->code,
            'confirm_link' => url("/booking/confirm/{$booking->code}"),
            'checkin_link' => url("/booking/checkin/{$booking->code}"),
        ];

        return $whatsappService->sendBookingConfirmation($bookingId, $phone, $bookingDetails);
    }

    /**
     * Schedule reminder notification for H-1 hour (1 hour before booking)
     */
    public function scheduleReminderNotification(int $bookingId): void
    {
        $booking = Booking::with(['doctor', 'patient'])->findOrFail($bookingId);
        
        // Calculate scheduled time: 1 hour before booking time
        $bookingDate = Carbon::parse($booking->booking_date);
        $bookingTime = substr($booking->start_time, 0, 5);
        $bookingDateTime = Carbon::parse($bookingDate->format('Y-m-d') . ' ' . $bookingTime);
        $scheduledAt = $bookingDateTime->copy()->subHour();
        
        // Don't schedule if the reminder time has already passed
        if ($scheduledAt->lt(Carbon::now())) {
            return;
        }

        $bookingDetails = [
            'patient_name' => $booking->patient->patient_name,
            'doctor_name' => $booking->doctor->name,
            'date' => $this->formatDateIndonesian($bookingDate),
            'time' => substr($booking->start_time, 0, 5),
            'code' => $booking->code,
            'confirm_link' => url("/booking/confirm/{$booking->code}"),
            'checkin_link' => url("/booking/checkin/{$booking->code}"),
        ];

        $whatsappService = new WhatsappService();
        $message = $this->buildReminderMessage($bookingDetails);

        // Create scheduled notification
        Notification::create([
            'booking_id' => $bookingId,
            'channel' => 'whatsapp',
            'type' => 'reminder',
            'recipient' => $booking->patient->patient_phone,
            'payload' => $message,
            'scheduled_at' => $scheduledAt,
            'status' => 'pending',
            'attempt_count' => 0,
        ]);
    }

    /**
     * Build reminder message for WhatsApp
     */
    private function buildReminderMessage(array $details): string
    {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? '-';
        $date = $details['date'] ?? '-';
        $time = $details['time'] ?? '-';
        $code = $details['code'] ?? '-';
        $confirmLink = $details['confirm_link'] ?? '-';
        $checkinLink = $details['checkin_link'] ?? '-';

        return "📢 *Pengingat Booking Pemeriksaan Gigi*\n\n"
            . "Yth. Bapak/Ibu {$patientName},\n"
            . "Kami mengingatkan kembali jadwal booking pemeriksaan gigi Anda *BESOK* dengan rincian sebagai berikut:\n\n"
            . "🗓 Tanggal : {$date}\n"
            . "⏰ Jam : {$time} WIB\n"
            . "👩‍⚕️ Dokter : {$doctorName}\n"
            . "📋 Kode Booking : *{$code}*\n\n"
            . "🔗 Konfirmasi Kehadiran:\n"
            . "{$confirmLink}\n\n"
            . "🔗 Check-in Hari H:\n"
            . "{$checkinLink}\n\n"
            . "📌 *Catatan:*\n"
            . "Mohon konfirmasi kehadiran Anda hari ini melalui link di atas.\n\n"
            . "_Pesan ini dikirim otomatis oleh Cantika Dental Care by drg. Anna Fikril._\n\n"
            . "Terima kasih atas kepercayaan Anda.\n"
            . "Kami menantikan kedatangan Anda di Cantika Dental Care 😊";
    }

    public function checkinBooking(string $code): Booking
    {
        $booking = Booking::with(['patient', 'doctor'])
            ->where('code', $code)
            ->firstOrFail();

        // Check if already checked in
        if ($booking->status === 'checked_in') {
            throw new \Exception('Anda sudah melakukan check-in sebelumnya.');
        }

        // Check if booking is cancelled
        if ($booking->status === 'cancelled') {
            throw new \Exception('Booking ini sudah dibatalkan.');
        }

        // Check if booking date is today
        $bookingDate = Carbon::parse($booking->booking_date)->startOfDay();
        $today = Carbon::today();
        
        if (!$bookingDate->isSameDay($today)) {
            throw new \Exception('Check-in hanya bisa dilakukan pada hari H booking.');
        }

        // Check if within 1 hour before booking time
        $dateString = $bookingDate->format('Y-m-d');
        $bookingDateTime = Carbon::parse($dateString . ' ' . $booking->start_time);
        $now = Carbon::now();
        $oneHourBefore = $bookingDateTime->copy()->subHour();

        if ($now->lt($oneHourBefore)) {
            $formattedTime = $oneHourBefore->format('H:i');
            throw new \Exception("Check-in baru bisa dilakukan mulai pukul {$formattedTime} WIB (1 jam sebelum jadwal).");
        }

        if ($now->gt($bookingDateTime)) {
            throw new \Exception('Waktu booking sudah lewat. Silakan hubungi admin.');
        }

        // Update booking status
        $booking->update([
            'status' => 'checked_in',
        ]);

        // Create check-in record
        $booking->checkin()->create([
            'checked_in_at' => Carbon::now(),
        ]);

        return $booking->fresh(['patient', 'doctor']);
    }

    /**
     * Check if booking can be checked in
     */
    public function canCheckin(Booking $booking): array
    {
        $bookingDate = Carbon::parse($booking->booking_date)->startOfDay();
        $today = Carbon::today();
        
        // Not today
        if (!$bookingDate->isSameDay($today)) {
            return [
                'can_checkin' => false,
                'reason' => 'Check-in hanya bisa dilakukan pada hari H booking.',
            ];
        }

        // Already checked in
        if ($booking->status === 'checked_in') {
            return [
                'can_checkin' => false,
                'reason' => 'Anda sudah melakukan check-in.',
            ];
        }

        // Cancelled
        if ($booking->status === 'cancelled') {
            return [
                'can_checkin' => false,
                'reason' => 'Booking ini sudah dibatalkan.',
            ];
        }

        // Check time window
        $dateString = $bookingDate->format('Y-m-d');
        $bookingDateTime = Carbon::parse($dateString . ' ' . $booking->start_time);
        $now = Carbon::now();
        $oneHourBefore = $bookingDateTime->copy()->subHour();

        if ($now->lt($oneHourBefore)) {
            return [
                'can_checkin' => false,
                'reason' => 'Check-in baru bisa dilakukan 1 jam sebelum jadwal.',
                'available_at' => $oneHourBefore->format('H:i'),
            ];
        }

        if ($now->gt($bookingDateTime)) {
            return [
                'can_checkin' => false,
                'reason' => 'Waktu booking sudah lewat.',
            ];
        }

        return [
            'can_checkin' => true,
            'reason' => null,
        ];
    }
}

