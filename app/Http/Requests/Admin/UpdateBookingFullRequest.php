<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingFullRequest extends FormRequest
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
            // Booking data
            'doctor_id' => 'required|exists:doctors,id',
            'service' => 'required|string|max:255',
            'type' => 'required|string|max:50',
            'booking_date' => 'required|date',
            'start_time' => 'nullable|string',
            'status' => 'required|string|in:pending,confirmed,checked_in,completed,cancelled,no_show',
            
            // Patient data
            'patient_name' => 'required|string|max:255',
            'patient_nik' => 'required|string|size:16',
            'patient_phone' => 'required|string|max:20',
            'patient_email' => 'nullable|email|max:255',
            'patient_birthdate' => 'nullable|date',
            'patient_address' => 'nullable|string',
            'patient_gender' => 'nullable|string|in:male,female',
            'patient_medical_records' => 'nullable|string|max:50',
            
            // Payment data
            'payment_amount' => 'nullable|integer|min:0',
            'payment_method' => 'nullable|string|in:cash,transfer,qris,debit,credit',
            'payment_note' => 'nullable|string|max:500',
            
            // Checkin data
            'checked_in_at' => 'nullable|date',
            
            // Cancellation data
            'cancelled_at' => 'nullable|date',
            'cancelled_by' => 'nullable|string|in:patient,admin,system',
            'cancellation_reason' => 'nullable|string|max:500',
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
            'doctor_id.required' => 'Dokter harus dipilih',
            'doctor_id.exists' => 'Dokter tidak ditemukan',
            'service.required' => 'Layanan harus dipilih',
            'booking_date.required' => 'Tanggal booking harus diisi',
            'booking_date.date' => 'Format tanggal booking tidak valid',
            'status.required' => 'Status harus dipilih',
            'status.in' => 'Status tidak valid',
            'patient_name.required' => 'Nama pasien harus diisi',
            'patient_nik.required' => 'NIK pasien harus diisi',
            'patient_nik.size' => 'NIK harus terdiri dari 16 digit',
            'patient_phone.required' => 'Nomor telepon pasien harus diisi',
            'patient_email.email' => 'Format email tidak valid',
            'patient_birthdate.date' => 'Format tanggal lahir tidak valid',
            'patient_gender.in' => 'Jenis kelamin tidak valid',
            'payment_amount.integer' => 'Nominal pembayaran harus berupa angka',
            'payment_amount.min' => 'Nominal pembayaran tidak boleh negatif',
            'payment_method.in' => 'Metode pembayaran tidak valid',
        ];
    }
}

