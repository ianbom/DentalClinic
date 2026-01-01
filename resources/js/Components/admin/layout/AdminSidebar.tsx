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
    {
        href: '/admin/doctors/schedule/1',
        label: 'Kalender Dokter',
        icon: 'calendar_month',
    },
    {
        href: '/admin/checkin/patiens',
        label: 'Cek In Pasien',
        icon: 'lock',
    },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const { url } = usePage();
    const pathname = url;

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* Logo & Close Button */}
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 lg:px-6">
                <img
                    src="/img/logo-navbar.png"
                    alt="Logo"
                    className="h-10 w-auto"
                />
                <button
                    onClick={onClose}
                    className="flex size-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-2 p-4">
                {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
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
                    onClick={onClose}
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
