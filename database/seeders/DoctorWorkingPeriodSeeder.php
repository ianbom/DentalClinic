<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\DoctorWorkingPeriod;
use Illuminate\Database\Seeder;

class DoctorWorkingPeriodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doctors = Doctor::all();

        // Working schedules for each doctor
        $schedules = [
            // Doctor 1: drg. Anisa Putri - Mon, Wed, Fri (Morning & Evening)
            1 => [
                ['day_of_week' => 'Senin', 'start_time' => '09:00', 'end_time' => '12:00'],
                ['day_of_week' => 'Senin', 'start_time' => '18:00', 'end_time' => '21:00'],
                ['day_of_week' => 'Rabu', 'start_time' => '09:00', 'end_time' => '12:00'],
                ['day_of_week' => 'Rabu', 'start_time' => '18:00', 'end_time' => '21:00'],
                ['day_of_week' => 'Jumat', 'start_time' => '09:00', 'end_time' => '12:00'],
                ['day_of_week' => 'Jumat', 'start_time' => '18:00', 'end_time' => '21:00'],
            ],
            // Doctor 2: drg. Budi Santoso - Tue, Thu, Sat (Full day)
            2 => [
                ['day_of_week' => 'Selasa', 'start_time' => '09:00', 'end_time' => '12:00'],
                ['day_of_week' => 'Selasa', 'start_time' => '13:00', 'end_time' => '17:00'],
                ['day_of_week' => 'Kamis', 'start_time' => '09:00', 'end_time' => '12:00'],
                ['day_of_week' => 'Kamis', 'start_time' => '13:00', 'end_time' => '17:00'],
                ['day_of_week' => 'Sabtu', 'start_time' => '09:00', 'end_time' => '14:00'],
            ],
            // Doctor 3: drg. Citra Dewi - Mon, Tue, Wed, Thu (Evening only)
            3 => [
                ['day_of_week' => 'Senin', 'start_time' => '16:00', 'end_time' => '21:00'],
                ['day_of_week' => 'Selasa', 'start_time' => '16:00', 'end_time' => '21:00'],
                ['day_of_week' => 'Rabu', 'start_time' => '16:00', 'end_time' => '21:00'],
                ['day_of_week' => 'Kamis', 'start_time' => '16:00', 'end_time' => '21:00'],
            ],
        ];

        foreach ($doctors as $doctor) {
            if (isset($schedules[$doctor->id])) {
                foreach ($schedules[$doctor->id] as $schedule) {
                    DoctorWorkingPeriod::create([
                        'doctor_id' => $doctor->id,
                        'day_of_week' => $schedule['day_of_week'],
                        'start_time' => $schedule['start_time'],
                        'end_time' => $schedule['end_time'],
                        'is_active' => true,
                    ]);
                }
            }
        }
    }
}
