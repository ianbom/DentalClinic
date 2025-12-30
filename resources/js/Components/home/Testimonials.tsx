export function Testimonials() {
    return (
        <section className="border-t border-subtle-light bg-primary/5 py-20">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <h2 className="mb-12 text-center text-3xl font-bold text-text-light md:text-4xl">
                    Kata Mereka
                </h2>

                <div className="hide-scrollbar flex snap-x snap-mandatory justify-center gap-6 overflow-x-auto pb-8">
                    {/* Review 2 - Aqila Zahra */}
                    <div className="w-[300px] shrink-0 snap-center rounded-2xl border border-subtle-light bg-white p-6 shadow-sm md:w-[350px]">
                        <div className="mb-4 flex items-center gap-1 text-yellow-400">
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                        </div>
                        <p className="mb-6 italic text-text-light">
                            "Alhamdulillah semua keluarga kami cocok periksa
                            giginya di dokter gigi Anna Fikril 😊. Dokternya
                            ramah, baik, tempatnya bersih banget... 😍"
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="text-sm font-bold">AZ</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-text-light">
                                    Aqila Zahra
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Review 1 - Purei Decentaria */}
                    <div className="w-[300px] shrink-0 snap-center rounded-2xl border border-subtle-light bg-white p-6 shadow-sm md:w-[350px]">
                        <div className="mb-4 flex items-center gap-1 text-yellow-400">
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                        </div>
                        <p className="mb-6 italic text-text-light">
                            "Dokternya ramah, rumah saya jauh dibela-belain
                            kesini soalnya anak saya dan embahnya sudah cocok,
                            tidak mau berpindah ke lain hati, sudah cocok sama
                            dokter Fikril 🙂😍. Pelayanan baik ramah, tiap habis
                            copot gigi untuk anak-anak dapat mainan yang mereka
                            bisa pilih yang bikin mereka happy."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="text-sm font-bold">PD</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-text-light">
                                    Purei Decentaria
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Review 3 - Tita Wijaya */}
                    <div className="w-[300px] shrink-0 snap-center rounded-2xl border border-subtle-light bg-white p-6 shadow-sm md:w-[350px]">
                        <div className="mb-4 flex items-center gap-1 text-yellow-400">
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                            <span className="material-symbols-outlined text-sm">
                                star
                            </span>
                        </div>
                        <p className="mb-6 italic text-text-light">
                            "Dokter giginya baik, sabar dan ramah ke anak.
                            Anak-anak ku yang takut ke dokter gigi jadi mau
                            periksa. Ruang tunggu yang nyaman dan ada mainan
                            anak-anaknya. Terimakasih dok!"
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="text-sm font-bold">TW</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-text-light">
                                    Tita Wijaya
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
