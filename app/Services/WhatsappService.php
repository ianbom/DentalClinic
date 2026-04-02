<?php

namespace App\Services;

use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsappService
{
    /**
     * Send WhatsApp message with anti-blocking measures.
     *
     * Features: random delay, typing indicator, seen indicator.
     * Sends directly without queue.
     *
     * @param  int|null  $bookingId  Related booking ID (optional)
     * @param  string  $target  Phone number
     * @param  string  $message  Message content
     * @param  string  $type  Notification type
     */
    public function sendWA(?int $bookingId, string $target, string $message, string $type = 'booking_confirmation'): Notification
    {
        // Create notification record first (pending status)
        $notification = Notification::create([
            'booking_id' => $bookingId,
            'channel' => 'whatsapp',
            'type' => $type,
            'recipient' => $target,
            'payload' => $message,
            'status' => 'pending',
            'attempt_count' => 0,
        ]);

        return $this->sendWithAntiBlocking($notification);
    }

    /**
     * Send an existing notification from database.
     * Used for scheduled notifications (reminders) and retries.
     */
    public function sendExistingNotification(Notification $notification): Notification
    {
        // Skip if already sent
        if (! in_array($notification->status, ['pending', 'failed', 'retrying'])) {
            return $notification;
        }

        return $this->sendWithAntiBlocking($notification);
    }

    /**
     * Send message with anti-blocking measures (typing, seen, delay).
     */
    protected function sendWithAntiBlocking(Notification $notification): Notification
    {
        try {
            $notification->increment('attempt_count');

            $chatId = $this->formatChatId($notification->recipient);
            $baseUrl = rtrim(config('waha.base_url'), '/');
            $headers = ['X-Api-Key' => config('waha.api_key')];
            $session = config('waha.session');

            // Step 1: Random initial delay (3-10 seconds) to simulate human behavior
            $initialDelay = rand(3, 10);
            sleep($initialDelay);

            // Step 2: Mark chat as "seen" (read receipts)
            $this->sendSeenIndicator($baseUrl, $headers, $session, $chatId);

            // Small pause after seen (0.5-1.5 seconds)
            usleep(rand(500000, 1500000));

            // Step 3: Start typing indicator
            $this->sendTypingIndicator($baseUrl, $headers, $session, $chatId);

            // Step 4: Simulate typing duration based on message length
            // Average typing speed: ~40 characters per second
            $messageLength = strlen($notification->payload);
            $typingDuration = max(2, min(8, (int) ($messageLength / 40))); // 2-8 seconds
            sleep($typingDuration);

            // Step 5: Brief pause before sending (0.3-0.8 seconds)
            usleep(rand(300000, 800000));

            // Step 6: Send the actual message
            $response = Http::withHeaders($headers)
                ->timeout(30)
                ->post("{$baseUrl}/api/sendText", [
                    'session' => $session,
                    'chatId' => $chatId,
                    'text' => $notification->payload,
                ]);

            $result = $response->json();

            if ($response->successful()) {
                $notification->update([
                    'status' => 'sent',
                    'sent_at' => Carbon::now(),
                ]);

                Log::info('WhatsApp sent successfully via WAHA', [
                    'notification_id' => $notification->id,
                    'booking_id' => $notification->booking_id,
                    'recipient' => $notification->recipient,
                    'type' => $notification->type,
                    'delays' => [
                        'initial' => $initialDelay,
                        'typing' => $typingDuration,
                    ],
                ]);
            } else {
                $errorMessage = $result['message'] ?? $result['error'] ?? 'Unknown WAHA API error';

                $notification->update([
                    'status' => 'failed',
                    'last_error' => $errorMessage,
                ]);

                Log::warning('WhatsApp send failed via WAHA', [
                    'notification_id' => $notification->id,
                    'error' => $errorMessage,
                    'response' => $result,
                ]);
            }
        } catch (\Throwable $th) {
            $notification->update([
                'status' => 'failed',
                'last_error' => $th->getMessage(),
            ]);

            Log::error('WhatsApp notification error', [
                'notification_id' => $notification->id,
                'error' => $th->getMessage(),
            ]);
        }

        return $notification->fresh();
    }

    /**
     * Send "seen" indicator to mark chat as read.
     */
    private function sendSeenIndicator(string $baseUrl, array $headers, string $session, string $chatId): void
    {
        try {
            Http::withHeaders($headers)
                ->timeout(10)
                ->post("{$baseUrl}/api/sendSeen", [
                    'session' => $session,
                    'chatId' => $chatId,
                ]);
        } catch (\Throwable $e) {
            Log::debug('Failed to send seen indicator', [
                'chatId' => $chatId,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Send typing indicator.
     */
    private function sendTypingIndicator(string $baseUrl, array $headers, string $session, string $chatId): void
    {
        try {
            Http::withHeaders($headers)
                ->timeout(10)
                ->post("{$baseUrl}/api/startTyping", [
                    'session' => $session,
                    'chatId' => $chatId,
                ]);
        } catch (\Throwable $e) {
            Log::debug('Failed to send typing indicator', [
                'chatId' => $chatId,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Format phone number to WAHA chatId format
     * WAHA requires format: 6281234567890@c.us
     */
    private function formatChatId(string $phone): string
    {
        // Remove all non-numeric characters
        $phone = preg_replace('/\D/', '', $phone);

        // Convert leading 0 to 62 (Indonesia country code)
        if (str_starts_with($phone, '0')) {
            $phone = '62'.substr($phone, 1);
        }

        // Add +62 prefix if number starts without country code
        if (! str_starts_with($phone, '62')) {
            $phone = '62'.$phone;
        }

        return $phone.'@c.us';
    }

    /**
     * Send booking confirmation WhatsApp
     */
    public function sendBookingConfirmation(int $bookingId, string $target, array $bookingDetails): Notification
    {
        $message = $this->buildConfirmationMessage($bookingDetails);

        return $this->sendWA($bookingId, $target, $message, 'booking_confirmation');
    }

    public function sendCheckWa(string $target)
    {
        $message =
            "Halo 👋\n\n".
            "Ini adalah pesan *otomatis* dari *Cantika Dental Care by drg. Anna Fikril* 🦷✨\n\n".
            "Jika kamu menerima pesan ini, berarti nomor WhatsApp kamu berhasil diverifikasi.\n".
            "Silakan lanjutkan proses *booking pemeriksaan gigi* melalui website kami.\n\n".
            "Terima kasih atas kepercayaan Anda 🙏\n".
            "Kami menantikan kedatangan Anda di *Cantika Dental Care* 😊\n\n".
            "❌JANGAN BALAS CHAT INI\n".
            '📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966';

        return $this->sendWA(null, $target, $message, 'check_booking');
    }

    public function sendReminder(int $bookingId, string $target, array $bookingDetails): Notification
    {
        $message = $this->buildReminderMessage($bookingDetails);

        return $this->sendWA($bookingId, $target, $message, 'reminder');
    }

    public function sendCancellation(int $bookingId, string $target, array $bookingDetails): Notification
    {
        $message = $this->buildCancellationMessage($bookingDetails);

        return $this->sendWA($bookingId, $target, $message, 'cancellation');
    }

    public function sendCheckin(int $bookingId, string $target, array $bookingDetails): Notification
    {
        $message = $this->buildCheckinMessage($bookingDetails);

        return $this->sendWA($bookingId, $target, $message, 'checkin');
    }

    public function sendReschedule(int $bookingId, string $target, array $bookingDetails): Notification
    {
        $message = $this->buildRescheduleMessage($bookingDetails);

        return $this->sendWA($bookingId, $target, $message, 'reschedule');
    }

    private function buildRescheduleMessage(array $details): string
    {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? '-';
        $date = $details['date'] ?? '-';
        $time = $details['time'] ?? '-';
        $code = $details['code'] ?? '-';
        $oldDate = $details['old_date'] ?? '-';
        $oldTime = $details['old_time'] ?? '-';
        $checkinLink = $details['checkin_link'] ?? '-';

        return "🔄 *Jadwal Booking Diubah*\n\n"
            ."Yth. Bapak/Ibu {$patientName},\n"
            ."Jadwal booking pemeriksaan gigi Anda telah diubah dengan rincian sebagai berikut:\n\n"
            ."📋 Kode Booking : *{$code}*\n\n"
            ."❌ *Jadwal Lama:*\n"
            ."🗓 Tanggal : {$oldDate}\n"
            ."⏰ Jam : {$oldTime} WIB\n\n"
            ."✅ *Jadwal Baru:*\n"
            ."🗓 Tanggal : {$date}\n"
            ."⏰ Jam : {$time} WIB\n"
            ."👩‍⚕️ Dokter : {$doctorName}\n\n"
            ."🔗 Cek Data Booking\n"
            ."{$checkinLink}\n\n"
            ."Terima kasih atas pengertian Anda.\n"
            ."Kami menantikan kedatangan Anda di Cantika Dental Care 😊\n\n"
            ."❌JANGAN BALAS CHAT INI\n"
            .'📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966';
    }

    private function buildConfirmationMessage(array $details): string
    {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? '-';
        $date = $details['date'] ?? '-';
        $time = $details['time'] ?? '-';
        $code = $details['code'] ?? '-';
        $confirmLink = $details['confirm_link'] ?? '-';
        $checkinLink = $details['checkin_link'] ?? '-';

        return "✅ *Booking Pemeriksaan Gigi Berhasil*\n\n"
            ."Yth. Bapak/Ibu {$patientName},\n"
            ."Booking pemeriksaan gigi Anda telah berhasil dikonfirmasi dengan rincian sebagai berikut:\n\n"
            ."🗓 Tanggal : {$date}\n"
            ."⏰ Jam : {$time}\n"
            ."👩‍⚕️ Dokter : {$doctorName}\n"
            ."📋 Kode Booking : *{$code}*\n\n"
            ."🔗 Cek Data Booking :\n"
            ."{$confirmLink}\n\n"
            ."📌 *Catatan:*\n"
            ."Mohon lakukan konfirmasi kedatangan pada H-1 melalui link di atas.\n\n"
            ."Terima kasih atas kepercayaan Anda.\n"
            ."Kami menantikan kedatangan Anda di Cantika Dental Care 😊\n\n"
            ."❌JANGAN BALAS CHAT INI\n"
            .'📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966';
    }

    private function buildReminderMessage(array $details): string
    {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? '-';
        $date = $details['date'] ?? '-';
        $time = $details['time'] ?? '-';
        $code = $details['code'] ?? '-';
        $confirmLink = $details['confirm_link'] ?? '-';

        return "📢 *Pengingat Booking Pemeriksaan Gigi*\n\n"
            ."Yth. Bapak/Ibu {$patientName},\n"
            ."Kami mengingatkan kembali jadwal booking pemeriksaan gigi Anda dengan rincian sebagai berikut:\n\n"
            ."🗓 Tanggal : {$date}\n"
            ."⏰ Jam : {$time} WIB\n"
            ."👩‍⚕️ Dokter : {$doctorName}\n"
            ."📋 Kode Booking : *{$code}*\n\n"
            ."🔗 Konfirmasi Kehadiran (H-1):\n"
            ."{$confirmLink}\n\n"
            ."📌 *Catatan:*\n"
            ."Mohon lakukan konfirmasi kedatangan pada H-1 melalui link di atas.\n\n"
            ."Terima kasih atas kepercayaan Anda.\n"
            ."Kami menantikan kedatangan Anda di Cantika Dental Care 😊\n";
            // ."❌JANGAN BALAS CHAT INI\n"
            // .'📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966';

    }

    /**
     * Build check-in confirmation message
     */
    private function buildCheckinMessage(array $details): string
    {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? '-';
        $date = $details['date'] ?? '-';
        $time = $details['time'] ?? '-';
        $code = $details['code'] ?? '-';
        $checkinTime = $details['checkin_time'] ?? '-';

        return "✅ *CHECK-IN BERHASIL*\n\n"
            ."Halo {$patientName},\n\n"
            ."Check-in untuk booking Anda telah berhasil!\n\n"
            ."📋 Kode Booking : *{$code}*\n"
            ."🗓 Tanggal : {$date}\n"
            ."⏰ Jam Booking : {$time} WIB\n"
            ."👩‍⚕️ Dokter : {$doctorName}\n"
            ."🕐 Check-in : {$checkinTime} WIB\n\n"
            ."Silakan menunggu di ruang tunggu.\n"
            ."Anda akan dipanggil sesuai nomor antrian.\n\n"
            .'Terima kasih telah berkunjung ke Cantika Dental Care 😊';
    }

    /**
     * Build cancellation message
     */
    private function buildCancellationMessage(array $details): string
    {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? '-';
        $date = $details['date'] ?? '-';
        $time = $details['time'] ?? '-';
        $code = $details['code'] ?? '-';

        return "❌ *BOOKING DIBATALKAN*\n\n"
            ."Yth. Bapak/Ibu {$patientName},\n\n"
            ."Booking pemeriksaan gigi Anda telah dibatalkan dengan rincian sebagai berikut:\n\n"
            ."📋 Kode Booking : *{$code}*\n"
            ."🗓 Tanggal : {$date}\n"
            ."⏰ Jam : {$time} WIB\n"
            ."👩‍⚕️ Dokter : {$doctorName}\n\n"
            ."📍 Lokasi : Cantika Dental Care\n"
            ."📞 Kontak : 0852-3151-9966\n\n"
            ."Jika Anda ingin membuat jadwal baru, silakan kunjungi website kami atau hubungi kontak di atas.\n\n"
            ."❌JANGAN BALAS CHAT INI\n"
            ."📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966\n"
            .'Terima kasih atas pengertiannya 🙏';
    }
}
