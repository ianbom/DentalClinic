import Link from "next/link";

export function ServicesCTA() {
    return (
        <section className="w-full px-4 md:px-10 flex justify-center py-10 md:py-16">
            <div className="max-w-[960px] w-full">
                <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-8 py-12 md:px-16 md:py-20 text-center shadow-xl">
                    {/* Decorative background elements */}
                    <div
                        className="absolute top-0 left-0 h-full w-full opacity-20"
                        style={{
                            backgroundImage: "radial-gradient(#0da2e7 1px, transparent 1px)",
                            backgroundSize: "24px 24px"
                        }}
                    ></div>
                    <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col items-center gap-6">
                        <h2 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                            Siap untuk Senyum Lebih Cerah?
                        </h2>
                        <p className="text-slate-300 text-base md:text-lg max-w-[600px]">
                            Jadwalkan kunjungan Anda hari ini. Tim kami yang ramah siap membantu semua kebutuhan gigi Anda.
                        </p>
                        <Link
                            href="/doctors"
                            className="flex items-center gap-2 h-12 px-8 rounded-lg bg-primary hover:bg-sky-500 text-white text-base font-bold shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                            <span>Booking Sekarang</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
