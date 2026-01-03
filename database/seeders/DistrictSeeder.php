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
        $this->command->info('Fetching districts from wilayah.id API...');

        $cities = City::all();

        if ($cities->isEmpty()) {
            $this->command->warn('No cities found. Please run CitySeeder first.');
            return;
        }

        $totalDistricts = 0;
        $processedCities = 0;
        $totalCities = $cities->count();

        foreach ($cities as $city) {
            try {
                // Convert code from "3171" to "31.71" format for API
                $apiCode = substr($city->code, 0, 2) . '.' . substr($city->code, 2);
                $url = "https://wilayah.id/api/districts/{$apiCode}.json";

                $response = Http::timeout(30)->get($url);

                if ($response->successful()) {
                    $data = $response->json();
                    $districts = $data['data'] ?? [];

                    foreach ($districts as $district) {
                        // Convert code from "31.71.05" to "317105" format
                        $code = str_replace('.', '', $district['code']);

                        District::updateOrCreate(
                            ['code' => $code],
                            [
                                'name' => trim($district['name']),
                                'city_id' => $city->id,
                            ]
                        );
                        $totalDistricts++;
                    }
                }

                $processedCities++;

                // Show progress every 50 cities
                if ($processedCities % 50 === 0) {
                    $percent = round(($processedCities / $totalCities) * 100);
                    $this->command->info("  Progress: {$processedCities}/{$totalCities} cities ({$percent}%)");
                }

                // Small delay to avoid rate limiting
                usleep(50000); // 50ms delay
            } catch (\Exception $e) {
                Log::error("DistrictSeeder Error for {$city->name}: " . $e->getMessage());
            }
        }

        $this->command->info("Total districts seeded: {$totalDistricts}");
    }
}
