<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\BookingCancellation;
use App\Models\BookingCheckin;
use App\Models\BookingPayment;
use App\Models\BookingReschedule;
use App\Models\Doctor;
use App\Models\Notification;
use App\Models\Patient;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PerformanceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 0. Clean up previous data
        $this->command->info('Truncating tables...');
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        BookingCheckin::truncate();
        BookingCancellation::truncate();
        BookingPayment::truncate();
        BookingReschedule::truncate();
        Notification::truncate();
        Booking::truncate();
        Patient::truncate();
        // We do NOT truncate doctors as they might be reference data
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 1. Ensure Doctors
        $doctors = Doctor::all();
        if ($doctors->isEmpty()) {
            $this->command->info('Creating Doctors...');
            $doctors = Doctor::factory(5)->create();
        }
        $doctorIds = $doctors->pluck('id')->toArray();
        
        // 2. Create Patients (1,000)
        $this->command->info('Creating 1,000 Patients...');
        $patients = Patient::factory(1000)->create();
        
        // 3. Generate Unique Booking Slots
        $this->command->info('Generating unique booking slots...');
        $uniqueBookings = [];
        $usedKeys = [];
        $target = 10000;
        $attempts = 0;
        $maxAttempts = $target * 5; // Safety break

        while (count($uniqueBookings) < $target && $attempts < $maxAttempts) {
            $attempts++;
            $docId = $doctorIds[array_rand($doctorIds)];
            $date = fake()->dateTimeBetween('-1 year', '+1 month');
            $dateStr = $date->format('Y-m-d');
            
            $type = fake()->randomElement(['short', 'long', 'sisipan']);
            
            if ($type === 'sisipan') {
                $timeStr = null;
                // We assume multiple sisipan per day/doctor is allowed or treated as non-colliding 
                // because start_time is null. If unique index allows multiple NULLs (standard MySQL), this is fine.
            } else {
                // Generate time 08:00 - 20:00 with 15 minutes interval
                $hour = rand(8, 20);
                $minute = rand(0, 3) * 15;
                $timeStr = sprintf('%02d:%02d:00', $hour, $minute);
            }

            // Check uniqueness if time is not null
            // (Assuming unique constraint is on doctor_id, booking_date, start_time)
            if ($timeStr !== null) {
                $key = "{$docId}-{$dateStr}-{$timeStr}";
                if (isset($usedKeys[$key])) {
                    continue;
                }
                $usedKeys[$key] = true;
            }

            $uniqueBookings[] = [
                'doctor_id' => $docId,
                'booking_date' => $dateStr, // String format Y-m-d
                'start_time' => $timeStr,
                'type' => $type,
            ];
        }

        $this->command->info('Creating ' . count($uniqueBookings) . ' Bookings...');
        
        // 4. Create Bookings in Chunks
        $chunkSize = 500;
        $chunks = array_chunk($uniqueBookings, $chunkSize);
        
        foreach ($chunks as $index => $chunkAttributes) {
            // Use Sequence to apply our unique attributes
            $bookings = Booking::factory()
                ->count(count($chunkAttributes))
                ->state(new \Illuminate\Database\Eloquent\Factories\Sequence(...$chunkAttributes))
                ->recycle($patients)
                // We don't need recycle($doctors) because we set doctor_id explicitly
                ->create();
                
            // 5. Create Related Records
            foreach ($bookings as $booking) {
                // Booking Checkin
                if ($booking->status === 'checked_in') {
                    BookingCheckin::factory()->create([
                        'booking_id' => $booking->id,
                        'checked_in_at' => $booking->start_time 
                            ? \Carbon\Carbon::parse($booking->booking_date->format('Y-m-d') . ' ' . $booking->start_time)->subMinutes(rand(5, 30))
                            : now(),
                    ]);
                }
                
                // Booking Cancellation
                if ($booking->status === 'cancelled') {
                    BookingCancellation::factory()->create([
                        'booking_id' => $booking->id,
                        'cancelled_at' => now(),
                    ]);
                }

                // Booking Payment
                if (in_array($booking->status, ['confirmed', 'checked_in']) && rand(0, 1)) {
                    BookingPayment::factory()->create([
                        'booking_id' => $booking->id,
                    ]);
                }

                // Reschedules
                if (rand(1, 100) <= 10) {
                    BookingReschedule::factory()->create([
                        'booking_id' => $booking->id,
                    ]);
                }

                // Notifications
                Notification::factory(rand(1, 3))->create([
                    'booking_id' => $booking->id,
                ]);
            }
            
            $this->command->info("Processed " . (($index + 1) * $chunkSize) . " bookings...");
        }

        $this->command->info('Performance Seed Completed!');
    }
}
