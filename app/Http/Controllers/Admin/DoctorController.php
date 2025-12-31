<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\DoctorService;
use Inertia\Inertia;

class DoctorController extends Controller
{
    protected DoctorService $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    public function listDoctors()
    {
        $doctors = $this->doctorService->getAllDoctors();

        return Inertia::render('admin/doctors/ListDoctor', [
            'doctors' => $doctors,
        ]);
    }

    public function show(int $doctorId)
    {
        $doctor = $this->doctorService->getDoctorById($doctorId);

        if (!$doctor) {
            abort(404, 'Dokter tidak ditemukan');
        }
        return Inertia::render('admin/doctors/DetailDoctor', [
            'doctor' => $doctor,
        ]);
    }
}
