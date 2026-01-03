<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingCancellation extends Model
{
    use HasFactory;
    protected $table = 'booking_cancellations';
    protected $primaryKey = 'booking_id';
    public $incrementing = false;

    protected $fillable = [
        'booking_id',
        'cancelled_at',
        'cancelled_by_user_id',
        'cancelled_by',
        'reason',
    ];

    protected $casts = [
        'cancelled_at' => 'datetime',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    public function cancelledByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cancelled_by_user_id');
    }
}
