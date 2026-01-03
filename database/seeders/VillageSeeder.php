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
        $this->command->info('Fetching villages from wilayah.id API...');

        $districts = District::all();

        if ($districts->isEmpty()) {
            $this->command->warn('No districts found. Please run DistrictSeeder first.');
            return;
        }

        $totalVillages = 0;
        $processedDistricts = 0;
        $totalDistricts = $districts->count();

        foreach ($districts as $district) {
            try {
                // Convert code from "317105" to "31.71.05" format for API
                $code = $district->code;
                $apiCode = substr($code, 0, 2) . '.' . substr($code, 2, 2) . '.' . substr($code, 4);
                $url = "https://wilayah.id/api/villages/{$apiCode}.json";

                $response = Http::timeout(30)->get($url);

                if ($response->successful()) {
                    $data = $response->json();
                    $villages = $data['data'] ?? [];

                    foreach ($villages as $village) {
                        // Convert code from "31.71.05.1001" to "3171051001" format
                        $villageCode = str_replace('.', '', $village['code']);

                        Village::updateOrCreate(
                            ['code' => $villageCode],
                            [
                                'name' => trim($village['name']),
                                'district_id' => $district->id,
                            ]
                        );
                        $totalVillages++;
                    }
                }

                $processedDistricts++;

                // Show progress every 100 districts
                if ($processedDistricts % 100 === 0) {
                    $percent = round(($processedDistricts / $totalDistricts) * 100);
                    $this->command->info("  Progress: {$processedDistricts}/{$totalDistricts} districts ({$percent}%)");
                }

                // Small delay to avoid rate limiting
                usleep(50000); // 50ms delay
            } catch (\Exception $e) {
                Log::error("VillageSeeder Error for {$district->name}: " . $e->getMessage());
            }
        }

        $this->command->info("Total villages seeded: {$totalVillages}");
    }
}
