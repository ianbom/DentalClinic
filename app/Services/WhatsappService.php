<?php

namespace App\Services;

use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WhatsappService
{

    public function sendWA(int $bookingId = null, string $target, string $message, string $type = 'booking_confirmation')
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

        try {
            // Increment attempt count
            $notification->increment('attempt_count');

            // Send via Fonnte API
            $response = Http::withHeaders([
                'Authorization' => config('services.fonnte.api_key', env('FONNTE_API_KEY')),
            ])->post('https://api.fonnte.com/send', [
                'target' => $target,
                'message' => $message,
            ]);

            $result = $response->json();

            // Check if successful
            if ($response->successful() && isset($result['status']) && $result['status'] === true) {
                $notification->update([
                    'status' => 'sent',
                    'sent_at' => Carbon::now(),
                ]);

                Log::info('WhatsApp sent successfully', [
                    'booking_id' => $bookingId,
                    'target' => $target,
                    'type' => $type,
                ]);
            } else {
                // API returned error
                $errorMessage = $result['reason'] ?? $result['message'] ?? 'Unknown API error';
                
                $notification->update([
                    'status' => 'failed',
                    'last_error' => $errorMessage,
                ]);

                Log::warning('WhatsApp send failed', [
                    'booking_id' => $bookingId,
                    'target' => $target,
                    'error' => $errorMessage,
                ]);
            }
        } catch (\Throwable $th) {
            // Exception occurred
            $notification->update([
                'status' => 'failed',
                'last_error' => $th->getMessage(),
            ]);

            Log::error('WhatsApp notification error', [
                'booking_id' => $bookingId,
                'target' => $target,
                'error' => $th->getMessage(),
            ]);
        }

        return $notification->fresh();
    }

    /**
     * Send an existing notification from database
     * Used for scheduled notifications (reminders)
     */
    public function sendExistingNotification(Notification $notification): Notification
    {
        try {
            // Increment attempt count
            $notification->increment('attempt_count');

            // Send via Fonnte API
            $response = Http::withHeaders([
                'Authorization' => config('services.fonnte.api_key', env('FONNTE_API_KEY')),
            ])->post('https://api.fonnte.com/send', [
                'target' => $notification->recipient,
                'message' => $notification->payload,
            ]);

            $result = $response->json();

            // Check if successful
            if ($response->successful() && isset($result['status']) && $result['status'] === true) {
                $notification->update([
                    'status' => 'sent',
                    'sent_at' => Carbon::now(),
                ]);

                Log::info('WhatsApp notification sent successfully', [
                    'notification_id' => $notification->id,
                    'booking_id' => $notification->booking_id,
                    'recipient' => $notification->recipient,
                    'type' => $notification->type,
                ]);
            } else {
                // API returned error
                $errorMessage = $result['reason'] ?? $result['message'] ?? 'Unknown API error';
                
                $notification->update([
                    'status' => 'failed',
                    'last_error' => $errorMessage,
                ]);

                Log::warning('WhatsApp notification send failed', [
                    'notification_id' => $notification->id,
                    'booking_id' => $notification->booking_id,
                    'error' => $errorMessage,
                ]);
            }
        } catch (\Throwable $th) {
            // Exception occurred
            $notification->update([
                'status' => 'failed',
                'last_error' => $th->getMessage(),
            ]);

            Log::error('WhatsApp notification error', [
                'notification_id' => $notification->id,
                'booking_id' => $notification->booking_id,
                'error' => $th->getMessage(),
            ]);
        }

        return $notification->fresh();
    }

    /**
     * Send booking confirmation WhatsApp
     */
    public function sendBookingConfirmation(int $bookingId, string $target, array $bookingDetails): Notification
    {
        $message = $this->buildConfirmationMessage($bookingDetails);
        return $this->sendWA($bookingId, $target, $message, 'booking_confirmation');
    }

    public function sendCheckWa(string $target){
    $message =
        "Halo 👋\n\n" .
        "Ini adalah pesan *otomatis* dari *Cantika Dental Care by drg. Anna Fikril* 🦷✨\n\n" .
        "Jika kamu menerima pesan ini, berarti nomor WhatsApp kamu berhasil diverifikasi.\n" .
        "Silakan lanjutkan proses *booking pemeriksaan gigi* melalui website kami.\n\n" .
        "Terima kasih atas kepercayaan Anda 🙏\n" .
        "Kami menantikan kedatangan Anda di *Cantika Dental Care* 😊\n";

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

    private function buildRescheduleMessage(array $details): string {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? '-';
        $date = $details['date'] ?? '-';
        $time = $details['time'] ?? '-';
        $code = $details['code'] ?? '-';
        $oldDate = $details['old_date'] ?? '-';
        $oldTime = $details['old_time'] ?? '-';
        $checkinLink = $details['checkin_link'] ?? '-';

        return "🔄 *Jadwal Booking Diubah*\n\n"
            . "Yth. Bapak/Ibu {$patientName},\n"
            . "Jadwal booking pemeriksaan gigi Anda telah diubah dengan rincian sebagai berikut:\n\n"
            . "📋 Kode Booking : *{$code}*\n\n"
            . "❌ *Jadwal Lama:*\n"
            . "🗓 Tanggal : {$oldDate}\n"
            . "⏰ Jam : {$oldTime} WIB\n\n"
            . "✅ *Jadwal Baru:*\n"
            . "🗓 Tanggal : {$date}\n"
            . "⏰ Jam : {$time} WIB\n"
            . "👩‍⚕️ Dokter : {$doctorName}\n\n"
            . "🔗 Cek Data Booking\n"
            . "{$checkinLink}\n\n"
            . "Terima kasih atas pengertian Anda.\n"
            . "Kami menantikan kedatangan Anda di Cantika Dental Care 😊\n\n"
            . "📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966";
    }

    private function buildConfirmationMessage(array $details): string {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? '-';
        $date = $details['date'] ?? '-';
        $time = $details['time'] ?? '-';
        $code = $details['code'] ?? '-';
        $confirmLink = $details['confirm_link'] ?? '-';
        $checkinLink = $details['checkin_link'] ?? '-';

        return "✅ *Booking Pemeriksaan Gigi Berhasil*\n\n"
            . "Yth. Bapak/Ibu {$patientName},\n"
            . "Booking pemeriksaan gigi Anda telah berhasil dikonfirmasi dengan rincian sebagai berikut:\n\n"
            . "🗓 Tanggal : {$date}\n"
            . "⏰ Jam : {$time}\n"
            . "👩‍⚕️ Dokter : {$doctorName}\n"
            . "📋 Kode Booking : *{$code}*\n\n"
            . "🔗 Cek Data Booking :\n"
            . "{$confirmLink}\n\n"
            . "📌 *Catatan:*\n"
            . "Mohon lakukan konfirmasi kedatangan pada H-1 melalui link di atas.\n\n"
            . "Terima kasih atas kepercayaan Anda.\n"
            . "Kami menantikan kedatangan Anda di Cantika Dental Care 😊\n\n"
            . "📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966";
    }

    private function buildReminderMessage(array $details): string {
        $patientName = $details['patient_name'] ?? '-';
        $doctorName = $details['doctor_name'] ?? '-';
        $date = $details['date'] ?? '-';
        $time = $details['time'] ?? '-';
        $code = $details['code'] ?? '-';
        $confirmLink = $details['confirm_link'] ?? '-';

        return "📢 *Pengingat Booking Pemeriksaan Gigi*\n\n"
            . "Yth. Bapak/Ibu {$patientName},\n"
            . "Kami mengingatkan kembali jadwal booking pemeriksaan gigi Anda dengan rincian sebagai berikut:\n\n"
            . "🗓 Tanggal : {$date}\n"
            . "⏰ Jam : {$time} WIB\n"
            . "👩‍⚕️ Dokter : {$doctorName}\n"
            . "📋 Kode Booking : *{$code}*\n\n"
            . "🔗 Konfirmasi Kehadiran (H-1):\n"
            . "{$confirmLink}\n\n"
            . "📌 *Catatan:*\n"
            . "Mohon lakukan konfirmasi kedatangan pada H-1 melalui link di atas.\n\n"
            . "Terima kasih atas kepercayaan Anda.\n"
            . "Kami menantikan kedatangan Anda di Cantika Dental Care 😊\n\n"
            . "📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966";

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
            . "Halo {$patientName},\n\n"
            . "Check-in untuk booking Anda telah berhasil!\n\n"
            . "📋 Kode Booking : *{$code}*\n"
            . "🗓 Tanggal : {$date}\n"
            . "⏰ Jam Booking : {$time} WIB\n"
            . "👩‍⚕️ Dokter : {$doctorName}\n"
            . "🕐 Check-in : {$checkinTime} WIB\n\n"
            . "Silakan menunggu di ruang tunggu.\n"
            . "Anda akan dipanggil sesuai nomor antrian.\n\n"
            . "Terima kasih telah berkunjung ke Cantika Dental Care 😊";
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
            . "Yth. Bapak/Ibu {$patientName},\n\n"
            . "Booking pemeriksaan gigi Anda telah dibatalkan dengan rincian sebagai berikut:\n\n"
            . "📋 Kode Booking : *{$code}*\n"
            . "🗓 Tanggal : {$date}\n"
            . "⏰ Jam : {$time} WIB\n"
            . "👩‍⚕️ Dokter : {$doctorName}\n\n"
            . "📍 Lokasi : Cantika Dental Care\n"
            . "📞 Kontak : 0822-3432-8628\n\n"
            . "Jika Anda ingin membuat jadwal baru, silakan kunjungi website kami atau hubungi kontak di atas.\n\n"
            . "📱Untuk chat admin silakan ke no WhatsApp https://wa.me/6285231519966\n"
            . "Terima kasih atas pengertiannya 🙏";
    }
}
