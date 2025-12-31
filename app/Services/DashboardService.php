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

        $bookings = Booking::with(['doctor', 'patientDetail'])
            ->whereDate('booking_date', $today)
            ->orderBy('start_time', 'asc')
            ->get();

        return $bookings->map(function ($booking) {
            return [
                'id' => $booking->id,
                'code' => $booking->code,
                'patient_name' => $booking->patientDetail?->patient_name ?? '-',
                'patient_phone' => $booking->patientDetail?->patient_phone ?? '-',
                'doctor_name' => $booking->doctor?->name ?? '-',
                'booking_date' => Carbon::parse($booking->booking_date)->format('d M Y'),
                'start_time' => substr($booking->start_time, 0, 5),
                'status' => $booking->status,
                'created_at' => $booking->created_at->format('d M Y H:i'),
            ];
        })->toArray();
    }

    public function getRecentBookings(int $limit = 10): array
    {
        $bookings = Booking::with(['doctor', 'patientDetail'])
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();

        return $bookings->map(function ($booking) {
            return [
                'id' => $booking->id,
                'code' => $booking->code,
                'patient_name' => $booking->patientDetail?->patient_name ?? '-',
                'patient_phone' => $booking->patientDetail?->patient_phone ?? '-',
                'doctor_name' => $booking->doctor?->name ?? '-',
                'booking_date' => Carbon::parse($booking->booking_date)->format('d M Y'),
                'start_time' => substr($booking->start_time, 0, 5),
                'status' => $booking->status,
                'created_at' => $booking->created_at->format('d M Y H:i'),
            ];
        })->toArray();
    }

    public function getAllBookings(): array
    {
        $bookings = Booking::with(['doctor', 'patientDetail'])
            ->orderBy('booking_date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        return $bookings->map(function ($booking) {
            return [
                'id' => $booking->id,
                'code' => $booking->code,
                'patient_name' => $booking->patientDetail?->patient_name ?? '-',
                'patient_nik' => $booking->patientDetail?->patient_nik ?? '-',
                'patient_phone' => $booking->patientDetail?->patient_phone ?? '-',
                'patient_email' => $booking->patientDetail?->patient_email ?? '-',
                'doctor_name' => $booking->doctor?->name ?? '-',
                'booking_date' => Carbon::parse($booking->booking_date)->format('Y-m-d'),
                'booking_date_formatted' => Carbon::parse($booking->booking_date)->format('d M Y'),
                'start_time' => substr($booking->start_time, 0, 5),
                'status' => $booking->status,
                'complaint' => $booking->patientDetail?->complaint ?? '-',
                'created_at' => $booking->created_at->format('Y-m-d H:i:s'),
                'created_at_formatted' => $booking->created_at->format('d M Y H:i'),
            ];
        })->toArray();
    }
}

