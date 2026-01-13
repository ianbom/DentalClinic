<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CreateOvertimeRequest;
use App\Http\Requests\Admin\UpdateDoctorRequest;
use App\Http\Requests\Admin\UpdateOvertimeRequest;
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

    public function unlockDoctorSchedule(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i',
        ]);

        $deleted = $this->doctorService->unlockSchedule(
            $validated['doctor_id'],
            $validated['date'],
            $validated['start_time'],
            $validated['end_time']
        );

        if ($deleted) {
            return back()->with('success', 'Jadwal berhasil dibuka');
        }

        return back()->with('error', 'Jadwal tidak ditemukan');
    }

    public function edit($doctorId)
    {
        $doctor = Doctor::with(['workingPeriods', 'overtimes'])->findOrFail($doctorId);

        // Map day names to numbers
        $dayNameToNumber = [
            'Minggu' => 0,
            'Senin' => 1,
            'Selasa' => 2,
            'Rabu' => 3,
            'Kamis' => 4,
            'Jumat' => 5,
            'Sabtu' => 6,
        ];

        // Format working periods for frontend
        $workingPeriods = $doctor->workingPeriods->map(function ($period) use ($dayNameToNumber) {
            $dayNumber = is_numeric($period->day_of_week) 
                ? (int) $period->day_of_week 
                : ($dayNameToNumber[$period->day_of_week] ?? 1);
            
            return [
                'id' => $period->id,
                'day_of_week' => $dayNumber,
                'start_time' => substr($period->start_time, 0, 5),
                'end_time' => substr($period->end_time, 0, 5),
                'is_active' => $period->is_active,
            ];
        })->toArray();

        // Format overtimes for frontend
        $overtimes = $this->doctorService->getOvertimes($doctorId);

        return Inertia::render('admin/doctors/EditDoctor', [
            'doctor' => [
                'id' => $doctor->id,
                'name' => $doctor->name,
                'sip' => $doctor->sip,
                'experience' => $doctor->experience,
                'profile_pic' => $doctor->profile_pic,
                'is_active' => $doctor->is_active,
            ],
            'workingPeriods' => $workingPeriods,
            'overtimes' => $overtimes,
        ]);
    }

    public function update($doctorId, UpdateDoctorRequest $request)
    {
        try {
            $validated = $request->validated();

            $this->doctorService->updateDoctor($doctorId, $validated);
            
            // Always call sync methods - use input() to ensure we get the array even if empty
            // This prevents data loss when arrays are stripped from validated()
            $workingPeriods = $request->input('working_periods', []);
            $overtimes = $request->input('overtimes', []);
            
            $this->doctorService->syncWorkingPeriods($doctorId, $workingPeriods);
            $this->doctorService->syncOvertimes($doctorId, $overtimes);

            return redirect()->route('admin.doctors.show', $doctorId)
                ->with('success', 'Data dokter berhasil diperbarui.');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', $th->getMessage());
        }
    }
}

