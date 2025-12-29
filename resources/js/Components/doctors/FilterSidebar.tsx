'use client';

interface FilterSidebarProps {
    selectedDays: string[];
    onDaysChange: (days: string[]) => void;
}

const practiceSchedules = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
];

export function FilterSidebar({
    selectedDays,
    onDaysChange,
}: FilterSidebarProps) {
    const handleDayToggle = (day: string) => {
        if (selectedDays.includes(day)) {
            onDaysChange(selectedDays.filter((d) => d !== day));
        } else {
            onDaysChange([...selectedDays, day]);
        }
    };

    const handleReset = () => {
        onDaysChange([]);
    };

    return (
        <aside className="w-full shrink-0 space-y-6 lg:w-72">
            <div className="sticky top-24 rounded-xl border border-subtle-light bg-white p-5 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-text-light">
                        Filter Pencarian
                    </h3>
                    <button
                        onClick={handleReset}
                        className="cursor-pointer text-xs font-medium text-primary hover:text-primary-dark"
                    >
                        Reset
                    </button>
                </div>

                {/* Filter: Jadwal Praktek */}
                <div className="mb-4">
                    <label className="mb-4 flex items-center gap-2 text-sm font-semibold text-text-light">
                        <span className="material-symbols-outlined text-[20px] text-primary">
                            calendar_month
                        </span>
                        Jadwal Praktek
                    </label>
                    <div className="space-y-3">
                        {practiceSchedules.map((day) => (
                            <label
                                key={day}
                                className="group flex cursor-pointer items-center gap-3"
                            >
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={selectedDays.includes(day)}
                                        onChange={() => handleDayToggle(day)}
                                        className="peer sr-only"
                                    />
                                    <div className="flex h-5 w-5 items-center justify-center rounded-md border-2 border-gray-300 transition-all peer-checked:border-primary peer-checked:bg-primary">
                                        {selectedDays.includes(day) && (
                                            <span className="material-symbols-outlined text-[16px] text-white">
                                                check
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600 transition-colors group-hover:text-primary">
                                    {day}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Selected Days Info */}
                {selectedDays.length > 0 && (
                    <div className="mt-4 rounded-lg border border-primary/10 bg-primary/5 p-3">
                        <p className="mb-2 text-xs text-gray-500">
                            Filter aktif:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {selectedDays.map((day) => (
                                <span
                                    key={day}
                                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                                >
                                    {day}
                                    <button
                                        onClick={() => handleDayToggle(day)}
                                        className="cursor-pointer hover:text-primary-dark"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">
                                            close
                                        </span>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
