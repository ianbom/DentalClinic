<?php

namespace Database\Seeders;

use App\Models\District;
use App\Models\Village;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class VillageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Fetches all villages from wilayah.id API for each district
     */
    public function run(): void
    {
        $this->command->info('Uppercasing Village names...');
        \Illuminate\Support\Facades\DB::statement('UPDATE villages SET name = UPPER(name)');
        $this->command->info('Villages updated successfully.');
    }
}
