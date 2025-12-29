export function BookingHeader() {
    return (
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tight text-slate-900">
                    Manajemen Booking
                </h1>
                <p className="text-base text-slate-500">
                    Kelola daftar booking, jadwal, dan status pasien di sini.
                </p>
            </div>
            <button className="group flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-600">
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
                    add
                </span>
                <span>Tambah Booking Baru</span>
            </button>
        </div>
    );
}
