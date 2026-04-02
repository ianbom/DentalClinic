<?php

use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\DoctorController as AdminDoctorController;
use App\Http\Controllers\Admin\DoctorOvertimeController;
use App\Http\Controllers\Admin\DoctorTimeOffController;
use App\Http\Controllers\Admin\DoctorWorkingPeriodController;
use App\Http\Controllers\Admin\NotificationController as AdminNotificationController;
use App\Http\Controllers\Admin\PatientController as AdminPatientController;
use App\Http\Controllers\Patients\BookingController as PatientBookingController;
use App\Http\Controllers\Patients\DoctorController as PatientDoctorController;
use App\Http\Controllers\Patients\HomeController;
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
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->prefix('admin')->group(function () {
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

Route::get('/about',[HomeController::class, 'aboutPage'])->name('about');

Route::get('/services', function () {
    return Inertia::render('patient/services/page');
})->name('services');


Route::get('/doctors', [PatientDoctorController::class, 'listDoctors'])->name('doctors.list');
Route::get('/doctors/{id}', [PatientDoctorController::class, 'detailDoctor'])->name('doctors.detail');

Route::get('/doctors/{id}/booking', [PatientBookingController::class, 'bookingDoctorPage'])->name('booking.doctor');


Route::get('/doctors/{id}/booking/patient-data', [PatientBookingController::class, 'bookingPatientDataPage'])->name('booking.patient-data');
Route::post('/verify-wa', [PatientBookingController::class, 'verifyWhatsapp'])->name('verify.whatsapp');
Route::post('/check-nik', [PatientBookingController::class, 'checkNik'])->name('check-nik');
Route::get('/doctors/{id}/booking/patient-data/review', [PatientBookingController::class, 'bookingPatientReviewPage'])->name('booking.review');

// Area API endpoints for lazy loading
Route::get('/api/provinces/{provinceId}/cities', [PatientBookingController::class, 'getCitiesByProvince'])->name('api.cities');
Route::get('/api/cities/{cityId}/districts', [PatientBookingController::class, 'getDistrictsByCity'])->name('api.districts');
Route::get('/api/districts/{districtId}/villages', [PatientBookingController::class, 'getVillagesByDistrict'])->name('api.villages');

Route::post('/booking/create', [PatientBookingController::class, 'createBooking'])->name('booking.create');

Route::get('/booking/success/{code}', [PatientBookingController::class, 'bookingSuccessPage'])->name('booking.success');

Route::get('/check-booking', [PatientBookingController::class, 'checkBookingPage'])->name('check-booking');

Route::post('/booking/checkin', [PatientBookingController::class, 'checkinBooking'])->name('booking.checkin');
Route::post('/booking/cancel', [PatientBookingController::class, 'cancelBooking'])->name('booking.cancel');

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/statistic', [AdminDashboardController::class, 'statistic'])->name('statistic');
    Route::get('/statistic/export', [AdminDashboardController::class, 'exportCsv'])->name('statistic.export');

    // Bookings
    Route::get('/bookings', [AdminBookingController::class, 'listBooking'])->name('bookings.list');
    Route::get('/bookings/create', [AdminBookingController::class, 'createBooking'])->name('bookings.create');
    Route::get('/bookings/{bookingId}', [AdminBookingController::class, 'bookingDetail'])->name('bookings.detail');
    Route::post('/bookings/store', [AdminBookingController::class, 'storeBooking'])->name('bookings.store');
    Route::get('/bookings/{bookingId}/reschedule', [AdminBookingController::class, 'rescheduleBooking'])->name('bookings.reschedule');
    Route::put('/bookings/{bookingId}/reschedule', [AdminBookingController::class, 'updateBooking'])->name('bookings.update');
    Route::post('/bookings/{bookingId}/payment', [AdminBookingController::class, 'storePayment'])->name('bookings.payment');
    Route::get('/bookings/{bookingId}/edit', [AdminBookingController::class, 'editBooking'])->name('bookings.edit');
    Route::put('/bookings/{bookingId}/edit', [AdminBookingController::class, 'updateBookingFull'])->name('bookings.updateFull');
    Route::post('/bookings/{bookingId}/cancel', [AdminBookingController::class, 'cancelBooking'])->name('bookings.cancel');

    // Patients
    Route::get('/patients', [AdminPatientController::class, 'listPatients'])->name('patients.list');
    Route::get('/patients/create', [AdminPatientController::class, 'create'])->name('patients.create');
    Route::post('/patients/store', [AdminPatientController::class, 'store'])->name('patients.store');
    Route::get('/patients/{patientId}', [AdminPatientController::class, 'showPatient'])->name('patients.show');
    Route::get('/patients/{patientId}/edit', [AdminPatientController::class, 'edit'])->name('patients.edit');
    Route::put('/patients/{patientId}/update', [AdminPatientController::class, 'update'])->name('patients.update');

    Route::get('/checkin/patiens', [AdminBookingController::class, 'checkinPatientPage'])->name('checkin');
    Route::post('/checkin/perform', [AdminBookingController::class, 'performCheckin'])->name('checkin.perform');

    // Doctors
    Route::get('/doctors', [AdminDoctorController::class, 'listDoctors'])->name('doctors.list');
    Route::get('/schedule/{doctorId}', [AdminDoctorController::class, 'schedule'])->name('doctors.schedule');
    
    Route::post('/doctors/schedule/lock', [AdminDoctorController::class, 'lockDoctorSchedule'])->name('doctors.lock');
    Route::post('/doctors/schedule/lock-day', [AdminDoctorController::class, 'lockOneDayDoctorSchedule'])->name('doctors.lock-day');
    Route::post('/doctors/schedule/unlock-day', [AdminDoctorController::class, 'unlockOneDayDoctorSchedule'])->name('doctors.unlock-day');
    Route::post('/doctors/schedule/unlock', [AdminDoctorController::class, 'unlockDoctorSchedule'])->name('doctors.unlock');
    Route::get('/doctors/{doctorId}/edit', [AdminDoctorController::class, 'edit'])->name('doctors.edit');
    Route::put('/doctors/{doctorId}/update', [AdminDoctorController::class, 'update'])->name('doctors.update');
    Route::get('/doctors/{doctorId}', [AdminDoctorController::class, 'show'])->name('doctors.show');

    // Doctor Time Off CRUD
    Route::post('/doctors/timeoff', [DoctorTimeOffController::class, 'store'])->name('doctors.timeoff.store');
    Route::put('/doctors/timeoff/{id}', [DoctorTimeOffController::class, 'update'])->name('doctors.timeoff.update');
    Route::delete('/doctors/timeoff/{id}', [DoctorTimeOffController::class, 'destroy'])->name('doctors.timeoff.destroy');

    // Doctor Overtime CRUD
    Route::post('/doctors/overtime', [DoctorOvertimeController::class, 'store'])->name('doctors.overtime.store');
    Route::put('/doctors/overtime/{id}', [DoctorOvertimeController::class, 'update'])->name('doctors.overtime.update');
    Route::delete('/doctors/overtime/{id}', [DoctorOvertimeController::class, 'destroy'])->name('doctors.overtime.destroy');

    // Doctor Working Period CRUD
    Route::post('/doctors/working-period', [DoctorWorkingPeriodController::class, 'store'])->name('doctors.working-period.store');
    Route::put('/doctors/working-period/{id}', [DoctorWorkingPeriodController::class, 'update'])->name('doctors.working-period.update');
    Route::delete('/doctors/working-period/{id}', [DoctorWorkingPeriodController::class, 'destroy'])->name('doctors.working-period.destroy');

    // Notifications
    Route::get('/notifications', [AdminNotificationController::class, 'index'])->name('notifications.list');
    Route::put('/notifications/{notificationId}/send', [AdminNotificationController::class, 'sendManualMessage'])->name('notifications.send');
});

