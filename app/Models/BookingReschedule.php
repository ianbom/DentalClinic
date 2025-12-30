<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingReschedule extends Model
{
    protected $fillable = [
        'booking_id',
        'requested_by',
        'requested_by_user_id',
        'old_date',
        'old_start_time',
        'new_date',
        'new_start_time',
        'reason',
        'status',
        'patient_responded_at',
        'patient_response',
        'response_note',
        'expires_at',
        'is_pending',
    ];

    protected $casts = [
        'old_date' => 'date',
        'new_date' => 'date',
        'patient_responded_at' => 'datetime',
        'expires_at' => 'datetime',
        'is_pending' => 'integer',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function requestedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by_user_id');
    }

    public function isPending(): bool
    {
        return $this->status === 'pending_patient';
    }

    public function isApplied(): bool
    {
        return $this->status === 'applied';
    }

    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    public function isExpired(): bool
    {
        return $this->status === 'expired';
    }

    public function isRequestedByPatient(): bool
    {
        return $this->requested_by === 'patient';
    }

    public function isRequestedByStaff(): bool
    {
        return $this->requested_by === 'staff';
    }
}
