<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isStaff(): bool
    {
        return $this->role === 'staff';
    }

    public function createdTimeOff(): HasMany
    {
        return $this->hasMany(DoctorTimeOff::class, 'created_by_user_id');
    }

    public function cancelledBookings(): HasMany
    {
        return $this->hasMany(BookingCancellation::class, 'cancelled_by_user_id');
    }

    public function requestedReschedules(): HasMany
    {
        return $this->hasMany(BookingReschedule::class, 'requested_by_user_id');
    }
}
