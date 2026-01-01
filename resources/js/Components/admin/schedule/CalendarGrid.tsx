export type SlotStatus = 'available' | 'full' | 'no_schedule' | 'off';

export interface DaySlotInfo {
    date: number;
    isCurrentMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    status: SlotStatus;
    availableCount: number;
    totalSlots: number;
}

interface CalendarGridProps {
    days: DaySlotInfo[];
    onSelectDate: (date: number) => void;
}

function getStatusBadge(status: SlotStatus, availableCount: number) {
    switch (status) {
        case 'available':
            return (
                <div className="rounded border border-green-200 bg-green-100 px-2 py-1">
                    <p className="truncate text-[10px] font-bold text-green-700">
                        {availableCount} Tersedia
                    </p>
                </div>
            );
        case 'full':
            return (
                <div className="rounded border border-red-200 bg-red-100 px-2 py-1">
                    <p className="truncate text-[10px] font-bold text-red-700">
                        Penuh
                    </p>
                </div>
            );
        case 'off':
            return (
                <div className="rounded border border-yellow-200 bg-yellow-100 px-2 py-1">
                    <p className="truncate text-[10px] font-bold text-yellow-700">
                        Cuti/Tidak Aktif
                    </p>
                </div>
            );
        case 'no_schedule':
        default:
            return (
                <div className="rounded border border-gray-200 bg-gray-100 px-2 py-1">
                    <p className="truncate text-[10px] font-bold text-gray-500">
                        Tidak Ada Jadwal
                    </p>
                </div>
            );
    }
}

export function CalendarGrid({ days, onSelectDate }: CalendarGridProps) {
    const weekDays = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
    ];

    return (
        <div className="flex min-h-[600px] flex-1 flex-col overflow-hidden rounded-xl border border-[#e7f0f4] bg-white shadow-sm">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 border-b border-[#e7f0f4] bg-[#f8fbfc]">
                {weekDays.map((day) => (
                    <div
                        key={day}
                        className="py-3 text-center text-xs font-bold uppercase tracking-wider text-[#49829c]"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid flex-1 grid-cols-7 grid-rows-5 divide-x divide-y divide-[#e7f0f4]">
                {days.map((day, index) => (
                    <div
                        key={index}
                        onClick={() =>
                            day.isCurrentMonth && onSelectDate(day.date)
                        }
                        className={`group relative min-h-[100px] p-2 transition-colors ${
                            !day.isCurrentMonth
                                ? 'bg-[#fcfdfe]'
                                : day.isSelected
                                  ? 'z-10 cursor-pointer bg-primary/5 ring-2 ring-inset ring-primary'
                                  : 'cursor-pointer hover:bg-[#f0f7fa]'
                        }`}
                    >
                        <span
                            className={`text-sm font-medium ${
                                !day.isCurrentMonth
                                    ? 'text-[#9abdd0]'
                                    : day.isSelected
                                      ? 'flex size-7 items-center justify-center rounded-full bg-primary font-bold text-white shadow-sm'
                                      : 'text-[#0d171c] group-hover:text-primary'
                            }`}
                        >
                            {day.date}
                        </span>
                        {day.isCurrentMonth && (
                            <div className="mt-2 flex flex-col gap-1">
                                {getStatusBadge(day.status, day.availableCount)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
