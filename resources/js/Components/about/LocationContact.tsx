import { Link } from '@inertiajs/react';

export function LocationContact() {
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
                            Kami berlokasi strategis di pusat kota dengan akses
                            parkir yang mudah.
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
                                    Jl. Sehat Sejahtera No. 123, Jakarta
                                    Selatan, DKI Jakarta 12430
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
                                        <span>Senin - Jumat:</span>
                                        <span className="font-medium">
                                            09:00 - 20:00
                                        </span>
                                    </li>
                                    <li className="flex w-48 justify-between">
                                        <span>Sabtu:</span>
                                        <span className="font-medium">
                                            09:00 - 15:00
                                        </span>
                                    </li>
                                    <li className="flex w-48 justify-between">
                                        <span>Minggu:</span>
                                        <span className="text-red-500">
                                            Tutup
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
                                <Link
                                    href="https://wa.me/6281234567890"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#128c7e]"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        chat
                                    </span>
                                    Chat via WhatsApp
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Side */}
                <div className="lg:min-h-auto group relative min-h-[400px] flex-1 overflow-hidden rounded-xl border border-gray-200 shadow-lg">
                    <img
                        alt="Map location of the dental clinic in Jakarta"
                        className="h-full w-full object-cover grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVSFvBmAdo5LBhBKBQuXSykfMz9WRUiVTyA2kzZ2pBTdH4IwHGNcMjKCs6PII7zBf6dFZfG-OI8ukdpMx8SvQRGoF4m67TqEiYYlm9pKLQwkD4CRdcsEfOus3kMUm59hV92VTLWbqtcMbjIHF6q8AFYSS_OOGR8ZnjzKgbDqV8UxAqr3RtYgIFhTUl7h38Y3Bqw7esTr1gkpVVyoiuWhhMMxRVnuqyB93ySRwcYWZnyGDQAM2HGNnQHbzp7UnC_c-JLzACIwFCpjXW"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg bg-white/90 p-4 shadow-sm backdrop-blur">
                        <span className="text-xs font-medium text-gray-500">
                            Peta Lokasi
                        </span>
                        <Link
                            href="https://maps.google.com"
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
