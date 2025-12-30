import { Link } from '@inertiajs/react';

const navigationLinks = [
    { href: '/', label: 'Beranda' },
    { href: '/doctors', label: 'Dokter Kami' },
    { href: '/services', label: 'Layanan' },
    { href: '/about', label: 'Tentang Kami' },
    { href: '/check-booking', label: 'Cek Booking' },
];

const serviceLinks = [
    { href: '/services', label: 'Cabut Gigi' },
    { href: '/services', label: 'Tambal Gigi' },
    { href: '/services', label: 'Scaling' },
    { href: '/services', label: 'Kawat Gigi' },
    { href: '/services', label: 'Pemutihan Gigi' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-subtle-light bg-white pb-8 pt-12 font-display md:pt-16">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="mb-8 grid grid-cols-2 gap-8 sm:grid-cols-2 md:mb-12 md:grid-cols-4 md:gap-12">
                    {/* Brand */}
                    <div className="col-span-2 flex flex-col gap-4 sm:col-span-2 md:col-span-1">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-primary"
                        >
                            <img
                                src="/img/logo-navbar.png"
                                alt="Logo Klinik"
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-500">
                            Klinik gigi terpercaya dengan standar pelayanan
                            internasional dan teknologi modern.
                        </p>
                        {/* Social Media */}
                        <div className="mt-2 flex gap-3">
                            <Link
                                href="#"
                                className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary hover:text-white"
                                aria-label="Facebook"
                            >
                                <span className="text-sm font-bold">FB</span>
                            </Link>
                            <Link
                                href="#"
                                className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary hover:text-white"
                                aria-label="Instagram"
                            >
                                <span className="text-sm font-bold">IG</span>
                            </Link>
                            <Link
                                href="#"
                                className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-primary hover:text-white"
                                aria-label="WhatsApp"
                            >
                                <span className="text-sm font-bold">WA</span>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="mb-4 text-sm font-bold text-text-light md:text-base">
                            Navigasi
                        </h4>
                        <ul className="flex flex-col gap-2 text-sm text-gray-500">
                            {navigationLinks.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link
                                        href={link.href}
                                        className="transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="mb-4 text-sm font-bold text-text-light md:text-base">
                            Layanan
                        </h4>
                        <ul className="flex flex-col gap-2 text-sm text-gray-500">
                            {serviceLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 sm:col-span-1">
                        <h4 className="mb-4 text-sm font-bold text-text-light md:text-base">
                            Kontak
                        </h4>
                        <ul className="flex flex-col gap-3 text-sm text-gray-500">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined shrink-0 text-lg text-primary">
                                    location_on
                                </span>
                                <span>
                                    Jl. Kesehatan No. 123,
                                    <br />
                                    Jakarta Selatan, Indonesia
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined shrink-0 text-lg text-primary">
                                    call
                                </span>
                                <span>+62 812 3456 7890</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined shrink-0 text-lg text-primary">
                                    mail
                                </span>
                                <span>info@dentalcare.id</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined shrink-0 text-lg text-primary">
                                    schedule
                                </span>
                                <span>Senin - Sabtu: 09:00 - 20:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col items-center justify-between gap-4 border-t border-subtle-light pt-6 sm:flex-row md:pt-8">
                    <p className="text-center text-sm text-gray-400 sm:text-left">
                        © {currentYear} DentalCare Clinic. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-gray-400">
                        <Link
                            href="#"
                            className="transition-colors hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-primary"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
