<?php

namespace App\Http\Controllers\Patients;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Services\BookingService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    protected BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function bookingDoctorPage($doctorId)
    {
        $doctor = Doctor::with('workingPeriods')->findOrFail($doctorId);
        $availableSlots = $this->bookingService->getAvailableSlotsForDoctor($doctorId, 30);
        // $timeOff = $doctor->timeOff;
        // return response()->json(['timeOff' => $timeOff, 'availableSlots' => $availableSlots]);
    
        return Inertia::render('patient/booking/BookingDoctor', [
            'doctor' => $doctor,
            'availableSlots' => $availableSlots,
        ]);
    }

    public function bookingPatientDataPage($doctorId)
    {   $doctor = Doctor::with('workingPeriods')->findOrFail($doctorId);
        return Inertia::render('patient/booking/BookingCustomerData', ['doctor' => $doctor]);
    }

    public function bookingPatientReviewPage($doctorId)
    {   $doctor = Doctor::with('workingPeriods')->findOrFail($doctorId);
        return Inertia::render('patient/booking/BookingReview', ['doctor' => $doctor]);
    }
}
