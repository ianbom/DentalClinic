import { Link } from '@inertiajs/react';

export function ServicesCTA() {
    return (
        <section className="flex w-full justify-center px-4 py-10 md:px-10 md:py-16">
            <div className="w-full max-w-[960px]">
                <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-8 py-12 text-center shadow-xl md:px-16 md:py-20">
                    {/* Decorative background elements */}
                    <div
                        className="absolute left-0 top-0 h-full w-full opacity-20"
                        style={{
                            backgroundImage:
                                'radial-gradient(#0da2e7 1px, transparent 1px)',
                            backgroundSize: '24px 24px',
                        }}
                    ></div>
                    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                            Siap untuk Senyum Lebih Cerah?
                        </h2>
                        <p className="max-w-[600px] text-base text-slate-300 md:text-lg">
                            Jadwalkan kunjungan Anda hari ini. Tim kami yang
                            ramah siap membantu semua kebutuhan gigi Anda.
                        </p>
                        <Link
                            href="/doctors"
                            className="flex h-12 items-center gap-2 rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:bg-sky-500 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                calendar_month
                            </span>
                            <span>Booking Sekarang</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
