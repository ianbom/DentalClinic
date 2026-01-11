import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

interface WorkingPeriod {
    id?: number;
    day_of_week: number;
    start_time: string;
    end_time: string;
    is_active: boolean;
}

interface Overtime {
    id?: number;
    date: string;
    date_formatted?: string;
    start_time: string;
    end_time: string;
}

interface DoctorData {
    id: number;
    name: string;
    sip: string | null;
    experience: number;
    profile_pic: string | null;
    is_active: boolean;
}

interface Props {
    doctor: DoctorData;
    workingPeriods: WorkingPeriod[];
    overtimes: Overtime[];
}

const DAY_NAMES = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
];

export default function EditDoctor({
    doctor,
    workingPeriods: initialPeriods,
    overtimes: initialOvertimes,
}: Props) {
    const [formData, setFormData] = useState({
        name: doctor.name || '',
        sip: doctor.sip || '',
        experience: doctor.experience || 0,
        is_active: doctor.is_active,
    });

    const [periods, setPeriods] = useState<WorkingPeriod[]>(initialPeriods);
    const [overtimes, setOvertimes] = useState<Overtime[]>(
        initialOvertimes || [],
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showAddPeriod, setShowAddPeriod] = useState(false);
    const [showAddOvertime, setShowAddOvertime] = useState(false);
    const [newPeriod, setNewPeriod] = useState<Omit<WorkingPeriod, 'id'>>({
        day_of_week: 1,
        start_time: '08:00',
        end_time: '12:00',
        is_active: true,
    });
    const [newOvertime, setNewOvertime] = useState<Omit<Overtime, 'id'>>({
        date: '',
        start_time: '08:00',
        end_time: '12:00',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (type === 'number') {
            setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handlePeriodChange = (
        index: number,
        field: keyof WorkingPeriod,
        value: string | number | boolean,
    ) => {
        setPeriods((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleAddPeriod = () => {
        setPeriods((prev) => [...prev, { ...newPeriod }]);
        setNewPeriod({
            day_of_week: 1,
            start_time: '08:00',
            end_time: '12:00',
            is_active: true,
        });
        setShowAddPeriod(false);
    };

    const handleRemovePeriod = (index: number) => {
        setPeriods((prev) => prev.filter((_, i) => i !== index));
    };

    // Overtime handlers - now managed locally, saved with form submit
    const handleAddOvertime = () => {
        if (!newOvertime.date) {
            alert('Tanggal harus diisi');
            return;
        }
        setOvertimes((prev) => [...prev, { ...newOvertime }]);
        setNewOvertime({
            date: '',
            start_time: '08:00',
            end_time: '12:00',
        });
        setShowAddOvertime(false);
    };

    const handleRemoveOvertime = (index: number) => {
        setOvertimes((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const periodsData = periods.map((p) => ({
            id: p.id ?? null,
            day_of_week: p.day_of_week,
            start_time: p.start_time,
            end_time: p.end_time,
            is_active: p.is_active,
        }));

        const overtimesData = overtimes.map((o) => ({
            id: o.id ?? null,
            date: o.date,
            start_time: o.start_time,
            end_time: o.end_time,
        }));

        router.put(
            `/admin/doctors/${doctor.id}/update`,
            {
                ...formData,
                working_periods: periodsData,
                overtimes: overtimesData,
            },
            {
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    const isFormValid = formData.name.trim() !== '';

    const inputClass =
        'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';
    const selectClass =
        'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';
    const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

    // Group periods by day
    const periodsByDay = periods.reduce(
        (acc, period, index) => {
            const day = period.day_of_week;
            if (!acc[day]) acc[day] = [];
            acc[day].push({ ...period, originalIndex: index });
            return acc;
        },
        {} as Record<number, (WorkingPeriod & { originalIndex: number })[]>,
    );

    return (
        <AdminLayout>
            <Head title={`Edit Dokter - ${doctor.name}`} />

            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Link
                                href={route('admin.doctors.list')}
                                className="hover:text-primary"
                            >
                                Dokter
                            </Link>
                            <span className="material-symbols-outlined text-sm">
                                chevron_right
                            </span>
                            <Link
                                href={route('admin.doctors.show', doctor.id)}
                                className="hover:text-primary"
                            >
                                {doctor.name}
                            </Link>
                            <span className="material-symbols-outlined text-sm">
                                chevron_right
                            </span>
                            <span className="text-slate-900">Edit</span>
                        </div>
                        <h1 className="mt-1 text-2xl font-bold text-slate-900">
                            Edit Data Dokter
                        </h1>
                    </div>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Doctor Info Section */}
                    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                    1
                                </span>
                                Informasi Dokter
                            </h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Name */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="name"
                                        className={labelClass}
                                    >
                                        Nama Dokter *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={inputClass}
                                        placeholder="Nama lengkap dokter"
                                        required
                                    />
                                </div>

                                {/* SIP */}
                                <div>
                                    <label htmlFor="sip" className={labelClass}>
                                        Nomor SIP
                                    </label>
                                    <input
                                        type="text"
                                        id="sip"
                                        name="sip"
                                        value={formData.sip}
                                        onChange={handleChange}
                                        className={inputClass}
                                        placeholder="Surat Izin Praktik"
                                    />
                                </div>

                                {/* Experience */}
                                <div>
                                    <label
                                        htmlFor="experience"
                                        className={labelClass}
                                    >
                                        Pengalaman (Tahun) *
                                    </label>
                                    <input
                                        type="number"
                                        id="experience"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className={inputClass}
                                        min={0}
                                        required
                                    />
                                </div>

                                {/* Status */}
                                <div className="md:col-span-2">
                                    <label className="flex cursor-pointer items-center gap-3">
                                        <input
                                            type="checkbox"
                                            name="is_active"
                                            checked={formData.is_active}
                                            onChange={handleChange}
                                            className="size-5 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <span className="text-sm font-medium text-slate-700">
                                            Dokter Aktif
                                        </span>
                                    </label>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Dokter yang tidak aktif tidak akan
                                        muncul di jadwal booking
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Working Periods Section */}
                    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                                    <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                        2
                                    </span>
                                    Jadwal Kerja Reguler
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowAddPeriod(true)}
                                    className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        add
                                    </span>
                                    Tambah Jadwal
                                </button>
                            </div>

                            {/* Add New Period Form */}
                            {showAddPeriod && (
                                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                                    <h4 className="mb-3 text-sm font-semibold text-slate-700">
                                        Tambah Jadwal Baru
                                    </h4>
                                    <div className="grid gap-3 sm:grid-cols-4">
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-slate-600">
                                                Hari
                                            </label>
                                            <select
                                                value={newPeriod.day_of_week}
                                                onChange={(e) =>
                                                    setNewPeriod({
                                                        ...newPeriod,
                                                        day_of_week: parseInt(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className={selectClass}
                                            >
                                                {DAY_NAMES.map((day, index) => (
                                                    <option
                                                        key={index}
                                                        value={index}
                                                    >
                                                        {day}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-slate-600">
                                                Jam Mulai
                                            </label>
                                            <input
                                                type="time"
                                                value={newPeriod.start_time}
                                                onChange={(e) =>
                                                    setNewPeriod({
                                                        ...newPeriod,
                                                        start_time:
                                                            e.target.value,
                                                    })
                                                }
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-slate-600">
                                                Jam Selesai
                                            </label>
                                            <input
                                                type="time"
                                                value={newPeriod.end_time}
                                                onChange={(e) =>
                                                    setNewPeriod({
                                                        ...newPeriod,
                                                        end_time:
                                                            e.target.value,
                                                    })
                                                }
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <button
                                                type="button"
                                                onClick={handleAddPeriod}
                                                className="flex-1 rounded-lg bg-primary px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                                            >
                                                Tambah
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowAddPeriod(false)
                                                }
                                                className="rounded-lg border border-slate-300 px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Existing Periods */}
                            {periods.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-slate-300 py-8 text-center">
                                    <span className="material-symbols-outlined text-4xl text-slate-300">
                                        calendar_month
                                    </span>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Belum ada jadwal kerja. Klik "Tambah
                                        Jadwal" untuk menambahkan.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                                        const dayPeriods =
                                            periodsByDay[dayIndex] || [];
                                        if (dayPeriods.length === 0)
                                            return null;

                                        return (
                                            <div
                                                key={dayIndex}
                                                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                                            >
                                                <div className="mb-2 flex items-center gap-2">
                                                    <span className="font-semibold text-slate-700">
                                                        {DAY_NAMES[dayIndex]}
                                                    </span>
                                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                        {dayPeriods.length} slot
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    {dayPeriods.map(
                                                        (period) => (
                                                            <div
                                                                key={
                                                                    period.originalIndex
                                                                }
                                                                className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm"
                                                            >
                                                                <input
                                                                    type="time"
                                                                    value={
                                                                        period.start_time
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handlePeriodChange(
                                                                            period.originalIndex,
                                                                            'start_time',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                                                />
                                                                <span className="text-slate-400">
                                                                    -
                                                                </span>
                                                                <input
                                                                    type="time"
                                                                    value={
                                                                        period.end_time
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        handlePeriodChange(
                                                                            period.originalIndex,
                                                                            'end_time',
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                                                                />
                                                                <label className="flex cursor-pointer items-center gap-2">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={
                                                                            period.is_active
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            handlePeriodChange(
                                                                                period.originalIndex,
                                                                                'is_active',
                                                                                e
                                                                                    .target
                                                                                    .checked,
                                                                            )
                                                                        }
                                                                        className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <span className="text-xs text-slate-600">
                                                                        Aktif
                                                                    </span>
                                                                </label>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleRemovePeriod(
                                                                            period.originalIndex,
                                                                        )
                                                                    }
                                                                    className="ml-auto flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
                                                                    title="Hapus"
                                                                >
                                                                    <span className="material-symbols-outlined text-lg">
                                                                        delete
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Overtime Section */}
                    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                                    <span className="flex size-6 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-600">
                                        3
                                    </span>
                                    Jadwal Overtime
                                </h3>
                                <button
                                    type="button"
                                    onClick={() => setShowAddOvertime(true)}
                                    className="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-amber-600"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        add
                                    </span>
                                    Tambah Overtime
                                </button>
                            </div>

                            <p className="text-sm text-slate-500">
                                Jadwal tambahan di luar jam kerja reguler untuk
                                tanggal tertentu.
                            </p>

                            {/* Add Overtime Form */}
                            {showAddOvertime && (
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                                    <h4 className="mb-3 text-sm font-semibold text-slate-700">
                                        Tambah Jadwal Overtime
                                    </h4>
                                    <div className="grid gap-3 sm:grid-cols-4">
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-slate-600">
                                                Tanggal *
                                            </label>
                                            <input
                                                type="date"
                                                value={newOvertime.date}
                                                onChange={(e) =>
                                                    setNewOvertime({
                                                        ...newOvertime,
                                                        date: e.target.value,
                                                    })
                                                }
                                                min={
                                                    new Date()
                                                        .toISOString()
                                                        .split('T')[0]
                                                }
                                                className={inputClass}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-slate-600">
                                                Jam Mulai
                                            </label>
                                            <input
                                                type="time"
                                                value={newOvertime.start_time}
                                                onChange={(e) =>
                                                    setNewOvertime({
                                                        ...newOvertime,
                                                        start_time:
                                                            e.target.value,
                                                    })
                                                }
                                                className={inputClass}
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-xs font-medium text-slate-600">
                                                Jam Selesai
                                            </label>
                                            <input
                                                type="time"
                                                value={newOvertime.end_time}
                                                onChange={(e) =>
                                                    setNewOvertime({
                                                        ...newOvertime,
                                                        end_time:
                                                            e.target.value,
                                                    })
                                                }
                                                className={inputClass}
                                            />
                                        </div>
                                        <div className="flex items-end gap-2">
                                            <button
                                                type="button"
                                                onClick={handleAddOvertime}
                                                className="flex-1 rounded-lg bg-amber-500 px-3 py-3 text-sm font-medium text-white transition-colors hover:bg-amber-600"
                                            >
                                                Tambah
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowAddOvertime(false)
                                                }
                                                className="rounded-lg border border-slate-300 px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                                            >
                                                Batal
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Existing Overtimes */}
                            {overtimes.length === 0 ? (
                                <div className="rounded-lg border border-dashed border-slate-300 py-8 text-center">
                                    <span className="material-symbols-outlined text-4xl text-slate-300">
                                        schedule
                                    </span>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Belum ada jadwal overtime.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {overtimes.map((overtime, index) => (
                                        <div
                                            key={overtime.id || `new-${index}`}
                                            className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-3"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="material-symbols-outlined text-amber-600">
                                                    schedule
                                                </span>
                                                <div>
                                                    <p className="font-medium text-slate-800">
                                                        {overtime.date_formatted ||
                                                            overtime.date}
                                                    </p>
                                                    <p className="text-sm text-slate-600">
                                                        {overtime.start_time} -{' '}
                                                        {overtime.end_time} WIB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveOvertime(index)
                                                }
                                                className="flex size-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-50"
                                                title="Hapus"
                                            >
                                                <span className="material-symbols-outlined text-lg">
                                                    delete
                                                </span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Link
                            href={route('admin.doctors.show', doctor.id)}
                            className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            <span className="material-symbols-outlined text-lg">
                                close
                            </span>
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={!isFormValid || isSubmitting}
                            className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all ${
                                isFormValid && !isSubmitting
                                    ? 'bg-primary text-white hover:bg-primary-dark'
                                    : 'cursor-not-allowed bg-gray-300 text-gray-500'
                            }`}
                        >
                            <span className="material-symbols-outlined text-lg">
                                save
                            </span>
                            {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
