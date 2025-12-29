import Link from "next/link";

export function Services() {
    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4">Layanan Unggulan</h2>
                        <p className="text-gray-600 text-lg">Solusi lengkap untuk kesehatan gigi dan mulut Anda dengan teknologi terkini.</p>
                    </div>
                    <Link href="#" className="hidden md:flex items-center font-bold text-primary hover:text-primary-dark transition-colors">
                        Lihat Semua Layanan <span className="material-symbols-outlined ml-1">arrow_forward</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Service Card 1 */}
                    <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-subtle-light hover:shadow-lg transition-shadow">
                        <div
                            className="h-48 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA2NV2fjfKDzwXx9_ISHmeNiviOMrDKOtIa1Rgeq2-dAqTzfhpl40cREJIHAA6nxe3eNdu_M_-gRhJP2hiJ-FW-LVxUbC9JiVgN2qKJbT-r684ILSGISmJgsRtJTUD_3WLu4FMG2CyeEJWeu3VXHxMTWgmWdsGy1x229zqw0eaq4FnYFMjx6eAX3lLwFDdOEBhKUNlP3tRbZR3p2bUYuYbESANYuoKfBTACFurmEQiBTjESsMXMvRNaLzVArF_LaVaAF5C0mreiZr-7')" }}
                        ></div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-text-light">Pemeriksaan Rutin</h3>
                            <p className="text-sm text-gray-500 mb-4 flex-grow">Pencegahan masalah gigi sejak dini dengan pemeriksaan menyeluruh dan pembersihan karang gigi.</p>
                            <Link href="#" className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                                Selengkapnya
                            </Link>
                        </div>
                    </div>

                    {/* Service Card 2 */}
                    <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-subtle-light hover:shadow-lg transition-shadow">
                        <div
                            className="h-48 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuClzxPprnvFpq40ApBw3Dz_SI854zK48mTQvcFJHdJRoe4IXIsUEscvNcOWKgYAMQkOCg1xZrRr9o8RMs8-Y-X6iDDxGaJJBUggSf01mmJuemwMg2CjwDfU7gbH4f13W5dIJv0rh7vJ26KmINEFrLTqKJ2xetToTda54__hiY14hffTv6S40CtY2bk5Ln7xZCVhjja0oDRVJwM0Bbg9ZAhew1xdgY5TetU25TG94hlt8SzzYyMBP3L7PcACizc0lVALzu6qeCsnqPNk')" }}
                        ></div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-text-light">Orthodonti (Kawat Gigi)</h3>
                            <p className="text-sm text-gray-500 mb-4 flex-grow">Rapikan susunan gigi Anda untuk senyum yang lebih estetik dan fungsi kunyah yang lebih baik.</p>
                            <Link href="#" className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                                Selengkapnya
                            </Link>
                        </div>
                    </div>

                    {/* Service Card 3 */}
                    <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm border border-subtle-light hover:shadow-lg transition-shadow">
                        <div
                            className="h-48 bg-cover bg-center"
                            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDRFwzYgPNdiNYyKnkHtzL3GpKBe3PvNrmRsxUK6bgMJDichTap90aqQqMy3oEfzBJOEmgXXFDHmG5odPbj38HHVAaGEt-DFohQJT6HNis6gPXlx8sFMFDpHmuX6hDwpifjEN8r6VeNOl5U2YHhRrXbw6TEh-W-xKIO8V8Fi-fuuCjsH12Z6Ow2CqRuZEmODmxAWqU_Zv0_FVi1BYggriEGXncu6B7QTIy2J-yMnMPUOm9gyqOye_ECoitIJPISly14bM1Ba_fwn4Iw')" }}
                        ></div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold mb-2 text-text-light">Pemutihan Gigi</h3>
                            <p className="text-sm text-gray-500 mb-4 flex-grow">Kembalikan warna putih alami gigi Anda dengan prosedur bleaching yang aman dan efektif.</p>
                            <Link href="#" className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                                Selengkapnya
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="#" className="inline-flex items-center font-bold text-primary hover:text-primary-dark transition-colors">
                        Lihat Semua Layanan <span className="material-symbols-outlined ml-1">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
