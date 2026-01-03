<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingCancellation>
 */
class BookingCancellationFactory extends Factory
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
            'cancelled_at' => fake()->dateTime(),
            'cancelled_by_user_id' => User::inRandomOrder()->first()?->id,
            'cancelled_by' => fake()->name(),
            'reason' => fake()->sentence(),
        ];
    }
}
