<?php

namespace Database\Seeders;

use App\Models\Doctor;
use Illuminate\Database\Seeder;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $doctors = [
            [
                'name' => 'drg. Anna Fikril',
                'sip' => 'SIP-DRG-2024-001',
                'experience' => 12,
                'profile_pic' => 'https://lh3.googleusercontent.com/d/1fcnOLn4TQGaWD7Hc8v_XH3mDjF9s0H86',
                'is_active' => true,
            ],
            [
                'name' => 'drg. Lailiz Zulfa',
                'sip' => 'SIP-DRG-2024-002',
                'experience' => 8,
                'profile_pic' => 'https://lh3.googleusercontent.com/d/1mqe9jOKVCxDB-TM_NC3oXbY2feDMv_uQ',
                'is_active' => true,
            ],
            [
                'name' => 'drg. Haning Palutfi',
                'sip' => 'SIP-DRG-2024-003',
                'experience' => 5,
                'profile_pic' => 'https://lh3.googleusercontent.com/d/1vbaHF5t8TgdD7XDnJU9vC2Hli9hipt_U',
                'is_active' => true,
            ],
        ];

        foreach ($doctors as $doctor) {
            Doctor::create($doctor);
        }
    }
}
