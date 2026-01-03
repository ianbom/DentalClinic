<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProvinceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Fetches all provinces from wilayah.id API
     */
    public function run(): void
    {
        $this->command->info('Seeding wilayah data from SQL file...');

        // Disable foreign key checks
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Truncate tables to ensure clean state
        \App\Models\Village::truncate();
        \App\Models\District::truncate();
        \App\Models\City::truncate();
        Province::truncate();

        // Load SQL file
        $path = public_path('wilayah.sql');
        if (file_exists($path)) {
            \Illuminate\Support\Facades\DB::unprepared(file_get_contents($path));
            $this->command->info('Wilayah SQL file executed successfully.');
        } else {
            $this->command->error('Wilayah SQL file not found at: ' . $path);
            return;
        }

        // Enable foreign key checks
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Uppercase Provinces
        $this->command->info('Uppercasing Province names...');
        \Illuminate\Support\Facades\DB::statement('UPDATE provinces SET name = UPPER(name)');
    }
}
