import Link from "next/link";

export function Hero() {
    return (
        <section className="relative pt-16 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl opacity-60"></div>

            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    <div className="flex flex-col items-start gap-6 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Terpercaya & Aman
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-text-light">
                            Senyum Sehat,<br />
                            <span className="text-primary">Hidup Bahagia</span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                            Dapatkan perawatan gigi profesional dengan dokter ahli. Proses booking yang mudah melalui WhatsApp dan sistem pembayaran yang aman.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
                            <Link href={'/doctors'}>
                                <button className="flex items-center justify-center h-12 px-8 rounded-lg bg-primary hover:bg-primary-dark text-white text-base font-bold shadow-lg shadow-primary/25 transition-all w-full sm:w-auto cursor-pointer">
                                    Booking Sekarang
                                </button>
                            </Link>
                            
                            <button className="flex items-center justify-center h-12 px-8 rounded-lg border border-subtle-light hover:bg-subtle-light text-text-light text-base font-medium transition-all w-full sm:w-auto cursor-pointer">
                                <span className="material-symbols-outlined mr-2 text-primary">play_circle</span>
                                Lihat Tur Klinik
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mt-6 text-sm text-gray-500">
                            <div className="flex -space-x-2">
                                <div
                                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCINJT_1-J-upYrcV1NwsZqJodqzWict4byW9vjZAHpZaM46oCSbbYKlzBj9_17kXqK7lmtTOOjUgxF8mg7T6MKH9bBWRXk7jHO9pIwqJRcZ_wEi35RYl6AkOJJdNAqVMGptlsSzmodyNX75Snz3-mB14AaGMLhublOJenEV3RKVEO3jN7H-K1B-M136J4EF3o0jnOE69dOfHPP4-VJCPMpFHop3EpH8r79m_7VKVxsEMbjyMcuFhGQzAZ40EVoBbNOtRj7wdOolvCX')" }}
                                ></div>
                                <div
                                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLagEvdxSefKogGm7Zt5pakA-4KgajW6YnI1msNuEp1IAi-CTM3Jrvh3or5H0CMRkI_cEH96ZRHxQ2G78s8imlFvP9a_dFg3baFoq0rbd-f-FD32XHHxZ6scnyQzOJflxJC0YcvxVll6lTg7_nuFAsGM0wQQsfRAlRFZs3SiFiP2eABNjQE9yJmCAMyF8me9724o8D0ipbVRedHMPWeY-xqLX3OHcdReDDuIlj2mSUuSNuirscL4LIDaeWhhAl8tm-i5cO7O3bMndr')" }}
                                ></div>
                                <div
                                    className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFe4raEKvOZI4ySc-oayEaiCTdGJ67x1LaXD8f60DjwtJ6fi8tYKsXCe8u10YwOqsDVknppJS1Iw3PhSOuGU-IapCgF94qliFYADqWso7U0TtG9726k37Dq0sWy43L3RT7Gpug5lfPjEy5IkMx3k2-LVPWPuC2shC9y59MKtalJMJgZbh0O-YYRS-dHKBTt6ugBSeC-h5K1LhGyOzLIhC8m-9DkV38P70xKSvd2fQj6NidPH7NddFJdRttJqllUWNCpciVL0tMuzWV')" }}
                                ></div>
                            </div>
                            <p>Dipercaya oleh <span className="font-bold text-text-light">2.000+</span> Pasien</p>
                        </div>
                    </div>

                    <div className="relative lg:h-auto w-full flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-full aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDk-lpmq9vHfIwRJIy4KHhFhqQfJ9hMqwqW1p7PQ85fTUKuoB_gRWAj3X1lvhQGzVINvm2gdmn9Yu6nISSU3nG-9kcixFeJgOmtmOod_6VZq3vTFBpvgfFIux-H8cjXamyvdEmYZrN1Mhf5qYyuT6mhljV7TF5TEOPiRmyINpzdv1UjuKvPsBrpmpyUOqeRB9cuUywIM7SV2U_FWFjI8tPYvztMCLVJ_2duAO2jtCYX_B36JgOptwiV3zkyNcYmqxOUdHjOzdtjqcTM')" }}
                            ></div>

                            {/* Decorative float card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/20">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                                        <span className="material-symbols-outlined">verified</span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Status Dokter</p>
                                        <p className="text-sm font-bold text-text-light">Tersedia Hari Ini</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="text-primary font-bold">4.9</span>
                                        <span className="text-yellow-400 text-sm">★</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
