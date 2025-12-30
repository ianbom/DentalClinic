<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Doctor extends Model
{
    protected $fillable = [
        'name',
        'sip',
        'experience',
        'profile_pic',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'experience' => 'integer',
    ];

    public function workingPeriods(): HasMany
    {
        return $this->hasMany(DoctorWorkingPeriod::class);
    }

    public function timeOff(): HasMany
    {
        return $this->hasMany(DoctorTimeOff::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
