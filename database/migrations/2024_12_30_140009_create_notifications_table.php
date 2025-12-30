<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->string('channel', 20)->comment('whatsapp, email, sms');
            $table->string('type', 50)->comment('booking_confirmation, reminder, reschedule_request, reschedule_applied, cancellation');
            $table->string('recipient', 191)->comment('Phone number or email snapshot');
            $table->text('payload')->nullable()->comment('Template variables or message summary');
            $table->timestamp('scheduled_at')->nullable();
            $table->timestamp('sent_at')->nullable();
            $table->string('status', 20)->default('pending')->comment('pending, sent, failed, cancelled');
            $table->integer('attempt_count')->default(0);
            $table->text('last_error')->nullable();
            $table->timestamps();

            $table->index('booking_id');
            $table->index(['status', 'scheduled_at']);
            $table->index(['channel', 'status', 'scheduled_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
