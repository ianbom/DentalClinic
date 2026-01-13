<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DoctorOvertime;
use App\Services\Admin\DoctorService;
use Illuminate\Http\Request;

class DoctorOvertimeController extends Controller
{
    protected DoctorService $doctorService;

    public function __construct(DoctorService $doctorService)
    {
        $this->doctorService = $doctorService;
    }

    /**
     * Store a new overtime entry
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $overtime = DoctorOvertime::create($validated);

        return back()->with('success', 'Overtime berhasil ditambahkan.');
    }

    /**
     * Update an existing overtime entry
     */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $overtime = DoctorOvertime::findOrFail($id);
        $overtime->update($validated);

        return back()->with('success', 'Overtime berhasil diperbarui.');
    }

    /**
     * Delete an overtime entry
     */
    public function destroy(int $id)
    {
        $overtime = DoctorOvertime::find($id);
        
        if ($overtime) {
            $overtime->delete();
            return back()->with('success', 'Overtime berhasil dihapus.');
        }

        return back()->with('error', 'Overtime tidak ditemukan.');
    }
}
