'use client';

import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/doctors', label: 'Dokter' },
    { href: '/services', label: 'Layanan' },
    { href: '/about', label: 'Tentang' },
    { href: '/check-booking', label: 'Cek Booking' },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url } = usePage();
    const pathname = url;

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-subtle-light bg-background-light/95 font-display backdrop-blur-sm">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            src="/img/logo-navbar.png"
                            alt="Logo Klinik"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-6 md:flex lg:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${
                                    isActive(link.href)
                                        ? 'font-semibold text-primary'
                                        : 'text-gray-600 hover:text-primary'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA Button */}
                    <div className="hidden items-center gap-4 md:flex">
                        <Link
                            href="/doctors"
                            className="flex h-10 cursor-pointer items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark"
                        >
                            Booking Sekarang
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="cursor-pointer rounded-lg p-2 text-text-light transition-colors hover:bg-gray-100 md:hidden"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
                    isMobileMenuOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                }`}
            >
                <div className="border-t border-subtle-light bg-white px-4 py-4 shadow-lg">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive(link.href)
                                        ? 'bg-primary/10 font-semibold text-primary'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-2 border-t border-gray-100 pt-3">
                            <Link
                                href="/doctors"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark"
                            >
                                Booking Sekarang
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
