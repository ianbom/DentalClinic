"use client";

import { useState } from "react";

export function BookingSearchForm({ onSearch }: { onSearch?: () => void }) {
    const [whatsapp, setWhatsapp] = useState("");
    const [bookingCode, setBookingCode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSearch) onSearch();
    };

    return (
        <div className="bg-white dark:bg-card-dark rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] bg-card-light border border-border-light p-6 md:p-8 transition-colors duration-200">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-text-main-light">Nomor WhatsApp</span>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub-light material-symbols-outlined text-[20px]">smartphone</span>
                            <input
                                className="w-full pl-10 pr-4 h-12 rounded-lg bg-background-light border border-border-light focus:border-primary focus:ring-2 focus:ring-primary/20 text-text-main-light placeholder:text-text-sub-light/50 text-base transition-all outline-none"
                                placeholder="0812-3456-7890"
                                type="tel"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-semibold text-text-main-light">Kode Booking</span>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub-light material-symbols-outlined text-[20px]">confirmation_number</span>
                            <input
                                className="w-full pl-10 pr-4 h-12 rounded-lg bg-background-light border border-border-light focus:border-primary focus:ring-2 focus:ring-primary/20 text-text-main-light placeholder:text-text-sub-light/50 text-base transition-all outline-none"
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
                        className="w-full md:w-auto flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-primary hover:bg-primary-dark text-white text-base font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <span className="material-symbols-outlined text-[20px]">search</span>
                        Cek Status
                    </button>
                </div>
            </form>
        </div>
    );
}
