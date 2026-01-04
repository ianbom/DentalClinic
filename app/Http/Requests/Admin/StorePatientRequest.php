<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
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
            'patient_nik' => ['nullable', 'string', 'size:16', 'unique:patients,patient_nik'],
            'patient_name' => ['nullable', 'string', 'max:255'],
            'patient_phone' => ['nullable', 'string', 'max:20'],
            'gender' => ['nullable', 'in:male,female'],
            'patient_birthdate' => ['nullable', 'date'],
            'patient_address' => ['nullable', 'string'],
            'medical_records' => ['nullable', 'string', 'unique:patients,medical_records'],
        ];
    }
    
    public function messages(): array
    {
        return [
            'patient_nik.required' => 'NIK wajib diisi.',
            'patient_nik.size' => 'NIK harus 16 digit.',
            'patient_nik.unique' => 'NIK sudah terdaftar.',
            'medical_records.unique' => 'No Rekam Medis sudah digunakan.',
            'gender.in' => 'Gender tidak valid (male/female).',
        ];
    }
}
