"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { DoctorCard } from "@/app/components/doctors/DoctorCard";
import { FilterSidebar } from "@/app/components/doctors/FilterSidebar";
import { FloatingWhatsApp } from "@/app/components/layout/FloatingWhatsApp";
import { Doctor } from "@/lib/doctors";

interface DoctorListClientProps {
    doctors: Doctor[];
}

export function DoctorListClient({ doctors }: DoctorListClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    // Filter doctors based on search and selected days
    const filteredDoctors = useMemo(() => {
        return doctors.filter(doctor => {
            // Search filter
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = searchQuery === "" ||
                doctor.name.toLowerCase().includes(searchLower) ||
                doctor.specialty.toLowerCase().includes(searchLower) ||
                doctor.location.toLowerCase().includes(searchLower);

            // Schedule filter
            const matchesSchedule = selectedDays.length === 0 ||
                selectedDays.some(day => doctor.days.toLowerCase().includes(day.toLowerCase()));

            return matchesSearch && matchesSchedule;
        });
    }, [doctors, searchQuery, selectedDays]);

    return (
        <div className="grow bg-background-light min-h-screen font-display">
            <div className="mx-auto max-w-[1280px] px-4 lg:px-8 py-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm mb-6">
                    <Link href="/" className="text-gray-500 hover:text-primary transition-colors">Beranda</Link>
                    <span className="text-gray-300">/</span>
                    <span className="font-medium text-text-light">Cari Dokter</span>
                </div>

                {/* Page Heading & Search */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div className="max-w-xl">
                        <h1 className="text-3xl md:text-4xl font-bold text-text-light mb-2">Temukan Dokter Gigi Terbaik</h1>
                        <p className="text-gray-500">Pilih dokter spesialis berpengalaman untuk senyum sehat Anda.</p>
                    </div>
                    <div className="w-full md:w-auto md:min-w-[400px]">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-gray-400">search</span>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary placeholder:text-gray-400 transition-shadow shadow-sm"
                                placeholder="Cari nama dokter, spesialisasi, atau lokasi..."
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* SideNavBar / Filters */}
                    <FilterSidebar
                        selectedDays={selectedDays}
                        onDaysChange={setSelectedDays}
                    />

                    {/* Doctor Grid */}
                    <div className="flex-1 w-full">
                        {/* Sorting & Count */}
                        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-subtle-light">
                            <p className="text-sm text-gray-500">
                                <span className="font-bold text-text-light">{filteredDoctors.length} Dokter</span> ditemukan
                                {(searchQuery || selectedDays.length > 0) && (
                                    <span className="text-gray-400 ml-1">
                                        (dari {doctors.length} total)
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Grid Content */}
                        {filteredDoctors.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredDoctors.map(doctor => (
                                    <DoctorCard key={doctor.id} doctor={doctor} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-subtle-light p-12 text-center">
                                <span className="material-symbols-outlined text-gray-300 text-6xl mb-4">search_off</span>
                                <h3 className="text-lg font-semibold text-text-light mb-2">Tidak ada dokter ditemukan</h3>
                                <p className="text-gray-500 text-sm">
                                    Coba ubah kata kunci pencarian atau filter jadwal praktek.
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
