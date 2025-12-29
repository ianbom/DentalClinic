import Link from "next/link";
import React from "react";

export function DoctorListHeader() {
    return (
        <>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <Link
                    href="/admin"
                    className="text-slate-500 hover:text-primary transition-colors"
                >
                    Dashboard
                </Link>
                <span className="text-slate-500">/</span>
                <span className="text-slate-900 font-medium">Dokter</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-[-0.033em]">
                        Manajemen Dokter
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Kelola data dokter, jadwal praktek, dan status aktif.
                    </p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-sky-600 text-white px-5 py-2.5 rounded-lg shadow-sm font-bold text-sm transition-all active:scale-95">
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    <span>Tambah Dokter</span>
                </button>
            </div>
        </>
    );
}
