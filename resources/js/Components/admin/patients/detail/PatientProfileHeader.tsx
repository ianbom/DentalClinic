import { Link } from '@inertiajs/react';

interface PatientProfileHeaderProps {
    name: string;
}

export function PatientProfileHeader({ name }: PatientProfileHeaderProps) {
    return (
        <>
            <nav className="flex text-sm font-medium text-[#49829c]">
                <Link
                    className="transition-colors hover:text-primary"
                    href="/admin/dashboard"
                >
                    Home
                </Link>
                <span className="mx-2">/</span>
                <Link
                    className="transition-colors hover:text-primary"
                    href="/admin/patients"
                >
                    Manajemen Customer
                </Link>
                <span className="mx-2">/</span>
                <span className="text-primary">Detail Pasien</span>
            </nav>

            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-[-0.033em] text-[#0d171c] dark:text-white">
                        {name}
                    </h1>
                    <p className="text-sm text-[#49829c]">
                        Informasi lengkap dan riwayat medis pasien
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e7f0f4] bg-white px-4 text-sm font-semibold text-[#0d171c] transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                        <span className="material-symbols-outlined text-lg">
                            print
                        </span>
                        <span>Cetak</span>
                    </button>
                    <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary/90">
                        <span className="material-symbols-outlined text-lg">
                            edit
                        </span>
                        <span>Edit Profile</span>
                    </button>
                </div>
            </div>
        </>
    );
}
