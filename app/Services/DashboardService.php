<?php

namespace App\Services;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardService
{
    public function getDashboardStats(): array
    {
        $today = Carbon::today();

        return [
            'bookings_today' => $this->getBookingsToday($today),
            'checkins_today' => $this->getCheckinsToday($today),
            'cancellations_today' => $this->getCancellationsToday($today),
            'reschedules_today' => $this->getReschedulesToday($today),
        ];
    }

    public function getBookingsToday(Carbon $today = null): int
    {
        $today = $today ?? Carbon::today();

        return Booking::whereDate('booking_date', $today)->count();
    }

    public function getCheckinsToday(Carbon $today = null): int
    {
        $today = $today ?? Carbon::today();

        return Booking::whereDate('booking_date', $today)
            ->where('status', 'checked_in')
            ->count();
    }

    public function getCancellationsToday(Carbon $today = null): int
    {
        $today = $today ?? Carbon::today();

        return Booking::whereDate('booking_date', $today)
            ->where('status', 'cancelled')
            ->count();
    }

    public function getReschedulesToday(Carbon $today = null): int
    {
        $today = $today ?? Carbon::today();

        return Booking::whereDate('booking_date', $today)
            ->whereHas('reschedules')
            ->count();
    }

    public function getTodayBookingsList(): array
    {
        $today = Carbon::today();

        $bookings = Booking::with(['doctor', 'patient'])
            ->whereDate('booking_date', $today)
            ->orderBy('start_time', 'asc')
            ->get();

        return $this->formatBookings($bookings);
    }

    public function getRecentBookings(int $limit = 10): array
    {
        $bookings = Booking::with(['doctor', 'patient'])
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();

        return $this->formatBookings($bookings);
    }


    /**
     * Format booking collection to array with consistent structure
     */
    public function formatBookings($bookings): array
    {
        return $bookings->map(function ($booking) {
            return [
                'id' => $booking->id,
                'code' => $booking->code,
                'patient_name' => $booking->patient?->patient_name ?? '-',
                'patient_nik' => $booking->patient?->patient_nik ?? '-',
                'patient_phone' => $booking->patient?->patient_phone ?? '-',
                'patient_email' => $booking->patient?->patient_email ?? '-',
                'patient_gender' => $booking->patient?->gender ?? '-',
                'patient_medical_records' => $booking->patient?->medical_records ?? '-',
                'doctor_name' => $booking->doctor?->name ?? '-',
                'booking_date' => Carbon::parse($booking->booking_date)->format('Y-m-d'),
                'booking_date_formatted' => Carbon::parse($booking->booking_date)->format('d M Y'),
                'start_time' => substr($booking->start_time, 0, 5),
                'status' => $booking->status,
                'doctor_id' => $booking->doctor?->id,
                'created_at' => $booking->created_at->format('Y-m-d H:i:s'),
                'created_at_formatted' => $booking->created_at->format('d M Y H:i'),
                'service' => $booking->service,
                'payment' => $booking->payment ? [
                    'amount' => $booking->payment->amount,
                    'payment_method' => $booking->payment->payment_method,
                    'note' => $booking->payment->note,
                ] : null,
            ];
        })->toArray();
    }

    /**
     * Get comprehensive statistic data for the dashboard statistics page
     * @param string $filterType 'alltime' or 'monthly'
     * @param int|null $year Year for monthly filter
     * @param int|null $month Month for monthly filter
     */
    public function getStatisticData(string $filterType = 'alltime', ?int $year = null, ?int $month = null): array
    {
        return [
            'summary' => $this->getSummaryStatsFiltered($filterType, $year, $month),
            'booking_revenue_trends' => $this->getBookingRevenueTrendsFiltered($filterType, $year, $month),
            'top_services' => $this->getTopServicesFiltered($filterType, $year, $month),
            'doctor_bookings' => $this->getDoctorBookingsFiltered($filterType, $year, $month),
            'recent_patients' => $this->getRecentPatientsFiltered($filterType, $year, $month),
        ];
    }

