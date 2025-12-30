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
        Schema::create('booking_reschedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('booking_id')->constrained('bookings')->onDelete('cascade');
            $table->string('requested_by', 10)->comment('patient or staff');
            $table->foreignId('requested_by_user_id')->nullable()->constrained('users')->onDelete('set null');
            
            // Old schedule
            $table->date('old_date');
            $table->time('old_start_time');
            
            // New schedule
            $table->date('new_date');
            $table->time('new_start_time');
            
            $table->text('reason')->nullable();
            $table->string('status', 20)->default('applied')->comment('pending_patient, applied, rejected, expired');
            
            // Patient response
            $table->timestamp('patient_responded_at')->nullable();
            $table->string('patient_response', 10)->nullable()->comment('accepted or rejected');
            $table->text('response_note')->nullable();
            
            $table->timestamp('expires_at')->nullable();
            $table->tinyInteger('is_pending')->default(0)->comment('1 if status=pending_patient');
            
            $table->timestamps();

            $table->index(['booking_id', 'created_at']);
            $table->index('status');
            $table->unique(['booking_id', 'is_pending'], 'booking_reschedules_pending_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_reschedules');
    }
};
