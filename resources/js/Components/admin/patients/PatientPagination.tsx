interface PatientPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    setCurrentPage: (page: number) => void;
}

export function PatientPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    setCurrentPage,
}: PatientPaginationProps) {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex flex-col items-center justify-between gap-4 rounded-b-xl border-t border-slate-100 bg-white p-4 sm:flex-row">
            <span className="text-sm text-slate-500">
                Menampilkan{' '}
                <span className="font-semibold text-slate-700">
                    {startItem}
                </span>{' '}
                -{' '}
                <span className="font-semibold text-slate-700">{endItem}</span>{' '}
                dari{' '}
                <span className="font-semibold text-slate-700">
                    {totalItems}
                </span>{' '}
                pasien
            </span>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_left
                    </span>
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                        if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                    }
                    return (
                        <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`flex size-8 items-center justify-center rounded-lg text-sm font-medium transition-all ${
                                currentPage === pageNum
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {pageNum}
                        </button>
                    );
                })}
                <button
                    onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}
