import { BookingFullItem } from '@/types';

interface DoctorOption {
    id: number;
    name: string;
}

interface BookingFiltersProps {
    searchQuery: string;
    statusFilter: string;
    dateFilter: string;
    doctorFilter: string;
    doctors: DoctorOption[];
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onDateChange: (value: string) => void;
    onDoctorChange: (value: string) => void;
    onClearFilters: () => void;
}

export function BookingFilters({
    searchQuery,
    statusFilter,
    dateFilter,
    doctorFilter,
    doctors,
    onSearchChange,
    onStatusChange,
    onDateChange,
    onDoctorChange,
    onClearFilters,
}: BookingFiltersProps) {
    const hasFilters =
        searchQuery || statusFilter || dateFilter || doctorFilter;

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {/* Search */}
                <div className="relative flex-1 sm:min-w-[240px]">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Cari kode, nama, atau telepon..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                {/* Date Filter */}
                <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                        calendar_today
                    </span>
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => onDateChange(e.target.value)}
                        className="rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                {/* Doctor Filter */}
                <select
                    value={doctorFilter}
                    onChange={(e) => onDoctorChange(e.target.value)}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    <option value="">Semua Dokter</option>
                    {doctors.map((doctor) => (
                        <option key={doctor.id} value={doctor.id.toString()}>
                            {doctor.name}
                        </option>
                    ))}
                </select>

                {/* Status Filter */}
                <select
                    value={statusFilter}
                    onChange={(e) => onStatusChange(e.target.value)}
                    className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    <option value="">Semua Status</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="checked_in">Checked In</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no_show">No Show</option>
                </select>

                {/* Clear Filters */}
                {hasFilters && (
                    <button
                        onClick={onClearFilters}
                        className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                    >
                        <span className="material-symbols-outlined text-lg">
                            close
                        </span>
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
}

export function useBookingFilters(bookings: BookingFullItem[]) {
    return {
        filterBookings: (
            searchQuery: string,
            statusFilter: string,
            dateFilter: string,
            doctorFilter: string,
        ) => {
            return bookings.filter((booking) => {
                const matchesSearch =
                    searchQuery === '' ||
                    booking.code
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    booking.patient_name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    booking.patient_phone.includes(searchQuery);

                const matchesStatus =
                    statusFilter === '' || booking.status === statusFilter;

                const matchesDate =
                    dateFilter === '' || booking.booking_date === dateFilter;

                const matchesDoctor =
                    doctorFilter === '' ||
                    booking.doctor_id.toString() === doctorFilter;

                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesDate &&
                    matchesDoctor
                );
            });
        },
    };
}
