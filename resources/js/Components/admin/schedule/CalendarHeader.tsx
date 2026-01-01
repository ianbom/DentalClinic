import { Doctor } from '@/types';

interface CalendarHeaderProps {
    currentMonth: string;
    currentYear: number;
    selectedDoctor: Doctor | null;
    doctors: Doctor[];
    onDoctorChange: (doctorId: number | null) => void;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
}

export function CalendarHeader({
    currentMonth,
    currentYear,
    selectedDoctor,
    doctors,
    onDoctorChange,
    onPrevMonth,
    onNextMonth,
    onToday,
}: CalendarHeaderProps) {
    return (
        <div className="flex shrink-0 flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
                <h1 className="mb-2 text-2xl font-bold text-[#0d171c] md:text-3xl">
                    {currentMonth} {currentYear}
                </h1>
                <p className="text-sm text-[#49829c]">
                    Kelola jadwal dan lihat slot waktu dokter.
                </p>
            </div>
            <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
                {/* Doctor Selector */}
                <div className="relative min-w-[240px]">
                    <select
                        value={selectedDoctor?.id || ''}
                        onChange={(e) =>
                            onDoctorChange(
                                e.target.value ? Number(e.target.value) : null,
                            )
                        }
                        className="w-full appearance-none rounded-lg border border-[#cee0e8] bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-[#0d171c] focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                    <span
                        className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#49829c]"
                        style={{ fontSize: '20px' }}
                    >
                        expand_more
                    </span>
                </div>
                {/* Navigation */}
                <div className="flex rounded-lg border border-[#cee0e8] bg-white p-1">
                    <button
                        onClick={onPrevMonth}
                        className="rounded-md p-1.5 text-[#0d171c] transition-colors hover:bg-[#f0f7fa]"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '20px' }}
                        >
                            chevron_left
                        </span>
                    </button>
                    <button
                        onClick={onToday}
                        className="px-3 py-1.5 text-sm font-bold text-[#0d171c]"
                    >
                        Ganti Bulan
                    </button>
                    <button
                        onClick={onNextMonth}
                        className="rounded-md p-1.5 text-[#0d171c] transition-colors hover:bg-[#f0f7fa]"
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '20px' }}
                        >
                            chevron_right
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
