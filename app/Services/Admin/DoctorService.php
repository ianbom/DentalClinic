<?php

namespace App\Services\Admin;

use App\Models\Doctor;
use App\Models\DoctorOvertime;
use App\Models\DoctorTimeOff;
use App\Models\DoctorWorkingPeriod;
use Carbon\Carbon;

class DoctorService
{
    /**
     * Get all doctors with formatted data
     */
    public function getAllDoctors(): array
    {
        $doctors = Doctor::withCount('bookings')
            ->orderBy('name', 'asc')
            ->get();

        return $doctors->map(function ($doctor) {
            return [
                'id' => $doctor->id,
                'name' => $doctor->name,
                'sip' => $doctor->sip,
                'experience' => $doctor->experience,
                'profile_pic' => $doctor->profile_pic,
                'is_active' => $doctor->is_active,
                'total_bookings' => $doctor->bookings_count,
                'created_at' => $doctor->created_at->format('Y-m-d H:i:s'),
                'created_at_formatted' => $doctor->created_at->translatedFormat('d M Y'),
            ];
        })->toArray();
    }

    /**
     * Get doctor by ID with detailed info
     */
    public function getDoctorById(int $id): ?array
    {
        $doctor = Doctor::with(['workingPeriods', 'bookings' => function ($query) {
            $query->with('patient')->latest()->limit(5);
        }])
            ->withCount(['bookings', 'bookings as completed_bookings_count' => function ($query) {
                $query->where('status', 'checked_in');
            }])
            ->find($id);

        if (!$doctor) {
            return null;
        }

        // Get unique patients count by patient_id
        $uniquePatientsCount = $doctor->bookings()
            ->distinct('patient_id')
            ->count('patient_id');

        // Format working periods for today
        $today = Carbon::now()->dayOfWeek;
        $todaySchedule = $doctor->workingPeriods
            ->where('day_of_week', $today)
            ->map(function ($period) {
                return [
                    'id' => $period->id,
                    'shift' => Carbon::parse($period->start_time)->hour < 12 ? 'Pagi' : 'Sore',
                    'start_time' => Carbon::parse($period->start_time)->format('H:i'),
                    'end_time' => Carbon::parse($period->end_time)->format('H:i'),
                    'is_active' => $period->is_active,
                ];
            })->values()->toArray();

        // Format recent bookings
        $recentBookings = $doctor->bookings->map(function ($booking) {
            return [
                'id' => $booking->id,
                'patient_name' => $booking->patient->patient_name ?? 'Unknown',
                'patient_avatar' => null,
                'treatment' => 'Konsultasi',
                'date' => Carbon::parse($booking->booking_date)->translatedFormat('d M Y'),
                'time' => Carbon::parse($booking->start_time)->format('H:i'),
                'status' => $booking->status,
            ];
        })->toArray();

        return [
            'id' => $doctor->id,
            'name' => $doctor->name,
            'sip' => $doctor->sip,
            'experience' => $doctor->experience,
            'profile_pic' => $doctor->profile_pic,
            'is_active' => $doctor->is_active,
            'stats' => [
                'total_bookings' => $doctor->bookings_count,
                'completed_bookings' => $doctor->completed_bookings_count,
                'unique_patients' => $uniquePatientsCount,
            ],
            'today_schedule' => $todaySchedule,
            'recent_bookings' => $recentBookings,
        ];
    }

