<?php

namespace App\Services\Admin;

use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PatientService
{
    /**
     * Get all patients with unique NIK and total visit count
     */
    public function getPatients(array $filters = [])
    {
        $query = Patient::withCount('bookings');

        // Search
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('patient_name', 'like', "%{$search}%")
                  ->orWhere('patient_nik', 'like', "%{$search}%")
                  ->orWhere('patient_phone', 'like', "%{$search}%")
                  ->orWhere('medical_records', 'like', "%{$search}%")
                  ->orWhere('patient_address', 'like', "%{$search}%");
            });
        }

        // Filter by Gender
        if (!empty($filters['gender'])) {
            $query->where('gender', $filters['gender']);
        }

        // Sorting
        $sortField = $filters['sort_field'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';

        if ($sortField === 'name') {
            $query->orderBy('patient_name', $sortOrder);
        } elseif ($sortField === 'medical_records') {
            $query->orderBy('medical_records', $sortOrder);
        } elseif ($sortField === 'total_visits') {
            $query->orderBy('bookings_count', $sortOrder);
        } elseif ($sortField === 'last_visit') {
            // Sort by latest booking date using subquery
            $query->orderBy(
                \App\Models\Booking::select('created_at')
                    ->whereColumn('patient_id', 'patients.id')
                    ->latest()
                    ->limit(1),
                $sortOrder
            );
        } else {
            // Default to created_at or whatever field matches column name
            // If sortField is 'created_at' (Daftar pada)
            if (\Schema::hasColumn('patients', $sortField)) {
                $query->orderBy($sortField, $sortOrder);
            } else {
                $query->orderBy('created_at', 'desc');
            }
        }

        $perPage = $filters['per_page'] ?? 10;
        
        $patients = $query->paginate($perPage);

        return $patients->through(function ($patient) {
            // Optimizing: we don't need to fetch all bookings just for first/last if we sort/query smartly
            // But for now, lazy loading on single item is acceptable for page size 10-100
            $firstBooking = $patient->bookings()->oldest()->first();
            $lastBooking = $patient->bookings()->latest()->first();

            return [
                'id' => $patient->id,
                'medical_records' => $patient->medical_records,
                'nik' => $patient->patient_nik,
                'name' => $patient->patient_name,
                'phone' => $patient->patient_phone,
                'email' => $patient->patient_email ?? '-',
                'gender' => $patient->gender,
                'address' => $patient->patient_address,
                'total_visits' => $patient->bookings_count,
                'first_visit' => $firstBooking ? $firstBooking->created_at->format('Y-m-d H:i:s') : null,
                'first_visit_formatted' => $firstBooking ? $firstBooking->created_at->translatedFormat('d M Y') : '-',
                'last_visit' => $lastBooking ? $lastBooking->created_at->format('Y-m-d H:i:s') : null,
                'last_visit_formatted' => $lastBooking ? $lastBooking->created_at->translatedFormat('d M Y') : '-',
                'created_at' => $patient->created_at->format('Y-m-d H:i:s'),
                'created_at_formatted' => $patient->created_at->translatedFormat('d F Y'),
            ];
        });
    }

    /**
     * Create a new patient
     */
    public function createPatient(array $data)
    {
        return Patient::create([
            'medical_records' => $data['medical_records'] ?? null,
            'patient_nik' => $data['patient_nik'],
            'patient_name' => $data['patient_name'],
            'patient_phone' => $data['patient_phone'],
            'patient_email' => $data['patient_email'] ?? null,
            'patient_birthdate' => $data['patient_birthdate'],
            'gender' => $data['gender'],
            'patient_address' => $data['patient_address'],
        ]);
    }
}
