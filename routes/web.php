<?php

use App\Http\Controllers\Patients\DoctorController as PatientDoctorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('patient/Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Patient/Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/home', function () {
    return Inertia::render('patient/Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('patient/about/About');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('patient/services/page');
})->name('services');


Route::get('/doctors', [PatientDoctorController::class, 'listDoctors'])->name('doctors.list');


Route::get('/doctors/{id}', function ($id) {
    return Inertia::render('patient/doctors/DetailDoctor', ['id' => $id]);
})->name('doctors.detail');

Route::get('/doctors/{id}/booking', function ($id) {
    return Inertia::render('patient/booking/BookingDoctor', ['id' => $id]);
})->name('booking.doctor');

Route::get('/doctors/{id}/booking/customer-data', function ($id) {
    return Inertia::render('patient/booking/BookingCustomerData', ['id' => $id]);
})->name('booking.customer-data');

Route::get('/doctors/{id}/booking/customer-data/review', function ($id) {
    return Inertia::render('patient/booking/BookingReview', ['id' => $id]);
})->name('booking.review');

Route::get('/doctors/{id}/booking/success', function ($id) {
    return Inertia::render('patient/booking/BookingSuccess', ['id' => $id]);
})->name('booking.success');

Route::get('/check-booking', function () {
    return Inertia::render('patient/check-booking/CheckBooking');
})->name('check-booking');

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/page');
    })->name('dashboard');

    // Bookings
    Route::get('/bookings', function () {
        return Inertia::render('admin/bookings/ListBooking');
    })->name('bookings.list');

    Route::get('/bookings/{id}', function ($id) {
        return Inertia::render('admin/bookings/DetailBooking', ['id' => $id]);
    })->name('bookings.detail');

    // Patients
    Route::get('/patients', function () {
        return Inertia::render('admin/patients/ListPatient');
    })->name('patients.list');

    Route::get('/patients/checkin', function () {
        return Inertia::render('admin/patients/CheckinPatient');
    })->name('patients.checkin');

    // Doctors
    Route::get('/doctors', function () {
        return Inertia::render('admin/doctors/ListDoctor');
    })->name('doctors.list');
});
