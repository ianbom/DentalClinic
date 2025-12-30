<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Doctor;
use App\Models\DoctorTimeOff;
use App\Models\DoctorWorkingPeriod;
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
            
            // Generate 1-hour slots
            while ($startTime->lt($endTime)) {
                $slotTime = $startTime->format('H:i');
                $slotEndTime = $startTime->copy()->addHour();
                
                // Check if slot is during time off
                $isDuringTimeOff = $this->isSlotDuringTimeOff($timeOffs, $slotTime, $slotEndTime->format('H:i'));
                
                // Check if slot is already booked
                $isBooked = in_array($slotTime, $bookedSlots);
                
                // Check if slot is in the past (for today)
                $isPast = $date->isToday() && Carbon::parse($slotTime)->lt(Carbon::now());
                
                $slots[] = [
                    'time' => $slotTime,
                    'available' => !$isDuringTimeOff && !$isBooked && !$isPast,
                    'reason' => $isDuringTimeOff ? 'time_off' : ($isBooked ? 'booked' : ($isPast ? 'past' : null)),
                ];
                
                $startTime->addHour();
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

        // Generate unique booking code
        $bookingCode = $this->generateBookingCode();

        // Create booking
        $booking = Booking::create([
            'code' => $bookingCode,
            'doctor_id' => $doctorId,
            'booking_date' => $bookingDate,
            'start_time' => $startTime,
            'status' => 'confirmed',
            'is_active' => true,
        ]);

        // Create patient details
        $booking->patientDetail()->create([
            'patient_name' => $data['patient_name'],
            'patient_nik' => $data['patient_nik'],
            'patient_email' => $data['patient_email'] ?? null,
            'patient_phone' => $data['patient_phone'],
            'complaint' => $data['complaint'] ?? null,
        ]);

        return $booking->load('patientDetail', 'doctor');
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
}
