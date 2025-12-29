import { Link } from '@inertiajs/react';

export function PatientListHeader() {
    return (
        <>
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <Link
                    href="/admin"
                    className="font-medium text-slate-500 transition-colors hover:text-primary"
                >
                    Dashboard
                </Link>
                <span className="select-none text-slate-400">/</span>
                <span className="font-medium text-slate-900">Pasien</span>
            </div>

            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-3xl">
                        Daftar Pasien
                    </h2>
                    <p className="text-base text-slate-500">
                        Kelola data pasien, riwayat, dan detail kontak.
                    </p>
                </div>
                <button className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-sm transition-all hover:bg-sky-600 active:scale-95">
                    <span className="material-symbols-outlined text-[20px]">
                        add
                    </span>
                    <span>Tambah Pasien</span>
                </button>
            </div>
        </>
    );
}
