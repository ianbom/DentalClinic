<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingPatientDetail extends Model
{
    protected $table = 'booking_patient_details';
    protected $primaryKey = 'booking_id';
    public $incrementing = false;

    protected $fillable = [
        'booking_id',
        'patient_name',
        'patient_nik',
        'patient_email',
        'patient_phone',
        'complaint',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}
