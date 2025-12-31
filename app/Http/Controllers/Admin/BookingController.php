<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Services\Admin\BookingService;
use Inertia\Inertia;

class BookingController extends Controller
{
    protected BookingService $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function listBooking()
    {
        $bookings = $this->bookingService->getAllBookings();
        
        // Get doctors for filter dropdown
        $doctors = Doctor::where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('admin/bookings/ListBooking', [
            'bookings' => $bookings,
            'doctors' => $doctors,
        ]);
    }

    public function bookingDetail(int $bookingId)
    {
        $booking = $this->bookingService->getBookingDetail($bookingId);

        if (!$booking) {
            abort(404, 'Booking tidak ditemukan');
        }

        return Inertia::render('admin/bookings/DetailBooking', [
            'booking' => $booking,
        ]);
    }
}
