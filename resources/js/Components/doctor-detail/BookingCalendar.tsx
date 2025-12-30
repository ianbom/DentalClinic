'use client';

import { formatTime } from '@/lib/utils/date';
import { DAY_ORDER, groupByDay } from '@/lib/utils/schedule';
import { Doctor } from '@/types';
import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface BookingCalendarProps {
    doctor: Doctor;
    doctorId: string;
}

export function BookingCalendar({ doctor, doctorId }: BookingCalendarProps) {
    const [activeTab, setActiveTab] = useState<'jadwal'>('jadwal');

    // Group schedules by day
    const scheduleByDay = useMemo(() => {
        if (!doctor.working_periods || doctor.working_periods.length === 0) {
            return {};
        }
        return groupByDay(doctor.working_periods);
    }, [doctor.working_periods]);

    const sortedDays = Object.keys(scheduleByDay).sort(
        (a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b),
    );

    return (
        <>
            {/* Tabs Navigation */}
            <div className="sticky top-[65px] z-40 mb-6 rounded-xl border border-subtle-light bg-white shadow-sm">
                <div className="hide-scrollbar flex overflow-x-auto border-b border-subtle-light px-2">
                    <button
                        onClick={() => setActiveTab('jadwal')}
                        className={`min-w-[100px] flex-1 cursor-pointer border-b-2 py-4 text-center text-sm font-medium transition-colors ${
                            activeTab === 'jadwal'
                                ? 'border-primary font-bold text-primary'
                                : 'border-transparent text-gray-500 hover:text-primary'
                        }`}
                    >
                        Jadwal Praktek
                    </button>
                </div>
            </div>

            {activeTab === 'jadwal' && (
                <section className="mb-6 rounded-xl border border-subtle-light bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-bold text-text-light">
                        Jadwal Praktek
                    </h3>

                    {/* Schedule Cards by Day */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {sortedDays.length > 0 ? (
                            sortedDays.map((day) => (
                                <div
                                    key={day}
                                    className="rounded-xl border border-subtle-light bg-gray-50 p-4 transition-all hover:border-primary/30 hover:shadow-md"
                                >
                                    <div className="mb-3 flex items-center gap-2">
                                        <div className="rounded-lg bg-primary/10 p-2">
                                            <span className="material-symbols-outlined text-primary">
                                                calendar_month
                                            </span>
                                        </div>
                                        <h4 className="text-lg font-bold text-text-light">
                                            {day}
                                        </h4>
                                    </div>
                                    <div className="space-y-2">
                                        {scheduleByDay[day].map((wp, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 rounded-lg bg-white px-3 py-2"
                                            >
                                                <span className="material-symbols-outlined text-[16px] text-primary">
                                                    schedule
                                                </span>
                                                <span className="text-sm font-medium text-gray-700">
                                                    {formatTime(wp.start_time)}{' '}
                                                    - {formatTime(wp.end_time)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-8 text-center text-gray-500">
                                Jadwal belum tersedia
                            </div>
                        )}
                    </div>

                    {/* Lokasi */}
                    <div className="mt-6 flex items-start gap-4 rounded-lg bg-gray-50 p-4">
                        <div className="rounded-lg bg-primary/10 p-2">
                            <span className="material-symbols-outlined text-primary">
                                location_on
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Lokasi Praktek
                            </p>
                            <p className="text-lg font-bold text-text-light">
                                Cantika Dental Care
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6 border-t border-gray-100 pt-6">
                        <Link
                            href={`/doctors/${doctorId}/booking`}
                            className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3.5 font-bold text-white shadow-md shadow-primary/20 transition-colors hover:bg-primary-dark"
                        >
                            <span>Booking Sekarang</span>
                            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                                arrow_forward
                            </span>
                        </Link>
                    </div>
                </section>
            )}
        </>
    );
}