    /**
     * Get schedule data for calendar view
     */
    public function getScheduleData(?int $doctorId, int $year, int $month): array
    {
        $startDate = Carbon::create($year, $month, 1)->startOfMonth();
        $endDate = $startDate->copy()->endOfMonth();
        $daysInMonth = $startDate->daysInMonth;

        // Get working periods for the doctor (if selected)
        $workingPeriodsQuery = \App\Models\DoctorWorkingPeriod::query();
        if ($doctorId) {
            $workingPeriodsQuery->where('doctor_id', $doctorId);
        }
        $workingPeriods = $workingPeriodsQuery->get();

        // Get bookings for the month
        $bookingsQuery = \App\Models\Booking::query()
            ->whereBetween('booking_date', [$startDate, $endDate])
            ->whereIn('status', ['pending', 'confirmed', 'checked_in']);
        if ($doctorId) {
            $bookingsQuery->where('doctor_id', $doctorId);
        }
        $bookings = $bookingsQuery->get();

        // Group bookings by date
        $bookingsByDate = $bookings->groupBy(function ($booking) {
            return $booking->booking_date->format('Y-m-d');
        });

        // Build calendar data
        $calendarData = [];
        for ($day = 1; $day <= $daysInMonth; $day++) {
            $date = Carbon::create($year, $month, $day);
            $dayOfWeek = $date->dayOfWeek;
            $dateString = $date->format('Y-m-d');

            // Check if doctor has working period for this day of week
            $dayWorkingPeriods = $workingPeriods->where('day_of_week', $dayOfWeek);
            $hasSchedule = $dayWorkingPeriods->isNotEmpty();
            $isActive = $dayWorkingPeriods->where('is_active', true)->isNotEmpty();

            // Count total slots and booked slots for this day
            $totalSlots = 0;
            $bookedSlots = 0;

            if ($hasSchedule && $isActive) {
                // Calculate total slots from working periods (assuming 1 hour per slot)
                foreach ($dayWorkingPeriods->where('is_active', true) as $period) {
                    $start = Carbon::parse($period->start_time);
                    $end = Carbon::parse($period->end_time);
                    $totalSlots += $start->diffInHours($end);
                }

                // Count booked slots for this day
                $bookedSlots = $bookingsByDate->get($dateString)?->count() ?? 0;
            }

            // Determine status
            $status = 'no_schedule';
            $availableCount = 0;

            if (!$hasSchedule) {
                $status = 'no_schedule';
            } elseif (!$isActive) {
                $status = 'off';
            } elseif ($bookedSlots >= $totalSlots && $totalSlots > 0) {
                $status = 'full';
            } else {
                $status = 'available';
                $availableCount = $totalSlots - $bookedSlots;
            }

            $calendarData[$day] = [
                'date' => $day,
                'status' => $status,
                'availableCount' => $availableCount,
                'totalSlots' => $totalSlots,
                'bookedSlots' => $bookedSlots,
            ];
        }

        return $calendarData;
    }

    /**
     * Get time slots for a specific date
     */
    public function getTimeSlotsForDate(?int $doctorId, string $date): array
    {
        $dateObj = Carbon::parse($date);
        $dayOfWeek = $dateObj->dayOfWeek;

        // Get working periods
        $workingPeriodsQuery = \App\Models\DoctorWorkingPeriod::query()
            ->where('day_of_week', $dayOfWeek)
            ->where('is_active', true);
        if ($doctorId) {
            $workingPeriodsQuery->where('doctor_id', $doctorId);
        }
        $workingPeriods = $workingPeriodsQuery->get();

        // Get bookings for this date
        $bookingsQuery = \App\Models\Booking::query()
            ->with('patient')
            ->whereDate('booking_date', $dateObj)
            ->whereIn('status', ['pending', 'confirmed', 'checked_in']);
        if ($doctorId) {
            $bookingsQuery->where('doctor_id', $doctorId);
        }
        $bookings = $bookingsQuery->get()->keyBy(function ($booking) {
            return Carbon::parse($booking->start_time)->format('H:i');
        });

        // Generate time slots
        $morningSlots = [];
        $afternoonSlots = [];

        foreach ($workingPeriods as $period) {
            $start = Carbon::parse($period->start_time);
            $end = Carbon::parse($period->end_time);

            while ($start < $end) {
                $slotTime = $start->format('H:i');
                $slotEndTime = $start->copy()->addHour()->format('H:i');
                $booking = $bookings->get($slotTime);

                $slot = [
                    'time' => $slotTime,
                    'endTime' => $slotEndTime,
                    'status' => $booking ? 'booked' : 'available',
                    'patientName' => $booking?->patient?->patient_name,
                ];

                if ($start->hour < 12) {
                    $morningSlots[] = $slot;
                } else {
                    $afternoonSlots[] = $slot;
                }

                $start->addHour();
            }
        }

        return [
            'morning' => $morningSlots,
            'afternoon' => $afternoonSlots,
        ];
    }

    /**
     * Create a time off entry for a doctor
     */
    public function createTimeOff(int $doctorId, string $date, string $startTime, string $endTime, ?string $note = null): \App\Models\DoctorTimeOff
    {
        return \App\Models\DoctorTimeOff::create([
            'doctor_id' => $doctorId,
            'date' => $date,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'note' => $note,
            'created_by_user_id' => auth()->id(),
        ]);
    }

