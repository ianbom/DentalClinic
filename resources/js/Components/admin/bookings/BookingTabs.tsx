import Link from "next/link";
import React from "react";

export function BookingTabs() {
    return (
        <div className="border-b border-slate-200 mt-2">
            <div className="flex gap-8">
                <Link
                    href="#"
                    className="relative flex items-center justify-center pb-3 pt-2 text-primary font-bold text-sm"
                >
                    Daftar
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>
                </Link>
                <Link
                    href="#"
                    className="flex items-center justify-center pb-3 pt-2 text-slate-500 hover:text-slate-700 font-medium text-sm transition-colors"
                >
                    Kalender
                </Link>
            </div>
        </div>
    );
}
