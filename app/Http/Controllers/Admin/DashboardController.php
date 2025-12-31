<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    protected DashboardService $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }

    public function dashboard()
    {
        $stats = $this->dashboardService->getDashboardStats();
        $todayBookings = $this->dashboardService->getTodayBookingsList();
        $recentBookings = $this->dashboardService->getRecentBookings(5);

        return Inertia::render('admin/dashboard/Dashboard', [
            'stats' => $stats,
            'todayBookings' => $todayBookings,
            'recentBookings' => $recentBookings,
        ]);
    }

    
}
