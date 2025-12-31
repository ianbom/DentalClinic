'use client';

import { useEffect, useState } from 'react';

function getCurrentDate(): string {
    const days = [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
    ];
    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    return `${dayName}, ${day} ${month} ${year}`;
}

export function AdminHeader() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        setCurrentDate(getCurrentDate());
    }, []);

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
            {/* Current Date */}
            <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-primary">
                    calendar_today
                </span>
                <span className="text-sm font-medium text-slate-700">
                    {currentDate}
                </span>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-slate-900">
                            Dr. Sarah Admin
                        </p>
                        <p className="text-xs text-slate-500">Clinic Manager</p>
                    </div>
                    <div className="size-10 overflow-hidden rounded-full bg-slate-200 ring-2 ring-primary/20">
                        <img
                            alt="Profile photo of the admin user"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz5fyNIy77EPR1btdB7QxuZo506CnC-Fgks-YYigzvyIwSe3vZOBEA5OojSTMDaKamPV4KovRVdSe-asBS8CJjpM0cZdXDynhjDRIMHviUQA2tSmJtMKGJICT7QisadxpGeKY2UiCLJegbYzxEAuicmRoarJtTBjIS904HaA3DDefujkHsPPAK0NUXR7vsNy4lJ14c5_8vU8jJ5N0PremQmixeEyJHe-dgT3ytMKPeUIP3HaQtZjp0RMuglGGLQ2u3r4Tc9wICqa-e"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
