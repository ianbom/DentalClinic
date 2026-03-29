<?php

namespace App\Console\Commands;

use App\Jobs\SendFailedNotificationJob;
use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SendFailedMessageScheduller extends Command
{
    protected $signature = 'notifications:retry-failed';

    protected $description = 'Retry sending failed notifications with attempt limit';

    public const MAX_RETRY_ATTEMPTS = 10;
    public const RETRY_AFTER_MINUTES = 5;

    public function handle(): int
    {
        $retryThreshold = Carbon::now()->subMinutes(self::RETRY_AFTER_MINUTES);
        
        // Get failed notifications that haven't exceeded max retry attempts
        // and haven't been retried in the last RETRY_AFTER_MINUTES
        $failedNotifications = Notification::where('status', 'failed')
            ->where('attempt_count', '<', self::MAX_RETRY_ATTEMPTS)
            ->where('updated_at', '<=', $retryThreshold)
            ->get();

        $count = $failedNotifications->count();

        if ($count === 0) {
            $this->info('No failed notifications to retry.');
            return self::SUCCESS;
        }

        $this->info("Found {$count} failed notification(s) to retry.");

        foreach ($failedNotifications as $notification) {
            // Mark as retrying to prevent duplicate dispatch
            $notification->update(['status' => 'retrying']);
            
            // Dispatch job to retry sending
            SendFailedNotificationJob::dispatch($notification->id);
            
            $this->line("  - Dispatched retry job for notification ID: {$notification->id} (Attempt: {$notification->attempt_count}/{self::MAX_RETRY_ATTEMPTS})");
        }

        $this->info("Successfully dispatched {$count} retry job(s).");

        return self::SUCCESS;
    }
}
