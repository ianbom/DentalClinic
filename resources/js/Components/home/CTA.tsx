import { Link } from '@inertiajs/react';

export function CTA() {
    return (
        <section className="bg-background-light py-20">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-primary p-8 text-center text-white md:p-16">
                    {/* Decorative Circles */}
                    <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white opacity-10 blur-3xl"></div>

                    <h2 className="relative mb-6 text-3xl font-black md:text-4xl">
                        Siap untuk senyum yang lebih cerah?
                    </h2>
                    <p className="relative mx-auto mb-8 max-w-2xl text-lg text-white/90 md:text-xl">
                        Jangan tunda kesehatan gigi Anda. Jadwalkan kunjungan
                        Anda hari ini dengan mudah dan aman.
                    </p>

                    <div className="relative flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link href={'/doctors'}>
                            <button className="w-full cursor-pointer rounded-lg bg-white px-8 py-3 font-bold text-primary shadow-lg transition-colors hover:bg-gray-50 sm:w-auto">
                                Booking Sekarang
                            </button>
                        </Link>

                        <a
                            href="https://wa.me/6285231519966"
                            target="_blank"
                            className="w-full cursor-pointer rounded-lg border border-white bg-transparent px-8 py-3 font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
                            rel="noreferrer"
                        >
                            Konsultasi via WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
