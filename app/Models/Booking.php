<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Booking extends Model
{
    protected $fillable = [
        'doctor_id',
        'code',
        'booking_date',
        'start_time',
        'status',
        'is_active',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'is_active' => 'integer',
    ];

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }

    public function patientDetail(): HasOne
    {
        return $this->hasOne(BookingPatientDetail::class);
    }

    public function checkin(): HasOne
    {
        return $this->hasOne(BookingCheckin::class);
    }

    public function cancellation(): HasOne
    {
        return $this->hasOne(BookingCancellation::class);
    }

    public function reschedules(): HasMany
    {
        return $this->hasMany(BookingReschedule::class);
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function isConfirmed(): bool
    {
        return $this->status === 'confirmed';
    }

    public function isCheckedIn(): bool
    {
        return $this->status === 'checked_in';
    }

    public function isCancelled(): bool
    {
        return $this->status === 'cancelled';
    }

    public function isNoShow(): bool
    {
        return $this->status === 'no_show';
    }
}
