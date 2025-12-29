'use client';

import { Doctor } from '@/lib/doctors';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

interface BookingCalendarProps {
    doctor?: Doctor;
    doctorId: string;
}

export function BookingCalendar({ doctor, doctorId }: BookingCalendarProps) {
    const [activeTab, setActiveTab] = useState<'profil' | 'jadwal'>('profil');

    return (
        <>
            {/* Tabs Navigation */}
            <div className="sticky top-[65px] z-40 mb-6 rounded-xl border border-subtle-light bg-white shadow-sm">
                <div className="hide-scrollbar flex overflow-x-auto border-b border-subtle-light px-2">
                    <button
                        onClick={() => setActiveTab('profil')}
                        className={`min-w-[100px] flex-1 cursor-pointer border-b-2 py-4 text-center text-sm font-medium transition-colors ${
                            activeTab === 'profil'
                                ? 'border-primary font-bold text-primary'
                                : 'border-transparent text-gray-500 hover:text-primary'
                        }`}
                    >
                        Profil
                    </button>
                    <button
                        onClick={() => setActiveTab('jadwal')}
                        className={`min-w-[100px] flex-1 cursor-pointer border-b-2 py-4 text-center text-sm font-medium transition-colors ${
                            activeTab === 'jadwal'
                                ? 'border-primary font-bold text-primary'
                                : 'border-transparent text-gray-500 hover:text-primary'
                        }`}
                    >
                        Jadwal Praktek
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'profil' && (
                <section className="mb-6 rounded-xl border border-subtle-light bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-text-light">
                        Tentang Dokter
                    </h3>
                    <p className="mb-6 leading-relaxed text-gray-600">
                        {doctor?.profile ||
                            'Informasi profil dokter belum tersedia.'}
                    </p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Pendidikan */}
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <span className="material-symbols-outlined text-primary">
                                    school
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pendidikan
                                </p>
                                <p className="font-medium text-text-light">
                                    {doctor?.education || '-'}
                                </p>
                            </div>
                        </div>

                        {/* Pengalaman */}
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <span className="material-symbols-outlined text-primary">
                                    work_history
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Pengalaman
                                </p>
                                <p className="font-medium text-text-light">
                                    {doctor?.experience || '-'}
                                </p>
                            </div>
                        </div>

                        {/* Lokasi */}
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <span className="material-symbols-outlined text-primary">
                                    location_on
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Lokasi Praktek
                                </p>
                                <p className="font-medium text-text-light">
                                    {doctor?.location || '-'}
                                </p>
                            </div>
                        </div>

                        {/* Spesialisasi */}
                        <div className="flex items-start gap-3">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <span className="material-symbols-outlined text-primary">
                                    medical_services
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Spesialisasi
                                </p>
                                <p className="font-medium text-text-light">
                                    {doctor?.specialty || '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {activeTab === 'jadwal' && (
                <section className="mb-6 rounded-xl border border-subtle-light bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-text-light">
                        Jadwal Praktek
                    </h3>

                    <div className="space-y-4">
                        {/* Hari Praktek */}
                        <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <span className="material-symbols-outlined text-primary">
                                    calendar_month
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Hari Praktek
                                </p>
                                <p className="text-lg font-bold text-text-light">
                                    {doctor?.days || '-'}
                                </p>
                            </div>
                        </div>

                        {/* Jam Praktek */}
                        <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <span className="material-symbols-outlined text-primary">
                                    schedule
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Jam Praktek
                                </p>
                                <p className="text-lg font-bold text-text-light">
                                    {doctor?.practiceHours || '-'}
                                </p>
                            </div>
                        </div>

                        {/* Lokasi */}
                        <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                            <div className="rounded-lg bg-primary/10 p-2">
                                <span className="material-symbols-outlined text-primary">
                                    location_on
                                </span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">
                                    Lokasi Praktek
                                </p>
                                <p className="text-lg font-bold text-text-light">
                                    {doctor?.location || '-'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <Link
                            href={`/doctors/${doctorId}/booking`}
                            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 font-bold text-white shadow-md shadow-primary/20 transition-colors hover:bg-primary-dark"
                        >
                            <span>Booking Sekarang</span>
                            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </section>
            )}
        </>
    );
}
