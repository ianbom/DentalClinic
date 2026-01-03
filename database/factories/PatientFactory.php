<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_name' => fake()->name(),
            'patient_nik' => fake()->unique()->numerify('################'),
            'patient_email' => fake()->unique()->safeEmail(),
            'patient_phone' => fake()->unique()->phoneNumber(),
            'patient_birthdate' => fake()->date(),
            'patient_address' => fake()->address(),
            'gender' => fake()->randomElement(['male', 'female']),
            'medical_records' => fake()->sentence(),
        ];
    }
}
