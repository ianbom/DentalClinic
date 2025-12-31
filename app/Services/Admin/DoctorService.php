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
}
