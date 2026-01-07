<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePatientRequest extends FormRequest
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
            'patient_name' => 'required|string|max:255',
            'patient_nik' => 'nullable|string|max:16',
            'patient_phone' => 'required|string|max:20',
            'patient_birthdate' => 'nullable|date',
            'patient_address' => 'nullable|string',
            'gender' => 'required|in:male,female',
            'province_id' => 'nullable|integer',
            'city_id' => 'nullable|integer',
            'district_id' => 'nullable|integer',
            'village_id' => 'nullable|integer',
        ];
    }

    /**
     * Get custom messages for validation errors.
     */
    public function messages(): array
    {
        return [
            'patient_name.required' => 'Nama pasien wajib diisi.',
            'patient_name.max' => 'Nama pasien maksimal 255 karakter.',
            'patient_nik.max' => 'NIK maksimal 16 karakter.',
            'patient_phone.required' => 'Nomor telepon wajib diisi.',
            'patient_phone.max' => 'Nomor telepon maksimal 20 karakter.',
            'patient_birthdate.date' => 'Format tanggal lahir tidak valid.',
            'gender.required' => 'Gender wajib dipilih.',
            'gender.in' => 'Gender tidak valid (male/female).',
        ];
    }
}
