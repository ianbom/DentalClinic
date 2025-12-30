<?php

namespace App\Http\Controllers\Patients;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBookingRequest;
use App\Models\Booking;
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
    
        return Inertia::render('patient/booking/BookingDoctor', [
            'doctor' => $doctor,
            'availableSlots' => $availableSlots,
        ]);
    }

    public function bookingPatientDataPage($doctorId)
    {
        $doctor = Doctor::with('workingPeriods')->findOrFail($doctorId);
        return Inertia::render('patient/booking/BookingCustomerData', ['doctor' => $doctor]);
    }

    public function bookingPatientReviewPage($doctorId)
    {
        $doctor = Doctor::with('workingPeriods')->findOrFail($doctorId);
        return Inertia::render('patient/booking/BookingReview', ['doctor' => $doctor]);
    }

    public function createBooking(CreateBookingRequest $request)
    {
        try {
            // return response()->json($request->all());
            $booking = $this->bookingService->createBooking($request->validated());
            
            return redirect()
                ->route('booking.success', ['code' => $booking->code])
                ->with('success', 'Booking berhasil dibuat!');
                
        } catch (\Exception $e) {
            // return response()->json(['err' => $e->getMessage()]);
            return back()
                ->withErrors(['slot' => $e->getMessage()])
                ->withInput();
        }
    }

    public function bookingSuccessPage($code)
    {
        $booking = Booking::with(['doctor', 'patientDetail'])
            ->where('code', $code)
            ->firstOrFail();

        return Inertia::render('patient/booking/BookingSuccess', [
            'booking' => $booking,
        ]);
    }

    public function checkBookingPage()
    {
        return Inertia::render('patient/check-booking/CheckBooking');
    }

    public function checkBooking(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'phone' => 'required|string',
        ]);

        $booking = Booking::with(['doctor', 'patientDetail'])
            ->where('code', $request->code)
            ->whereHas('patientDetail', function ($query) use ($request) {
                $query->where('patient_phone', $request->phone);
            })
            ->first();

        if (!$booking) {
            return back()->withErrors([
                'booking' => 'Booking tidak ditemukan. Pastikan kode booking dan nomor WhatsApp sudah benar.',
            ]);
        }

        return Inertia::render('patient/check-booking/CheckBooking', [
            'booking' => $booking,
        ]);
    }
}
