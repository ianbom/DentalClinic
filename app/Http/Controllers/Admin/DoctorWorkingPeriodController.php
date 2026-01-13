<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DoctorWorkingPeriod;
use App\Services\Admin\DoctorService;
use Illuminate\Http\Request;

class DoctorWorkingPeriodController extends Controller
{
    protected DoctorService $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    /**
     * Store a new working period
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'day_of_week' => 'required|integer|min:0|max:6',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'is_active' => 'boolean',
        ]);

        // Map day number to name for storage
        $dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $validated['day_of_week'] = $dayNames[$validated['day_of_week']] ?? 'Senin';
        $validated['is_active'] = $validated['is_active'] ?? true;

        DoctorWorkingPeriod::create($validated);

        return back()->with('success', 'Jadwal kerja berhasil ditambahkan.');
    }

    /**
     * Update an existing working period
     */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'day_of_week' => 'required|integer|min:0|max:6',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'is_active' => 'boolean',
        ]);

        // Map day number to name for storage
        $dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $validated['day_of_week'] = $dayNames[$validated['day_of_week']] ?? 'Senin';

        $workingPeriod = DoctorWorkingPeriod::findOrFail($id);
        $workingPeriod->update($validated);

        return back()->with('success', 'Jadwal kerja berhasil diperbarui.');
    }

    /**
     * Delete a working period
     */
    public function destroy(int $id)
    {
        $workingPeriod = DoctorWorkingPeriod::find($id);
        
        if ($workingPeriod) {
            $workingPeriod->delete();
            return back()->with('success', 'Jadwal kerja berhasil dihapus.');
        }

        return back()->with('error', 'Jadwal kerja tidak ditemukan.');
    }
}
