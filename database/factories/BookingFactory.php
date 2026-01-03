<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = fake()->randomElement(['confirmed', 'checked_in', 'cancelled', 'no_show']);
        $type = fake()->randomElement(['short', 'long', 'sisipan']);
        
        return [
            'doctor_id' => Doctor::inRandomOrder()->first()?->id ?? Doctor::factory(),
            'patient_id' => Patient::inRandomOrder()->first()?->id ?? Patient::factory(),
            'code' => 'CDC' . strtoupper(fake()->unique()->bothify('??####')),
            'service' => fake()->randomElement(['Konsultasi', 'Cabut Gigi', 'Scaling', 'Tambal Gigi']),
            'type' => $type,
            'booking_date' => fake()->dateTimeBetween('-1 year', '+1 month')->format('Y-m-d'),
            'start_time' => $type !== 'sisipan' ? fake()->time('H:i') . ':00' : null,
            'status' => $status,
            'is_active' => $status !== 'cancelled',
        ];
    }
}
