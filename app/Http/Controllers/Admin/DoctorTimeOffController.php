<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DoctorTimeOff;
use App\Services\Admin\DoctorService;
use Illuminate\Http\Request;

class DoctorTimeOffController extends Controller
{
    protected DoctorService $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    /**
     * Store a new time off entry
     */
    public function store(Request $request)
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
            $validated['note'] ?? null
        );

        return back()->with('success', 'Time off berhasil ditambahkan.');
    }

    /**
     * Update an existing time off entry
     */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'note' => 'nullable|string|max:255',
        ]);

        $timeOff = DoctorTimeOff::findOrFail($id);
        $timeOff->update($validated);

        return back()->with('success', 'Time off berhasil diperbarui.');
    }

    /**
     * Delete a time off entry
     */
    public function destroy(int $id)
    {
        $deleted = $this->doctorService->deleteTimeOff($id);

        if ($deleted) {
            return back()->with('success', 'Time off berhasil dihapus.');
        }

        return back()->with('error', 'Time off tidak ditemukan.');
    }
}