    /**
     * Lock all schedules for a specific doctor on a specific date
     * Returns: ['success' => bool, 'message' => string, 'has_bookings' => bool]
     */
    public function lockOneDaySchedule(int $doctorId, string $date, ?string $note = null): array
    {
        // Check if there are any active bookings on this date
        $hasBookings = \App\Models\Booking::where('doctor_id', $doctorId)
            ->where('booking_date', $date)
            ->where('is_active', true)
            ->whereIn('status', ['pending', 'confirmed'])
            ->exists();

        if ($hasBookings) {
            return [
                'success' => false,
                'message' => 'Tidak dapat mengunci jadwal. Masih ada booking aktif pada tanggal ini. Silakan batalkan booking terlebih dahulu.',
                'has_bookings' => true,
            ];
        }

        // Get doctor's working periods for this day of week
        // $dayOfWeek = Carbon::parse($date)->dayOfWeek;
        $hasWorkingPeriods = DoctorWorkingPeriod::where('doctor_id', $doctorId)
            // ->where('day_of_week', $dayOfWeek)
            ->where('is_active', true)
            ->exists();

        if (!$hasWorkingPeriods) {
            return [
                'success' => false,
                'message' => 'Tidak ada jadwal kerja pada hari ini.',
                'has_bookings' => false,
            ];
        }

        // Check if full day time-off already exists
        $exists = DoctorTimeOff::where('doctor_id', $doctorId)
            ->where('date', $date)
            ->where('start_time', '00:00:00')
            ->where('end_time', '23:59:00')
            ->exists();

        if ($exists) {
            return [
                'success' => false,
                'message' => 'Jadwal sudah dikunci untuk hari ini.',
                'has_bookings' => false,
            ];
        }

        // Create single time-off entry for full day (00:00 to 23:59)
        $this->createTimeOff(
            $doctorId,
            $date,
            '00:00',
            '23:59',
            $note ?: 'Jadwal dikunci untuk seluruh hari'
        );

        return [
            'success' => true,
            'message' => 'Berhasil mengunci semua jadwal pada tanggal ini.',
            'has_bookings' => false,
        ];
    }

    /**
     * Unlock full-day schedule by removing the 00:00–23:59 time-off entry
     * Returns: ['success' => bool, 'message' => string]
     */
    public function unlockOneDaySchedule(int $doctorId, string $date): array
    {
        $deleted = DoctorTimeOff::where('doctor_id', $doctorId)
            ->whereDate('date', $date)
            ->where('start_time', '00:00:00')
            ->where('end_time', '23:59:00')
            ->delete();

        if (!$deleted) {
            return [
                'success' => false,
                'message' => 'Jadwal libur sehari tidak ditemukan untuk tanggal ini.',
            ];
        }

        return [
            'success' => true,
            'message' => 'Jadwal berhasil dibuka untuk seluruh hari.',
        ];
    }

    /**
     * Delete a time off entry
     */
    public function deleteTimeOff(int $timeOffId): bool
    {
        $timeOff = DoctorTimeOff::find($timeOffId);
        if ($timeOff) {
            return $timeOff->delete();
        }
        return false;
    }

    /**
     * Get all time offs for a doctor
     */
    public function getTimeOffs(int $doctorId): array
    {
        $timeOffs = DoctorTimeOff::where('doctor_id', $doctorId)
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        return $timeOffs->map(function ($timeOff) {
            return [
                'id' => $timeOff->id,
                'date' => $timeOff->date->format('Y-m-d'),
                'date_formatted' => $timeOff->date->translatedFormat('l, d M Y'),
                'start_time' => substr($timeOff->start_time, 0, 5),
                'end_time' => substr($timeOff->end_time, 0, 5),
                'note' => $timeOff->note,
            ];
        })->toArray();
    }

    /**
     * Unlock a schedule slot by deleting matching DoctorTimeOff entry
     */
    public function unlockSchedule(int $doctorId, string $date, string $startTime, string $endTime): bool
    {
        $deleted = DoctorTimeOff::where('doctor_id', $doctorId)
            ->whereDate('date', $date)
            ->where('start_time', $startTime)
            ->where('end_time', $endTime)
            ->delete();

        return $deleted > 0;
    }

