"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/doctors", label: "Dokter" },
    { href: "/services", label: "Layanan" },
    { href: "/about", label: "Tentang" },
    { href: "/check-booking", label: "Cek Booking" },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-subtle-light bg-background-light/95 backdrop-blur-sm font-display">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-2xl">dentistry</span>
                        </div>
                        <h2 className="text-lg font-bold tracking-tight text-text-light">
                            DentalCare
                        </h2>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${isActive(link.href)
                                        ? "text-primary font-semibold"
                                        : "text-gray-600 hover:text-primary"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/doctors"
                            className="flex items-center justify-center h-10 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors shadow-sm cursor-pointer"
                        >
                            Booking Sekarang
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-text-light cursor-pointer rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            {isMobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                <div className="border-t border-subtle-light bg-white px-4 py-4 shadow-lg">
                    <nav className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`py-3 px-4 rounded-lg text-sm font-medium transition-colors ${isActive(link.href)
                                        ? "text-primary bg-primary/10 font-semibold"
                                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="pt-3 mt-2 border-t border-gray-100">
                            <Link
                                href="/doctors"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-center h-12 px-6 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-bold transition-colors shadow-sm w-full cursor-pointer"
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
