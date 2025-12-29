import React from "react";

interface PatientInfoCardProps {
    name: string;
    type: string;
    nik: string;
    whatsapp: string;
    email: string;
    note: string;
    image: string;
}

export function PatientInfoCard({
    name,
    type,
    nik,
    whatsapp,
    email,
    note,
    image,
}: PatientInfoCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-24">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900">Data Pasien</h3>
            </div>
            <div className="p-6 flex flex-col items-center text-center border-b border-slate-100">
                <div
                    className="size-24 rounded-full bg-slate-200 mb-4 bg-cover bg-center ring-4 ring-white shadow-md"
                    style={{ backgroundImage: `url("${image}")` }}
                ></div>
                <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                <p className="text-sm text-slate-500">{type}</p>
            </div>
            <div className="p-6 space-y-5">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                        NIK
                    </span>
                    <span className="text-sm font-medium text-slate-900">{nik}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                        Nomor WhatsApp
                    </span>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">
                            {whatsapp}
                        </span>
                        <button className="text-slate-400 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[18px]">
                                content_copy
                            </span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                        Email
                    </span>
                    <span className="text-sm font-medium text-slate-900">{email}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-semibold text-slate-500 uppercase">
                        Catatan Pasien
                    </span>
                    <span className="text-sm font-medium text-slate-900 italic">
                        "{note}"
                    </span>
                </div>
                <div className="pt-4 mt-2">
                    <button className="w-full flex items-center justify-center rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 text-sm font-bold transition-colors gap-2 shadow-sm">
                        <svg
                            className="w-5 h-5 fill-current"
                            viewBox="0 0 448 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l121.7-31.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                        </svg>
                        Hubungi via WA
                    </button>
                </div>
            </div>
        </div>
    );
}
