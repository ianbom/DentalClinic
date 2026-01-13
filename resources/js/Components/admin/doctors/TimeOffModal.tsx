import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface TimeOffData {
    id?: number;
    date: string;
    start_time: string;
    end_time: string;
    note?: string;
}

interface TimeOffModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctorId: number;
    existingTimeOff?: TimeOffData | null;
}

export function TimeOffModal({
    isOpen,
    onClose,
    doctorId,
    existingTimeOff,
}: TimeOffModalProps) {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('12:00');
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isEditMode = !!existingTimeOff?.id;

    useEffect(() => {
        if (existingTimeOff) {
            setDate(existingTimeOff.date);
            setStartTime(existingTimeOff.start_time);
            setEndTime(existingTimeOff.end_time);
            setNote(existingTimeOff.note || '');
        } else {
            setDate('');
            setStartTime('08:00');
            setEndTime('12:00');
            setNote('');
        }
    }, [existingTimeOff, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || isSubmitting) return;

        setIsSubmitting(true);

        const data = {
            doctor_id: doctorId,
            date,
            start_time: startTime,
            end_time: endTime,
            note: note || null,
        };

        if (isEditMode && existingTimeOff?.id) {
            router.put(`/admin/doctors/timeoff/${existingTimeOff.id}`, data, {
                onSuccess: () => onClose(),
                onFinish: () => setIsSubmitting(false),
            });
        } else {
            router.post('/admin/doctors/timeoff', data, {
                onSuccess: () => onClose(),
                onFinish: () => setIsSubmitting(false),
            });
        }
    };

    const handleDelete = () => {
        if (!existingTimeOff?.id || isSubmitting) return;

        if (!confirm('Apakah Anda yakin ingin menghapus time off ini?')) return;

        setIsSubmitting(true);
        router.delete(`/admin/doctors/timeoff/${existingTimeOff.id}`, {
            onSuccess: () => onClose(),
            onFinish: () => setIsSubmitting(false),
        });
    };

    if (!isOpen) return null;

    const inputClass =
        'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">
                            {isEditMode ? 'Edit Time Off' : 'Tambah Time Off'}
                        </h3>
                        <p className="text-sm text-slate-500">
                            Jadwal libur atau tidak tersedia
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Date */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Tanggal *
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Time */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">
                                Jam Mulai *
                            </label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className={inputClass}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-700">
                                Jam Selesai *
                            </label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className={inputClass}
                                required
                            />
                        </div>
                    </div>

                    {/* Note */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Catatan
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Alasan time off (opsional)"
                            rows={2}
                            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    {/* Actions */}
                    <div className="mt-2 flex gap-3">
                        {isEditMode && (
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={isSubmitting}
                                className="flex items-center justify-center gap-1 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[18px]">
                                    delete
                                </span>
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={!date || isSubmitting}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="material-symbols-outlined animate-spin text-[18px]">
                                        progress_activity
                                    </span>
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[18px]">
                                        save
                                    </span>
                                    {isEditMode ? 'Simpan' : 'Tambah'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
