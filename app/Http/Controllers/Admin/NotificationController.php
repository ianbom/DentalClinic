<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Notification;
use App\Services\Admin\NotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function __construct(
        protected NotificationService $notificationService
    ) {}

    public function index(Request $request): Response
    {
        $filters = $request->only([
            'search',
            'status',
            'channel',
            'type',
            'date',
            'created_at_filter',
            'scheduled_at_filter',
            'date_from',
            'date_to',
            'per_page',
            'sort_field',
            'sort_order',
        ]);

        return Inertia::render('admin/notification/ListNotification', [
            'notifications' => $this->notificationService->getNotifications($filters),
            'statistics' => $this->notificationService->getStatistics(),
            'types' => $this->notificationService->getTypes(),
            'channels' => $this->notificationService->getChannels(),
            'filters' => $filters,
        ]);
    }

    public function sendManualMessage($notificationId){ 

        try {
            $notification = Notification::findOrFail($notificationId);

            // For reminder type: only allow sending within H-24 of scheduled_at
            if ($notification->type === 'reminder' && $notification->scheduled_at) {
                $scheduledAt = \Carbon\Carbon::parse($notification->scheduled_at);
                $now = now();
                $diffHours = $now->diffInHours($scheduledAt, false);

                if ($diffHours > 24 || $diffHours < 0) {
                    return redirect()->back()->with('error', 'Reminder hanya bisa dikirim dalam H-24 dari jadwal.');
                }
            }

            $notification->update([
                'status' => 'sent',
                'sent_at' => now(),
            ]);
            return redirect()->back()->with('success', 'Status notifikasi berhasil diupdate');
        } catch (\Throwable $th) {
            return redirect()->back()->with('error', 'Gagal mengupdate status notifikasi');
        }

    }
}
