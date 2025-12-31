<?php

namespace App\Services\Admin;

use App\Models\Booking;
use App\Services\DashboardService;
use Carbon\Carbon;

class BookingService
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function getAllBookings(): array
    {
        $bookings = Booking::with(['doctor', 'patientDetail'])
            ->orderBy('booking_date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        return $this->dashboardService->formatBookings($bookings);
    }

    public function getBookingDetail(int $bookingId): ?array
    {
        $booking = Booking::with(['doctor', 'patientDetail', 'checkin', 'cancellation', 'reschedules'])
            ->find($bookingId);

        if (!$booking) {
            return null;
        }

        return [
            'id' => $booking->id,
            'code' => $booking->code,
            'status' => $booking->status,
            'booking_date' => Carbon::parse($booking->booking_date)->format('Y-m-d'),
            'booking_date_formatted' => Carbon::parse($booking->booking_date)->translatedFormat('l, d F Y'),
            'start_time' => substr($booking->start_time, 0, 5),
            'created_at' => $booking->created_at->format('Y-m-d H:i:s'),
            'created_at_formatted' => $booking->created_at->translatedFormat('d F Y, H:i'),
            
            // Patient info
            'patient' => [
                'name' => $booking->patientDetail?->patient_name ?? '-',
                'nik' => $booking->patientDetail?->patient_nik ?? '-',
                'phone' => $booking->patientDetail?->patient_phone ?? '-',
                'email' => $booking->patientDetail?->patient_email ?? '-',
                'complaint' => $booking->patientDetail?->complaint ?? '-',
            ],
            
            // Doctor info
            'doctor' => [
                'id' => $booking->doctor?->id,
                'name' => $booking->doctor?->name ?? '-',
                'sip' => $booking->doctor?->sip ?? '-',
                'experience' => $booking->doctor?->experience ?? 0,
                'profile_pic' => $booking->doctor?->profile_pic,
            ],
            
            // Check-in info
            'checkin' => $booking->checkin ? [
                'checked_in_at' => $booking->checkin->checked_in_at->format('Y-m-d H:i:s'),
                'checked_in_at_formatted' => $booking->checkin->checked_in_at->translatedFormat('d F Y, H:i'),
            ] : null,
            
            // Cancellation info
            'cancellation' => $booking->cancellation ? [
                'cancelled_at' => $booking->cancellation->cancelled_at,
                'cancelled_by' => $booking->cancellation->cancelled_by,
                'reason' => $booking->cancellation->reason,
            ] : null,
            
            // Reschedules history
            'reschedules' => $booking->reschedules->map(function ($reschedule) {
                return [
                    'id' => $reschedule->id,
                    'old_date' => Carbon::parse($reschedule->old_date)->format('d M Y'),
                    'old_time' => substr($reschedule->old_start_time, 0, 5),
                    'new_date' => Carbon::parse($reschedule->new_date)->format('d M Y'),
                    'new_time' => substr($reschedule->new_start_time, 0, 5),
                    'reason' => $reschedule->reason,
                    'status' => $reschedule->status,
                    'created_at' => $reschedule->created_at->format('d M Y H:i'),
                ];
            })->toArray(),
        ];
    }
}
