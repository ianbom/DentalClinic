import { Link } from '@inertiajs/react';

export function Services() {
    return (
        <section className="bg-background-light py-20">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row">
                    <div className="max-w-2xl">
                        <h2 className="mb-4 text-3xl font-bold text-text-light md:text-4xl">
                            Layanan Unggulan
                        </h2>
                        <p className="text-lg text-gray-600">
                            Solusi lengkap untuk kesehatan gigi dan mulut Anda
                            dengan teknologi terkini.
                        </p>
                    </div>
                    <Link
                        href="#"
                        className="hidden items-center font-bold text-primary transition-colors hover:text-primary-dark md:flex"
                    >
                        Lihat Semua Layanan{' '}
                        <span className="material-symbols-outlined ml-1">
                            arrow_forward
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Service Card 1 */}
                    <div className="flex flex-col overflow-hidden rounded-2xl border border-subtle-light bg-white shadow-sm transition-shadow hover:shadow-lg">
                        <div
                            className="h-48 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2NV2fjfKDzwXx9_ISHmeNiviOMrDKOtIa1Rgeq2-dAqTzfhpl40cREJIHAA6nxe3eNdu_M_-gRhJP2hiJ-FW-LVxUbC9JiVgN2qKJbT-r684ILSGISmJgsRtJTUD_3WLu4FMG2CyeEJWeu3VXHxMTWgmWdsGy1x229zqw0eaq4FnYFMjx6eAX3lLwFDdOEBhKUNlP3tRbZR3p2bUYuYbESANYuoKfBTACFurmEQiBTjESsMXMvRNaLzVArF_LaVaAF5C0mreiZr-7')",
                            }}
                        ></div>
                        <div className="flex flex-grow flex-col p-6">
                            <h3 className="mb-2 text-xl font-bold text-text-light">
                                Pemeriksaan Rutin
                            </h3>
                            <p className="mb-4 flex-grow text-sm text-gray-500">
                                Pencegahan masalah gigi sejak dini dengan
                                pemeriksaan menyeluruh dan pembersihan karang
                                gigi.
                            </p>
                            <Link
                                href="#"
                                className="inline-flex items-center text-sm font-bold text-primary hover:underline"
                            >
                                Selengkapnya
                            </Link>
                        </div>
                    </div>

                    {/* Service Card 2 */}
                    <div className="flex flex-col overflow-hidden rounded-2xl border border-subtle-light bg-white shadow-sm transition-shadow hover:shadow-lg">
                        <div
                            className="h-48 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClzxPprnvFpq40ApBw3Dz_SI854zK48mTQvcFJHdJRoe4IXIsUEscvNcOWKgYAMQkOCg1xZrRr9o8RMs8-Y-X6iDDxGaJJBUggSf01mmJuemwMg2CjwDfU7gbH4f13W5dIJv0rh7vJ26KmINEFrLTqKJ2xetToTda54__hiY14hffTv6S40CtY2bk5Ln7xZCVhjja0oDRVJwM0Bbg9ZAhew1xdgY5TetU25TG94hlt8SzzYyMBP3L7PcACizc0lVALzu6qeCsnqPNk')",
                            }}
                        ></div>
                        <div className="flex flex-grow flex-col p-6">
                            <h3 className="mb-2 text-xl font-bold text-text-light">
                                Orthodonti (Kawat Gigi)
                            </h3>
                            <p className="mb-4 flex-grow text-sm text-gray-500">
                                Rapikan susunan gigi Anda untuk senyum yang
                                lebih estetik dan fungsi kunyah yang lebih baik.
                            </p>
                            <Link
                                href="#"
                                className="inline-flex items-center text-sm font-bold text-primary hover:underline"
                            >
                                Selengkapnya
                            </Link>
                        </div>
                    </div>

                    {/* Service Card 3 */}
                    <div className="flex flex-col overflow-hidden rounded-2xl border border-subtle-light bg-white shadow-sm transition-shadow hover:shadow-lg">
                        <div
                            className="h-48 bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRFwzYgPNdiNYyKnkHtzL3GpKBe3PvNrmRsxUK6bgMJDichTap90aqQqMy3oEfzBJOEmgXXFDHmG5odPbj38HHVAaGEt-DFohQJT6HNis6gPXlx8sFMFDpHmuX6hDwpifjEN8r6VeNOl5U2YHhRrXbw6TEh-W-xKIO8V8Fi-fuuCjsH12Z6Ow2CqRuZEmODmxAWqU_Zv0_FVi1BYggriEGXncu6B7QTIy2J-yMnMPUOm9gyqOye_ECoitIJPISly14bM1Ba_fwn4Iw')",
                            }}
                        ></div>
                        <div className="flex flex-grow flex-col p-6">
                            <h3 className="mb-2 text-xl font-bold text-text-light">
                                Pemutihan Gigi
                            </h3>
                            <p className="mb-4 flex-grow text-sm text-gray-500">
                                Kembalikan warna putih alami gigi Anda dengan
                                prosedur bleaching yang aman dan efektif.
                            </p>
                            <Link
                                href="#"
                                className="inline-flex items-center text-sm font-bold text-primary hover:underline"
                            >
                                Selengkapnya
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="#"
                        className="inline-flex items-center font-bold text-primary transition-colors hover:text-primary-dark"
                    >
                        Lihat Semua Layanan{' '}
                        <span className="material-symbols-outlined ml-1">
                            arrow_forward
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
