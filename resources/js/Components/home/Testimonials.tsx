export function Testimonials() {
    return (
        <section className="py-20 bg-primary/5 border-t border-subtle-light">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-text-light mb-12">Kata Mereka</h2>

                <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory hide-scrollbar">
                    {/* Review 1 */}
                    <div className="snap-center shrink-0 w-[300px] md:w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-subtle-light">
                        <div className="flex items-center gap-1 text-yellow-400 mb-4">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                        </div>
                        <p className="text-text-light mb-6 italic">"Pelayanan sangat ramah dan tidak sakit sama sekali saat scaling. Dokter sangat sabar menjelaskan kondisi gigi saya."</p>
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB7BO6qoPvFDq8Jt1nQ9D00H58-DadMON9IKP_rFMPMIoo29jKNVH-ciRhnZx3PNME3MdaeYK_wZkyNVUiSRRuX9BLahG4GUMUY0SjSh49dVkVF4OT0ABbqINyBVhUUi52YpkH9xpE3qW98EG_LzHG-ASYDFHXnxGp2iZ0voZUprbdOrGixT-JPa6WaSP5eAF98-GIXlwZj9oa0nY4iDsRx6psx-8JIgQjEB50Lf5lxHJxn8Aevyo22EvC23jQalsTf04tlR5A9PZqz')" }}
                            ></div>
                            <div>
                                <p className="font-bold text-sm text-text-light">Budi Santoso</p>
                                <p className="text-xs text-gray-500">Pasien Scaling</p>
                            </div>
                        </div>
                    </div>

                    {/* Review 2 */}
                    <div className="snap-center shrink-0 w-[300px] md:w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-subtle-light">
                        <div className="flex items-center gap-1 text-yellow-400 mb-4">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                        </div>
                        <p className="text-text-light mb-6 italic">"Tempatnya bersih banget, modern, dan proses booking lewat WA gampang banget. Recommended!"</p>
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGkOUnuRIiaZC2frAQM_sBXYqGidaWQbZcavGPlGMxgvP8FQvWNcT8fTl_zpURbLflx86OLQQnace0u7vqDcRMHUcTX3ixJHpu9kzixbMGbAToLSqrOAE16bqhJg96UAb1_bvAz_GFRpGB_w09nfx8OrXCTmEpScqY0aOHklACQevMQkmLWKQlrC8iXRPGSDakjVGlRvgf62not2sTMLkXgu7tQiiXVfspW7C2SiAy8Dim_bxlveLnxjI11Hec-glrLo5ddGYFMp9u')" }}
                            ></div>
                            <div>
                                <p className="font-bold text-sm text-text-light">Siti Aminah</p>
                                <p className="text-xs text-gray-500">Pasien Tambal Gigi</p>
                            </div>
                        </div>
                    </div>

                    {/* Review 3 */}
                    <div className="snap-center shrink-0 w-[300px] md:w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-subtle-light">
                        <div className="flex items-center gap-1 text-yellow-400 mb-4">
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star</span>
                            <span className="material-symbols-outlined text-sm">star_half</span>
                        </div>
                        <p className="text-text-light mb-6 italic">"Awalnya takut ke dokter gigi, tapi di sini suasanya nyaman. Anak saya juga jadi berani periksa gigi."</p>
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDMQR7zCHg7lnsk6hd94u8DBYK9_rSkRkM_ifA5cWLgRzvAbJEOeccPVrnJ-rz1blOD1qUN6d7qCAaxQ1jJOneq3KV6S7Daa-o_dDD5-gmJSTCeUmJ0GMgjyd4Q8yZgh7SGwsDHILWFDNHc9hdS32A5HyOtlw9uvu8c3DXT5miZyALrIwRuRJcyhB562r6AWxCh0GSaOp66eZNbdmn-G2n_zWb-lJGe4R7V1lajSHTVmQCJNa2M20d2v6n4XX8YbKC2t3dh4rTj0DtZ')" }}
                            ></div>
                            <div>
                                <p className="font-bold text-sm text-text-light">Andi Wijaya</p>
                                <p className="text-xs text-gray-500">Orang Tua Pasien</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