    /**
     * Get summary statistics with filter
     */
    private function getSummaryStatsFiltered(string $filterType, ?int $year, ?int $month): array
    {
        $query = Booking::query();
        $patientQuery = \App\Models\Patient::query();

        if ($filterType === 'monthly' && $year && $month) {
            $query->whereYear('booking_date', $year)->whereMonth('booking_date', $month);
            $patientQuery->whereYear('created_at', $year)->whereMonth('created_at', $month);
        }

        $totalBookings = $query->count();
        $newPatients = $patientQuery->count();

        // Calculate revenue
        $bookingsWithPayments = (clone $query)->with('payment')->get();
        $totalRevenue = $bookingsWithPayments->sum(function ($booking) {
            return $booking->payment ? $booking->payment->amount : 0;
        });

        // Cancellation rate
        $cancelledQuery = clone $query;
        $cancelled = $cancelledQuery->where('status', 'cancelled')->count();
        $cancellationRate = $totalBookings > 0 ? round(($cancelled / $totalBookings) * 100, 1) : 0;

        // Format revenue
        $formattedRevenue = $totalRevenue >= 1000000 
            ? number_format($totalRevenue / 1000000, 1) . 'M'
            : ($totalRevenue >= 1000 ? number_format($totalRevenue / 1000, 0) . 'K' : (string) $totalRevenue);

        return [
            'total_bookings' => $totalBookings,
            'bookings_change' => 0, // Not calculating change for filtered view
            'new_patients' => $newPatients,
            'patients_change' => 0,
            'total_revenue' => $formattedRevenue,
            'revenue_change' => 0,
            'cancellation_rate' => $cancellationRate,
            'cancellation_sparkline' => [40, 60, 30, 80, 50, 20],
        ];
    }

    private function getBookingRevenueTrendsFiltered(string $filterType, ?int $year, ?int $month): array
    {
        $trends = [];

        if ($filterType === 'monthly' && $year && $month) {
            // Get days in the month
            $startDate = Carbon::createFromDate($year, $month, 1)->startOfMonth();
            $endDate = $startDate->copy()->endOfMonth();
            $daysInMonth = $endDate->day;

            for ($day = 1; $day <= $daysInMonth; $day++) {
                $date = Carbon::createFromDate($year, $month, $day);
                $bookings = Booking::whereDate('booking_date', $date)->with('payment')->get();
                
                $revenue = $bookings->sum(function ($booking) {
                    return $booking->payment ? $booking->payment->amount : 0;
                });

                $trends[] = [
                    'day' => $date->format('d'),
                    'bookings' => $bookings->count(),
                    'revenue' => (int) $revenue,
                ];
            }
        } else {
            // Alltime: Get monthly aggregated data
            // Get first and last booking dates
            $firstBooking = Booking::orderBy('booking_date', 'asc')->first();
            $lastBooking = Booking::orderBy('booking_date', 'desc')->first();

            if (!$firstBooking || !$lastBooking) {
                return [];
            }

            $startDate = Carbon::parse($firstBooking->booking_date)->startOfMonth();
            $endDate = Carbon::parse($lastBooking->booking_date)->endOfMonth();

            while ($startDate->lte($endDate)) {
                $monthStart = $startDate->copy()->startOfMonth();
                $monthEnd = $startDate->copy()->endOfMonth();

                $bookings = Booking::whereBetween('booking_date', [$monthStart, $monthEnd])
                    ->with('payment')
                    ->get();

                $revenue = $bookings->sum(function ($booking) {
                    return $booking->payment ? $booking->payment->amount : 0;
                });

                $trends[] = [
                    'day' => $startDate->format('M Y'),
                    'bookings' => $bookings->count(),
                    'revenue' => (int) $revenue,
                ];

                $startDate->addMonth();
            }
        }

        return $trends;
    }

    /**
     * Get top 5 booked services with filter
     */
    private function getTopServicesFiltered(string $filterType, ?int $year, ?int $month): array
    {
        $query = Booking::query()->whereNotNull('service');

        if ($filterType === 'monthly' && $year && $month) {
            $query->whereYear('booking_date', $year)->whereMonth('booking_date', $month);
        }

        $services = $query
            ->select('service', DB::raw('COUNT(*) as count'))
            ->groupBy('service')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        $total = $services->sum('count');

        if ($services->isEmpty()) {
            return [
                ['name' => 'Konsultasi Gigi', 'count' => 45, 'percentage' => 36],
                ['name' => 'Pembersihan Karang Gigi', 'count' => 32, 'percentage' => 26],
                ['name' => 'Tambal Gigi', 'count' => 24, 'percentage' => 19],
                ['name' => 'Cabut Gigi', 'count' => 15, 'percentage' => 12],
                ['name' => 'Perawatan Saluran Akar', 'count' => 9, 'percentage' => 7],
            ];
        }

        return $services->map(function ($service) use ($total) {
            return [
                'name' => $service->service,
                'count' => $service->count,
                'percentage' => $total > 0 ? round(($service->count / $total) * 100) : 0,
            ];
        })->toArray();
    }

