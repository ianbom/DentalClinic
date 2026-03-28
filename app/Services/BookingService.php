<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\BookingCancellation;
use App\Models\Patient;
use App\Models\Doctor;
use App\Models\DoctorOvertime;
use App\Models\DoctorTimeOff;
use App\Models\DoctorWorkingPeriod;
use App\Models\Notification;
use App\Services\WhatsappService;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class BookingService
{
 
    public function getAvailableSlotsForDoctor(int $doctorId, int $daysAhead = 30)
    {
        $doctor = Doctor::with(['workingPeriods', 'timeOff', 'overtimes'])->findOrFail($doctorId);
        
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
        $dateString = $date->format('Y-m-d');
        
        // Get working periods for this day
        $workingPeriods = $doctor->workingPeriods
            ->where('day_of_week', $dayName)
            ->where('is_active', true);
        
        // Get overtime for this specific date
        $overtimes = $doctor->overtimes->filter(function ($overtime) use ($dateString) {
            return $overtime->date->format('Y-m-d') === $dateString;
        });
        
        // If no working periods and no overtimes, return empty
        if ($workingPeriods->isEmpty() && $overtimes->isEmpty()) {
            return [];
        }
        
        $timeOffs = $doctor->timeOff->filter(function ($timeOff) use ($dateString) {
            return $timeOff->date->format('Y-m-d') === $dateString;
        });
        
        // Get existing bookings for this date with patient info
        $bookedSlotData = Booking::with('patient')
            ->where('doctor_id', $doctor->id)
            ->where('booking_date', $date->format('Y-m-d'))
            ->where('is_active', 1)
            ->get()
            ->keyBy(fn($booking) => substr($booking->start_time, 0, 5));
        
        $bookedSlots = $bookedSlotData->keys()->toArray();
        
        $slots = [];
        
        // Generate slots from working periods
        foreach ($workingPeriods as $period) {
            $this->generateSlotsFromPeriod(
                $slots,
                Carbon::parse($period->start_time),
                Carbon::parse($period->end_time),
                $date,
                $timeOffs,
                $bookedSlots,
                $bookedSlotData,
                false // isOvertime
            );
        }
        
        // Generate slots from overtime
        foreach ($overtimes as $overtime) {
            $this->generateSlotsFromPeriod(
                $slots,
                Carbon::parse($overtime->start_time),
                Carbon::parse($overtime->end_time),
                $date,
                $timeOffs,
                $bookedSlots,
                $bookedSlotData,
                true // isOvertime
            );
        }
        
        // Remove duplicate slots (in case overtime overlaps with regular schedule)
        $uniqueSlots = [];
        $seenTimes = [];
        foreach ($slots as $slot) {
            if (!in_array($slot['time'], $seenTimes)) {
                $uniqueSlots[] = $slot;
                $seenTimes[] = $slot['time'];
            }
        }
        
        // Sort by time
        usort($uniqueSlots, fn($a, $b) => strcmp($a['time'], $b['time']));

        return $uniqueSlots;
    }

    /**
     * Generate slots from a time period (working period or overtime)
     */
    private function generateSlotsFromPeriod(
        array &$slots,
        Carbon $startTime,
        Carbon $endTime,
        Carbon $date,
        $timeOffs,
        array $bookedSlots,
        $bookedSlotData,
        bool $isOvertime = false
    ): void {
        $isLongSlot = true;
        
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
            $booking = $bookedSlotData->get($slotTime);
            
            // Check if slot is in the past (for today)
            $isPast = $date->isToday() && Carbon::parse($slotTime)->lt(Carbon::now());
            
            // Check if there's enough time remaining for this slot
            $hasEnoughTime = $slotEnd->lte($endTime);
            
            $isAvailable = !$isDuringTimeOff && !$isBooked && !$isPast && $hasEnoughTime;
            
            $slots[] = [
                'time' => $slotTime,
                'available' => $isAvailable,
                'reason' => $isDuringTimeOff ? 'time_off' : ($isBooked ? 'booked' : ($isPast ? 'past' : null)),
                'slot_type' => $slotType,
                'available_for_short' => $slotType === 'short' && $isAvailable,
                'available_for_long' => $slotType === 'long' && $isAvailable,
                'is_overtime' => $isOvertime, // Flag to indicate overtime slot
                // Include booking details for booked slots
                'patient_name' => $booking?->patient?->patient_name,
                'service' => $booking?->service,
                'booking_id' => $booking?->id,
            ];
            
            // Alternate between 45 min and 15 min intervals
            if ($isLongSlot) {
                $startTime->addMinutes(45);
            } else {
                $startTime->addMinutes(15);
            }
            $isLongSlot = !$isLongSlot;
        }
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
    public function isSlotAvailable(int $doctorId, string $date, ?string $time): bool
    {
        $doctor = Doctor::with(['workingPeriods', 'timeOff'])->findOrFail($doctorId);
        $dateCarbon = Carbon::parse($date);
        
        $slots = $this->getSlotsForDate($doctor, $dateCarbon);

        if ($time == "Dijadwalkan Admin") {
            return true;
        }
        
        foreach ($slots as $slot) {
            if ($slot['time'] === $time) {
                return $slot['available'];
            }
        }
        
        return false;
    }

    public function createBooking(array $data)
    {
        $doctorId = $data['doctor_id'];
        $bookingDate = $data['booking_date'];
        if (isset($data['start_time']) && $data['start_time'] == "Dijadwalkan Admin") {
            $startTime = null;
        } else {
            $startTime = $data['start_time'] ?? null;
        }
        $serviceType = $data['type'];

        // For sisipan or when no time is selected, skip slot validation
        if ($serviceType == 'sisipan' || $startTime == null) {
            return $this->saveBookingData($data);
        }

        // Validate slot is available (only when time is provided)
        if (!$this->isSlotAvailable($doctorId, $bookingDate, $startTime)) {
            throw new \Exception('Jadwal yang dipilih sudah tidak tersedia. Silakan pilih jadwal lain.');
        }

        return $this->saveBookingData($data);
    }

    public function rescheduleBooking(int $bookingId, array $data): Booking
    {
        $booking = Booking::with(['patient', 'doctor'])->findOrFail($bookingId);

        // Capture old schedule before update
        $oldSchedule = [
            'old_date' => $booking->booking_date->translatedFormat('l, d F Y'),
            'old_time' => $booking->start_time ? substr($booking->start_time, 0, 5) : '-',
        ];

        $newStartTime = $data['start_time'] ?? null;
        $newServiceType = $data['type'];

        // Validate new slot is available (if time is provided and not sisipan)
        // Note: We need to exclude current booking from availability check
        $newStartTime = ($newStartTime === "Dijadwalkan Admin") ? null : $newStartTime;
        
        if ($newServiceType !== 'sisipan' && $newStartTime !== null) {
            $isNewSlotAvailable = $this->isSlotAvailableExcluding(
                $data['doctor_id'],
                $data['booking_date'],
                $newStartTime,
                $bookingId
            );

            if (!$isNewSlotAvailable) {
                throw new \Exception('Jadwal baru yang dipilih sudah tidak tersedia. Silakan pilih jadwal lain.');
            }
        }

        // Update booking - old slot automatically becomes available
        $booking->update([
            'doctor_id' => $data['doctor_id'],
            'service' => $data['service'],
            'type' => $data['type'],
            'booking_date' => $data['booking_date'],
            'start_time' => $newStartTime,
        ]);

        // Refresh booking to get updated data
        $booking->refresh();
        $booking->load(['doctor', 'patient']);

        // Send reschedule notification
        $this->sendRescheduleNotification(
            $booking->id,
            $booking->patient->patient_phone,
            $oldSchedule
        );

        // Update existing reminder notification with new schedule
        $this->updateReminderNotification($booking->id);

        return $booking;
    }

    /**
     * Check if a slot is available, excluding a specific booking
     */
    private function isSlotAvailableExcluding(int $doctorId, string $date, ?string $time, int $excludeBookingId): bool
    {
        // Check if there's another booking at this time (excluding the current one)
        $existingBooking = Booking::where('doctor_id', $doctorId)
            ->whereDate('booking_date', $date)
            ->where('start_time', $time)
            ->where('id', '!=', $excludeBookingId)
            ->whereIn('status', ['pending', 'confirmed'])
            ->first();

        return $existingBooking === null;
    }

    public function saveBookingData(array $data)
    {
        $doctorId = $data['doctor_id'];
        $bookingDate = $data['booking_date'];
        $bookingDate = $data['booking_date'];
        $rawStartTime = $data['start_time'] ?? null;
        $startTime = ($rawStartTime === "Dijadwalkan Admin") ? null : $rawStartTime;
        $serviceType = $data['type'];

        // Find or create/update patient by NIK
        $patient = Patient::where('patient_nik', $data['patient_nik'])->first();
        
        if ($patient) {
            // Update existing patient data if there are changes
            $patient->update([
                'patient_name' => $data['patient_name'],
                'patient_phone' => $data['patient_phone'],
                'patient_birthdate' => $data['patient_birthdate'] ?? $patient->patient_birthdate,
                'patient_address' => $data['patient_address'] ?? $patient->patient_address,
                'gender' => $data['gender']
            ]);
        } else {
            // Create new patient
            $patient = Patient::create([
                // 'medical_records' => Patient::generateMedicalRecords(),
                'patient_name' => $data['patient_name'],
                'patient_nik' => $data['patient_nik'],
                'patient_phone' => $data['patient_phone'],
                'patient_birthdate' => $data['patient_birthdate'] ?? null,
                'patient_address' => $data['patient_address'] ?? null,
                'gender' => $data['gender']
            ]);
        }

        // Generate unique booking code
        $bookingCode = $this->generateBookingCode();

        // Create booking with patient_id
        $booking = Booking::create([
            'code' => $bookingCode,
            'doctor_id' => $doctorId,
            'patient_id' => $patient->id,
            'service' => $data['service'],
            'type' => $data['type'],
            'booking_date' => $bookingDate,
            'start_time' => $startTime ?? null,
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
        $prefix = 'CDC';
        // $date = Carbon::now()->format('Ymd');
        $random = strtoupper(substr(md5(uniqid()), 0, 6));
        
        return "{$prefix}{$random}";
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
            'time' => $booking->start_time ? substr($booking->start_time, 0, 5) : 'Menunggu Konfirmasi Admin',
            'code' => $booking->code,
            'confirm_link' => url('/check-booking') . '?code=' . $booking->code . '&phone=' . $booking->patient->patient_phone,
            'checkin_link' => url('/check-booking') . '?code=' . $booking->code . '&phone=' . $booking->patient->patient_phone,
        ];

        return $whatsappService->sendBookingConfirmation($bookingId, $phone, $bookingDetails);
    }

    /**
     * Send reschedule notification WhatsApp
     */
    public function sendRescheduleNotification(int $bookingId, string $phone, array $oldSchedule)
    {
        $booking = Booking::with(['doctor', 'patient'])->findOrFail($bookingId);
        
        $whatsappService = new WhatsappService();
        
        $bookingDetails = [
            'patient_name' => $booking->patient->patient_name,
            'doctor_name' => $booking->doctor->name,
            'date' => $this->formatDateIndonesian(Carbon::parse($booking->booking_date)),
            'time' => substr($booking->start_time ?? '00:00', 0, 5),
            'code' => $booking->code,
            'old_date' => $oldSchedule['old_date'] ?? '-',
            'old_time' => $oldSchedule['old_time'] ?? '-',
            'checkin_link' => url('/check-booking') . '?code=' . $booking->code . '&phone=' . $booking->patient->patient_phone,
        ];

        return $whatsappService->sendReschedule($bookingId, $phone, $bookingDetails);
    }

    public function scheduleReminderNotification(int $bookingId): void
    {
        $booking = Booking::with(['doctor', 'patient'])->findOrFail($bookingId);

        if (!$booking->start_time) {
            return;
        }
        
        $bookingDate = Carbon::parse($booking->booking_date);
        $bookingTime = substr($booking->start_time, 0, 5);
        $now = Carbon::now();
        
        // Buat datetime lengkap dari tanggal + jam booking
        $bookingDateTime = $bookingDate->copy()->setTimeFromTimeString($bookingTime);
        
        // Hitung selisih waktu antara sekarang dan jadwal booking
        $hoursUntilBooking = $now->diffInHours($bookingDateTime, false);

        if ($hoursUntilBooking >= 24) {
            // User memesan >= H-24 jam sebelum jadwal
            // Reminder dikirim H-24 jam sebelum booking
            $scheduledAt = $bookingDateTime->copy()->subHours(24);
            Log::info('Reminder dijadwalkan H-24 jam sebelum booking', [
                'booking_time' => $bookingDateTime->toDateTimeString(),
                'scheduled_at' => $scheduledAt->toDateTimeString(),
            ]);
        } elseif ($hoursUntilBooking >= 1) {
            // User memesan < H-24 jam tapi >= H-1 jam sebelum jadwal
            // Reminder dikirim H-1 jam sebelum booking
            $scheduledAt = $bookingDateTime->copy()->subHour();
            Log::info('Reminder dijadwalkan H-1 jam sebelum booking', [
                'booking_time' => $bookingDateTime->toDateTimeString(),
                'scheduled_at' => $scheduledAt->toDateTimeString(),
            ]);
        } else {
            // User memesan kurang dari 1 jam sebelum jadwal
            // Kirim reminder langsung dengan jeda 1 menit
            $scheduledAt = $now->copy()->addMinute();
            Log::info('Reminder langsung dikirim (user pesan < H-1 jam)', [
                'booking_time' => $bookingDateTime->toDateTimeString(),
                'scheduled_at' => $scheduledAt->toDateTimeString(),
            ]);
        }

        $bookingDetails = [
            'patient_name' => $booking->patient->patient_name,
            'doctor_name' => $booking->doctor->name,
            'date' => $this->formatDateIndonesian($bookingDate),
            'time' => substr($booking->start_time, 0, 5),
            'code' => $booking->code,
            'confirm_link' => url('/check-booking') . '?code=' . $booking->code . '&phone=' . $booking->patient->patient_phone,
        ];

        $message = $this->buildReminderMessage($bookingDetails);

        Log::info('Reminder dibuat untuk booking: ' . $booking->code);

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
     * Update reminder notification when booking is rescheduled
     */
    public function updateReminderNotification(int $bookingId): void
    {
        $booking = Booking::with(['doctor', 'patient'])->findOrFail($bookingId);
        
        // Find existing pending reminder notification for this booking
        $existingReminder = Notification::where('booking_id', $bookingId)
            ->where('type', 'reminder')
            ->where('status', 'pending')
            ->first();
        
        // If no pending reminder exists, create a new one
        if (!$existingReminder) {
            $this->scheduleReminderNotification($bookingId);
            return;
        }
        
        // If no start_time, cancel the reminder
        if (!$booking->start_time) {
            $existingReminder->update([
                'status' => 'cancelled',
                'last_error' => 'Booking rescheduled without start time',
            ]);
            return;
        }
        
        $bookingDate = Carbon::parse($booking->booking_date);
        $bookingTime = substr($booking->start_time, 0, 5);
        $now = Carbon::now();
        
        // Calculate new scheduled_at based on booking date
        if ($bookingDate->isSameDay($now)) {
            // Booking is today → schedule immediately
            $scheduledAt = $now->copy()->addMinute();
        } else {
            // Booking is future → H-1 at the same time as booking
            $scheduledAt = $bookingDate->copy()->subDay()->setTimeFromTimeString($bookingTime);
        }
        
        // If scheduled time has passed, cancel the reminder
        if ($scheduledAt->lt($now)) {
            $existingReminder->update([
                'status' => 'cancelled',
                'last_error' => 'Reminder time has passed after reschedule',
            ]);
            return;
        }
        
        // Update reminder with new schedule and message
        $bookingDetails = [
            'patient_name' => $booking->patient->patient_name,
            'doctor_name' => $booking->doctor->name,
            'date' => $this->formatDateIndonesian($bookingDate),
            'time' => $bookingTime,
            'code' => $booking->code,
            'confirm_link' => url('/check-booking') . '?code=' . $booking->code . '&phone=' . $booking->patient->patient_phone,
        ];
        
        $message = $this->buildReminderMessage($bookingDetails);
        
        $existingReminder->update([
            'payload' => $message,
            'scheduled_at' => $scheduledAt,
            'recipient' => $booking->patient->patient_phone,
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

        return "📢 *Pengingat Booking Pemeriksaan Gigi*\n\n"
            . "Yth. Bapak/Ibu {$patientName},\n"
            . "Kami mengingatkan kembali jadwal booking pemeriksaan gigi Anda dengan rincian sebagai berikut:\n\n"
            . "🗓 Tanggal : {$date}\n"
            . "⏰ Jam : {$time} WIB\n"
            . "👩‍⚕️ Dokter : {$doctorName}\n"
            . "📋 Kode Booking : *{$code}*\n\n"
            . "🔗 Konfirmasi Kehadiran:\n"
            . "{$confirmLink}\n\n"
            . "📌 *Catatan:*\n"
            . "Mohon konfirmasi kehadiran Anda hari ini melalui link di atas.\n\n"
            . "Terima kasih atas kepercayaan Anda.\n"
            . "Kami menantikan kedatangan Anda di Cantika Dental Care 😊\n\n"
            . "❌JANGAN BALAS CHAT INI"
            . "📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966";
    }

    public function checkinBooking(string $code, bool $isAdminCheckin = false): Booking
    {
        $booking = Booking::with(['patient', 'doctor'])
            ->where('code', $code)
            ->firstOrFail();

        // Check if already checked in
        if ($booking->status === 'checked_in') {
            throw new \Exception('Booking ini sudah di-check-in sebelumnya.');
        }

        // Check if booking is cancelled
        if ($booking->status === 'cancelled') {
            throw new \Exception('Booking ini sudah dibatalkan.');
        }

        // Check if booking date allows checkin (H-24 hours)
        $bookingDate = Carbon::parse($booking->booking_date);
        $dateString = $bookingDate->format('Y-m-d');
        $bookingDateTime = Carbon::parse($dateString . ' ' . $booking->start_time);
        $now = Carbon::now();
        
        // Time restrictions only for patient self-checkin, not admin
        if (!$isAdminCheckin) {
            // Check if within 24 hours before booking time
            $twentyFourHoursBefore = $bookingDateTime->copy()->subHours(24);

            if ($now->lt($twentyFourHoursBefore)) {
                $formattedDate = $twentyFourHoursBefore->translatedFormat('j M');
                $formattedTime = $twentyFourHoursBefore->format('H:i');
                throw new \Exception("Konfirmasi baru bisa dilakukan mulai {$formattedDate} pukul {$formattedTime} WIB.");
            }

            if ($now->gt($bookingDateTime)) {
                throw new \Exception('Waktu booking sudah lewat. Silakan hubungi admin.');
            }
        }

        // Update booking status
        $checkinTime = Carbon::now();
        $booking->update([
            'status' => 'checked_in',
        ]);

        // Create check-in record
        $booking->checkin()->create([
            'checked_in_at' => $checkinTime,
        ]);

        // Send WhatsApp notification
        $whatsappService = new WhatsappService();
        $bookingDetails = [
            'patient_name' => $booking->patient->patient_name,
            'doctor_name' => $booking->doctor->name,
            'date' => $this->formatDateIndonesian(Carbon::parse($booking->booking_date)),
            'time' => substr($booking->start_time ?? '00:00', 0, 5),
            'code' => $booking->code,
            'checkin_time' => $checkinTime->format('H:i'),
        ];

        $whatsappService->sendCheckin($booking->id, $booking->patient->patient_phone, $bookingDetails);

        // Schedule post check-in reminder (3 days after check-in)
        $this->schedulePostCheckinReminder($booking->id);

        return $booking->fresh(['patient', 'doctor', 'checkin']);
    }

    /**
     * Check if booking can be checked in
     */
    public function canCheckin(Booking $booking): array
    {
        $bookingDate = Carbon::parse($booking->booking_date);
        $dateString = $bookingDate->format('Y-m-d');
        $bookingDateTime = Carbon::parse($dateString . ' ' . $booking->start_time);
        $now = Carbon::now();
        $twentyFourHoursBefore = $bookingDateTime->copy()->subHours(24);
        
        // Already checked in
        if ($booking->status === 'checked_in') {
            return [
                'can_checkin' => false,
                'reason' => 'Anda sudah melakukan konfirmasi kedatangan.',
            ];
        }

        // Cancelled
        if ($booking->status === 'cancelled') {
            return [
                'can_checkin' => false,
                'reason' => 'Booking ini sudah dibatalkan.',
            ];
        }

        // Check 24 hour window
        if ($now->lt($twentyFourHoursBefore)) {
            return [
                'can_checkin' => false,
                'reason' => 'Konfirmasi baru bisa dilakukan H-24 jam sebelum jadwal.',
                'available_at' => $twentyFourHoursBefore->translatedFormat('j M') . ' pukul ' . $twentyFourHoursBefore->format('H:i'),
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

    public function checkNikActiveBooking(string $nik){
        $booking = Booking::whereHas('patient', function ($query) use ($nik) {
            $query->where('patient_nik', $nik);
        })->where('status', 'confirmed')->first();
        return $booking;
    }

    /**
     * Cancel a booking by code
     * The slot will automatically become available for other bookings
     */
    public function cancelBooking(string $code, ?string $reason = null, ?int $cancelledByUserId = null): Booking
    {
        $booking = Booking::with(['patient', 'doctor'])
            ->where('code', $code)
            ->first();

        if (!$booking) {
            throw new \Exception('Booking tidak ditemukan.');
        }

        // Check if already cancelled
        if ($booking->status === 'cancelled') {
            throw new \Exception('Booking ini sudah dibatalkan sebelumnya.');
        }

        // Check if already checked in
        // if ($booking->status === 'checked_in') {
        //     throw new \Exception('Booking yang sudah check-in tidak bisa dibatalkan.');
        // }

        // Check if booking is in the past
        $bookingDate = Carbon::parse($booking->booking_date);
        $bookingDateTime = Carbon::parse($bookingDate->format('Y-m-d') . ' ' . $booking->start_time);
        
        // if (Carbon::now()->gt($bookingDateTime)) {
        //     throw new \Exception('Booking yang sudah lewat tidak bisa dibatalkan.');
        // }

        // Update booking status to cancelled
        $booking->update([
            'status' => 'cancelled',
            'is_active' => false
        ]);

        // Create cancellation record
        BookingCancellation::create([
            'booking_id' => $booking->id,
            'cancelled_at' => Carbon::now(),
            'cancelled_by_user_id' => $cancelledByUserId,
            'cancelled_by' => $cancelledByUserId ? 'admin' : 'patient',
            'reason' => $reason,
        ]);

        // Delete any pending reminder notifications
        Notification::where('booking_id', $booking->id)
            ->where('status', 'pending')
            ->delete();

        // Send cancellation notification via WhatsApp
        try {
            $whatsappService = new WhatsappService();
            $bookingDetails = [
                'patient_name' => $booking->patient->patient_name,
                'doctor_name' => $booking->doctor->name,
                'date' => $this->formatDateIndonesian(Carbon::parse($booking->booking_date)),
                'time' => substr($booking->start_time ?? '00:00', 0, 5),
                'code' => $booking->code,
            ];
            $whatsappService->sendCancellation($booking->id, $booking->patient->patient_phone, $bookingDetails);
        } catch (\Throwable $e) {
            // Log but don't fail if WhatsApp notification fails
            \Illuminate\Support\Facades\Log::error('Failed to send cancellation notification: ' . $e->getMessage());
        }

        return $booking->fresh(['patient', 'doctor', 'cancellation']);
    }

    /**
     * Schedule post check-in reminder (3 days after check-in)
     * Sends a follow-up message to ask about patient's condition
     */
    public function schedulePostCheckinReminder(int $bookingId): void
    {
        $booking = Booking::with(['doctor', 'patient'])->findOrFail($bookingId);
        
        // Schedule for 3 days after check-in
        $scheduledAt = Carbon::now()->addDays(3);
        
        $bookingDetails = [
            'patient_name' => $booking->patient->patient_name,
            'doctor_name' => $booking->doctor->name,
        ];

        $message = $this->buildPostCheckinReminderMessage($bookingDetails);

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
     * Build post check-in reminder message (3 days after check-in)
     */
    private function buildPostCheckinReminderMessage(array $details): string
    {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? 'drg. Anna Fikril';

        return "*Assalamu'alaikum warahmatullahi wabarakatuh*\n\n"
            . "Yth. Bapak/Ibu {$patientName},\n\n"
            . "Bagaimana kondisi gigi setelah dari sini kemarin?\n\n"
            . "Apabila masih terdapat keluhan atau rasa kurang nyaman, silakan menginformasikannya kepada kami. "
            . "Kami dengan senang hati siap membantu.\n\n"
            . "Untuk keluhan bisa langsung chat dengan drg. Anna Fikril di nomor di bawah ini:\n"
            . "📱https://wa.me/6282234328628\n\n"
            . "Salam sehat,\n"
            . "drg. Anna Fikril";
    }
}

