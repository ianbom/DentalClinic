<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBookingRequest extends FormRequest
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
        return [
            // Booking info
            'doctor_id' => 'required|exists:doctors,id',
            'booking_date' => 'required',
            'start_time' => 'required',
            'service' => 'required|string|max:100',
            'type' => 'required|in:short,long',
            // Patient details
            'patient_name' => 'required|string|max:150',
            'patient_birthdate' => 'required',
            'patient_address' => 'required',
            'patient_nik' => 'required|string|max:32',
            'patient_email' => 'nullable|email|max:191',
            'patient_phone' => 'required|string|max:32',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'doctor_id.required' => 'Dokter harus dipilih.',
            'doctor_id.exists' => 'Dokter yang dipilih tidak valid.',
            'booking_date.required' => 'Tanggal booking harus diisi.',
            'booking_date.date' => 'Format tanggal tidak valid.',
            'booking_date.after_or_equal' => 'Tanggal booking tidak boleh sebelum hari ini.',
            'start_time.required' => 'Jam booking harus dipilih.',
            'start_time.date_format' => 'Format jam tidak valid.',
            'patient_name.required' => 'Nama pasien harus diisi.',
            'patient_name.max' => 'Nama pasien maksimal 150 karakter.',
            'patient_nik.required' => 'NIK harus diisi.',
            'patient_nik.max' => 'NIK maksimal 32 karakter.',
            'patient_email.email' => 'Format email tidak valid.',
            'patient_phone.required' => 'Nomor telepon/WA harus diisi.',
            'patient_phone.max' => 'Nomor telepon maksimal 32 karakter.',
            'complaint.max' => 'Keluhan maksimal 1000 karakter.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'doctor_id' => 'dokter',
            'booking_date' => 'tanggal booking',
            'start_time' => 'jam booking',
            'patient_name' => 'nama pasien',
            'patient_nik' => 'NIK',
            'patient_email' => 'email',
            'patient_phone' => 'nomor telepon',
            'complaint' => 'keluhan',
        ];
    }
}
