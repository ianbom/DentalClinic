import { Link } from '@inertiajs/react';

export function AboutCTA() {
    return (
        <section className="flex justify-center border-t border-gray-100 bg-white px-4 py-12">
            <div className="flex w-full max-w-[960px] flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent p-8 md:flex-row">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-text-light">
                        Siap untuk senyum yang lebih sehat?
                    </h2>
                    <p className="text-gray-600">
                        Jadwalkan kunjungan Anda sekarang. Proses mudah & aman.
                    </p>
                </div>
                <Link
                    href="/doctors"
                    className="flex h-12 min-w-[140px] transform cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-lg bg-primary px-6 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                >
                    Buat Janji Temu
                </Link>
            </div>
        </section>
    );
}
