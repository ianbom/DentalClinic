import { Link } from '@inertiajs/react';

interface StickyBookingBarProps {
    doctorId: string;
    price: string;
}

export function StickyBookingBar({ doctorId, price }: StickyBookingBarProps) {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full border-t border-subtle-light bg-white p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="mx-auto flex max-w-[960px] items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">
                        Total Biaya Konsultasi
                    </span>
                    <span className="text-lg font-bold text-text-light md:text-xl">
                        {price}
                    </span>
                </div>
                <Link
                    href={`/doctors/${doctorId}/booking`}
                    className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark"
                >
                    <span>Booking Sekarang</span>
                    <span className="material-symbols-outlined text-lg">
                        arrow_forward
                    </span>
                </Link>
            </div>
        </div>
    );
}
