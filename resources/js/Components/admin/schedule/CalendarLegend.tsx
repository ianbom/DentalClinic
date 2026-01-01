export function CalendarLegend() {
    return (
        <div className="flex items-center gap-6 px-1">
            <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-[#0d171c]">Tersedia</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-[#0d171c]">Penuh</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-[#0d171c]">Cuti / Tidak Aktif</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-gray-300"></div>
                <span className="text-sm text-[#0d171c]">Tidak Ada Jadwal</span>
            </div>
        </div>
    );
}
