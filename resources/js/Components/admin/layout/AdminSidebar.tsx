"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/admin", label: "Dashboard", icon: "dashboard" },
    { href: "/admin/bookings", label: "Manajemen Booking", icon: "calendar_month" },
    { href: "/admin/doctors", label: "Dokter", icon: "stethoscope" },
    { href: "/admin/patients", label: "Pasien", icon: "group" },
    { href: "/admin/settings", label: "Pengaturan", icon: "settings" },
];

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/admin") return pathname === "/admin";
        return pathname.startsWith(href);
    };

    return (
        <aside className="w-64 bg-white flex flex-col shrink-0 transition-all duration-300 border-r border-slate-200">
            {/* Logo */}
            <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-2xl">
                        dentistry
                    </span>
                </div>
                <h1 className="text-slate-900 text-lg font-bold tracking-tight">
                    DentalClinic
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-2 flex-1 p-4">
                {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${active
                                ? "bg-primary/10 text-primary"
                                : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                                }`}
                        >
                            <span
                                className={`material-symbols-outlined ${active
                                    ? "fill"
                                    : "text-slate-400 group-hover:text-primary transition-colors"
                                    }`}
                            >
                                {link.icon}
                            </span>
                            <span
                                className={`text-sm ${active ? "font-bold" : "font-medium"
                                    }`}
                            >
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-200">
                <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-primary transition-colors"
                >
                    <span className="material-symbols-outlined text-xl">
                        settings
                    </span>
                    <span className="text-sm font-medium">Settings</span>
                </Link>
            </div>
        </aside>
    );
}