    /**
     * Update doctor basic info
     */
    public function updateDoctor(int $doctorId, array $data): Doctor
    {
        $doctor = Doctor::findOrFail($doctorId);
        
        $doctor->update([
            'name' => $data['name'],
            'sip' => $data['sip'] ?? null,
            'experience' => $data['experience'],
            'is_active' => $data['is_active'],
        ]);

        return $doctor;
    }
    public function syncWorkingPeriods(int $doctorId, array $periods): void
    {
        if (empty($periods)) {
            return;
        }
        
        $doctor = Doctor::findOrFail($doctorId);
        
        // Map numbers to day names
        $dayNumberToName = [
            0 => 'Minggu',
            1 => 'Senin',
            2 => 'Selasa',
            3 => 'Rabu',
            4 => 'Kamis',
            5 => 'Jumat',
            6 => 'Sabtu',
        ];
        
        // Get existing period IDs
        $existingIds = $doctor->workingPeriods()->pluck('id')->toArray();
        $submittedIds = [];

        foreach ($periods as $periodData) {
            // Convert day number to name if it's numeric
            $dayValue = $periodData['day_of_week'];
            if (is_numeric($dayValue)) {
                $dayValue = $dayNumberToName[(int)$dayValue] ?? 'Senin';
            }
            
            if (!empty($periodData['id'])) {
                // Update existing period
                $period = DoctorWorkingPeriod::find($periodData['id']);
                if ($period && $period->doctor_id === $doctorId) {
                    $period->update([
                        'day_of_week' => $dayValue,
                        'start_time' => $periodData['start_time'],
                        'end_time' => $periodData['end_time'],
                        'is_active' => $periodData['is_active'],
                    ]);
                    $submittedIds[] = $periodData['id'];
                }
            } else {
                // Create new period
                $newPeriod = $doctor->workingPeriods()->create([
                    'day_of_week' => $dayValue,
                    'start_time' => $periodData['start_time'],
                    'end_time' => $periodData['end_time'],
                    'is_active' => $periodData['is_active'],
                ]);
                $submittedIds[] = $newPeriod->id;
            }
        }

        // Delete periods that were not submitted
        $idsToDelete = array_diff($existingIds, $submittedIds);
        if (!empty($idsToDelete)) {
            DoctorWorkingPeriod::whereIn('id', $idsToDelete)->delete();
        }
    }

    // ========================================
    // OVERTIME MANAGEMENT
    // ========================================

    /**
     * Get all overtimes for a doctor
     */
    public function getOvertimes(int $doctorId): array
    {
        $overtimes = DoctorOvertime::where('doctor_id', $doctorId)
            ->orderBy('date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        return $overtimes->map(function ($overtime) {
            return [
                'id' => $overtime->id,
                'date' => $overtime->date->format('Y-m-d'),
                'date_formatted' => $overtime->date->translatedFormat('l, d M Y'),
                'start_time' => substr($overtime->start_time, 0, 5),
                'end_time' => substr($overtime->end_time, 0, 5),
            ];
        })->toArray();
    }

    /**
     * Sync overtimes for a doctor (create, update, delete)
     */
    public function syncOvertimes(int $doctorId, array $overtimes): void
    {
        if (empty($overtimes)) {
            return;
        }

        $doctor = Doctor::findOrFail($doctorId);
        
        // Get existing overtime IDs
        $existingIds = $doctor->overtimes()->pluck('id')->toArray();
        $submittedIds = [];

        foreach ($overtimes as $overtimeData) {
            if (!empty($overtimeData['id'])) {
                // Update existing overtime
                $overtime = DoctorOvertime::find($overtimeData['id']);
                if ($overtime && $overtime->doctor_id === $doctorId) {
                    $overtime->update([
                        'date' => $overtimeData['date'],
                        'start_time' => $overtimeData['start_time'],
                        'end_time' => $overtimeData['end_time'],
                    ]);
                    $submittedIds[] = $overtimeData['id'];
                }
            } else {
                // Create new overtime
                $newOvertime = $doctor->overtimes()->create([
                    'date' => $overtimeData['date'],
                    'start_time' => $overtimeData['start_time'],
                    'end_time' => $overtimeData['end_time'],
                ]);
                $submittedIds[] = $newOvertime->id;
            }
        }

        // Delete overtimes that were not submitted
        $idsToDelete = array_diff($existingIds, $submittedIds);
        if (!empty($idsToDelete)) {
            DoctorOvertime::whereIn('id', $idsToDelete)->delete();
        }
    }
}
