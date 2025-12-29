'use client';

import { useState } from 'react';

export function BookingCodeCard() {
    const [copied, setCopied] = useState(false);
    const code = 'XC-9281';

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group relative mb-8 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-xl border border-dashed border-primary/40 bg-white p-6 shadow-sm md:flex-row md:p-8">
            {/* Decorative background element */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-all duration-500 group-hover:bg-primary/10"></div>

            <div className="z-10 flex flex-col items-center gap-1 md:items-start">
                <p className="text-sm font-medium uppercase tracking-wider text-gray-500">
                    Kode Booking Anda
                </p>
                <p className="font-mono text-4xl font-bold tracking-tight text-primary text-text-light md:text-5xl">
                    {code}
                </p>
            </div>

            <button
                onClick={handleCopy}
                className="z-10 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-primary/90 active:scale-95 md:w-auto"
            >
                <span className="material-symbols-outlined text-[20px]">
                    {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
            </button>
        </div>
    );
}
