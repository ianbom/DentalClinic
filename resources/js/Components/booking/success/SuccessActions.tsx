import { Link } from '@inertiajs/react';

export function SuccessActions() {
    return (
        <>
            <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
                <Link
                    href="/"
                    className="order-2 flex h-12 w-full min-w-[200px] items-center justify-center rounded-lg border border-gray-300 px-6 font-bold text-text-light transition-colors hover:bg-gray-50 md:order-1 md:w-auto"
                >
                    Kembali ke Beranda
                </Link>

                <Link href={'/check-booking'}>
                    <button className="order-1 h-12 w-full min-w-[200px] cursor-pointer rounded-lg bg-primary px-6 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 hover:bg-primary/90 md:order-2 md:w-auto">
                        Cek Status Booking
                    </button>
                </Link>
            </div>
            <div className="mt-12 text-center">
                <p className="text-sm text-gray-400">
                    Butuh bantuan?{' '}
                    <a
                        className="font-medium text-primary hover:underline"
                        href="#"
                    >
                        Chat Admin via WhatsApp
                    </a>
                </p>
            </div>
        </>
    );
}
