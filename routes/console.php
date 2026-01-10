<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule reminder notifications to be sent every minute
Schedule::command('notifications:send-reminders')->everyMinute();

// Mark expired bookings as no_show every day at 23:00
// Schedule::command('bookings:mark-no-show')->dailyAt('23:00');
