<?php

namespace App\Jobs;

use App\Models\Notification;
use App\Services\WhatsappService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SendReminderNotificationJob implements ShouldQueue
{
    use Queueable;

    protected int $notificationId;

    /**
     * Create a new job instance.
     */
    public function __construct(int $notificationId)
    {
        $this->notificationId = $notificationId;
    }

    public function handle(WhatsappService $whatsappService): void
    {
        $notification = Notification::with('booking')->find($this->notificationId);

        if (!$notification) {
            Log::warning('SendReminderNotificationJob: Notification not found', [
                'notification_id' => $this->notificationId,
            ]);
            return;
        }

        // Skip if already sent or cancelled
        if ($notification->status !== 'pending') {
            Log::info('SendReminderNotificationJob: Notification already processed', [
                'notification_id' => $this->notificationId,
                'status' => $notification->status,
            ]);
            return;
        }

        // Check if booking still exists and is active
        if ($notification->booking && $notification->booking->status === 'cancelled') {
            $notification->update([
                'status' => 'cancelled',
                'last_error' => 'Booking was cancelled',
            ]);
            Log::info('SendReminderNotificationJob: Booking cancelled, skipping notification', [
                'notification_id' => $this->notificationId,
                'booking_id' => $notification->booking_id,
            ]);
            return;
        }

        // Send notification using WhatsappService
        $whatsappService->sendExistingNotification($notification);
    }
}
