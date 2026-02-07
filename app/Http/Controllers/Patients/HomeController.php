<?php

namespace App\Http\Controllers\Patients;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function aboutPage(){ 
        $doctors = Doctor::with('workingPeriods')->get();

        return Inertia::render('patient/about/About', [
            'doctors' => $doctors,
        ]);
    }
}
