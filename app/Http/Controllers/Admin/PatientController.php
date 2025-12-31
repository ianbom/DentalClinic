<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\PatientService;
use Inertia\Inertia;

class PatientController extends Controller
{
    protected PatientService $patientService;

    public function __construct(PatientService $patientService)
    {
        $this->patientService = $patientService;
    }

    public function listPatients()
    {
        $patients = $this->patientService->getAllPatients();

        return Inertia::render('admin/patients/ListPatient', [
            'patients' => $patients,
        ]);
    }
}
