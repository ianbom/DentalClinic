import Link from "next/link";
import React from "react";
import { bookingsData, BookingData } from "@/app/data/bookings";

const getStatusStyles = (status: BookingData["status"]) => {
    switch (status) {
        case "Confirmed":
            return "bg-primary/10 text-primary border-primary/20";
        case "Checked-in":
            return "bg-purple-100 text-purple-700 border-purple-200";
        case "Pending":
            return "bg-amber-100 text-amber-700 border-amber-200";
        case "Completed":
            return "bg-green-100 text-green-700 border-green-200";
        case "Cancelled":
            return "bg-slate-100 text-slate-600 border-slate-200";
        default:
            return "bg-slate-100 text-slate-600";
    }
};

export function BookingTable() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            <th className="px-6 py-4 w-24">Kode</th>
                            <th className="px-6 py-4 min-w-[240px]">Customer</th>
                            <th className="px-6 py-4 min-w-[200px]">Dokter</th>
                            <th className="px-6 py-4 min-w-[200px]">Jadwal</th>
                            <th className="px-6 py-4 w-40">Status</th>
                            <th className="px-6 py-4 w-24 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {bookingsData.map((booking) => (
                            <tr
                                key={booking.id}
                                className="hover:bg-slate-50 transition-colors group"
                            >
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-slate-900">
                                        {booking.code}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900">
                                            {booking.patient.name}
                                        </span>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <span className="material-symbols-outlined text-[14px] text-green-500">
                                                chat
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {booking.patient.phone}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`size-6 rounded-full flex items-center justify-center text-[10px] font-bold ${booking.doctor.colorBg} ${booking.doctor.colorText}`}
                                        >
                                            {booking.doctor.initials}
                                        </div>
                                        <span className="text-sm text-slate-700">
                                            {booking.doctor.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900">
                                            {booking.schedule.date}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {booking.schedule.time}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(
                                            booking.status
                                        )}`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <Link
                                        href={`/admin/bookings/${booking.id}`}
                                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-primary transition-colors inline-flex"
                                        title="Detail"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            visibility
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
