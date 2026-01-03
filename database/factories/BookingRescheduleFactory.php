<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingReschedule>
 */
class BookingRescheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'booking_id' => Booking::factory(),
            'requested_by' => fake()->randomElement(['patient', 'staff']),
            'requested_by_user_id' => User::inRandomOrder()->first()?->id,
            'old_date' => fake()->date(),
            'old_start_time' => fake()->time(),
            'new_date' => fake()->date(),
            'new_start_time' => fake()->time(),
            'reason' => fake()->sentence(),
            'status' => fake()->randomElement(['pending_patient', 'applied', 'rejected', 'expired']),
            'patient_responded_at' => fake()->optional()->dateTime(),
            'patient_response' => fake()->optional()->randomElement(['accepted', 'rejected']),
            'response_note' => fake()->optional()->sentence(),
            'expires_at' => fake()->optional()->dateTime(),
            'is_pending' => fake()->boolean(),
        ];
    }
}
