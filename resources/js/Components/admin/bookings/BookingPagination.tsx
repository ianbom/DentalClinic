interface BookingPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

export function BookingPagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}: BookingPaginationProps) {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const visiblePages = Array.from(
        { length: totalPages },
        (_, i) => i + 1,
    ).filter(
        (page) =>
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 1,
    );

    return (
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3">
            <p className="text-sm text-slate-500">
                Menampilkan {startItem} - {endItem} dari {totalItems} booking
            </p>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Prev
                </button>
                {visiblePages.map((page, index, arr) => (
                    <span key={page}>
                        {index > 0 && arr[index - 1] !== page - 1 && (
                            <span className="px-2 text-slate-400">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(page)}
                            className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                                currentPage === page
                                    ? 'bg-primary text-white'
                                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            {page}
                        </button>
                    </span>
                ))}
                <button
                    onClick={() =>
                        onPageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
