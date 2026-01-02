<?php

namespace App\Services\Admin;

use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PatientService
{
    /**
     * Get all patients with unique NIK and total visit count
     */
    public function getAllPatients(): array
    {
        $patients = Patient::withCount('bookings')
            ->orderBy('created_at', 'desc')
            ->get();

        return $patients->map(function ($patient) {
            // Get first and last booking dates
            $firstBooking = $patient->bookings()->orderBy('created_at', 'asc')->first();
            $lastBooking = $patient->bookings()->orderBy('created_at', 'desc')->first();

            return [
                'id' => $patient->id,
                'nik' => $patient->patient_nik,
                'name' => $patient->patient_name,
                'phone' => $patient->patient_phone,
                'email' => $patient->patient_email ?? '-',
                'total_visits' => $patient->bookings_count,
                'first_visit' => $firstBooking ? $firstBooking->created_at->format('Y-m-d H:i:s') : null,
                'first_visit_formatted' => $firstBooking ? $firstBooking->created_at->translatedFormat('d M Y') : '-',
                'last_visit' => $lastBooking ? $lastBooking->created_at->format('Y-m-d H:i:s') : null,
                'last_visit_formatted' => $lastBooking ? $lastBooking->created_at->translatedFormat('d M Y') : '-',
            ];
        })->toArray();
    }
}
