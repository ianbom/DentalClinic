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
        $bookings = Booking::with(['doctor', 'patient', 'payment'])
            ->orderBy('booking_date', 'asc')
            ->orderBy('start_time', 'asc')
            ->get();

        return $this->dashboardService->formatBookings($bookings);
    }

    public function getBookingDetail(int $bookingId): ?array
    {
        $booking = Booking::with(['doctor', 'patient', 'payment', 'checkin', 'cancellation', 'reschedules'])
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
            'service' => $booking->service,
            
            // Patient info
            'patient' => [
                'id' => $booking->patient?->id,
                'medical_records' => $booking->patient?->medical_records,
                'name' => $booking->patient?->patient_name ?? '-',
                'nik' => $booking->patient?->patient_nik ?? '-',
                'phone' => $booking->patient?->patient_phone ?? '-',
                'gender' => $booking->patient?->gender,
                'birthdate' => $booking->patient?->patient_birthdate?->format('Y-m-d'),
                'birthdate_formatted' => $booking->patient?->patient_birthdate?->translatedFormat('d F Y'),
                'address' => $booking->patient?->patient_address,
            ],
            
            // Doctor info
            'doctor' => [
                'id' => $booking->doctor?->id,
                'name' => $booking->doctor?->name ?? '-',
                'sip' => $booking->doctor?->sip ?? '-',
                'experience' => $booking->doctor?->experience ?? 0,
                'profile_pic' => $booking->doctor?->profile_pic,
            ],
            
            // Payment info
            'payment' => $booking->payment ? [
                'amount' => $booking->payment->amount,
                'payment_method' => $booking->payment->payment_method,
                'note' => $booking->payment->note,
            ] : null,
            
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

    /**
     * Update booking and patient data
     */
    public function updateBookingFull(int $bookingId, array $data): Booking
    {
        $booking = Booking::with(['patient', 'payment', 'checkin', 'cancellation'])->findOrFail($bookingId);
        
        // Update booking data
        $booking->update([
            'doctor_id' => $data['doctor_id'],
            'service' => $data['service'],
            'type' => $data['type'],
            'booking_date' => $data['booking_date'],
            'start_time' => $data['start_time'] ?? null,
            'status' => $data['status'],
        ]);

        // Update patient data
        $booking->patient->update([
            'patient_name' => $data['patient_name'],
            'patient_nik' => $data['patient_nik'],
            'patient_phone' => $data['patient_phone'],
            'patient_email' => $data['patient_email'] ?? null,
            'patient_birthdate' => $data['patient_birthdate'] ?? null,
            'patient_address' => $data['patient_address'] ?? null,
            'gender' => $data['patient_gender'] ?? null,
            'medical_records' => $data['patient_medical_records'] ?? $booking->patient->medical_records,
        ]);

        // Handle payment data
        if (!empty($data['payment_amount'])) {
            $booking->payment()->updateOrCreate(
                ['booking_id' => $bookingId],
                [
                    'amount' => $data['payment_amount'],
                    'payment_method' => $data['payment_method'] ?? 'cash',
                    'note' => $data['payment_note'] ?? null,
                ]
            );
        } elseif ($booking->payment && empty($data['payment_amount'])) {
            // If amount is cleared, delete the payment
            $booking->payment->delete();
        }

        // Handle checkin data
        if (!empty($data['checked_in_at'])) {
            $booking->checkin()->updateOrCreate(
                ['booking_id' => $bookingId],
                ['checked_in_at' => $data['checked_in_at']]
            );
        } elseif ($booking->checkin && empty($data['checked_in_at'])) {
            $booking->checkin->delete();
        }

        // Handle cancellation data
        if (!empty($data['cancelled_at'])) {
            $booking->cancellation()->updateOrCreate(
                ['booking_id' => $bookingId],
                [
                    'cancelled_at' => $data['cancelled_at'],
                    'cancelled_by' => $data['cancelled_by'] ?? 'admin',
                    'reason' => $data['cancellation_reason'] ?? null,
                ]
            );
        } elseif ($booking->cancellation && empty($data['cancelled_at'])) {
            $booking->cancellation->delete();
        }

        return $booking->fresh(['patient', 'doctor', 'payment', 'checkin', 'cancellation']);
    }
}
