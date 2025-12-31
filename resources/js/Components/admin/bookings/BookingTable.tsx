import { getStatusLabel, getStatusStyles } from '@/lib/utils';
import { BookingFullItem } from '@/types';
import { Link } from '@inertiajs/react';

interface BookingTableProps {
    bookings: BookingFullItem[];
    currentPage: number;
    itemsPerPage: number;
    expandedRow: number | null;
    onToggleExpand: (id: number) => void;
}

export function BookingTable({
    bookings,
    currentPage,
    itemsPerPage,
    expandedRow,
    onToggleExpand,
}: BookingTableProps) {
    if (bookings.length === 0) {
        return <BookingTableEmpty />;
    }

    return (
        <table className="w-full border-collapse text-left">
            <BookingTableHeader />
            <tbody className="divide-y divide-slate-100 text-sm">
                {bookings.map((booking, index) => (
                    <BookingTableRow
                        key={booking.id}
                        booking={booking}
                        rowNumber={(currentPage - 1) * itemsPerPage + index + 1}
                        isExpanded={expandedRow === booking.id}
                        onToggleExpand={() => onToggleExpand(booking.id)}
                    />
                ))}
            </tbody>
        </table>
    );
}

function BookingTableHeader() {
    return (
        <thead className="bg-slate-50">
            <tr>
                <th className="w-10 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                    No
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Kode
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Pasien
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Dokter
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Tanggal & Jam
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Dibuat Pada
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                </th>
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Aksi
                </th>
            </tr>
        </thead>
    );
}

function BookingTableEmpty() {
    return (
        <div className="px-4 py-12 text-center">
            <span className="material-symbols-outlined text-4xl text-slate-300">
                event_busy
            </span>
            <p className="mt-2 text-sm text-slate-500">
                Tidak ada booking ditemukan
            </p>
        </div>
    );
}

interface BookingTableRowProps {
    booking: BookingFullItem;
    rowNumber: number;
    isExpanded: boolean;
    onToggleExpand: () => void;
}

function BookingTableRow({
    booking,
    rowNumber,
    isExpanded,
    onToggleExpand,
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
                            {booking.start_time} WIB
                        </span>
                    </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">
                    {booking.created_at_formatted}
                </td>
                <td className="px-4 py-3">
                    <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(booking.status)}`}
                    >
                        {getStatusLabel(booking.status)}
                    </span>
                </td>
                <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onToggleExpand}
                            className="cursor-pointer rounded-md bg-slate-100 p-1.5 text-slate-600 transition-colors hover:bg-slate-200"
                            title="Detail"
                        >
                            <span className="material-symbols-outlined text-lg">
                                {isExpanded ? 'expand_less' : 'expand_more'}
                            </span>
                        </button>
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
            </tr>
            {isExpanded && <BookingDetailRow booking={booking} />}
        </>
    );
}

function BookingDetailRow({ booking }: { booking: BookingFullItem }) {
    return (
        <tr className="bg-slate-50">
            <td colSpan={8} className="px-4 py-4">
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
                            Email
                        </p>
                        <p className="text-sm text-slate-900">
                            {booking.patient_email}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500">
                            Keluhan
                        </p>
                        <p className="text-sm text-slate-900">
                            {booking.complaint}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-500">
                            Waktu Dibuat
                        </p>
                        <p className="text-sm text-slate-900">
                            {booking.created_at}
                        </p>
                    </div>
                </div>
            </td>
        </tr>
    );
}
