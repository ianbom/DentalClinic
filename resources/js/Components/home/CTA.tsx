import Link from "next/link";

export function CTA() {
    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-primary text-white p-8 md:p-16 text-center">
                    {/* Decorative Circles */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>

                    <h2 className="relative text-3xl md:text-4xl font-black mb-6">Siap untuk senyum yang lebih cerah?</h2>
                    <p className="relative text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">Jangan tunda kesehatan gigi Anda. Jadwalkan kunjungan Anda hari ini dengan mudah dan aman.</p>

                    <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href={'/doctors'}>
                            <button className="w-full sm:w-auto px-8 py-3 bg-white text-primary font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-lg cursor-pointer">
                                Booking Sekarang
                            </button>
                        </Link>
                        
                        <button className="w-full sm:w-auto px-8 py-3 bg-transparent border border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                            Konsultasi via WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
