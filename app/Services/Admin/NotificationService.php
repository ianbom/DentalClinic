<?php

namespace App\Services\Admin;

use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;

class NotificationService
{
    /**
     * Get notification statistics
     */
    public function getStatistics(): array
    {
        $today = Carbon::today();
        
        return [
            'total' => Notification::count(),
            'pending' => Notification::where('status', 'pending')->count(),
            'sent' => Notification::where('status', 'sent')->count(),
            'failed' => Notification::where('status', 'failed')->count(),
            'retrying' => Notification::where('status', 'retrying')->count(),
            'cancelled' => Notification::where('status', 'cancelled')->count(),
            'permanently_failed' => Notification::where('status', 'permanently_failed')->count(),
            'today_sent' => Notification::where('status', 'sent')
                ->whereDate('sent_at', $today)
                ->count(),
            'today_failed' => Notification::whereIn('status', ['failed', 'permanently_failed'])
                ->whereDate('updated_at', $today)
                ->count(),
        ];
    }

    /**
     * Get paginated notifications with filters
     */
    public function getNotifications(array $filters = []): LengthAwarePaginator
    {
        $query = Notification::with(['booking.patient', 'booking.doctor']);

        // Search (recipient, booking code, payload)
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('recipient', 'like', "%{$search}%")
                  ->orWhere('payload', 'like', "%{$search}%")
                  ->orWhereHas('booking', function ($bq) use ($search) {
                      $bq->where('code', 'like', "%{$search}%");
                  })
                  ->orWhereHas('booking.patient', function ($pq) use ($search) {
                      $pq->where('patient_name', 'like', "%{$search}%")
                         ->orWhere('patient_phone', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by status
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        // Filter by channel
        if (!empty($filters['channel'])) {
            $query->where('channel', $filters['channel']);
        }

        // Filter by type
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        // Filter by date (created_at) - legacy support
        if (!empty($filters['date'])) {
            $query->whereDate('created_at', $filters['date']);
        }

        // Filter by created_at
        if (!empty($filters['created_at_filter'])) {
            $query->whereDate('created_at', $filters['created_at_filter']);
        }

        // Filter by scheduled_at
        if (!empty($filters['scheduled_at_filter'])) {
            $query->whereDate('scheduled_at', $filters['scheduled_at_filter']);
        }

        // Filter by date range
        if (!empty($filters['date_from'])) {
            $query->whereDate('created_at', '>=', $filters['date_from']);
        }
        if (!empty($filters['date_to'])) {
            $query->whereDate('created_at', '<=', $filters['date_to']);
        }

        // Sorting
        $sortField = $filters['sort_field'] ?? 'created_at';
        $sortOrder = $filters['sort_order'] ?? 'desc';
        
        $allowedSortFields = ['id', 'channel', 'type', 'status', 'attempt_count', 'scheduled_at', 'sent_at', 'created_at', 'updated_at'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('created_at', 'desc');
        }

        $perPage = $filters['per_page'] ?? 10;
        
        return $query->paginate($perPage)->through(function ($notification) {
            return [
                'id' => $notification->id,
                'booking_id' => $notification->booking_id,
                'booking_code' => $notification->booking?->code,
                'patient_name' => $notification->booking?->patient?->patient_name,
                'channel' => $notification->channel,
                'type' => $notification->type,
                'recipient' => $notification->recipient,
                'payload' => $notification->payload,
                'scheduled_at' => $notification->scheduled_at?->format('Y-m-d H:i:s'),
                'scheduled_at_formatted' => $notification->scheduled_at?->translatedFormat('d M Y, H:i'),
                'sent_at' => $notification->sent_at?->format('Y-m-d H:i:s'),
                'sent_at_formatted' => $notification->sent_at?->translatedFormat('d M Y, H:i'),
                'status' => $notification->status,
                'attempt_count' => $notification->attempt_count,
                'last_error' => $notification->last_error,
                'created_at' => $notification->created_at->format('Y-m-d H:i:s'),
                'created_at_formatted' => $notification->created_at->translatedFormat('d M Y, H:i'),
                'updated_at' => $notification->updated_at->format('Y-m-d H:i:s'),
                'updated_at_formatted' => $notification->updated_at->translatedFormat('d M Y, H:i'),
            ];
        });
    }

    /**
     * Get distinct notification types
     */
    public function getTypes(): array
    {
        return Notification::distinct()->pluck('type')->filter()->toArray();
    }

    /**
     * Get distinct notification channels
     */
    public function getChannels(): array
    {
        return Notification::distinct()->pluck('channel')->filter()->toArray();
    }
}
