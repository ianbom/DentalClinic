import { Link } from '@inertiajs/react';

export function BookingTabs() {
    return (
        <div className="mt-2 border-b border-slate-200">
            <div className="flex gap-8">
                <Link
                    href="#"
                    className="relative flex items-center justify-center pb-3 pt-2 text-sm font-bold text-primary"
                >
                    Daftar
                    <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-t-full bg-primary"></span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center justify-center pb-3 pt-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
                >
                    Kalender
                </Link>
            </div>
        </div>
    );
}
