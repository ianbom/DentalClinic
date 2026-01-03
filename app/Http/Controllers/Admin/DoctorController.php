<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Services\Admin\DoctorService;
use App\Services\BookingService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DoctorController extends Controller
{
    protected DoctorService $doctorService;
    protected BookingService $bookingService;

    public function __construct(DoctorService $doctorService, BookingService $bookingService)
    {
        $this->doctorService = $doctorService;
        $this->bookingService = $bookingService;
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

    public function schedule($doctorId)
    {   
        $allDoctors = Doctor::all();
        $doctor = Doctor::with('workingPeriods')->findOrFail($doctorId);
        $availableSlots = $this->bookingService->getAvailableSlotsForDoctor($doctorId, 30);

        return Inertia::render('admin/doctors/ScheduleDoctor', [
            'doctor' => $doctor,
            'availableSlots' => $availableSlots,
            'allDoctors' => $allDoctors
        ]);
    }

    public function lockDoctorSchedule(Request $request)
    { 
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'note' => 'nullable|string|max:255',
        ]);

        $timeOff = $this->doctorService->createTimeOff(
            $validated['doctor_id'],
            $validated['date'],
            $validated['start_time'],
            $validated['end_time'],
            $validated['note'] ?? 'Locked from schedule'
        );

        return back()->with('success', 'Jadwal berhasil dikunci');
    }
}
