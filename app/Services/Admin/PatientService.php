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
        // Get unique patients by NIK with their latest info and visit count
        $patients = Patient::select(
            'patient_nik',
            DB::raw('MAX(patient_name) as patient_name'),
            DB::raw('MAX(patient_phone) as patient_phone'),
            DB::raw('MAX(patient_email) as patient_email'),
            DB::raw('COUNT(*) as total_visits'),
            DB::raw('MIN(created_at) as first_visit'),
            DB::raw('MAX(created_at) as last_visit')
        )
            ->groupBy('patient_nik')
            ->orderBy('last_visit', 'desc')
            ->get();

        return $patients->map(function ($patient) {
            return [
                'nik' => $patient->patient_nik,
                'name' => $patient->patient_name,
                'phone' => $patient->patient_phone,
                'email' => $patient->patient_email ?? '-',
                'total_visits' => $patient->total_visits,
                'first_visit' => Carbon::parse($patient->first_visit)->format('Y-m-d H:i:s'),
                'first_visit_formatted' => Carbon::parse($patient->first_visit)->translatedFormat('d M Y'),
                'last_visit' => Carbon::parse($patient->last_visit)->format('Y-m-d H:i:s'),
                'last_visit_formatted' => Carbon::parse($patient->last_visit)->translatedFormat('d M Y'),
            ];
        })->toArray();
    }
}
