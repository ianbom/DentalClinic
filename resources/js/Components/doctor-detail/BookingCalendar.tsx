"use client";

import Link from "next/link";
import { useState } from "react";
import { Doctor } from "@/lib/doctors";

interface BookingCalendarProps {
    doctor?: Doctor;
    doctorId: string;
}

export function BookingCalendar({ doctor, doctorId }: BookingCalendarProps) {
    const [activeTab, setActiveTab] = useState<"profil" | "jadwal">("profil");

    return (
        <>
            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-subtle-light mb-6 sticky top-[65px] z-40">
                <div className="flex overflow-x-auto hide-scrollbar border-b border-subtle-light px-2">
                    <button
                        onClick={() => setActiveTab("profil")}
                        className={`flex-1 min-w-[100px] text-center py-4 text-sm font-medium transition-colors border-b-2 cursor-pointer ${activeTab === "profil"
                                ? "text-primary font-bold border-primary"
                                : "text-gray-500 hover:text-primary border-transparent"
                            }`}
                    >
                        Profil
                    </button>
                    <button
                        onClick={() => setActiveTab("jadwal")}
                        className={`flex-1 min-w-[100px] text-center py-4 text-sm font-medium transition-colors border-b-2 cursor-pointer ${activeTab === "jadwal"
                                ? "text-primary font-bold border-primary"
                                : "text-gray-500 hover:text-primary border-transparent"
                            }`}
                    >
                        Jadwal Praktek
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === "profil" && (
                <section className="bg-white rounded-xl shadow-sm border border-subtle-light p-6 mb-6">
                    <h3 className="text-lg font-bold text-text-light mb-4">Tentang Dokter</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        {doctor?.profile || "Informasi profil dokter belum tersedia."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pendidikan */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">school</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Pendidikan</p>
                                <p className="font-medium text-text-light">{doctor?.education || "-"}</p>
                            </div>
                        </div>

                        {/* Pengalaman */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">work_history</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Pengalaman</p>
                                <p className="font-medium text-text-light">{doctor?.experience || "-"}</p>
                            </div>
                        </div>

                        {/* Lokasi */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Lokasi Praktek</p>
                                <p className="font-medium text-text-light">{doctor?.location || "-"}</p>
                            </div>
                        </div>

                        {/* Spesialisasi */}
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">medical_services</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Spesialisasi</p>
                                <p className="font-medium text-text-light">{doctor?.specialty || "-"}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {activeTab === "jadwal" && (
                <section className="bg-white rounded-xl shadow-sm border border-subtle-light p-6 mb-6">
                    <h3 className="text-lg font-bold text-text-light mb-4">Jadwal Praktek</h3>

                    <div className="space-y-4">
                        {/* Hari Praktek */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">calendar_month</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Hari Praktek</p>
                                <p className="font-bold text-text-light text-lg">{doctor?.days || "-"}</p>
                            </div>
                        </div>

                        {/* Jam Praktek */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">schedule</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Jam Praktek</p>
                                <p className="font-bold text-text-light text-lg">{doctor?.practiceHours || "-"}</p>
                            </div>
                        </div>

                        {/* Lokasi */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">location_on</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Lokasi Praktek</p>
                                <p className="font-bold text-text-light text-lg">{doctor?.location || "-"}</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <Link
                            href={`/doctors/${doctorId}/booking`}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-lg transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            <span>Booking Sekarang</span>
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </div>
                </section>
            )}
        </>
    );
}
