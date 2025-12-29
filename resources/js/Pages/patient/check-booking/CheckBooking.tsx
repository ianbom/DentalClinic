"use client";

import { BookingSearchForm } from "@/app/components/check-booking/BookingSearchForm";
import { BookingResultCard } from "@/app/components/check-booking/BookingResultCard";
import { useState } from "react";
import Link from "next/link";

export default function CheckBookingPage() {
    const [showResult, setShowResult] = useState(false);

    return (
        <main className="flex-grow flex flex-col items-center justify-start py-10 px-4 sm:px-6 font-display bg-background-light min-h-[calc(100vh-64px)]">
            <div className="w-full max-w-[800px] flex flex-col gap-8">
                {/* Page Heading Section */}
                <div className="text-center space-y-3">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight text-text-main-light">
                        Lacak Janji Temu Anda
                    </h1>
                    <p className="text-text-sub-light text-base md:text-lg max-w-lg mx-auto">
                        Masukkan nomor WhatsApp dan kode booking yang Anda terima untuk melihat status terkini.
                    </p>
                </div>

                {/* Search Form Card */}
                <BookingSearchForm onSearch={() => setShowResult(true)} />

                {/* Result Card (Simulating a found booking) */}
                {showResult && <BookingResultCard />}

                {/* New Booking Prompt */}
                <div className="text-center mt-4">
                    <p className="text-text-sub-light text-sm">
                        Ingin membuat janji temu lain?{" "}
                        <Link className="text-primary font-bold hover:underline" href="/doctors">
                            Buat Booking Baru
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
