export function ServicesHero() {
    return (
        <section className="w-full bg-white py-12 md:py-20 px-4 md:px-10 flex justify-center border-b border-gray-100">
            <div className="max-w-[960px] w-full flex flex-col items-center text-center gap-6">
                <div className="flex flex-col gap-4">
                    <span className="text-primary text-sm font-bold uppercase tracking-wider">Layanan Kami</span>
                    <h1 className="text-text-light text-4xl md:text-5xl font-black leading-tight tracking-tight">
                        Perawatan Gigi Lengkap<br />Untuk Seluruh Keluarga
                    </h1>
                    <p className="text-gray-500 text-lg font-normal leading-relaxed max-w-[720px] mx-auto">
                        Dari pemeriksaan rutin hingga perawatan estetika, kami menyediakan layanan profesional untuk membantu Anda mendapatkan senyum sempurna.
                    </p>
                </div>
            </div>
        </section>
    );
}
