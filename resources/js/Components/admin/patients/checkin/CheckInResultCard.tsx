export function CheckInResultCard() {
    return (
        <div className="animate-fade-in-up overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md">
            {/* Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100 bg-emerald-50 px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-full bg-emerald-100 p-1 text-emerald-600">
                        <span
                            className="material-symbols-outlined text-[20px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            check_circle
                        </span>
                    </div>
                    <span className="text-lg font-bold text-emerald-800">
                        Booking Ditemukan
                    </span>
                </div>
                <div className="rounded-md border border-emerald-200 bg-white px-3 py-1 shadow-sm">
                    <span className="font-mono text-xs font-bold tracking-wider text-emerald-700">
                        #BKG-8821
                    </span>
                </div>
            </div>

            <div className="p-6 lg:p-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Left Column: Patient Info */}
                    <div className="flex flex-col gap-6">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-400">
                                person
                            </span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                Informasi Pasien
                            </h3>
                        </div>
                        <div className="flex items-start gap-4">
                            <div
                                className="h-16 w-16 flex-shrink-0 rounded-full border border-slate-200 bg-slate-100 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPie4qCkhHsowf1-Y3nzGh2XRvXoL1AvuVrFf5hFoCyCrspIxDQRe8fhHNp8bqGAKu9FzmGsJnOBOYl65jjwT2oBkahLyD7tw6y6B4EoF5eEoWweKkfSP9uMbZ4-cJjFpq3H2CCDyZPGhHOTejy3fh3t_uAVeJhUHu_rd98xL5x6dDhQgf21D2VgOTMQmaDi0_eXPLzOOtTpw0R40eRfjK2LlXw1zCg8XVsE4eaz_x1oJ7LZpnpwAffUiexQsK5NUD1uTArvXMcbmQ")',
                                }}
                            ></div>
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-bold text-slate-900">
                                    Budi Santoso
                                </p>
                                <p className="text-sm text-slate-500">
                                    Pria, 32 Tahun
                                </p>
                                <div className="mt-1 flex gap-2">
                                    <span className="inline-flex items-center gap-1 rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                        Pasien Lama
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-4">
                            <div className="flex flex-col border-b border-slate-100 pb-3">
                                <span className="mb-1 text-xs text-slate-400">
                                    NIK (Nomor Induk Kependudukan)
                                </span>
                                <span className="font-mono font-medium text-slate-900">
                                    3273102938190002
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="mb-1 text-xs text-slate-400">
                                    WhatsApp / Telepon
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-green-500">
                                        chat
                                    </span>
                                    <span className="font-medium text-slate-900">
                                        +62 812-3456-7890
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Schedule Info */}
                    <div className="flex flex-col gap-6">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="material-symbols-outlined text-slate-400">
                                calendar_clock
                            </span>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                                Jadwal &amp; Dokter
                            </h3>
                        </div>
                        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                            <div className="flex items-start justify-between">
                                <div className="flex flex-col">
                                    <p className="mb-1 text-xs text-slate-500">
                                        Dokter Gigi
                                    </p>
                                    <p className="text-lg font-bold text-slate-900">
                                        Drg. Ratna Sari, Sp.Ort
                                    </p>
                                    <p className="text-sm font-medium text-primary">
                                        Spesialis Ortodonti
                                    </p>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow-sm">
                                    <span className="material-symbols-outlined text-2xl text-primary">
                                        medical_services
                                    </span>
                                </div>
                            </div>
                            <div className="h-px w-full bg-slate-200"></div>
                            <div className="flex gap-6">
                                <div className="flex flex-col">
                                    <p className="mb-1 text-xs text-slate-500">
                                        Tanggal
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-slate-400">
                                            event
                                        </span>
                                        <p className="text-base font-semibold text-slate-900">
                                            Senin, 24 Okt 2023
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="mb-1 text-xs text-slate-500">
                                        Waktu
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-slate-400">
                                            schedule
                                        </span>
                                        <p className="text-base font-semibold text-slate-900">
                                            14:00 - 14:30 WIB
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 flex items-start gap-3 rounded-lg border border-amber-100 bg-amber-50 p-3">
                                <span className="material-symbols-outlined mt-0.5 text-lg text-amber-500">
                                    info
                                </span>
                                <p className="text-sm text-amber-800">
                                    Catatan: Pasien request untuk pemeriksaan
                                    behel bawah yang lepas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="mt-10 flex flex-col-reverse justify-end gap-4 border-t border-slate-100 pt-6 sm:flex-row">
                    <button className="h-12 w-full rounded-lg border border-slate-300 px-6 font-semibold text-slate-600 transition-colors hover:bg-slate-50 sm:w-auto">
                        Batal
                    </button>
                    <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-sky-600 active:scale-95 sm:w-auto">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            check_circle
                        </span>
                        Konfirmasi Check-in
                    </button>
                </div>
            </div>
        </div>
    );
}
