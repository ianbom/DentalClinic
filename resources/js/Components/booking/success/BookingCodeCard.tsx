"use client";

import { useState } from "react";

export function BookingCodeCard() {
    const [copied, setCopied] = useState(false);
    const code = "XC-9281";

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-xl border border-dashed border-primary/40 p-6 md:p-8 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500"></div>

            <div className="flex flex-col gap-1 items-center md:items-start z-10">
                <p className="text-gray-500 text-sm font-medium tracking-wider uppercase">Kode Booking Anda</p>
                <p className="text-text-light text-4xl md:text-5xl font-mono font-bold tracking-tight text-primary">{code}</p>
            </div>

            <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all active:scale-95 z-10 w-full md:w-auto justify-center cursor-pointer"
            >
                <span className="material-symbols-outlined text-[20px]">{copied ? "check" : "content_copy"}</span>
                <span>{copied ? "Tersalin!" : "Salin Kode"}</span>
            </button>
        </div>
    );
}
