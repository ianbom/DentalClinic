<?php

namespace App\Services;

use App\Models\Booking;
use Carbon\Carbon;

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
                'patient_medical_records' => $booking->patient?->medical_records ?? '-',
                'doctor_name' => $booking->doctor?->name ?? '-',
                'booking_date' => Carbon::parse($booking->booking_date)->format('Y-m-d'),
                'booking_date_formatted' => Carbon::parse($booking->booking_date)->format('d M Y'),
                'start_time' => substr($booking->start_time, 0, 5),
                'status' => $booking->status,
                'doctor_id' => $booking->doctor?->id,
                'created_at' => $booking->created_at->format('Y-m-d H:i:s'),
                'created_at_formatted' => $booking->created_at->format('d M Y H:i'),
                'service' => $booking->service
            ];
        })->toArray();
    }
}


