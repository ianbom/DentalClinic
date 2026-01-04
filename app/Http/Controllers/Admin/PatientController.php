<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Services\Admin\PatientService;
use Inertia\Inertia;

class PatientController extends Controller
{
    protected PatientService $patientService;

    public function __construct(PatientService $patientService)
    {
        $this->patientService = $patientService;
    }

    public function listPatients(\Illuminate\Http\Request $request)
    {
        $filters = $request->only([
            'search',
            'gender',
            'per_page',
            'sort_field',
            'sort_order',
        ]);

        $patients = $this->patientService->getPatients($filters);

        return Inertia::render('admin/patients/ListPatient', [
            'patients' => $patients,
            'filters' => $filters,
        ]);
    }

    public function showPatient($patientId)
    {
        $patient = Patient::with(['bookings.doctor'])
            ->findOrFail($patientId);

        $bookings = $patient->bookings->map(function ($booking) use ($patient) {
            return [
                'id' => $booking->id,
                'code' => $booking->code,
                'patient_name' => $patient->patient_name ?? '-',
                'patient_phone' => $patient->patient_phone ?? '-',
                'patient_nik' => $patient->patient_nik ?? '-',
                'patient_email' => $patient->patient_email ?? '-',
                'service' => $booking->service ?? '-',
                'doctor_name' => $booking->doctor->name ?? '-',
                'booking_date' => $booking->booking_date->format('Y-m-d'),
                'booking_date_formatted' => $booking->booking_date->translatedFormat('d M Y'),
                'start_time' => $booking->start_time ? substr($booking->start_time, 0, 5) : '-',
                'status' => $booking->status,
                'payment_status' => $booking->payment_status ?? 'pending',
                'created_at' => $booking->created_at->toIso8601String(),
                'created_at_formatted' => $booking->created_at->translatedFormat('d M Y H:i'),
            ];
        });

        // Get unique doctors from bookings for filter
        $doctors = $patient->bookings
            ->whereNotNull('doctor')
            ->pluck('doctor')
            ->unique('id')
            ->map(function ($doctor) {
                return [
                    'id' => $doctor->id,
                    'name' => $doctor->name,
                ];
            })
            ->values()
            ->toArray();

        return Inertia::render('admin/patients/DetailPatient', [
            'patient' => $patient,
            'bookings' => $bookings,
            'doctors' => $doctors,
            'total_visits' => $patient->bookings->count(),
        ]);
    }
}
