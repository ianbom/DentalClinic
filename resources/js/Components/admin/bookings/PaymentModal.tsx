import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface PaymentData {
    amount: number;
    payment_method: string;
    note: string;
}

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    bookingId: number;
    bookingCode: string;
    existingPayment?: PaymentData | null;
}

const paymentMethods = [
    { value: 'cash', label: 'Tunai' },
    { value: 'transfer', label: 'Transfer Bank' },
    { value: 'qris', label: 'QRIS' },
    { value: 'debit', label: 'Kartu Debit' },
    { value: 'credit', label: 'Kartu Kredit' },
];

export function PaymentModal({
    isOpen,
    onClose,
    bookingId,
    bookingCode,
    existingPayment,
}: PaymentModalProps) {
    const [amount, setAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-fill form when existing payment data is provided
    useEffect(() => {
        if (existingPayment) {
            setAmount(formatCurrency(String(existingPayment.amount)));
            setPaymentMethod(existingPayment.payment_method);
            setNote(existingPayment.note || '');
        } else {
            setAmount('');
            setPaymentMethod('cash');
            setNote('');
        }
    }, [existingPayment, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount || isSubmitting) return;

        setIsSubmitting(true);
        router.post(
            `/admin/bookings/${bookingId}/payment`,
            {
                amount: parseInt(amount.replace(/\D/g, ''), 10),
                payment_method: paymentMethod,
                note,
            },
            {
                onSuccess: () => {
                    onClose();
                },
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    const formatCurrency = (value: string) => {
        const number = value.replace(/\D/g, '');
        return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(formatCurrency(e.target.value));
    };

    if (!isOpen) return null;

    const hasExistingPayment = !!existingPayment;

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
                            {hasExistingPayment
                                ? 'Edit Pembayaran'
                                : 'Input Pembayaran'}
                        </h3>
                        <p className="text-sm text-slate-500">
                            Booking: {bookingCode}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Existing Payment Info */}
                {hasExistingPayment && (
                    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
                        <div className="flex items-center gap-2 text-green-700">
                            <span className="material-symbols-outlined text-[18px]">
                                check_circle
                            </span>
                            <span className="text-sm font-medium">
                                Pembayaran sudah tercatat
                            </span>
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Amount */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Nominal*
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                Rp
                            </span>
                            <input
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="0"
                                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                required
                            />
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Metode Pembayaran*
                        </label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                            {paymentMethods.map((method) => (
                                <option key={method.value} value={method.value}>
                                    {method.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Note */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700">
                            Catatan
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Catatan pembayaran (opsional)"
                            rows={3}
                            className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-slate-900 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    {/* Actions */}
                    <div className="mt-2 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={!amount || isSubmitting}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
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
                                        payments
                                    </span>
                                    {hasExistingPayment
                                        ? 'Update Pembayaran'
                                        : 'Simpan Pembayaran'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
