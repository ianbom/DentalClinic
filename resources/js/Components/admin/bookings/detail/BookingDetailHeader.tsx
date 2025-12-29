import Link from "next/link";
import React from "react";

export function BookingDetailHeader() {
    return (
        <div className="mb-8">
            <nav className="flex items-center text-sm font-medium text-slate-500 mb-3">
                <Link
                    href="/admin/bookings"
                    className="hover:text-primary transition-colors flex items-center gap-1"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        arrow_back
                    </span>
                    Kembali
                </Link>
                <span className="mx-2">/</span>
                <Link href="/admin/bookings" className="hover:text-primary transition-colors">
                    Daftar Booking
                </Link>
                <span className="mx-2">/</span>
                <span className="text-slate-900">Detail Booking</span>
            </nav>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Detail Booking
            </h1>
        </div>
    );
}
