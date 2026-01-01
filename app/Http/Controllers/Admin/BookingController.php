<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateBookingRequest;
use App\Http\Requests\Admin\UpdateBookingRequest;
use App\Models\Booking;
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
            return redirect()
                ->back()
                ->with('error', 'Booking gagal dibuat: ' . $th->getMessage());
        }
    }

    public function rescheduleBooking(Request $request, int $bookingId)
    {
        $booking = Booking::with(['patient', 'doctor'])->find($bookingId);

        if (!$booking) {
            abort(404, 'Booking tidak ditemukan');
        }

        $doctorId = $request->query('doctor_id', $booking->doctor_id);
        $allDoctors = Doctor::where('is_active', true)->orderBy('name')->get();
        
        $doctor = Doctor::find($doctorId);
        $availableSlots = [];
        
        if ($doctor) {
            $availableSlots = $this->patientBookingService->getAvailableSlotsForDoctor($doctorId, 30);
        }

        return Inertia::render('admin/bookings/RescheduleBooking', [
            'booking' => [
                'id' => $booking->id,
                'code' => $booking->code,
                'service' => $booking->service,
                'type' => $booking->type,
                'booking_date' => $booking->booking_date->format('Y-m-d'),
                'booking_date_formatted' => $booking->booking_date->translatedFormat('l, d F Y'),
                'start_time' => $booking->start_time,
                'status' => $booking->status,
                'created_at_formatted' => $booking->created_at->format('d M Y H:i'),
                'patient' => [
                    'id' => $booking->patient->id,
                    'name' => $booking->patient->patient_name,
                    'nik' => $booking->patient->patient_nik,
                    'phone' => $booking->patient->patient_phone,
                    'email' => $booking->patient->patient_email,
                    'birthdate' => $booking->patient->patient_birthdate?->format('Y-m-d'),
                    'address' => $booking->patient->patient_address,
                ],
                'doctor' => [
                    'id' => $booking->doctor->id,
                    'name' => $booking->doctor->name,
                ],
            ],
            'availableSlots' => $availableSlots,
            'allDoctors' => $allDoctors,
            'doctor' => $doctor,
            'selectedDoctorId' => (int) $doctorId,
        ]);
    }

    public function updateBooking(UpdateBookingRequest $request, int $bookingId)
    {
        try {
            $validated = $request->validated();

            $this->patientBookingService->rescheduleBooking($bookingId, $validated);

            return redirect()
                ->route('admin.bookings.list')
                ->with('success', 'Booking berhasil direschedule');
        } catch (\Throwable $th) {
            return redirect()
                ->back()
                ->with('error', 'Reschedule gagal: ' . $th->getMessage());
        }
    }
}
