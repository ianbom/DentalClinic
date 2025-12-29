import Link from "next/link";

export function AboutCTA() {
    return (
        <section className="px-4 py-12 flex justify-center bg-white border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-[960px] w-full bg-gradient-to-r from-primary/10 to-transparent p-8 rounded-2xl">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-text-light">Siap untuk senyum yang lebih sehat?</h2>
                    <p className="text-gray-600">Jadwalkan kunjungan Anda sekarang. Proses mudah & aman.</p>
                </div>
                <Link
                    href="/doctors"
                    className="whitespace-nowrap flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5"
                >
                    Buat Janji Temu
                </Link>
            </div>
        </section>
    );
}
