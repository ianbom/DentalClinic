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
                'name' => 'drg. Anisa Putri, Sp.KG',
                'sip' => 'SIP-DRG-2024-001',
                'experience' => 8,
                'profile_pic' => 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face',
                'is_active' => true,
            ],
            [
                'name' => 'drg. Budi Santoso, Sp.Ort',
                'sip' => 'SIP-DRG-2024-002',
                'experience' => 12,
                'profile_pic' => 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face',
                'is_active' => true,
            ],
            [
                'name' => 'drg. Citra Dewi, Sp.PM',
                'sip' => 'SIP-DRG-2024-003',
                'experience' => 5,
                'profile_pic' => 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face',
                'is_active' => true,
            ],
        ];

        foreach ($doctors as $doctor) {
            Doctor::create($doctor);
        }
    }
}
