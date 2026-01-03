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
        $this->command->info('Fetching provinces from wilayah.id API...');

        try {
            $response = Http::timeout(30)->get('https://wilayah.id/api/provinces.json');

            if ($response->successful()) {
                $data = $response->json();
                $provinces = $data['data'] ?? [];

                $this->command->info('Found ' . count($provinces) . ' provinces');

                foreach ($provinces as $province) {
                    Province::updateOrCreate(
                        ['code' => $province['code']],
                        ['name' => $province['name']]
                    );
                }

                $this->command->info('Provinces seeded successfully!');
            } else {
                $this->command->error('Failed to fetch provinces: ' . $response->status());
            }
        } catch (\Exception $e) {
            Log::error('ProvinceSeeder Error: ' . $e->getMessage());
            $this->command->error('Error: ' . $e->getMessage());
        }
    }
}
