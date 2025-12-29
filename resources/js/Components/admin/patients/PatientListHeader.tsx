import Link from "next/link";
import React from "react";

export function PatientListHeader() {
    return (
        <>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <Link
                    href="/admin"
                    className="text-slate-500 hover:text-primary transition-colors font-medium"
                >
                    Dashboard
                </Link>
                <span className="text-slate-400 select-none">/</span>
                <span className="text-slate-900 font-medium">Pasien</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl md:text-3xl font-black tracking-tight text-slate-900">
                        Daftar Pasien
                    </h2>
                    <p className="text-slate-500 text-base">
                        Kelola data pasien, riwayat, dan detail kontak.
                    </p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary hover:bg-sky-600 text-white shadow-sm h-10 px-6 rounded-lg text-sm font-bold transition-all active:scale-95 shrink-0">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span>Tambah Pasien</span>
                </button>
            </div>
        </>
    );
}
