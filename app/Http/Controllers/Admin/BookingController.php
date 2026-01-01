<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateBookingRequest;
use App\Models\Doctor;
use App\Services\Admin\BookingService;
use App\Services\BookingService as PatientBookingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    protected BookingService $bookingService;
    protected PatientBookingService $patientBookingService;

    public function __construct(BookingService $bookingService, PatientBookingService $patientBookingService)
    {
        $this->bookingService = $bookingService;
        $this->patientBookingService = $patientBookingService;
    }

    public function listBooking()
    {
        $bookings = $this->bookingService->getAllBookings();
        
        $doctors = Doctor::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('admin/bookings/ListBooking', [
            'bookings' => $bookings,
            'doctors' => $doctors,
        ]);
    }

    public function bookingDetail(int $bookingId)
    {
        $booking = $this->bookingService->getBookingDetail($bookingId);

        if (!$booking) {
            abort(404, 'Booking tidak ditemukan');
        }

        return Inertia::render('admin/bookings/DetailBooking', [
            'booking' => $booking,
        ]);
    }

    public function createBooking(Request $request)
    {   
        $doctorId = $request->query('doctor_id');
        $allDoctors = Doctor::where('is_active', true)->orderBy('name')->get();
        
        $doctor = null;
        $availableSlots = [];
        
        if ($doctorId) {
            $doctor = Doctor::find($doctorId);
            if ($doctor) {
                $availableSlots = $this->patientBookingService->getAvailableSlotsForDoctor($doctorId, 30);
            }
        }

        return Inertia::render('admin/bookings/CreateBooking', [
            'availableSlots' => $availableSlots,
            'allDoctors' => $allDoctors,
            'doctor' => $doctor,
            'selectedDoctorId' => $doctorId ? (int) $doctorId : null,
        ]);
    }

    public function storeBooking(CreateBookingRequest $request)
    { 
        try {
            $data = $request->all();
            $booking = $this->patientBookingService->createBooking($data);
            $this->patientBookingService->sendBookingConfirmation($booking->id, $booking->patient->patient_phone);
            $this->patientBookingService->scheduleReminderNotification($booking->id);
            
            return redirect()
                ->route('admin.bookings.list')
                ->with('success', 'Booking berhasil dibuat');
        } catch (\Throwable $th) {
            return response()->json(['err' => $th->getMessage()]);
            return redirect()
                ->back()
                ->with('error', 'Booking gagal dibuat: ' . $th->getMessage());
        }
    }
}

