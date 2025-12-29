export function ServicesHero() {
    return (
        <section className="flex w-full justify-center border-b border-gray-100 bg-white px-4 py-12 md:px-10 md:py-20">
            <div className="flex w-full max-w-[960px] flex-col items-center gap-6 text-center">
                <div className="flex flex-col gap-4">
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">
                        Layanan Kami
                    </span>
                    <h1 className="text-4xl font-black leading-tight tracking-tight text-text-light md:text-5xl">
                        Perawatan Gigi Lengkap
                        <br />
                        Untuk Seluruh Keluarga
                    </h1>
                    <p className="mx-auto max-w-[720px] text-lg font-normal leading-relaxed text-gray-500">
                        Dari pemeriksaan rutin hingga perawatan estetika, kami
                        menyediakan layanan profesional untuk membantu Anda
                        mendapatkan senyum sempurna.
                    </p>
                </div>
            </div>
        </section>
    );
}
