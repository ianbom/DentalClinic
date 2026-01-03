<?php

namespace App\Services\Admin;

use App\Models\Doctor;
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
                $query->where('status', 'completed');
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
     * Delete a time off entry
     */
    public function deleteTimeOff(int $timeOffId): bool
    {
        $timeOff = \App\Models\DoctorTimeOff::find($timeOffId);
        if ($timeOff) {
            return $timeOff->delete();
        }
        return false;
    }
}

