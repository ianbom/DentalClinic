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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained('doctors')->onDelete('cascade');
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
            $table->string('code', 100)->unique();
            $table->string('service', 100);
            $table->enum('type', ['long', 'short', 'sisipan']);
            $table->date('booking_date')->nullable();
            $table->time('start_time')->nullable();
            $table->string('status', 24)->default('confirmed')->comment('confirmed, checked_in, cancelled, no_show');
            $table->tinyInteger('is_active')->default(1)->comment('1=active slot, 0=inactive');
            $table->timestamps();

            $table->index(['doctor_id', 'booking_date']);
            $table->index(['status', 'booking_date']);
            $table->unique(['doctor_id', 'booking_date', 'start_time', 'is_active'], 'bookings_slot_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
