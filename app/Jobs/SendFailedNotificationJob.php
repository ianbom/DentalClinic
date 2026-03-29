<?php

namespace App\Jobs;

use App\Console\Commands\SendFailedMessageScheduller;
use App\Models\Notification;
use App\Services\WhatsappService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendFailedNotificationJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 1; // Don't retry job itself, we handle retries via scheduler

    public function __construct(
        protected int $notificationId
    ) {}

    public function handle(WhatsappService $whatsappService): void
    {
        $notification = Notification::with('booking')->find($this->notificationId);

        if (!$notification) {
            Log::warning('SendFailedNotificationJob: Notification not found', [
                'notification_id' => $this->notificationId,
            ]);
            return;
        }

        // Only process retrying or failed notifications
        if (!in_array($notification->status, ['failed', 'retrying'])) {
            Log::info('SendFailedNotificationJob: Notification is not in failed/retrying status', [
                'notification_id' => $this->notificationId,
                'status' => $notification->status,
            ]);
            return;
        }

        // Check max attempt limit
        if ($notification->attempt_count >= SendFailedMessageScheduller::MAX_RETRY_ATTEMPTS) {
            $notification->update([
                'status' => 'permanently_failed',
                'last_error' => "Max retry attempts ({$notification->attempt_count}) exceeded",
            ]);
            
            Log::warning('SendFailedNotificationJob: Max retry attempts exceeded', [
                'notification_id' => $this->notificationId,
                'attempt_count' => $notification->attempt_count,
            ]);
            return;
        }

        // Check if booking still exists and is active (if notification has booking)
        if ($notification->booking && $notification->booking->status === 'cancelled') {
            $notification->update([
                'status' => 'cancelled',
                'last_error' => 'Booking was cancelled, retry aborted',
            ]);
            
            Log::info('SendFailedNotificationJob: Booking cancelled, aborting retry', [
                'notification_id' => $this->notificationId,
                'booking_id' => $notification->booking_id,
            ]);
            return;
        }

        // For reminder type: reset to pending (will be picked up by reminder scheduler)
        // For other types: send immediately
        if ($notification->type === 'reminder') {
            $notification->update([
                'status' => 'pending',
                'last_error' => null,
            ]);
            
            Log::info('SendFailedNotificationJob: Reminder notification reset to pending', [
                'notification_id' => $this->notificationId,
                'type' => $notification->type,
            ]);
            return;
        }

        Log::info('SendFailedNotificationJob: Retrying failed notification', [
            'notification_id' => $this->notificationId,
            'attempt_count' => $notification->attempt_count + 1,
            'channel' => $notification->channel,
            'type' => $notification->type,
        ]);

        // Retry sending notification using WhatsappService
        $whatsappService->sendExistingNotification($notification);
    }
}
