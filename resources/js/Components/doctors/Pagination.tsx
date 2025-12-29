export function Pagination() {
    return (
        <div className="mt-10 flex justify-center">
            <nav className="flex items-center gap-2">
                <button className="flex items-center justify-center h-10 w-10 rounded-lg border border-subtle-light text-gray-500 hover:bg-gray-50 disabled:opacity-50 cursor-pointer">
                    <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-white font-medium cursor-pointer">1</button>
                <button className="flex items-center justify-center h-10 w-10 rounded-lg border border-subtle-light text-text-light hover:bg-gray-50 font-medium cursor-pointer">2</button>
                <button className="flex items-center justify-center h-10 w-10 rounded-lg border border-subtle-light text-text-light hover:bg-gray-50 font-medium cursor-pointer">3</button>
                <button className="flex items-center justify-center h-10 w-10 rounded-lg border border-subtle-light text-gray-500 hover:bg-gray-50 cursor-pointer">
                    <span className="material-symbols-outlined">chevron_right</span>
                </button>
            </nav>
        </div>
    );
}
