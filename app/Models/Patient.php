<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Patient extends Model
{
    use HasFactory;
    protected $table = 'patients';

    protected $fillable = [
        'medical_records',
        'patient_name',
        'patient_nik',
        'patient_email',
        'patient_phone',
        'patient_birthdate',
        'patient_address',
        'gender'
    ];

    protected $casts = [
        'patient_birthdate' => 'date',
    ];

    /**
     * Get all bookings for this patient
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'patient_id');
    }

    /**
     * Generate unique medical records number
     */
    public static function generateMedicalRecords(): string
    {
        $prefix = 'RM';
        $date = now()->format('Ymd');
        $random = strtoupper(substr(md5(uniqid()), 0, 6));
        
        return "{$prefix}{$date}{$random}";
    }
}
