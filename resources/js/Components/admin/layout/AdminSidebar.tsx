'use client';

import { Link, usePage } from '@inertiajs/react';

const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: 'dashboard' },
    {
        href: '/admin/bookings',
        label: 'Manajemen Booking',
        icon: 'calendar_month',
    },
    { href: '/admin/doctors', label: 'Dokter', icon: 'stethoscope' },
    { href: '/admin/patients', label: 'Pasien', icon: 'group' },
];

export function AdminSidebar() {
    const { url } = usePage();
    const pathname = url;

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300">
            {/* Logo */}
            <div className="flex h-16 items-center border-b border-slate-200 px-6">
                <img
                    src="/img/logo-navbar.png"
                    alt="Logo"
                    className="h-10 w-auto"
                />
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-2 p-4">
                {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`group flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                                active
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                            }`}
                        >
                            <span
                                className={`material-symbols-outlined ${
                                    active
                                        ? 'fill'
                                        : 'text-slate-400 transition-colors group-hover:text-primary'
                                }`}
                            >
                                {link.icon}
                            </span>
                            <span
                                className={`text-sm ${
                                    active ? 'font-bold' : 'font-medium'
                                }`}
                            >
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Sidebar Footer */}
            <div className="border-t border-slate-200 p-4">
                <Link
                    href="/admin/settings"
                    className="flex items-center gap-3 rounded-lg px-4 py-2 text-slate-500 transition-colors hover:bg-slate-50 hover:text-primary"
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
