'use client';

import { BookingResultCard } from '@/Components/check-booking/BookingResultCard';
import { BookingSearchForm } from '@/Components/check-booking/BookingSearchForm';
import PatientLayout from '@/Layouts/PatientLayout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

function CheckBookingPage() {
    const [showResult, setShowResult] = useState(false);

    return (
        <main className="flex min-h-[calc(100vh-64px)] flex-grow flex-col items-center justify-start bg-background-light px-4 py-10 font-display sm:px-6">
            <div className="flex w-full max-w-[800px] flex-col gap-8">
                {/* Page Heading Section */}
                <div className="space-y-3 text-center">
                    <h1 className="text-3xl font-black tracking-tight text-text-main-light md:text-4xl">
                        Lacak Janji Temu Anda
                    </h1>
                    <p className="mx-auto max-w-lg text-base text-text-sub-light md:text-lg">
                        Masukkan nomor WhatsApp dan kode booking yang Anda
                        terima untuk melihat status terkini.
                    </p>
                </div>

                {/* Search Form Card */}
                <BookingSearchForm onSearch={() => setShowResult(true)} />

                {/* Result Card (Simulating a found booking) */}
                {showResult && <BookingResultCard />}

                {/* New Booking Prompt */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-text-sub-light">
                        Ingin membuat janji temu lain?{' '}
                        <Link
                            className="font-bold text-primary hover:underline"
                            href="/doctors"
                        >
                            Buat Booking Baru
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

CheckBookingPage.layout = (page: React.ReactNode) => (
    <PatientLayout>{page}</PatientLayout>
);

export default CheckBookingPage;
