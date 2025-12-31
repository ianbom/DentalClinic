interface DoctorPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    setCurrentPage: (page: number) => void;
}

export function DoctorPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    setCurrentPage,
}: DoctorPaginationProps) {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
            <p className="text-sm text-slate-500">
                Menampilkan{' '}
                <span className="font-medium text-slate-900">
                    {startItem}-{endItem}
                </span>{' '}
                dari{' '}
                <span className="font-medium text-slate-900">{totalItems}</span>{' '}
                dokter
            </p>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
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
                            className={`flex size-9 items-center justify-center rounded-lg font-medium transition-colors ${
                                currentPage === pageNum
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'border border-slate-200 text-slate-500 hover:bg-slate-100'
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
                    className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        chevron_right
                    </span>
                </button>
            </div>
        </div>
    );
}