    /**
     * Get bookings count per doctor with filter
     */
    private function getDoctorBookingsFiltered(string $filterType, ?int $year, ?int $month): array
    {
        $doctorBookings = \App\Models\Doctor::withCount(['bookings' => function ($query) use ($filterType, $year, $month) {
            if ($filterType === 'monthly' && $year && $month) {
                $query->whereYear('booking_date', $year)->whereMonth('booking_date', $month);
            }
        }])
        ->where('is_active', true)
        ->orderByDesc('bookings_count')
        ->get();

        if ($doctorBookings->isEmpty() || $doctorBookings->sum('bookings_count') === 0) {
            return [
                ['id' => 1, 'name' => 'Dr. Sarah Putri', 'bookings' => 45, 'profile_pic' => null],
                ['id' => 2, 'name' => 'Dr. John Doe', 'bookings' => 38, 'profile_pic' => null],
                ['id' => 3, 'name' => 'Dr. Amanda Lee', 'bookings' => 32, 'profile_pic' => null],
            ];
        }

        return $doctorBookings->map(function ($doctor) {
            return [
                'id' => $doctor->id,
                'name' => $doctor->name,
                'bookings' => $doctor->bookings_count,
                'profile_pic' => $doctor->profile_pic ? asset('storage/' . $doctor->profile_pic) : null,
            ];
        })->toArray();
    }

    /**
     * Get recent patients with filter
     */
    private function getRecentPatientsFiltered(string $filterType, ?int $year, ?int $month): array
    {
        $query = \App\Models\Patient::query();

        if ($filterType === 'monthly' && $year && $month) {
            $query->whereYear('created_at', $year)->whereMonth('created_at', $month);
        }

        $patients = $query->orderBy('created_at', 'desc')->take(5)->get();

        if ($patients->isEmpty()) {
            return [
                [
                    'id' => 'P-001',
                    'name' => 'Budi Santoso',
                    'nik' => '3201010101900001',
                    'phone' => '08123456789',
                    'gender' => 'male',
                    'joined_date' => 'Jan 18, 2026',
                ],
            ];
        }

        return $patients->map(function ($patient) {
            return [
                'id' => 'P-' . str_pad($patient->id, 3, '0', STR_PAD_LEFT),
                'name' => $patient->patient_name,
                'nik' => $patient->patient_nik ?? '-',
                'phone' => $patient->patient_phone ?? '-',
                'gender' => $patient->gender ?? 'male',
                'joined_date' => Carbon::parse($patient->created_at)->format('M d, Y'),
            ];
        })->toArray();
    }

    /**
     * Get summary statistics
     */
    private function getSummaryStats(Carbon $today): array
    {
        $bookingsToday = $this->getBookingsToday($today);
        $lastWeekBookings = Booking::whereDate('booking_date', $today->copy()->subWeek())->count();
        $bookingsChange = $lastWeekBookings > 0
            ? round((($bookingsToday - $lastWeekBookings) / $lastWeekBookings) * 100)
            : 0;

        // New patients this week
        $newPatientsCount = \App\Models\Patient::whereDate('created_at', '>=', $today->copy()->startOfWeek())->count();
        $lastWeekPatients = \App\Models\Patient::whereBetween('created_at', [
            $today->copy()->subWeek()->startOfWeek(),
            $today->copy()->subWeek()->endOfWeek()
        ])->count();
        $patientsChange = $lastWeekPatients > 0
            ? round((($newPatientsCount - $lastWeekPatients) / $lastWeekPatients) * 100)
            : 5;

        // Cancellation rate
        $totalBookingsMonth = Booking::whereMonth('booking_date', $today->month)->count();
        $cancelledMonth = Booking::whereMonth('booking_date', $today->month)
            ->where('status', 'cancelled')
            ->count();
        $cancellationRate = $totalBookingsMonth > 0
            ? round(($cancelledMonth / $totalBookingsMonth) * 100, 1)
            : 0;

        return [
            'total_bookings' => $bookingsToday,
            'bookings_change' => (int) $bookingsChange,
            'new_patients' => $newPatientsCount > 0 ? $newPatientsCount : 45,
            'patients_change' => (int) $patientsChange,
            'total_revenue' => '15.2m', // Mock data - would need Payment model
            'revenue_change' => -2,
            'cancellation_rate' => $cancellationRate > 0 ? $cancellationRate : 4.2,
            'cancellation_sparkline' => [40, 60, 30, 80, 50, 20],
        ];
    }

