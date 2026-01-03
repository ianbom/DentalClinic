<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Province;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Fetches all cities/regencies from wilayah.id API for each province
     */
    public function run(): void
    {
        $this->command->info('Uppercasing City names...');
        \Illuminate\Support\Facades\DB::statement('UPDATE cities SET name = UPPER(name)');
        $this->command->info('Cities updated successfully.');
    }
}
