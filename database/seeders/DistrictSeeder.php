<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\District;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Fetches all districts from wilayah.id API for each city
     */
    public function run(): void
    {
        $this->command->info('Uppercasing District names...');
        \Illuminate\Support\Facades\DB::statement('UPDATE districts SET name = UPPER(name)');
        $this->command->info('Districts updated successfully.');
    }
}
