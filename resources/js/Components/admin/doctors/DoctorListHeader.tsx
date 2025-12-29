import { Link } from '@inertiajs/react';

export function DoctorListHeader() {
    return (
        <>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <Link
                    href="/admin"
                    className="text-slate-500 transition-colors hover:text-primary"
                >
                    Dashboard
                </Link>
                <span className="text-slate-500">/</span>
                <span className="font-medium text-slate-900">Dokter</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-black leading-tight tracking-[-0.033em] text-slate-900">
                        Manajemen Dokter
                    </h1>
                    <p className="mt-1 text-slate-500">
                        Kelola data dokter, jadwal praktek, dan status aktif.
                    </p>
                </div>
                <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-sky-600 active:scale-95">
                    <span className="material-symbols-outlined text-[20px]">
                        add
                    </span>
                    <span>Tambah Dokter</span>
                </button>
            </div>
        </>
    );
}
