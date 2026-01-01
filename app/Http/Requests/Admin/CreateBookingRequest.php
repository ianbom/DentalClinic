<?php

namespace App\Http\Requests\Admin;

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
            'doctor_id' => 'nullable|exists:doctors,id',
            'booking_date' => 'required|date',
            'start_time' => 'nullable|string', // Optional for sisipan
            'service' => 'required|string|max:100',
            'type' => 'required|in:short,long,sisipan',
            // Patient details
            'patient_name' => 'required|string|max:150',
            'patient_birthdate' => 'required|date',
            'patient_address' => 'nullable|string',
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
            'start_time.date_format' => 'Format jam tidak valid.',
            'service.required' => 'Layanan harus dipilih.',
            'type.required' => 'Tipe layanan harus dipilih.',
            'patient_name.required' => 'Nama pasien harus diisi.',
            'patient_birthdate.required' => 'Tanggal lahir harus diisi.',
            'patient_address.required' => 'Alamat harus diisi.',
            'patient_nik.required' => 'NIK harus diisi.',
            'patient_phone.required' => 'Nomor telepon/WA harus diisi.',
        ];
    }
}
