import { Link } from '@inertiajs/react';

export function Hero() {
    return (
        <section className="relative overflow-hidden pb-20 pt-16 lg:pb-28 lg:pt-32">
            {/* Background Decoration */}
            <div className="absolute right-0 top-0 -z-10 h-full w-1/2 bg-gradient-to-l from-primary/10 to-transparent opacity-60 blur-3xl"></div>

            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
                    <div className="flex max-w-2xl flex-col items-start gap-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
                            Terpercaya & Aman
                        </div>

                        <h1 className="text-4xl font-black leading-tight tracking-tight text-text-light sm:text-5xl lg:text-6xl">
                            Senyum Sehat,
                            <br />
                            <span className="text-primary">Hidup Bahagia</span>
                        </h1>

                        <p className="max-w-lg text-lg leading-relaxed text-gray-600">
                            Dapatkan perawatan gigi profesional dengan dokter
                            ahli. Proses booking yang mudah melalui WhatsApp dan
                            sistem pembayaran yang aman.
                        </p>

                        <div className="mt-4 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                            <Link href={'/doctors'}>
                                <button className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary-dark sm:w-auto">
                                    Booking Sekarang
                                </button>
                            </Link>

                            <button className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg border border-subtle-light px-8 text-base font-medium text-text-light transition-all hover:bg-subtle-light sm:w-auto">
                                <span className="material-symbols-outlined mr-2 text-primary">
                                    play_circle
                                </span>
                                Lihat Tur Klinik
                            </button>
                        </div>

                        <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex -space-x-2">
                                <div
                                    className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCINJT_1-J-upYrcV1NwsZqJodqzWict4byW9vjZAHpZaM46oCSbbYKlzBj9_17kXqK7lmtTOOjUgxF8mg7T6MKH9bBWRXk7jHO9pIwqJRcZ_wEi35RYl6AkOJJdNAqVMGptlsSzmodyNX75Snz3-mB14AaGMLhublOJenEV3RKVEO3jN7H-K1B-M136J4EF3o0jnOE69dOfHPP4-VJCPMpFHop3EpH8r79m_7VKVxsEMbjyMcuFhGQzAZ40EVoBbNOtRj7wdOolvCX')",
                                    }}
                                ></div>
                                <div
                                    className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLagEvdxSefKogGm7Zt5pakA-4KgajW6YnI1msNuEp1IAi-CTM3Jrvh3or5H0CMRkI_cEH96ZRHxQ2G78s8imlFvP9a_dFg3baFoq0rbd-f-FD32XHHxZ6scnyQzOJflxJC0YcvxVll6lTg7_nuFAsGM0wQQsfRAlRFZs3SiFiP2eABNjQE9yJmCAMyF8me9724o8D0ipbVRedHMPWeY-xqLX3OHcdReDDuIlj2mSUuSNuirscL4LIDaeWhhAl8tm-i5cO7O3bMndr')",
                                    }}
                                ></div>
                                <div
                                    className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFe4raEKvOZI4ySc-oayEaiCTdGJ67x1LaXD8f60DjwtJ6fi8tYKsXCe8u10YwOqsDVknppJS1Iw3PhSOuGU-IapCgF94qliFYADqWso7U0TtG9726k37Dq0sWy43L3RT7Gpug5lfPjEy5IkMx3k2-LVPWPuC2shC9y59MKtalJMJgZbh0O-YYRS-dHKBTt6ugBSeC-h5K1LhGyOzLIhC8m-9DkV38P70xKSvd2fQj6NidPH7NddFJdRttJqllUWNCpciVL0tMuzWV')",
                                    }}
                                ></div>
                            </div>
                            <p>
                                Dipercaya oleh{' '}
                                <span className="font-bold text-text-light">
                                    2.000+
                                </span>{' '}
                                Pasien
                            </p>
                        </div>
                    </div>

                    <div className="relative flex w-full justify-center lg:h-auto lg:justify-end">
                        <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl bg-gray-100 shadow-2xl lg:aspect-square lg:max-w-full">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDk-lpmq9vHfIwRJIy4KHhFhqQfJ9hMqwqW1p7PQ85fTUKuoB_gRWAj3X1lvhQGzVINvm2gdmn9Yu6nISSU3nG-9kcixFeJgOmtmOod_6VZq3vTFBpvgfFIux-H8cjXamyvdEmYZrN1Mhf5qYyuT6mhljV7TF5TEOPiRmyINpzdv1UjuKvPsBrpmpyUOqeRB9cuUywIM7SV2U_FWFjI8tPYvztMCLVJ_2duAO2jtCYX_B36JgOptwiV3zkyNcYmqxOUdHjOzdtjqcTM')",
                                }}
                            ></div>

                            {/* Decorative float card */}
                            <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                                        <span className="material-symbols-outlined">
                                            verified
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-gray-500">
                                            Status Dokter
                                        </p>
                                        <p className="text-sm font-bold text-text-light">
                                            Tersedia Hari Ini
                                        </p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="font-bold text-primary">
                                            4.9
                                        </span>
                                        <span className="text-sm text-yellow-400">
                                            ★
                                        </span>
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
