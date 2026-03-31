'use client';
import { BookingResultCard } from '@/Components/check-booking/BookingResultCard';
import { BookingSearchForm } from '@/Components/check-booking/BookingSearchForm';
import PatientLayout from '@/Layouts/PatientLayout';
import { Booking } from '@/types';
import { Link, usePage } from '@inertiajs/react';

interface CheckBookingPageProps {
    booking?: Booking;
}

function CheckBookingPage({ booking }: CheckBookingPageProps) {
    const { errors } = usePage().props as { errors?: Record<string, string> };

    return (
        <main className="flex min-h-[calc(100vh-64px)] flex-grow flex-col items-center justify-start bg-background-light px-4 py-10 font-display sm:px-6">
            <div className="flex w-full max-w-[800px] flex-col gap-8">
                {/* Page Heading Section */}
                <div className="space-y-3 text-center">
                    <h1 className="text-3xl font-black tracking-tight text-text-main-light md:text-4xl">
                        Lacak Janji Temu Anda
                    </h1>
                    <p className="mx-auto max-w-lg text-base text-text-sub-light md:text-lg">
                        Masukkan NIK (Nomor Induk Kependudukan) Anda untuk
                        melihat booking terbaru Anda.
                    </p>
                </div>

                {/* Error Message */}
                {errors?.booking && (
                    <div className="flex flex-col items-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700">
                        <p className="font-medium">{errors.booking}</p>
                        <a
                            href="https://wa.me/6285231519966?text=Halo%20Admin%2C%20saya%20mengalami%20kendala%20saat%20mengecek%20booking%20saya."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-green-700"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                chat
                            </span>
                            Hubungi Admin
                        </a>
                    </div>
                )}

                {/* Result Card */}
                {booking && <BookingResultCard booking={booking} />}

                {/* Search Form Card */}
                <BookingSearchForm />

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
