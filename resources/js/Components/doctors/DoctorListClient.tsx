'use client';

import { DoctorCard } from '@/Components/doctors/DoctorCard';
import { FilterSidebar } from '@/Components/doctors/FilterSidebar';
import { FloatingWhatsApp } from '@/Components/layout/FloatingWhatsApp';
import { Doctor } from '@/types';
import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface DoctorListClientProps {
    doctors: Doctor[];
}

// Helper function to get days from working periods
function getDaysFromWorkingPeriods(doctor: Doctor): string {
    if (!doctor.working_periods || doctor.working_periods.length === 0) {
        return '-';
    }
    const uniqueDays = [
        ...new Set(doctor.working_periods.map((wp) => wp.day_of_week)),
    ];
    return uniqueDays.join(', ');
}

// Helper function to get practice hours from working periods
function getPracticeHours(doctor: Doctor): string {
    if (!doctor.working_periods || doctor.working_periods.length === 0) {
        return '-';
    }
    const times = doctor.working_periods.map(
        (wp) => `${wp.start_time.slice(0, 5)}-${wp.end_time.slice(0, 5)}`,
    );
    const uniqueTimes = [...new Set(times)];
    return uniqueTimes.join(', ');
}

export function DoctorListClient({ doctors }: DoctorListClientProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    // Filter doctors based on search and selected days
    const filteredDoctors = useMemo(() => {
        return doctors.filter((doctor) => {
            // Search filter
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                searchQuery === '' ||
                doctor.name.toLowerCase().includes(searchLower);

            // Schedule filter based on working_periods
            const doctorDays = getDaysFromWorkingPeriods(doctor).toLowerCase();
            const matchesSchedule =
                selectedDays.length === 0 ||
                selectedDays.some((day) =>
                    doctorDays.includes(day.toLowerCase()),
                );

            return matchesSearch && matchesSchedule;
        });
    }, [doctors, searchQuery, selectedDays]);

    return (
        <div className="min-h-screen grow bg-background-light font-display">
            <div className="mx-auto max-w-[1280px] px-4 py-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="mb-6 flex items-center gap-2 text-sm">
                    <Link
                        href="/"
                        className="text-gray-500 transition-colors hover:text-primary"
                    >
                        Beranda
                    </Link>
                    <span className="text-gray-300">/</span>
                    <span className="font-medium text-text-light">
                        Cari Dokter
                    </span>
                </div>

                {/* Page Heading & Search */}
                <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                    <div className="max-w-xl">
                        <h1 className="mb-2 text-3xl font-bold text-text-light md:text-4xl">
                            Temukan Dokter Gigi Terbaik
                        </h1>
                        <p className="text-gray-500">
                            Pilih dokter spesialis berpengalaman untuk senyum
                            sehat Anda.
                        </p>
                    </div>
                    <div className="w-full md:w-auto md:min-w-[400px]">
                        <div className="group relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="material-symbols-outlined text-gray-400">
                                    search
                                </span>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm transition-shadow placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/50"
                                placeholder="Cari nama dokter..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-8 lg:flex-row">
                    {/* SideNavBar / Filters */}
                    <FilterSidebar
                        selectedDays={selectedDays}
                        onDaysChange={setSelectedDays}
                    />

                    {/* Doctor Grid */}
                    <div className="w-full flex-1">
                        {/* Sorting & Count */}
                        <div className="mb-6 flex items-center justify-between rounded-xl border border-subtle-light bg-white p-4">
                            <p className="text-sm text-gray-500">
                                <span className="font-bold text-text-light">
                                    {filteredDoctors.length} Dokter
                                </span>{' '}
                                ditemukan
                                {(searchQuery || selectedDays.length > 0) && (
                                    <span className="ml-1 text-gray-400">
                                        (dari {doctors.length} total)
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Grid Content */}
                        {filteredDoctors.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                                {filteredDoctors.map((doctor) => (
                                    <DoctorCard
                                        key={doctor.id}
                                        doctor={doctor}
                                        days={getDaysFromWorkingPeriods(doctor)}
                                        practiceHours={getPracticeHours(doctor)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-subtle-light bg-white p-12 text-center">
                                <span className="material-symbols-outlined mb-4 text-6xl text-gray-300">
                                    search_off
                                </span>
                                <h3 className="mb-2 text-lg font-semibold text-text-light">
                                    Tidak ada dokter ditemukan
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Coba ubah kata kunci pencarian atau filter
                                    jadwal praktek.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <FloatingWhatsApp />
        </div>
    );
}
