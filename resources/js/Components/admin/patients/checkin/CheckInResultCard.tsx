import React from "react";

export function CheckInResultCard() {
    return (
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden animate-fade-in-up">
            {/* Status Header */}
            <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-emerald-100 rounded-full p-1 text-emerald-600">
                        <span
                            className="material-symbols-outlined text-[20px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                            check_circle
                        </span>
                    </div>
                    <span className="text-emerald-800 font-bold text-lg">
                        Booking Ditemukan
                    </span>
                </div>
                <div className="bg-white px-3 py-1 rounded-md border border-emerald-200 shadow-sm">
                    <span className="text-xs font-mono text-emerald-700 font-bold tracking-wider">
                        #BKG-8821
                    </span>
                </div>
            </div>

            <div className="p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column: Patient Info */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-slate-400">person</span>
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                                Informasi Pasien
                            </h3>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div
                                className="h-16 w-16 rounded-full bg-slate-100 flex-shrink-0 bg-cover bg-center border border-slate-200"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDPie4qCkhHsowf1-Y3nzGh2XRvXoL1AvuVrFf5hFoCyCrspIxDQRe8fhHNp8bqGAKu9FzmGsJnOBOYl65jjwT2oBkahLyD7tw6y6B4EoF5eEoWweKkfSP9uMbZ4-cJjFpq3H2CCDyZPGhHOTejy3fh3t_uAVeJhUHu_rd98xL5x6dDhQgf21D2VgOTMQmaDi0_eXPLzOOtTpw0R40eRfjK2LlXw1zCg8XVsE4eaz_x1oJ7LZpnpwAffUiexQsK5NUD1uTArvXMcbmQ")',
                                }}
                            ></div>
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-bold text-slate-900">
                                    Budi Santoso
                                </p>
                                <p className="text-sm text-slate-500">Pria, 32 Tahun</p>
                                <div className="flex gap-2 mt-1">
                                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">
                                        Pasien Lama
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                            <div className="flex flex-col border-b border-slate-100 pb-3">
                                <span className="text-xs text-slate-400 mb-1">
                                    NIK (Nomor Induk Kependudukan)
                                </span>
                                <span className="text-slate-900 font-medium font-mono">
                                    3273102938190002
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 mb-1">
                                    WhatsApp / Telepon
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-500 text-[18px]">
                                        chat
                                    </span>
                                    <span className="text-slate-900 font-medium">
                                        +62 812-3456-7890
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Schedule Info */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="material-symbols-outlined text-slate-400">
                                calendar_clock
                            </span>
                            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                                Jadwal &amp; Dokter
                            </h3>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col">
                                    <p className="text-xs text-slate-500 mb-1">Dokter Gigi</p>
                                    <p className="text-lg font-bold text-slate-900">
                                        Drg. Ratna Sari, Sp.Ort
                                    </p>
                                    <p className="text-sm text-primary font-medium">
                                        Spesialis Ortodonti
                                    </p>
                                </div>
                                <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                    <span className="material-symbols-outlined text-primary text-2xl">
                                        medical_services
                                    </span>
                                </div>
                            </div>
                            <div className="h-px bg-slate-200 w-full"></div>
                            <div className="flex gap-6">
                                <div className="flex flex-col">
                                    <p className="text-xs text-slate-500 mb-1">Tanggal</p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400 text-sm">
                                            event
                                        </span>
                                        <p className="text-base font-semibold text-slate-900">
                                            Senin, 24 Okt 2023
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-xs text-slate-500 mb-1">Waktu</p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-slate-400 text-sm">
                                            schedule
                                        </span>
                                        <p className="text-base font-semibold text-slate-900">
                                            14:00 - 14:30 WIB
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-3 items-start">
                                <span className="material-symbols-outlined text-amber-500 text-lg mt-0.5">
                                    info
                                </span>
                                <p className="text-sm text-amber-800">
                                    Catatan: Pasien request untuk pemeriksaan behel bawah yang
                                    lepas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-4">
                    <button className="px-6 h-12 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-colors w-full sm:w-auto">
                        Batal
                    </button>
                    <button className="px-8 h-12 bg-primary hover:bg-sky-600 text-white font-bold rounded-lg shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all w-full sm:w-auto active:scale-95">
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