    /**
     * Get booking trends for the last 7 days
     */
    private function getBookingTrends(): array
    {
        $days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        $trends = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $count = Booking::whereDate('booking_date', $date)->count();
            $dayIndex = $date->dayOfWeekIso - 1; // 0 = Monday

            $trends[] = [
                'day' => $days[$dayIndex],
                'percentage' => min($count * 10, 100), // Scale for visualization
            ];
        }

        // If no real data, return mock data
        if (array_sum(array_column($trends, 'percentage')) === 0) {
            return [
                ['day' => 'Mon', 'percentage' => 40],
                ['day' => 'Tue', 'percentage' => 65],
                ['day' => 'Wed', 'percentage' => 55],
                ['day' => 'Thu', 'percentage' => 85],
                ['day' => 'Fri', 'percentage' => 70],
                ['day' => 'Sat', 'percentage' => 30],
                ['day' => 'Sun', 'percentage' => 45],
            ];
        }

        return $trends;
    }

    /**
     * Get revenue sources breakdown
     */
    private function getRevenueSources(): array
    {
        // Mock data - would need Payment/Service models for real data
        return [
            'total' => '15.2M',
            'sources' => [
                [
                    'name' => 'Consultation',
                    'percentage' => 55,
                    'amount' => '8.36M',
                    'color' => '#0da2e7',
                ],
                [
                    'name' => 'Treatment',
                    'percentage' => 30,
                    'amount' => '4.56M',
                    'color' => '#078836',
                ],
                [
                    'name' => 'Medicines',
                    'percentage' => 15,
                    'amount' => '2.28M',
                    'color' => '#f59e0b',
                ],
            ],
        ];
    }

    /**
     * Get peak hours heatmap data
     */
    private function getPeakHoursData(): array
    {
        // Mock data - 4 rows (time periods) x 7 columns (days)
        return [
            // Row 1: 08:00
            [
                ['intensity' => 10], ['intensity' => 30], ['intensity' => 60],
                ['intensity' => 20], ['intensity' => 40], ['intensity' => 10], ['intensity' => 0],
            ],
            // Row 2: 10:00
            [
                ['intensity' => 40], ['intensity' => 80], ['intensity' => 100],
                ['intensity' => 50], ['intensity' => 60], ['intensity' => 20], ['intensity' => 10],
            ],
            // Row 3: 12:00
            [
                ['intensity' => 20], ['intensity' => 30], ['intensity' => 20],
                ['intensity' => 10], ['intensity' => 20], ['intensity' => 0], ['intensity' => 0],
            ],
            // Row 4: 14:00+
            [
                ['intensity' => 60], ['intensity' => 70], ['intensity' => 90],
                ['intensity' => 50], ['intensity' => 80], ['intensity' => 30], ['intensity' => 10],
            ],
        ];
    }

    /**
     * Get recent bookings for statistic page
     */
    private function getRecentBookingsForStatistic(): array
    {
        $bookings = Booking::with(['doctor', 'patient'])
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();

        if ($bookings->isEmpty()) {
            // Return mock data if no bookings
            return [
                [
                    'id' => '#BK-092',
                    'patient_name' => 'Budi Santoso',
                    'patient_avatar' => null,
                    'doctor_name' => 'Dr. Sarah P.',
                    'date_time' => 'Oct 24, 10:00',
                    'status' => 'pending',
                ],
                [
                    'id' => '#BK-091',
                    'patient_name' => 'Siti Aminah',
                    'patient_avatar' => null,
                    'doctor_name' => 'Dr. John D.',
                    'date_time' => 'Oct 24, 09:30',
                    'status' => 'completed',
                ],
                [
                    'id' => '#BK-090',
                    'patient_name' => 'Marcus Lee',
                    'patient_avatar' => null,
                    'doctor_name' => 'Dr. Sarah P.',
                    'date_time' => 'Oct 23, 16:00',
                    'status' => 'cancelled',
                ],
                [
                    'id' => '#BK-089',
                    'patient_name' => 'Jessica Wong',
                    'patient_avatar' => null,
                    'doctor_name' => 'Dr. John D.',
                    'date_time' => 'Oct 23, 14:45',
                    'status' => 'completed',
                ],
            ];
        }

        return $bookings->map(function ($booking) {
            $statusMap = [
                'confirmed' => 'pending',
                'checked_in' => 'completed',
                'cancelled' => 'cancelled',
                'no_show' => 'cancelled',
            ];

            return [
                'id' => '#BK-' . str_pad($booking->id, 3, '0', STR_PAD_LEFT),
                'patient_name' => $booking->patient?->patient_name ?? 'Unknown',
                'patient_avatar' => null,
                'doctor_name' => $booking->doctor?->name ?? 'Unknown',
                'date_time' => Carbon::parse($booking->booking_date)->format('M d') . ', ' . substr($booking->start_time, 0, 5),
                'status' => $statusMap[$booking->status] ?? 'pending',
            ];
        })->toArray();
    }

    /**
     * Get new patients for statistic page
     */
    private function getNewPatientsForStatistic(): array
    {
        $patients = \App\Models\Patient::orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        if ($patients->isEmpty()) {
            // Return mock data if no patients
            return [
                [
                    'id' => 'P-2023-001',
                    'name' => 'Ahmad Dahlan',
                    'age' => 45,
                    'gender' => 'Male',
                    'joined_date' => 'Oct 20, 2023',
                    'address' => 'Jl. Sudirman No. 45, Jakarta',
                ],
                [
                    'id' => 'P-2023-002',
                    'name' => 'Rina Wati',
                    'age' => 29,
                    'gender' => 'Female',
                    'joined_date' => 'Oct 19, 2023',
                    'address' => 'Komp. Melati Indah B2',
                ],
                [
                    'id' => 'P-2023-003',
                    'name' => 'Doni Tata',
                    'age' => 32,
                    'gender' => 'Male',
                    'joined_date' => 'Oct 18, 2023',
                    'address' => 'Apartemen City Green',
                ],
            ];
        }

        return $patients->map(function ($patient) {
            $age = $patient->patient_birthdate
                ? Carbon::parse($patient->patient_birthdate)->age
                : 30;

            return [
                'id' => 'P-' . Carbon::parse($patient->created_at)->format('Y') . '-' . str_pad($patient->id, 3, '0', STR_PAD_LEFT),
                'name' => $patient->patient_name,
                'age' => $age,
                'gender' => $patient->gender === 'L' ? 'Male' : 'Female',
                'joined_date' => Carbon::parse($patient->created_at)->format('M d, Y'),
                'address' => $patient->patient_address ?? '-',
            ];
        })->toArray();
    }

    /**
     * Get booking and revenue trends for the last 7 days
     */
    private function getBookingRevenueTrends(): array
    {
        $days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        $trends = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $bookings = Booking::whereDate('booking_date', $date)->get();
            $count = $bookings->count();
            
            // Calculate revenue from bookings with payments
            $revenue = $bookings->sum(function ($booking) {
                return $booking->payment ? $booking->payment->amount : 0;
            });

            $dayIndex = $date->dayOfWeekIso - 1; // 0 = Monday

            $trends[] = [
                'day' => $days[$dayIndex],
                'bookings' => $count,
                'revenue' => (int) $revenue,
            ];
        }

        // If no real data, return mock data
        $totalBookings = array_sum(array_column($trends, 'bookings'));
        if ($totalBookings === 0) {
            return [
                ['day' => 'Mon', 'bookings' => 8, 'revenue' => 2400000],
                ['day' => 'Tue', 'bookings' => 12, 'revenue' => 3600000],
                ['day' => 'Wed', 'bookings' => 10, 'revenue' => 3000000],
                ['day' => 'Thu', 'bookings' => 15, 'revenue' => 4500000],
                ['day' => 'Fri', 'bookings' => 14, 'revenue' => 4200000],
                ['day' => 'Sat', 'bookings' => 6, 'revenue' => 1800000],
                ['day' => 'Sun', 'bookings' => 9, 'revenue' => 2700000],
            ];
        }

        return $trends;
    }

    /**
     * Get top 5 booked services
     */
    private function getTopServices(): array
    {
        $today = Carbon::today();
        
        $services = Booking::whereMonth('booking_date', $today->month)
            ->whereYear('booking_date', $today->year)
            ->whereNotNull('service')
            ->select('service', \DB::raw('COUNT(*) as count'))
            ->groupBy('service')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        $total = $services->sum('count');

        if ($services->isEmpty()) {
            // Return mock data
            return [
                ['name' => 'Konsultasi Gigi', 'count' => 45, 'percentage' => 36],
                ['name' => 'Pembersihan Karang Gigi', 'count' => 32, 'percentage' => 26],
                ['name' => 'Tambal Gigi', 'count' => 24, 'percentage' => 19],
                ['name' => 'Cabut Gigi', 'count' => 15, 'percentage' => 12],
                ['name' => 'Perawatan Saluran Akar', 'count' => 9, 'percentage' => 7],
            ];
        }

        return $services->map(function ($service) use ($total) {
            return [
                'name' => $service->service,
                'count' => $service->count,
                'percentage' => $total > 0 ? round(($service->count / $total) * 100) : 0,
            ];
        })->toArray();
    }

    /**
     * Get bookings count per doctor for this month
     */
    private function getDoctorBookings(): array
    {
        $today = Carbon::today();

        $doctorBookings = \App\Models\Doctor::withCount(['bookings' => function ($query) use ($today) {
            $query->whereMonth('booking_date', $today->month)
                  ->whereYear('booking_date', $today->year);
        }])
        ->where('is_active', true)
        ->orderByDesc('bookings_count')
        ->get();

        if ($doctorBookings->isEmpty() || $doctorBookings->sum('bookings_count') === 0) {
            // Return mock data
            return [
                ['id' => 1, 'name' => 'Dr. Sarah Putri', 'bookings' => 45, 'profile_pic' => null],
                ['id' => 2, 'name' => 'Dr. John Doe', 'bookings' => 38, 'profile_pic' => null],
                ['id' => 3, 'name' => 'Dr. Amanda Lee', 'bookings' => 32, 'profile_pic' => null],
            ];
        }

        return $doctorBookings->map(function ($doctor) {
            return [
                'id' => $doctor->id,
                'name' => $doctor->name,
                'bookings' => $doctor->bookings_count,
                'profile_pic' => $doctor->profile_pic ? asset('storage/' . $doctor->profile_pic) : null,
            ];
        })->toArray();
    }

    /**
     * Get recent patients for statistic page
     */
    private function getRecentPatientsForStatistic(): array
    {
        $patients = \App\Models\Patient::orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        if ($patients->isEmpty()) {
            // Return mock data
            return [
                [
                    'id' => 'P-001',
                    'name' => 'Budi Santoso',
                    'nik' => '3201****1234',
                    'phone' => '08123****789',
                    'gender' => 'L',
                    'joined_date' => 'Jan 18, 2026',
                ],
                [
                    'id' => 'P-002',
                    'name' => 'Siti Aminah',
                    'nik' => '3202****5678',
                    'phone' => '08567****012',
                    'gender' => 'P',
                    'joined_date' => 'Jan 17, 2026',
                ],
                [
                    'id' => 'P-003',
                    'name' => 'Ahmad Dahlan',
                    'nik' => '3203****9012',
                    'phone' => '08234****345',
                    'gender' => 'L',
                    'joined_date' => 'Jan 16, 2026',
                ],
            ];
        }

        return $patients->map(function ($patient) {
            // Mask NIK for privacy
            $nik = $patient->patient_nik;
            $maskedNik = strlen($nik) > 8 
                ? substr($nik, 0, 4) . '****' . substr($nik, -4) 
                : $nik;

            // Mask phone for privacy
            $phone = $patient->patient_phone;
            $maskedPhone = strlen($phone) > 8 
                ? substr($phone, 0, 5) . '****' . substr($phone, -3) 
                : $phone;

            return [
                'id' => 'P-' . str_pad($patient->id, 3, '0', STR_PAD_LEFT),
                'name' => $patient->patient_name,
                'nik' => $maskedNik,
                'phone' => $maskedPhone,
                'gender' => $patient->gender ?? 'L',
                'joined_date' => Carbon::parse($patient->created_at)->format('M d, Y'),
            ];
        })->toArray();
    }
}


