import { Link } from '@inertiajs/react';

export function LocationContact() {
    // const phoneNumber = '6285231519966';
    const mapsUrl = 'https://maps.app.goo.gl/52AVmyvG9z9WZ8uv9';

    return (
        <section className="flex justify-center bg-background-light px-4 py-16 md:px-40">
            <div className="flex w-full max-w-[1024px] flex-col gap-8 lg:flex-row">
                {/* Info Side */}
                <div className="flex flex-1 flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-3xl font-bold leading-tight text-text-light">
                            Kunjungi Kami
                        </h2>
                        <p className="text-gray-600">
                            Kami berlokasi strategis dengan akses yang mudah
                            dijangkau.
                        </p>
                    </div>
                    <div className="flex flex-col gap-6">
                        {/* Alamat */}
                        <div className="flex items-start gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">
                                    location_on
                                </span>
                            </div>
                            <div>
                                <h3 className="font-bold text-text-light">
                                    Alamat Klinik
                                </h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Dandong, Kec. Srengat, Kabupaten Blitar,
                                    Jawa Timur 66152
                                </p>
                            </div>
                        </div>

                        {/* Jam Operasional */}
                        <div className="flex items-start gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">
                                    schedule
                                </span>
                            </div>
                            <div>
                                <h3 className="font-bold text-text-light">
                                    Jam Operasional
                                </h3>
                                <ul className="mt-1 space-y-1 text-sm text-gray-600">
                                    <li className="flex w-48 justify-between">
                                        <span>Senin - Sabtu:</span>
                                        <span className="font-medium">
                                            08:00 - 21:00
                                        </span>
                                    </li>
                                    <li className="flex w-48 justify-between">
                                        <span>Minggu:</span>
                                        <span className="font-medium">
                                            08:00 - 14:00
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Kontak */}
                        <div className="flex items-start gap-4">
                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <span className="material-symbols-outlined">
                                    call
                                </span>
                            </div>
                            <div>
                                <h3 className="font-bold text-text-light">
                                    Kontak
                                </h3>
                                <p className="mb-3 mt-1 text-sm text-gray-600">
                                    Punya pertanyaan? Hubungi kami via WhatsApp.
                                </p>
                                <a
                                    href="https://wa.me/6285231519966"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#128c7e]"
                                    rel="noreferrer"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        chat
                                    </span>
                                    085231519966
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Side */}
                <div className="lg:min-h-auto group relative min-h-[400px] flex-1 overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                    <iframe
                        title="Lokasi Dokter Gigi Anna Fikril I"
                        src="https://www.google.com/maps?q=Dokter%20Gigi%20Anna%20Fikril%20I%20@-8.0740271,112.0736051&z=19&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: '400px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg bg-white/90 p-4 shadow-sm backdrop-blur">
                        <span className="text-xs font-medium text-gray-500">
                            Peta Lokasi
                        </span>
                        <Link
                            href={mapsUrl}
                            target="_blank"
                            className="text-xs font-bold text-primary hover:underline"
                        >
                            Buka di Google Maps
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
