<?php

namespace App\Console\Commands;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MarkNoShowScheduler extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bookings:mark-no-show';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Mark bookings as no_show if not checked in and booking date has passed';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $today = Carbon::today();

        // Find confirmed bookings where booking_date < today
        $expiredBookings = Booking::where('status', 'confirmed')
            ->whereDate('booking_date', '<', $today)
            ->get();

        $count = $expiredBookings->count();

        if ($count === 0) {
            $this->info('No expired bookings to mark as no_show.');
            return 0;
        }

        $this->info("Found {$count} expired booking(s) to mark as no_show.");

        foreach ($expiredBookings as $booking) {
            $booking->update(['status' => 'no_show']);
            $this->line("  - Marked booking {$booking->code} as no_show (was scheduled for {$booking->booking_date->format('Y-m-d')})");
        }

        $this->info("Successfully marked {$count} booking(s) as no_show.");

        return 0;
    }
}
