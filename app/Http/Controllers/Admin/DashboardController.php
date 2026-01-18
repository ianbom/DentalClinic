<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\DashboardService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function dashboard()
    {
        $stats = $this->dashboardService->getDashboardStats();
        $todayBookings = $this->dashboardService->getTodayBookingsList();
        $recentBookings = $this->dashboardService->getRecentBookings(5);

        return Inertia::render('admin/dashboard/Dashboard', [
            'stats' => $stats,
            'todayBookings' => $todayBookings,
            'recentBookings' => $recentBookings,
        ]);
    }

    public function statistic(Request $request)
    {
        // Get filter parameters
        $month = $request->query('month'); // Format: "2025-12" or "alltime"
        $filterType = $month === 'alltime' || !$month ? 'alltime' : 'monthly';
        
        // Parse month and year if not alltime
        $year = null;
        $monthNum = null;
        if ($filterType === 'monthly' && $month) {
            $parts = explode('-', $month);
            if (count($parts) === 2) {
                $year = (int) $parts[0];
                $monthNum = (int) $parts[1];
            }
        }

        $stats = $this->dashboardService->getStatisticData($filterType, $year, $monthNum);
        $currentDate = now()->format('M d, Y');

        // Generate available months for filter (last 12 months)
        $availableMonths = $this->getAvailableMonths();

        return Inertia::render('admin/dashboard/Statistic', [
            'summaryStats' => $stats['summary'],
            'bookingRevenueTrends' => $stats['booking_revenue_trends'],
            'topServices' => $stats['top_services'],
            'doctorBookings' => $stats['doctor_bookings'],
            'recentPatients' => $stats['recent_patients'],
            'currentDate' => $currentDate,
            'availableMonths' => $availableMonths,
            'selectedMonth' => $month ?? 'alltime',
        ]);
    }

    /**
     * Export statistics data to CSV
     */
    public function exportCsv(Request $request): Response
    {
        $month = $request->query('month'); // Format: "2025-12" or "alltime"
        
        // Build query
        $query = Booking::with(['patient', 'doctor', 'payment']);

        // Apply filter
        if ($month && $month !== 'alltime') {
            $parts = explode('-', $month);
            if (count($parts) === 2) {
                $year = (int) $parts[0];
                $monthNum = (int) $parts[1];
                $query->whereYear('booking_date', $year)
                      ->whereMonth('booking_date', $monthNum);
            }
        }

        $bookings = $query->orderBy('booking_date', 'desc')->get();

        // Generate CSV content
        $headers = [
            'No',
            // Patient data
            'No Rekam Medis',
            'Nama',
            'NIK',
            'No Telp',
            'Tanggal Lahir',
            'Alamat',
            'Gender',
            // Booking data
            'Kode Booking',
            'Layanan',
            'Tanggal Periksa',
            'Waktu Periksa',
            'Status',
            // Doctor data
            'Dokter',
            // Payment data
            'Nominal Pembayaran',
            'Metode Pembayaran',
            'Catatan Pembayaran',
        ];

        $rows = [];
        $no = 1;

        foreach ($bookings as $booking) {
            $patient = $booking->patient;
            $doctor = $booking->doctor;
            $payment = $booking->payment;

            $rows[] = [
                $no++,
                // Patient data
                $patient?->medical_records ?? '-',
                $patient?->patient_name ?? '-',
                $patient?->patient_nik ?? '-',
                $patient?->patient_phone ?? '-',
                $patient?->patient_birthdate ? Carbon::parse($patient->patient_birthdate)->format('Y-m-d') : '-',
                $patient?->patient_address ?? '-',
                $patient?->gender ?? '-',
                // Booking data
                $booking->code ?? '-',
                $booking->service ?? '-',
                $booking->booking_date ? Carbon::parse($booking->booking_date)->format('Y-m-d') : '-',
                $booking->start_time ?? '-',
                $booking->status ?? '-',
                // Doctor data
                $doctor?->name ?? '-',
                // Payment data
                $payment?->amount ?? 0,
                $payment?->payment_method ?? '-',
                $payment?->note ?? '-',
            ];
        }

        // Generate CSV string
        $csv = implode(',', $headers) . "\n";
        foreach ($rows as $row) {
            // Escape values with commas or quotes
            $escapedRow = array_map(function ($value) {
                if (is_string($value) && (str_contains($value, ',') || str_contains($value, '"') || str_contains($value, "\n"))) {
                    return '"' . str_replace('"', '""', $value) . '"';
                }
                return $value;
            }, $row);
            $csv .= implode(',', $escapedRow) . "\n";
        }

        // Generate filename
        $filename = 'booking_report_';
        if ($month && $month !== 'alltime') {
            $filename .= str_replace('-', '_', $month);
        } else {
            $filename .= 'alltime';
        }
        $filename .= '_' . now()->format('Ymd_His') . '.csv';

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
        ]);
    }

    /**
     * Get available months for filter dropdown
     */
    private function getAvailableMonths(): array
    {
        $months = [];
        $current = now();

        // Add last 12 months
        for ($i = 0; $i < 12; $i++) {
            $date = $current->copy()->subMonths($i);
            $months[] = [
                'value' => $date->format('Y-m'),
                'label' => $date->format('F Y'),
            ];
        }

        return $months;
    }
}
