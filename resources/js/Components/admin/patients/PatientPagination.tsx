export function PatientPagination() {
    return (
        <div className="flex flex-col items-center justify-between gap-4 rounded-b-xl border-t border-slate-100 bg-white p-4 sm:flex-row">
            <span className="text-sm text-slate-500">
                Show <span className="font-semibold text-slate-700">1</span> to{' '}
                <span className="font-semibold text-slate-700">5</span> of{' '}
                <span className="font-semibold text-slate-700">142</span>{' '}
                patients
            </span>
            <div className="flex items-center gap-1">
                <button
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 disabled:opacity-50"
                    disabled
                >
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_left
                    </span>
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-medium text-white shadow-sm transition-all">
                    1
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-slate-600 transition-all hover:bg-slate-50">
                    2
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-slate-600 transition-all hover:bg-slate-50">
                    3
                </button>
                <span className="flex h-8 w-8 items-center justify-center text-slate-400">
                    ...
                </span>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-slate-600 transition-all hover:bg-slate-50">
                    12
                </button>
                <button className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50">
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}
