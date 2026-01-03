<?php

namespace Database\Factories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookingPayment>
 */
class BookingPaymentFactory extends Factory
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
            'amount' => fake()->numberBetween(50000, 1000000),
            'payment_method' => fake()->randomElement(['cash', 'transfer', 'qris']),
            'note' => fake()->optional()->sentence(),
        ];
    }
}
