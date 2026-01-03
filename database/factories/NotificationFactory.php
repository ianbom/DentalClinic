<?php

namespace Database\Factories;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
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
            'channel' => fake()->randomElement(['whatsapp', 'email', 'sms']),
            'type' => fake()->randomElement(['booking_confirmation', 'reminder', 'reschedule_request']),
            'recipient' => fake()->phoneNumber(),
            'payload' => json_encode(['message' => fake()->sentence()]),
            'scheduled_at' => fake()->dateTime(),
            'sent_at' => fake()->optional()->dateTime(),
            'status' => fake()->randomElement(['pending', 'sent', 'failed']),
            'attempt_count' => fake()->numberBetween(0, 3),
            'last_error' => fake()->optional()->sentence(),
        ];
    }
}
