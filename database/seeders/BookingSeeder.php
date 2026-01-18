<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\BookingCancellation;
use App\Models\BookingCheckin;
use App\Models\BookingPayment;
use App\Models\Doctor;
use App\Models\Patient;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Track used slots to avoid unique constraint violations
     * Format: "doctor_id-date-time-is_active"
     */
    private array $usedSlots = [];

    /**
     * Run the database seeds.
     * Creates 20 bookings with proper workflow:
     * - 10 checked-in with payment
     * - 5 confirmed (pending)
     * - 3 cancelled
     * - 2 no-show
     */
    public function run(): void
    {
        // Get existing doctors or create defaults
        $doctors = Doctor::all();
        if ($doctors->isEmpty()) {
            $this->command->warn('No doctors found. Please run DoctorSeeder first.');
            return;
        }

        // Create patients first
        $patients = $this->createPatients();

        // Services available in the clinic
        $services = [
            'Konsultasi Gigi',
            'Pembersihan Karang Gigi',
            'Tambal Gigi',
            'Cabut Gigi',
            'Perawatan Saluran Akar',
            'Veneer Gigi',
            'Bleaching Gigi',
            'Pemasangan Behel',
        ];

        // Payment methods
        $paymentMethods = ['cash', 'transfer', 'debit', 'credit_card', 'qris'];

        // Generate pre-defined unique slots for all bookings
        $slots = $this->generateUniqueSlots($doctors, 20);
        $slotIndex = 0;

        $bookingCount = 0;

        // 1. Create 10 checked-in bookings with payment (completed flow)
        for ($i = 0; $i < 10; $i++) {
            $bookingCount++;
            $slot = $slots[$slotIndex++];
            $patient = $patients->random();

            $booking = Booking::create([
                'doctor_id' => $slot['doctor_id'],
                'patient_id' => $patient->id,
                'code' => 'BK' . Carbon::now()->format('Ymd') . str_pad($bookingCount, 4, '0', STR_PAD_LEFT),
                'service' => $services[array_rand($services)],
                'type' => rand(0, 1) ? 'short' : 'long',
                'booking_date' => $slot['date'],
                'start_time' => $slot['time'],
                'status' => 'checked_in',
                'is_active' => 1,
            ]);

            // Create check-in record
            BookingCheckin::create([
                'booking_id' => $booking->id,
                'checked_in_at' => Carbon::parse($slot['date'])->setTimeFromTimeString($slot['time'])->subMinutes(rand(5, 30)),
            ]);

            // Create payment record
            BookingPayment::create([
                'booking_id' => $booking->id,
                'amount' => $this->getRandomPaymentAmount(),
                'payment_method' => $paymentMethods[array_rand($paymentMethods)],
                'note' => rand(0, 1) ? 'Pembayaran lunas' : null,
            ]);
        }

        // 2. Create 5 confirmed bookings (pending/upcoming)
        for ($i = 0; $i < 5; $i++) {
            $bookingCount++;
            $slot = $slots[$slotIndex++];
            $patient = $patients->random();

            Booking::create([
                'doctor_id' => $slot['doctor_id'],
                'patient_id' => $patient->id,
                'code' => 'BK' . Carbon::now()->format('Ymd') . str_pad($bookingCount, 4, '0', STR_PAD_LEFT),
                'service' => $services[array_rand($services)],
                'type' => rand(0, 1) ? 'short' : 'long',
                'booking_date' => $slot['date'],
                'start_time' => $slot['time'],
                'status' => 'confirmed',
                'is_active' => 1,
            ]);
        }

        // 3. Create 3 cancelled bookings (is_active = 0, different constraint)
        $cancellationReasons = [
            'Pasien berhalangan hadir',
            'Jadwal bentrok dengan kegiatan lain',
            'Sakit mendadak',
            'Reschedule ke tanggal lain',
            'Alasan pribadi',
        ];

        for ($i = 0; $i < 3; $i++) {
            $bookingCount++;
            $slot = $slots[$slotIndex++];
            $patient = $patients->random();

            $booking = Booking::create([
                'doctor_id' => $slot['doctor_id'],
                'patient_id' => $patient->id,
                'code' => 'BK' . Carbon::now()->format('Ymd') . str_pad($bookingCount, 4, '0', STR_PAD_LEFT),
                'service' => $services[array_rand($services)],
                'type' => rand(0, 1) ? 'short' : 'long',
                'booking_date' => $slot['date'],
                'start_time' => $slot['time'],
                'status' => 'cancelled',
                'is_active' => 0,
            ]);

            // Create cancellation record
            BookingCancellation::create([
                'booking_id' => $booking->id,
                'cancelled_at' => Carbon::parse($slot['date'])->subDays(rand(1, 3)),
                'cancelled_by_user_id' => null,
                'cancelled_by' => rand(0, 1) ? 'patient' : 'admin',
                'reason' => $cancellationReasons[array_rand($cancellationReasons)],
            ]);
        }

        // 4. Create 2 no-show bookings
        for ($i = 0; $i < 2; $i++) {
            $bookingCount++;
            $slot = $slots[$slotIndex++];
            $patient = $patients->random();

            Booking::create([
                'doctor_id' => $slot['doctor_id'],
                'patient_id' => $patient->id,
                'code' => 'BK' . Carbon::now()->format('Ymd') . str_pad($bookingCount, 4, '0', STR_PAD_LEFT),
                'service' => $services[array_rand($services)],
                'type' => rand(0, 1) ? 'short' : 'long',
                'booking_date' => $slot['date'],
                'start_time' => $slot['time'],
                'status' => 'no_show',
                'is_active' => 0,
            ]);
        }

        $this->command->info("Created {$bookingCount} bookings with related data.");
    }

    /**
     * Generate unique slots for bookings to avoid constraint violations
     */
    private function generateUniqueSlots($doctors, int $count): array
    {
        $slots = [];
        $times = ['08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', 
                  '11:00:00', '11:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', 
                  '15:00:00', '15:30:00', '16:00:00', '16:30:00'];
        
        $doctorIds = $doctors->pluck('id')->toArray();
        
        // Generate dates: November 2025 - January 2026
        $dates = [];
        $startDate = Carbon::create(2025, 11, 1);
        $endDate = Carbon::create(2026, 1, 31);
        
        while ($startDate->lte($endDate)) {
            $dates[] = $startDate->format('Y-m-d');
            $startDate->addDay();
        }

        while (count($slots) < $count) {
            $doctorId = $doctorIds[array_rand($doctorIds)];
            $date = $dates[array_rand($dates)];
            $time = $times[array_rand($times)];
            
            // Create a unique key for this slot
            $slotKey = "{$doctorId}-{$date}-{$time}";
            
            // Check if slot is already used
            if (!isset($this->usedSlots[$slotKey])) {
                $this->usedSlots[$slotKey] = true;
                $slots[] = [
                    'doctor_id' => $doctorId,
                    'date' => $date,
                    'time' => $time,
                ];
            }
        }

        return $slots;
    }

    /**
     * Create 15 patients with realistic Indonesian data
     */
    private function createPatients()
    {
        $patientsData = [
            [
                'patient_name' => 'Budi Santoso',
                'patient_nik' => '3201010101900001',
                'patient_phone' => '08123456789',
                'patient_birthdate' => '1990-01-15',
                'patient_address' => 'Jl. Sudirman No. 45, Jakarta Pusat',
                'gender' => 'male',
            ],
            [
                'patient_name' => 'Siti Aminah',
                'patient_nik' => '3201010201850002',
                'patient_phone' => '08567890123',
                'patient_birthdate' => '1985-02-20',
                'patient_address' => 'Jl. Gatot Subroto No. 12, Jakarta Selatan',
                'gender' => 'female',
            ],
            [
                'patient_name' => 'Ahmad Dahlan',
                'patient_nik' => '3201010301800003',
                'patient_phone' => '08234567890',
                'patient_birthdate' => '1980-03-10',
                'patient_address' => 'Komp. Melati Indah Blok B2 No. 5, Bandung',
                'gender' => 'male',
            ],
            [
                'patient_name' => 'Rina Wati',
                'patient_nik' => '3201010401950004',
                'patient_phone' => '08789012345',
                'patient_birthdate' => '1995-04-25',
                'patient_address' => 'Jl. Asia Afrika No. 78, Bandung',
                'gender' => 'female',
            ],
            [
                'patient_name' => 'Doni Pratama',
                'patient_nik' => '3201010501880005',
                'patient_phone' => '08345678901',
                'patient_birthdate' => '1988-05-30',
                'patient_address' => 'Apartemen City Green Tower A Lt. 15',
                'gender' => 'male',
            ],
            [
                'patient_name' => 'Maya Putri',
                'patient_nik' => '3201010601920006',
                'patient_phone' => '08456789012',
                'patient_birthdate' => '1992-06-18',
                'patient_address' => 'Jl. Dago No. 123, Bandung',
                'gender' => 'female',
            ],
            [
                'patient_name' => 'Hendra Wijaya',
                'patient_nik' => '3201010701780007',
                'patient_phone' => '08567890234',
                'patient_birthdate' => '1978-07-22',
                'patient_address' => 'Jl. Braga No. 56, Bandung',
                'gender' => 'male',
            ],
            [
                'patient_name' => 'Dewi Lestari',
                'patient_nik' => '3201010801870008',
                'patient_phone' => '08678901234',
                'patient_birthdate' => '1987-08-14',
                'patient_address' => 'Perumahan Griya Asri Blok C3 No. 10',
                'gender' => 'female',
            ],
            [
                'patient_name' => 'Agus Setiawan',
                'patient_nik' => '3201010901750009',
                'patient_phone' => '08789012456',
                'patient_birthdate' => '1975-09-08',
                'patient_address' => 'Jl. Cihampelas No. 89, Bandung',
                'gender' => 'male',
            ],
            [
                'patient_name' => 'Fitri Handayani',
                'patient_nik' => '3201011001930010',
                'patient_phone' => '08890123567',
                'patient_birthdate' => '1993-10-05',
                'patient_address' => 'Jl. Setiabudhi No. 234, Bandung',
                'gender' => 'female',
            ],
            [
                'patient_name' => 'Rizki Ramadhan',
                'patient_nik' => '3201011101980011',
                'patient_phone' => '08901234678',
                'patient_birthdate' => '1998-11-28',
                'patient_address' => 'Jl. Buah Batu No. 67, Bandung',
                'gender' => 'male',
            ],
            [
                'patient_name' => 'Nur Hidayah',
                'patient_nik' => '3201011201820012',
                'patient_phone' => '08112345789',
                'patient_birthdate' => '1982-12-12',
                'patient_address' => 'Jl. Pajajaran No. 156, Bandung',
                'gender' => 'female',
            ],
            [
                'patient_name' => 'Eko Prasetyo',
                'patient_nik' => '3201011301890013',
                'patient_phone' => '08223456890',
                'patient_birthdate' => '1989-01-20',
                'patient_address' => 'Komp. Bumi Parahyangan Kav. 12',
                'gender' => 'male',
            ],
            [
                'patient_name' => 'Wulan Sari',
                'patient_nik' => '3201011401960014',
                'patient_phone' => '08334567901',
                'patient_birthdate' => '1996-02-14',
                'patient_address' => 'Jl. Sukajadi No. 78, Bandung',
                'gender' => 'female',
            ],
            [
                'patient_name' => 'Bambang Sutrisno',
                'patient_nik' => '3201011501720015',
                'patient_phone' => '08445678012',
                'patient_birthdate' => '1972-03-30',
                'patient_address' => 'Jl. Pasteur No. 45, Bandung',
                'gender' => 'male',
            ],
        ];

        foreach ($patientsData as &$patient) {
            $patient['medical_records'] = Patient::generateMedicalRecords();
            $patient['created_at'] = Carbon::now()->subDays(rand(1, 60));
            $patient['updated_at'] = $patient['created_at'];
        }

        foreach ($patientsData as $patientData) {
            Patient::create($patientData);
        }

        return Patient::all();
    }

    /**
     * Get random payment amount based on typical dental services
     */
    private function getRandomPaymentAmount(): int
    {
        $amounts = [
            150000,  // Konsultasi
            250000,  // Pembersihan
            300000,  // Tambal biasa
            350000,  // Tambal komposit
            400000,  // Cabut gigi
            500000,  // Perawatan akar
            750000,  // Veneer
            1000000, // Bleaching
            1500000, // Behel
        ];

        return $amounts[array_rand($amounts)];
    }
}
