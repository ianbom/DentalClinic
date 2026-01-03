<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BookingPayment extends Model
{
    protected $primaryKey = 'booking_id';
    public $incrementing = false;

    protected $fillable = [
        'booking_id',
        'amount',
        'payment_method',
        'note',
    ];

    protected $casts = [
        'amount' => 'integer',
    ];

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }
}
