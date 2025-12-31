<?php

use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Patients\BookingController as PatientBookingController;
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
Route::get('/doctors/{id}', [PatientDoctorController::class, 'detailDoctor'])->name('doctors.detail');

Route::get('/doctors/{id}/booking', [PatientBookingController::class, 'bookingDoctorPage'])->name('booking.doctor');


Route::get('/doctors/{id}/booking/patient-data', [PatientBookingController::class, 'bookingPatientDataPage'])->name('booking.patient-data');
Route::post('/verify-wa', [PatientBookingController::class, 'verifyWhatsapp'])->name('verify.whatsapp');
Route::get('/doctors/{id}/booking/patient-data/review', [PatientBookingController::class, 'bookingPatientReviewPage'])->name('booking.review');

Route::post('/booking/create', [PatientBookingController::class, 'createBooking'])->name('booking.create');

Route::get('/booking/success/{code}', [PatientBookingController::class, 'bookingSuccessPage'])->name('booking.success');

Route::get('/check-booking', [PatientBookingController::class, 'checkBookingPage'])->name('check-booking');
Route::post('/check-booking', [PatientBookingController::class, 'checkBooking'])->name('check-booking.search');
Route::post('/booking/checkin', [PatientBookingController::class, 'checkinBooking'])->name('booking.checkin');

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'dashboard'])->name('dashboard');

    // Bookings
    Route::get('/bookings', [AdminBookingController::class, 'listBooking'])->name('bookings.list');
    Route::get('/bookings/{bookingId}', [AdminBookingController::class, 'bookingDetail'])->name('bookings.detail');

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
