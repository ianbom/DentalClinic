import React from "react";
import { patientsData, Patient } from "@/app/data/patients";

export function PatientTable() {
    return (
        <div className="overflow-x-auto w-full bg-white">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="p-4 text-xs font-semibold tracking-wide text-slate-500 uppercase w-16 text-center">
                            #
                        </th>
                        <th className="p-4 text-xs font-semibold tracking-wide text-slate-500 uppercase min-w-[200px]">
                            Nama
                        </th>
                        <th className="p-4 text-xs font-semibold tracking-wide text-slate-500 uppercase min-w-[180px]">
                            NIK
                        </th>
                        <th className="p-4 text-xs font-semibold tracking-wide text-slate-500 uppercase min-w-[160px]">
                            WhatsApp
                        </th>
                        <th className="p-4 text-xs font-semibold tracking-wide text-slate-500 uppercase text-center min-w-[140px]">
                            Total Kunjungan
                        </th>
                        <th className="p-4 text-xs font-semibold tracking-wide text-slate-500 uppercase text-right w-24">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {patientsData.map((patient: Patient, index: number) => (
                        <tr
                            key={patient.id}
                            className="group hover:bg-slate-50 transition-colors"
                        >
                            <td className="p-4 text-sm text-slate-400 text-center">
                                {index + 1}
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-8 h-8 rounded-full ${patient.colorBg} ${patient.colorText} flex items-center justify-center text-xs font-bold`}
                                    >
                                        {patient.initials}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-semibold text-slate-900">
                                            {patient.name}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {patient.gender}, {patient.age} y.o
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-sm font-mono text-slate-600">
                                {patient.nik}
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500 bg-green-50 p-1 rounded-md">
                                        <span className="w-3 h-3 block opacity-70">
                                            {/* Simple SVG icon/placeholder for WA as img not available */}
                                            <span className="material-symbols-outlined text-[12px]">
                                                chat
                                            </span>
                                        </span>
                                    </span>
                                    <span className="text-sm font-mono text-slate-600">
                                        {patient.phone}
                                    </span>
                                </div>
                            </td>
                            <td className="p-4 text-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                    {patient.totalVisits} Kunjungan
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-primary transition-colors"
                                        title="Edit Customer"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            edit
                                        </span>
                                    </button>
                                    <button
                                        className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-primary transition-colors"
                                        title="View Details"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">
                                            visibility
                                        </span>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
