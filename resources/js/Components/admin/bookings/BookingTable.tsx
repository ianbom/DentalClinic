import { getStatusLabel, getStatusStyles } from '@/lib/utils';
import { BookingFullItem } from '@/types';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

// =============================================================================
// Types
// =============================================================================

export type SortField = 'patient_name' | 'booking_date' | 'created_at' | '';
export type SortOrder = 'asc' | 'desc';

// =============================================================================
// Main BookingTable Component (Unified)
// =============================================================================

interface BookingTableProps {
    /** Table title shown in header */
    title?: string;
    /** List of bookings to display */
    bookings: BookingFullItem[];
    /** Message shown when no bookings */
    emptyMessage?: string;
    /** Show expandable details row */
    showExpandable?: boolean;
    /** Show action buttons (expand, view) */
    showActions?: boolean;
    /** Current page for row numbering (default: 1) */
    currentPage?: number;
    /** Items per page for row numbering (default: 10) */
    itemsPerPage?: number;
    /** Current sort field */
    sortField?: SortField;
    /** Current sort order */
    sortOrder?: SortOrder;
    /** Callback when sort changes */
    onSort?: (field: SortField) => void;
    /** Callback when payment button clicked */
    onPayment?: (booking: BookingFullItem) => void;
}

export function BookingTable({
    title,
    bookings,
    emptyMessage = 'Tidak ada booking ditemukan',
    showExpandable = false,
    showActions = false,
    currentPage = 1,
    itemsPerPage = 10,
    sortField = '',
    sortOrder = 'asc',
    onSort,
    onPayment,
}: BookingTableProps) {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const handleToggleExpand = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            {title && (
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h3 className="text-lg font-bold text-slate-900">
                        {title}
                    </h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {bookings.length} booking
                    </span>
                </div>
            )}

            {/* Table */}
            {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <BookingTableHeader
                            showActions={showActions}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            onSort={onSort}
                        />
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {bookings.map((booking, index) => (
                                <BookingTableRow
                                    key={booking.id}
                                    booking={booking}
                                    rowNumber={
                                        (currentPage - 1) * itemsPerPage +
                                        index +
                                        1
                                    }
                                    showActions={showActions}
                                    showExpandable={showExpandable}
                                    isExpanded={expandedRow === booking.id}
                                    onToggleExpand={() =>
                                        handleToggleExpand(booking.id)
                                    }
                                    onPayment={onPayment}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <BookingTableEmpty message={emptyMessage} />
            )}
        </div>
    );
}

// =============================================================================
// Sub-Components
// =============================================================================

function SortableHeader({
    label,
    field,
    currentField,
    currentOrder,
    onSort,
}: {
    label: string;
    field: SortField;
    currentField: SortField;
    currentOrder: SortOrder;
    onSort?: (field: SortField) => void;
}) {
    const isActive = currentField === field;

    return (
        <th
            className="cursor-pointer px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors hover:text-slate-700"
            onClick={() => onSort?.(field)}
        >
            <div className="flex items-center gap-1">
                <span>{label}</span>
                <span className="material-symbols-outlined text-[14px]">
                    {isActive
                        ? currentOrder === 'asc'
                            ? 'arrow_upward'
                            : 'arrow_downward'
                        : 'unfold_more'}
                </span>
            </div>
        </th>
    );
}

function BookingTableHeader({
    showActions,
    sortField,
    sortOrder,
    onSort,
}: {
    showActions: boolean;
    sortField: SortField;
    sortOrder: SortOrder;
    onSort?: (field: SortField) => void;
}) {
    return (
        <thead className="bg-slate-50">
            <tr>
                <th className="w-10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    No
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Kode
                </th>
                <SortableHeader
                    label="Pasien"
                    field="patient_name"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onSort={onSort}
                />
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Dokter
                </th>
                <SortableHeader
                    label="Tanggal & Jam"
                    field="booking_date"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onSort={onSort}
                />
                <SortableHeader
                    label="Dibuat Pada"
                    field="created_at"
                    currentField={sortField}
                    currentOrder={sortOrder}
                    onSort={onSort}
                />
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Pembayaran
                </th>
                {showActions && (
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Aksi
                    </th>
                )}
            </tr>
        </thead>
    );
}

function BookingTableEmpty({ message }: { message: string }) {
    return (
        <div className="p-8 text-center">
            <span className="material-symbols-outlined text-4xl text-slate-300">
                event_busy
            </span>
            <p className="mt-2 text-sm text-slate-500">{message}</p>
        </div>
    );
}

interface BookingTableRowProps {
    booking: BookingFullItem;
    rowNumber: number;
    showActions: boolean;
    showExpandable: boolean;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onPayment?: (booking: BookingFullItem) => void;
}

function BookingTableRow({
    booking,
    rowNumber,
    showActions,
    showExpandable,
    isExpanded,
    onToggleExpand,
    onPayment,
}: BookingTableRowProps) {
    return (
        <>
            <tr className="transition-colors hover:bg-slate-50">
                <td className="px-4 py-3 text-center text-sm text-slate-500">
                    {rowNumber}
                </td>
                <td className="px-4 py-3 font-mono text-sm font-medium text-slate-900">
                    {booking.code}
                </td>
                <td className="px-4 py-3">
                    <div>
                        <p className="font-medium text-slate-900">
                            {booking.patient_name}
                        </p>
                        <p className="text-xs text-slate-500">
                            {booking.patient_phone}
                        </p>
                    </div>
                </td>
                <td className="px-4 py-3 text-slate-600">
                    {booking.doctor_name}
                </td>
                <td className="px-4 py-3">
                    <div className="flex flex-col">
                        <span className="text-slate-900">
                            {booking.booking_date_formatted}
                        </span>
                        <span className="text-xs text-slate-500">
                            {booking.start_time
                                ? `${booking.start_time} WIB`
                                : '-'}
                        </span>
                    </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                    {booking.created_at_formatted}
                </td>
                <td className="px-4 py-3">
                    <StatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3">
                    {booking.payment ? (
                        <div className="flex flex-col">
                            <span className="font-medium text-green-700">
                                Rp{' '}
                                {booking.payment.amount.toLocaleString('id-ID')}
                            </span>
                            <span className="text-xs capitalize text-slate-500">
                                {booking.payment.payment_method}
                            </span>
                        </div>
                    ) : (
                        <span className="text-xs text-slate-400">
                            Belum bayar
                        </span>
                    )}
                </td>
                {showActions && (
                    <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                            {showExpandable && (
                                <button
                                    onClick={onToggleExpand}
                                    className="cursor-pointer rounded-md bg-slate-100 p-1.5 text-slate-600 transition-colors hover:bg-slate-200"
                                    title="Detail"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        {isExpanded
                                            ? 'expand_less'
                                            : 'expand_more'}
                                    </span>
                                </button>
                            )}
                            {onPayment && (
                                <button
                                    onClick={() => onPayment(booking)}
                                    className="cursor-pointer rounded-md bg-green-100 p-1.5 text-green-600 transition-colors hover:bg-green-200"
                                    title="Input Pembayaran"
                                >
                                    <span className="material-symbols-outlined text-lg">
                                        payments
                                    </span>
                                </button>
                            )}
                            <Link
                                href={`/admin/bookings/${booking.id}`}
                                className="cursor-pointer rounded-md bg-primary p-1.5 text-white transition-colors hover:bg-sky-600"
                                title="Lihat Detail"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    visibility
                                </span>
                            </Link>
                        </div>
                    </td>
                )}
            </tr>
            {showExpandable && isExpanded && (
                <BookingDetailRow booking={booking} showActions={showActions} />
            )}
        </>
    );
}

function BookingDetailRow({
    booking,
    showActions,
}: {
    booking: BookingFullItem;
    showActions: boolean;
}) {
    return (
        <tr className="bg-slate-50">
            <td colSpan={showActions ? 8 : 7} className="px-4 py-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div>
                        <p className="text-xs font-medium text-slate-500">
                            NIK
                        </p>
                        <p className="text-sm text-slate-900">
                            {booking.patient_nik}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500">
                            Service
                        </p>
                        <p className="text-sm text-slate-900">
                            {booking.service || '-'}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500">
                            Gender
                        </p>
                        <p className="text-sm text-slate-900">
                            {booking.patient_gender || '-'}
                        </p>
                    </div>
                </div>
            </td>
        </tr>
    );
}

function StatusBadge({ status }: { status: string }) {
    return (
        <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(status)}`}
        >
            {getStatusLabel(status)}
        </span>
    );
}
