<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDoctorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $doctorId = $this->route('doctorId');

        return [
            'name' => 'required|string|max:150',
            'sip' => 'nullable|string|max:64|unique:doctors,sip,' . $doctorId,
            'experience' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
            'working_periods' => 'nullable|array',
            'working_periods.*.id' => 'nullable|integer',
            'working_periods.*.day_of_week' => 'required|integer|min:0|max:6',
            'working_periods.*.start_time' => 'required|date_format:H:i',
            'working_periods.*.end_time' => 'required|date_format:H:i|after:working_periods.*.start_time',
            'working_periods.*.is_active' => 'required|boolean',
            'overtimes' => 'nullable|array',
            'overtimes.*.id' => 'nullable|integer',
            'overtimes.*.date' => 'required|date',
            'overtimes.*.start_time' => 'required|date_format:H:i',
            'overtimes.*.end_time' => 'required|date_format:H:i|after:overtimes.*.start_time',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Nama dokter wajib diisi.',
            'name.max' => 'Nama dokter maksimal 150 karakter.',
            'sip.unique' => 'Nomor SIP sudah terdaftar.',
            'sip.max' => 'Nomor SIP maksimal 64 karakter.',
            'experience.required' => 'Pengalaman wajib diisi.',
            'experience.integer' => 'Pengalaman harus berupa angka.',
            'experience.min' => 'Pengalaman minimal 0 tahun.',
            'is_active.required' => 'Status aktif wajib dipilih.',
            'working_periods.*.day_of_week.required' => 'Hari wajib dipilih.',
            'working_periods.*.start_time.required' => 'Jam mulai wajib diisi.',
            'working_periods.*.end_time.required' => 'Jam selesai wajib diisi.',
            'working_periods.*.end_time.after' => 'Jam selesai harus setelah jam mulai.',
        ];
    }
}
