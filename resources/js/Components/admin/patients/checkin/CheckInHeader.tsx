import React from "react";

export function CheckInHeader() {
    return (
        <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-slate-900 text-3xl font-black tracking-tight">
                Check-in Pasien
            </h1>
            <p className="text-slate-500 text-base">
                Verifikasi kedatangan pasien dengan kode booking untuk memulai antrian.
            </p>
        </div>
    );
}
