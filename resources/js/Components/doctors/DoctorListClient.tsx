'use client';

import { DoctorCard } from '@/Components/doctors/DoctorCard';
import { FloatingWhatsApp } from '@/Components/layout/FloatingWhatsApp';
import { getDaysFromWorkingPeriods } from '@/lib/utils/schedule';
import { Doctor } from '@/types';
import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface DoctorListClientProps {
    doctors: Doctor[];
}

export function DoctorListClient({ doctors }: DoctorListClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter doctors based on search
    const filteredDoctors = useMemo(() => {
        return doctors.filter((doctor) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                searchQuery === '' ||
                doctor.name.toLowerCase().includes(searchLower)
            );
        });
    }, [doctors, searchQuery]);

    const waNumber = '6281234567890'; // Ganti dengan nomor WA yang benar
    const waMessage = encodeURIComponent(
        'Halo, saya ingin konsultasi online mengenai kesehatan gigi.',
    );

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
                    {/* WhatsApp Consultation Card */}
                    <div className="w-full shrink-0 lg:sticky lg:top-24 lg:w-72">
                        <div className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex size-12 items-center justify-center rounded-full bg-green-500 text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-6"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold text-green-800">
                                        Konsultasi Online
                                    </h3>
                                    <p className="text-sm text-green-600">
                                        Via WhatsApp
                                    </p>
                                </div>
                            </div>
                            <p className="mb-4 text-sm leading-relaxed text-gray-600">
                                Butuh konsultasi cepat tanpa harus datang ke
                                klinik? Hubungi kami via WhatsApp untuk
                                konsultasi online dengan dokter kami.
                            </p>
                            <a
                                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-4 py-3 font-bold text-white transition-colors hover:bg-green-600"
                            >
                                <span className="material-symbols-outlined text-xl">
                                    chat
                                </span>
                                Hubungi Sekarang
                            </a>
                        </div>
                    </div>

                    {/* Doctor Grid */}
                    <div className="w-full flex-1">
                        {/* Sorting & Count */}
                        <div className="mb-6 flex items-center justify-between rounded-xl border border-subtle-light bg-white p-4">
                            <p className="text-sm text-gray-500">
                                <span className="font-bold text-text-light">
                                    {filteredDoctors.length} Dokter
                                </span>{' '}
                                ditemukan
                                {searchQuery && (
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
                                    Coba ubah kata kunci pencarian.
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
