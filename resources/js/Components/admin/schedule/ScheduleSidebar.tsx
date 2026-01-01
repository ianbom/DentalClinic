export interface TimeSlotInfo {
    time: string;
    endTime: string;
    status: 'available' | 'booked' | 'off' | 'unavailable';
    patientName?: string;
}

interface ScheduleSidebarProps {
    selectedDate: Date | null;
    totalSlots: number;
    availableSlots: number;
    bookedSlots: number;
    morningSlots: TimeSlotInfo[];
    afternoonSlots: TimeSlotInfo[];
    onClose: () => void;
    onAddSlot: () => void;
}

function formatDate(date: Date): string {
    const days = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
    ];
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Mei',
        'Jun',
        'Jul',
        'Agu',
        'Sep',
        'Okt',
        'Nov',
        'Des',
    ];
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function ScheduleSidebar({
    selectedDate,
    totalSlots,
    availableSlots,
    bookedSlots,
    morningSlots,
    afternoonSlots,
    onClose,
    onAddSlot,
}: ScheduleSidebarProps) {
    if (!selectedDate) return null;

    return (
        <aside className="z-10 flex w-full shrink-0 flex-col border-l border-[#e7f0f4] bg-white shadow-lg md:w-[360px]">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#e7f0f4] p-6">
                <div>
                    <h3 className="text-lg font-bold text-[#0d171c]">
                        Detail Jadwal
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                        <span
                            className="material-symbols-outlined text-primary"
                            style={{ fontSize: '18px' }}
                        >
                            calendar_today
                        </span>
                        <p className="text-sm text-[#49829c]">
                            {formatDate(selectedDate)}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
                {/* Summary Card */}
                <div className="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wide text-primary">
                            Total Slot
                        </span>
                        <span className="text-2xl font-bold text-[#0d171c]">
                            {totalSlots}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-primary/20"></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wide text-green-600">
                            Tersedia
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                            {availableSlots}
                        </span>
                    </div>
                    <div className="h-8 w-px bg-primary/20"></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-wide text-red-600">
                            Terisi
                        </span>
                        <span className="text-2xl font-bold text-red-600">
                            {bookedSlots}
                        </span>
                    </div>
                </div>

                {/* Morning Slots */}
                {morningSlots.length > 0 && (
                    <div className="flex flex-col gap-3">
                        <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-[#0d171c]">
                            Slot Pagi
                        </h4>
                        {morningSlots.map((slot, index) => (
                            <SlotItem key={index} slot={slot} />
                        ))}
                    </div>
                )}

                {/* Divider */}
                <div className="h-px w-full bg-[#e7f0f4]"></div>

                {/* Afternoon Slots */}
                {afternoonSlots.length > 0 && (
                    <div className="flex flex-col gap-3">
                        <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-[#0d171c]">
                            Slot Siang
                        </h4>
                        {afternoonSlots.map((slot, index) => (
                            <SlotItem key={index} slot={slot} />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="border-t border-[#e7f0f4] p-6">
                <button
                    onClick={onAddSlot}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-bold text-white transition-colors hover:bg-[#098dc9]"
                >
                    <span className="material-symbols-outlined">add</span>
                    Tambah Slot Manual
                </button>
            </div>
        </aside>
    );
}

function SlotItem({ slot }: { slot: TimeSlotInfo }) {
    if (slot.status === 'booked') {
        return (
            <div className="flex items-center justify-between rounded-lg border border-[#e7f0f4] bg-gray-50 p-3 opacity-75">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">
                        schedule
                    </span>
                    <div>
                        <p className="text-sm font-bold text-[#0d171c] line-through decoration-red-500">
                            {slot.time} - {slot.endTime}
                        </p>
                        <p className="text-xs font-medium text-red-500">
                            Booked ({slot.patientName})
                        </p>
                    </div>
                </div>
                <button className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200">
                    <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '18px' }}
                    >
                        more_vert
                    </span>
                </button>
            </div>
        );
    }

    if (slot.status === 'off') {
        return (
            <div className="flex items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-3 opacity-75">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-yellow-600">
                        event_busy
                    </span>
                    <div>
                        <p className="text-sm font-bold text-[#0d171c]">
                            {slot.time} - {slot.endTime}
                        </p>
                        <p className="text-xs font-medium text-yellow-600">
                            Cuti / Tidak Aktif
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (slot.status === 'unavailable') {
        return (
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 opacity-75">
                <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-gray-400">
                        block
                    </span>
                    <div>
                        <p className="text-sm font-bold text-[#0d171c]">
                            {slot.time} - {slot.endTime}
                        </p>
                        <p className="text-xs font-medium text-gray-500">
                            Tidak Ada Jadwal
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Available
    return (
        <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-green-600">
                    schedule
                </span>
                <div>
                    <p className="text-sm font-bold text-[#0d171c]">
                        {slot.time} - {slot.endTime}
                    </p>
                    <p className="text-xs font-medium text-green-600">
                        Tersedia
                    </p>
                </div>
            </div>
            <button className="rounded-md bg-green-600 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-green-700">
                Book
            </button>
        </div>
    );
}
