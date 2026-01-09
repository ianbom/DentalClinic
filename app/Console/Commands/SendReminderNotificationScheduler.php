<?php

namespace App\Console\Commands;

use App\Jobs\SendReminderNotificationJob;
use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SendReminderNotificationScheduler extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:send-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send pending reminder notifications when scheduled time has arrived';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();

        // Get all pending notifications where scheduled_at <= now
        $pendingNotifications = Notification::where('status', 'pending')
            ->whereNotNull('scheduled_at')
            ->where('scheduled_at', '<=', $now)
            ->where('type', 'reminder')
            ->get();

        $count = $pendingNotifications->count();

        if ($count === 0) {
            $this->info('No pending reminder notifications to send.');
            return 0;
        }

        $this->info("Found {$count} pending reminder notification(s) to send.");

        foreach ($pendingNotifications as $notification) {
            // Dispatch job for each notification
            SendReminderNotificationJob::dispatch($notification->id);
            
            $this->line("  - Dispatched job for notification ID: {$notification->id} (Booking: {$notification->booking_id})");
        }

        $this->info("Successfully dispatched {$count} reminder notification job(s).");

        return 0;
    }
}
