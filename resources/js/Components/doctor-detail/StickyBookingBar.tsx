import Link from "next/link";

interface StickyBookingBarProps {
    doctorId: string;
    price: string;
}

export function StickyBookingBar({ doctorId, price }: StickyBookingBarProps) {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-subtle-light p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="max-w-[960px] mx-auto flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Total Biaya Konsultasi</span>
                    <span className="text-lg md:text-xl font-bold text-text-light">{price}</span>
                </div>
                <Link href={`/doctors/${doctorId}/booking`} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-primary/25 cursor-pointer">
                    <span>Booking Sekarang</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
            </div>
        </div>
    );
}
