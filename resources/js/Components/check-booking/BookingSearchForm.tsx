'use client';

import { useState } from 'react';

export function BookingSearchForm({ onSearch }: { onSearch?: () => void }) {
    const [whatsapp, setWhatsapp] = useState('');
    const [bookingCode, setBookingCode] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) onSearch();
    };

    return (
        <div className="dark:bg-card-dark bg-card-light border-border-light rounded-xl border bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors duration-200 md:p-8">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-text-main-light">
                            Nomor WhatsApp
                        </span>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-text-sub-light">
                                smartphone
                            </span>
                            <input
                                className="border-border-light h-12 w-full rounded-lg border bg-background-light pl-10 pr-4 text-base text-text-main-light outline-none transition-all placeholder:text-text-sub-light/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                placeholder="0812-3456-7890"
                                type="tel"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-text-main-light">
                            Kode Booking
                        </span>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-text-sub-light">
                                confirmation_number
                            </span>
                            <input
                                className="border-border-light h-12 w-full rounded-lg border bg-background-light pl-10 pr-4 text-base text-text-main-light outline-none transition-all placeholder:text-text-sub-light/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                                placeholder="#BKG-XXXX"
                                type="text"
                                value={bookingCode}
                                onChange={(e) => setBookingCode(e.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <div className="flex justify-end pt-2">
                    <button
                        type="submit"
                        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-8 text-base font-bold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg active:scale-[0.98] md:w-auto"
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            search
                        </span>
                        Cek Status
                    </button>
                </div>
            </form>
        </div>
    );
}
