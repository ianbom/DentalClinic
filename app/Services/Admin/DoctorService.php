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
}
