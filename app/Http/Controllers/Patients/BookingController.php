<?php

namespace App\Http\Controllers\Patients;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateBookingRequest;
use App\Models\Booking;
use App\Models\Patient;
use App\Models\Doctor;
use App\Services\BookingService;
use App\Services\WhatsappService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BookingController extends Controller
{
    protected BookingService $bookingService;
    protected WhatsappService $whatsappService;


    public function __construct(BookingService $bookingService, WhatsappService $whatsappService)
    {
        $this->bookingService = $bookingService;
        $this->whatsappService = $whatsappService;
     
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

    public function verifyWhatsapp(Request $request){
           try {
            $this->whatsappService->sendCheckWa($request->patient_phone);
            return redirect()->back()->with('success', 'Pesan otomatis berhasil dikirim');
           } catch (\Throwable $th) {
            Log::error($th->getMessage());
            return redirect()->back()->with('error', $th->getMessage());
           }
    }

    public function checkNik(Request $request)
    {
        $request->validate([
            'nik' => 'required|string|max:32',
        ]);

        $patient = Patient::where('patient_nik', $request->nik)->first();

        if ($patient) {
            return redirect()->back()->with('nikCheck', [
                'found' => true,
                'patient' => [
                    'patient_name' => $patient->patient_name,
                    'patient_email' => $patient->patient_email,
                    'patient_phone' => $patient->patient_phone,
                    'patient_birthdate' => $patient->patient_birthdate?->format('Y-m-d'),
                    'patient_address' => $patient->patient_address,
                ],
            ]);
        }

        return redirect()->back()->with('nikCheck', [
            'found' => false,
            'patient' => null,
        ]);
    }

    public function createBooking(CreateBookingRequest $request)
    {
        try {
            // Create booking
            $booking = $this->bookingService->createBooking($request->validated());
            $this->bookingService->sendBookingConfirmation($booking->id, $booking->patient->patient_phone);
            $this->bookingService->scheduleReminderNotification($booking->id);

            return redirect()
                ->route('booking.success', ['code' => $booking->code])
                ->with('success', 'Booking berhasil dibuat!');
                
        } catch (\Exception $e) {
            return back()
                ->withErrors(['slot' => $e->getMessage()])
                ->withInput();
        }
    }

    public function bookingSuccessPage($code)
    {
        $booking = Booking::with(['doctor', 'patient'])
            ->where('code', $code)
            ->firstOrFail();

        return Inertia::render('patient/booking/BookingSuccess', [
            'booking' => $booking,
        ]);
    }



    public function checkBookingPage(Request $request)
    {
        $booking = null;

        // If code and phone are provided, search for booking
        if ($request->filled('code') && $request->filled('phone')) {
            $booking = Booking::with(['doctor', 'patient'])
                ->where('code', $request->code)
                ->whereHas('patient', function ($query) use ($request) {
                    $query->where('patient_phone', $request->phone);
                })
                ->first();

            if (!$booking) {
                return Inertia::render('patient/check-booking/CheckBooking', [
                    'booking' => null,
                ])->withViewData('errors', [
                    'booking' => 'Booking tidak ditemukan. Pastikan kode booking dan nomor WhatsApp sudah benar.',
                ]);
            }
        }

        return Inertia::render('patient/check-booking/CheckBooking', [
            'booking' => $booking,
        ]);
    }

    public function checkinBooking(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        try {
            $booking = $this->bookingService->checkinBooking($request->code);

            return back()->with([
                'success' => 'Check-in berhasil! Silakan menunggu panggilan.',
                'booking' => $booking,
            ]);
        } catch (\Exception $e) {
            // return response()->json(['err' => $e->getMessage()]);
            return back()->withErrors([
                'checkin' => $e->getMessage(),
            ]);
        }
    }
}

