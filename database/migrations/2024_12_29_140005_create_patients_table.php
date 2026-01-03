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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('medical_records',100)->unique()->nullable();
            $table->string('patient_name', 150);
            $table->string('patient_nik', 32)->nullable();
            $table->string('patient_email', 191)->nullable();
            $table->string('patient_phone', 32);
            $table->enum('gender', ['male', 'female']);
            $table->date('patient_birthdate')->nullable();
            $table->text('patient_address')->nullable();
            $table->timestamps();

            $table->index('patient_phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
