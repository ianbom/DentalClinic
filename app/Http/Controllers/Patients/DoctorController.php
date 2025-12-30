<?php

namespace App\Http\Controllers\Patients;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    public function listDoctors(){ 
        $doctors = Doctor::with('workingPeriods')->get();

        return Inertia::render('patient/doctors/ListDoctor', [
            'doctors' => $doctors,
        ]);
    }

    public function detailDoctor($doctorId){ 
        $doctor = Doctor::with('workingPeriods')->find($doctorId);
        return Inertia::render('patient/doctors/DetailDoctor',[
            'doctor' => $doctor
        ]);
    }

}
