"use client";

import { useState } from "react";

interface FilterSidebarProps {
    selectedDays: string[];
    onDaysChange: (days: string[]) => void;
}

const practiceSchedules = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
];

export function FilterSidebar({ selectedDays, onDaysChange }: FilterSidebarProps) {
    const handleDayToggle = (day: string) => {
        if (selectedDays.includes(day)) {
            onDaysChange(selectedDays.filter(d => d !== day));
        } else {
            onDaysChange([...selectedDays, day]);
        }
    };

    const handleReset = () => {
        onDaysChange([]);
    };

    return (
        <aside className="w-full lg:w-72 shrink-0 space-y-6">
            <div className="bg-white border border-subtle-light rounded-xl p-5 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-text-light">Filter Pencarian</h3>
                    <button
                        onClick={handleReset}
                        className="text-xs font-medium text-primary hover:text-primary-dark cursor-pointer"
                    >
                        Reset
                    </button>
                </div>

                {/* Filter: Jadwal Praktek */}
                <div className="mb-4">
                    <label className="flex items-center gap-2 mb-4 text-sm font-semibold text-text-light">
                        <span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
                        Jadwal Praktek
                    </label>
                    <div className="space-y-3">
                        {practiceSchedules.map((day) => (
                            <label key={day} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={selectedDays.includes(day)}
                                        onChange={() => handleDayToggle(day)}
                                        className="peer sr-only"
                                    />
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-primary peer-checked:bg-primary transition-all flex items-center justify-center">
                                        {selectedDays.includes(day) && (
                                            <span className="material-symbols-outlined text-white text-[16px]">check</span>
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-gray-600 group-hover:text-primary transition-colors">
                                    {day}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Selected Days Info */}
                {selectedDays.length > 0 && (
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-xs text-gray-500 mb-2">Filter aktif:</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedDays.map(day => (
                                <span
                                    key={day}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                                >
                                    {day}
                                    <button
                                        onClick={() => handleDayToggle(day)}
                                        className="hover:text-primary-dark cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[14px]">close</span>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
}
