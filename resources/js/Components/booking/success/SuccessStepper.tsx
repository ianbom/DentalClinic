export function SuccessStepper() {
    return (
        <nav aria-label="Progress" className="mb-10 w-full">
            <ol className="flex items-center justify-center space-x-2 md:space-x-4 text-sm font-medium text-gray-500" role="list">
                <li className="flex items-center">
                    <span className="hidden md:inline">1. Pilih Jadwal</span>
                    <span className="md:hidden">1</span>
                    <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                </li>
                <li className="flex items-center">
                    <span className="hidden md:inline">2. Data Diri</span>
                    <span className="md:hidden">2</span>
                    <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                </li>
                <li className="flex items-center">
                    <span className="hidden md:inline">3. Verifikasi</span>
                    <span className="md:hidden">3</span>
                    <span className="material-symbols-outlined mx-2 text-base">chevron_right</span>
                </li>
                <li className="flex items-center text-primary font-bold">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white mr-2 text-xs">4</span>
                    <span>Selesai</span>
                </li>
            </ol>
        </nav>
    );
}
