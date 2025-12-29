import { Link } from '@inertiajs/react';

export function BookingDetailHeader() {
    return (
        <div className="mb-8">
            <nav className="mb-3 flex items-center text-sm font-medium text-slate-500">
                <Link
                    href="/admin/bookings"
                    className="flex items-center gap-1 transition-colors hover:text-primary"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        arrow_back
                    </span>
                    Kembali
                </Link>
                <span className="mx-2">/</span>
                <Link
                    href="/admin/bookings"
                    className="transition-colors hover:text-primary"
                >
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
