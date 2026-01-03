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
        $this->command->info('Fetching cities from wilayah.id API...');

        $provinces = Province::all();

        if ($provinces->isEmpty()) {
            $this->command->warn('No provinces found. Please run ProvinceSeeder first.');
            return;
        }

        $totalCities = 0;

        foreach ($provinces as $province) {
            try {
                $url = "https://wilayah.id/api/regencies/{$province->code}.json";
                $response = Http::timeout(30)->get($url);

                if ($response->successful()) {
                    $data = $response->json();
                    $cities = $data['data'] ?? [];

                    foreach ($cities as $city) {
                        // Convert code from "31.71" to "3171" format
                        $code = str_replace('.', '', $city['code']);

                        City::updateOrCreate(
                            ['code' => $code],
                            [
                                'name' => trim($city['name']),
                                'province_id' => $province->id,
                            ]
                        );
                        $totalCities++;
                    }

                    $this->command->info("  - {$province->name}: " . count($cities) . " cities");
                } else {
                    $this->command->warn("  - Failed to fetch cities for {$province->name}");
                }

                // Small delay to avoid rate limiting
                usleep(100000); // 100ms delay
            } catch (\Exception $e) {
                Log::error("CitySeeder Error for {$province->name}: " . $e->getMessage());
                $this->command->error("  - Error for {$province->name}: " . $e->getMessage());
            }
        }

        $this->command->info("Total cities seeded: {$totalCities}");
    }
}
