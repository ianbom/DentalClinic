export function Pagination() {
    return (
        <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-2">
                <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-subtle-light text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                    <span className="material-symbols-outlined">
                        chevron_left
                    </span>
                </button>
                <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-primary font-medium text-white">
                    1
                </button>
                <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-subtle-light font-medium text-text-light hover:bg-gray-50">
                    2
                </button>
                <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-subtle-light font-medium text-text-light hover:bg-gray-50">
                    3
                </button>
                <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-subtle-light text-gray-500 hover:bg-gray-50">
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </nav>
        </div>
    );
}
