<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateBookingRequest;
use App\Http\Requests\Admin\UpdateBookingFullRequest;
use App\Http\Requests\Admin\UpdateBookingRequest;
use App\Models\Booking;
use App\Models\Doctor;
use App\Models\Notification;
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

    public function listBooking(Request $request)
    {
        $filters = $request->only([
            'search', 
            'status', 
            'date', 
            'doctor', 
            'per_page',
            'sort_field',
            'sort_order'
        ]);

        $bookings = $this->bookingService->getBookings($filters);
        
        $doctors = Doctor::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('admin/bookings/ListBooking', [
            'bookings' => $bookings,
            'doctors' => $doctors,
            'filters' => $filters,
        ]);
    }

    public function bookingDetail(int $bookingId)
    {
        $booking = $this->bookingService->getBookingDetail($bookingId);
        $notifications = Notification::where('booking_id', $bookingId)
            ->orderBy('created_at', 'desc')
            ->get();
        if (!$booking) {
            abort(404, 'Booking tidak ditemukan');
        }

        return Inertia::render('admin/bookings/DetailBooking', [
            'booking' => $booking,
            'notifications' => $notifications
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

    public function checkinPatientPage(Request $request){
        $bookingCode = $request->query('bookingCode'); 
        $booking = null; 
        
        if ($bookingCode) {
            $booking = Booking::with(['patient', 'doctor'])
                ->where('code', $bookingCode)
                ->first();
            
            if ($booking) {
                $booking = [
                    'id' => $booking->id,
                    'code' => $booking->code,
                    'status' => $booking->status,
                    'service' => $booking->service,
                    'booking_date' => $booking->booking_date->format('Y-m-d'),
                    'booking_date_formatted' => $booking->booking_date->translatedFormat('l, d F Y'),
                    'start_time' => $booking->start_time,
                    'patient' => [
                        'name' => $booking->patient->patient_name,
                        'nik' => $booking->patient->patient_nik,
                        'phone' => $booking->patient->patient_phone,
                        'email' => $booking->patient->patient_email,
                    ],
                    'doctor' => [
                        'id' => $booking->doctor->id,
                        'name' => $booking->doctor->name,
                        'sip' => $booking->doctor->sip,
                    ],
                ];
            }
        }
        
        return Inertia::render('admin/patients/CheckinPatient', [
            'booking' => $booking,
            'searchCode' => $bookingCode,
        ]);
    }

    public function performCheckin(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        try {
            $booking = $this->patientBookingService->checkinBooking($request->code, true);

            return redirect()
                ->route('admin.checkin')
                ->with('success', 'Check-in berhasil! Pasien ' . $booking->patient->patient_name . ' sudah terdaftar.');
        } catch (\Throwable $th) {
            return redirect()
                ->back()
                ->with('error', $th->getMessage());
        }
    }

    public function storePayment(Request $request, int $bookingId)
    {
        $request->validate([
            'amount' => 'required|integer|min:0',
            'payment_method' => 'required|string|max:100',
            'note' => 'nullable|string',
        ]);

        try {
            $booking = Booking::findOrFail($bookingId);
            
            \App\Models\BookingPayment::updateOrCreate(
                ['booking_id' => $bookingId],
                [
                    'amount' => $request->amount,
                    'payment_method' => $request->payment_method,
                    'note' => $request->note ?? '',
                ]
            );

            return redirect()
                ->back()
                ->with('success', 'Pembayaran berhasil disimpan untuk booking ' . $booking->code);
        } catch (\Throwable $th) {
            return redirect()
                ->back()
                ->with('error', 'Gagal menyimpan pembayaran: ' . $th->getMessage());
        }
    }

    public function editBooking(Request $request, int $bookingId)
    {
        $booking = Booking::with(['patient', 'doctor', 'payment', 'checkin', 'cancellation'])->find($bookingId);

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

        return Inertia::render('admin/bookings/EditBooking', [
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
                    'gender' => $booking->patient->gender,
                    'medical_records' => $booking->patient->medical_records,
                ],
                'doctor' => [
                    'id' => $booking->doctor->id,
                    'name' => $booking->doctor->name,
                ],
                'payment' => $booking->payment ? [
                    'amount' => $booking->payment->amount,
                    'payment_method' => $booking->payment->payment_method,
                    'note' => $booking->payment->note,
                ] : null,
                'checkin' => $booking->checkin ? [
                    'checked_in_at' => $booking->checkin->checked_in_at->format('Y-m-d\TH:i'),
                ] : null,
                'cancellation' => $booking->cancellation ? [
                    'cancelled_at' => $booking->cancellation->cancelled_at->format('Y-m-d\TH:i'),
                    'cancelled_by' => $booking->cancellation->cancelled_by,
                    'reason' => $booking->cancellation->reason,
                ] : null,
            ],
            'availableSlots' => $availableSlots,
            'allDoctors' => $allDoctors,
            'doctor' => $doctor,
            'selectedDoctorId' => (int) $doctorId,
        ]);
    }

    public function updateBookingFull(UpdateBookingFullRequest $request, int $bookingId)
    {
        try {
            $this->bookingService->updateBookingFull($bookingId, $request->validated());

            return redirect()
                ->route('admin.bookings.detail', $bookingId)
                ->with('success', 'Booking berhasil diperbarui');
        } catch (\Throwable $th) {
            return redirect()
                ->back()
                ->with('error', 'Gagal memperbarui booking: ' . $th->getMessage());
        }
    }
}
