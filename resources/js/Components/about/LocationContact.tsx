import Link from "next/link";

export function LocationContact() {
    return (
        <section className="px-4 py-16 md:px-40 flex justify-center bg-background-light">
            <div className="flex flex-col lg:flex-row gap-8 max-w-[1024px] w-full">
                {/* Info Side */}
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-text-light text-3xl font-bold leading-tight">Kunjungi Kami</h2>
                        <p className="text-gray-600">Kami berlokasi strategis di pusat kota dengan akses parkir yang mudah.</p>
                    </div>
                    <div className="flex flex-col gap-6">
                        {/* Alamat */}
                        <div className="flex items-start gap-4">
                            <div className="size-10 rounded-full bg-primary/10 shrink-0 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-text-light">Alamat Klinik</h3>
                                <p className="text-gray-600 text-sm mt-1">Jl. Sehat Sejahtera No. 123, Jakarta Selatan, DKI Jakarta 12430</p>
                            </div>
                        </div>

                        {/* Jam Operasional */}
                        <div className="flex items-start gap-4">
                            <div className="size-10 rounded-full bg-primary/10 shrink-0 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-text-light">Jam Operasional</h3>
                                <ul className="text-gray-600 text-sm mt-1 space-y-1">
                                    <li className="flex justify-between w-48">
                                        <span>Senin - Jumat:</span>
                                        <span className="font-medium">09:00 - 20:00</span>
                                    </li>
                                    <li className="flex justify-between w-48">
                                        <span>Sabtu:</span>
                                        <span className="font-medium">09:00 - 15:00</span>
                                    </li>
                                    <li className="flex justify-between w-48">
                                        <span>Minggu:</span>
                                        <span className="text-red-500">Tutup</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Kontak */}
                        <div className="flex items-start gap-4">
                            <div className="size-10 rounded-full bg-primary/10 shrink-0 flex items-center justify-center text-primary">
                                <span className="material-symbols-outlined">call</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-text-light">Kontak</h3>
                                <p className="text-gray-600 text-sm mt-1 mb-3">Punya pertanyaan? Hubungi kami via WhatsApp.</p>
                                <Link
                                    href="https://wa.me/6281234567890"
                                    target="_blank"
                                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128c7e] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-sm"
                                >
                                    <span className="material-symbols-outlined text-lg">chat</span>
                                    Chat via WhatsApp
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Side */}
                <div className="flex-1 min-h-[400px] lg:min-h-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 relative group">
                    <img
                        alt="Map location of the dental clinic in Jakarta"
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVSFvBmAdo5LBhBKBQuXSykfMz9WRUiVTyA2kzZ2pBTdH4IwHGNcMjKCs6PII7zBf6dFZfG-OI8ukdpMx8SvQRGoF4m67TqEiYYlm9pKLQwkD4CRdcsEfOus3kMUm59hV92VTLWbqtcMbjIHF6q8AFYSS_OOGR8ZnjzKgbDqV8UxAqr3RtYgIFhTUl7h38Y3Bqw7esTr1gkpVVyoiuWhhMMxRVnuqyB93ySRwcYWZnyGDQAM2HGNnQHbzp7UnC_c-JLzACIwFCpjXW"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur p-4 rounded-lg shadow-sm flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">Peta Lokasi</span>
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
