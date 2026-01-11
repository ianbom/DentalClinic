<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CreateOvertimeRequest extends FormRequest
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
     */
    public function rules(): array
    {
        return [
            'doctor_id' => 'required|exists:doctors,id',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'doctor_id.required' => 'Dokter harus dipilih.',
            'doctor_id.exists' => 'Dokter tidak ditemukan.',
            'date.required' => 'Tanggal harus diisi.',
            'date.date' => 'Format tanggal tidak valid.',
            'date.after_or_equal' => 'Tanggal harus hari ini atau setelahnya.',
            'start_time.required' => 'Jam mulai harus diisi.',
            'start_time.date_format' => 'Format jam mulai tidak valid (HH:MM).',
            'end_time.required' => 'Jam selesai harus diisi.',
            'end_time.date_format' => 'Format jam selesai tidak valid (HH:MM).',
            'end_time.after' => 'Jam selesai harus setelah jam mulai.',
        ];
    }
}
