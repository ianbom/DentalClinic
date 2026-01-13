import { OvertimeModal } from '@/Components/admin/doctors/OvertimeModal';
import { WorkingPeriodModal } from '@/Components/admin/doctors/WorkingPeriodModal';
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

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Working Period Modal State
    const [showWorkingPeriodModal, setShowWorkingPeriodModal] = useState(false);
    const [editingPeriod, setEditingPeriod] = useState<WorkingPeriod | null>(
        null,
    );

    // Overtime Modal State
    const [showOvertimeModal, setShowOvertimeModal] = useState(false);
    const [editingOvertime, setEditingOvertime] = useState<Overtime | null>(
        null,
    );

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

    // Working Period Modal Handlers
    const handleOpenWorkingPeriodModal = (period?: WorkingPeriod) => {
        setEditingPeriod(period || null);
        setShowWorkingPeriodModal(true);
    };

    const handleCloseWorkingPeriodModal = () => {
        setShowWorkingPeriodModal(false);
        setEditingPeriod(null);
    };

    // Overtime Modal Handlers
    const handleOpenOvertimeModal = (overtime?: Overtime) => {
        setEditingOvertime(overtime || null);
        setShowOvertimeModal(true);
    };

    const handleCloseOvertimeModal = () => {
        setShowOvertimeModal(false);
        setEditingOvertime(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.put(`/admin/doctors/${doctor.id}/update`, formData, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    const isFormValid = formData.name.trim() !== '';

    const inputClass =
        'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';
    const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

    // Group periods by day
    const periodsByDay = initialPeriods.reduce(
        (acc, period) => {
            const day = period.day_of_week;
            if (!acc[day]) acc[day] = [];
            acc[day].push(period);
            return acc;
        },
        {} as Record<number, WorkingPeriod[]>,
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

                {/* Doctor Info Form */}
                <form onSubmit={handleSubmit}>
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

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-end">
                                <Link
                                    href={route(
                                        'admin.doctors.show',
                                        doctor.id,
                                    )}
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
                                    {isSubmitting
                                        ? 'Menyimpan...'
                                        : 'Simpan Perubahan'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

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
                                onClick={() => handleOpenWorkingPeriodModal()}
                                className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    add
                                </span>
                                Tambah Jadwal
                            </button>
                        </div>

                        <p className="text-sm text-slate-500">
                            Jadwal kerja rutin setiap minggu.
                        </p>

                        {/* Existing Periods */}
                        {initialPeriods.length === 0 ? (
                            <div className="rounded-lg border border-dashed border-slate-300 py-8 text-center">
                                <span className="material-symbols-outlined text-4xl text-slate-300">
                                    calendar_month
                                </span>
                                <p className="mt-2 text-sm text-slate-500">
                                    Belum ada jadwal kerja. Klik "Tambah Jadwal"
                                    untuk menambahkan.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                                    const dayPeriods =
                                        periodsByDay[dayIndex] || [];
                                    if (dayPeriods.length === 0) return null;

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
                                                {dayPeriods.map((period) => (
                                                    <div
                                                        key={period.id}
                                                        className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-sm font-medium text-slate-700">
                                                                {
                                                                    period.start_time
                                                                }{' '}
                                                                -{' '}
                                                                {
                                                                    period.end_time
                                                                }
                                                            </span>
                                                            <span
                                                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${period.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                                                            >
                                                                {period.is_active
                                                                    ? 'Aktif'
                                                                    : 'Nonaktif'}
                                                            </span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleOpenWorkingPeriodModal(
                                                                    period,
                                                                )
                                                            }
                                                            className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100"
                                                            title="Edit"
                                                        >
                                                            <span className="material-symbols-outlined text-lg">
                                                                edit
                                                            </span>
                                                        </button>
                                                    </div>
                                                ))}
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
                                onClick={() => handleOpenOvertimeModal()}
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

                        {/* Existing Overtimes */}
                        {initialOvertimes.length === 0 ? (
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
                                {initialOvertimes.map((overtime) => (
                                    <div
                                        key={overtime.id}
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
                                                handleOpenOvertimeModal(
                                                    overtime,
                                                )
                                            }
                                            className="flex size-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white"
                                            title="Edit"
                                        >
                                            <span className="material-symbols-outlined text-lg">
                                                edit
                                            </span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Working Period Modal */}
            <WorkingPeriodModal
                isOpen={showWorkingPeriodModal}
                onClose={handleCloseWorkingPeriodModal}
                doctorId={doctor.id}
                existingPeriod={editingPeriod}
            />

            {/* Overtime Modal */}
            <OvertimeModal
                isOpen={showOvertimeModal}
                onClose={handleCloseOvertimeModal}
                doctorId={doctor.id}
                existingOvertime={editingOvertime}
            />
        </AdminLayout>
    );
}
