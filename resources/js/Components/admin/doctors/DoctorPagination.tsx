export function DoctorPagination() {
    return (
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <p className="text-sm text-slate-500">
                Menampilkan{' '}
                <span className="font-medium text-slate-900">1-6</span> dari{' '}
                <span className="font-medium text-slate-900">6</span> dokter
            </p>
            <div className="flex items-center gap-2">
                <button
                    className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-50"
                    disabled
                >
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_left
                    </span>
                </button>
                <button className="flex size-9 items-center justify-center rounded-lg bg-primary font-medium text-white shadow-sm">
                    1
                </button>
                <button
                    className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:opacity-50"
                    disabled
                >
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}
