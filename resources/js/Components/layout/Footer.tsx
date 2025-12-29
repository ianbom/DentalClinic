import Link from "next/link";

const navigationLinks = [
    { href: "/", label: "Beranda" },
    { href: "/doctors", label: "Dokter Kami" },
    { href: "/services", label: "Layanan" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/check-booking", label: "Cek Booking" },
];

const serviceLinks = [
    { href: "/services", label: "Cabut Gigi" },
    { href: "/services", label: "Tambal Gigi" },
    { href: "/services", label: "Scaling" },
    { href: "/services", label: "Kawat Gigi" },
    { href: "/services", label: "Pemutihan Gigi" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white pt-12 md:pt-16 pb-8 border-t border-subtle-light font-display">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
                    {/* Brand */}
                    <div className="col-span-2 sm:col-span-2 md:col-span-1 flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-3xl">dentistry</span>
                            <span className="text-xl font-bold text-text-light">DentalCare</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Klinik gigi terpercaya dengan standar pelayanan internasional dan teknologi modern.
                        </p>
                        {/* Social Media */}
                        <div className="flex gap-3 mt-2">
                            <Link
                                href="#"
                                className="size-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center text-gray-500 transition-colors"
                                aria-label="Facebook"
                            >
                                <span className="text-sm font-bold">FB</span>
                            </Link>
                            <Link
                                href="#"
                                className="size-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center text-gray-500 transition-colors"
                                aria-label="Instagram"
                            >
                                <span className="text-sm font-bold">IG</span>
                            </Link>
                            <Link
                                href="#"
                                className="size-10 rounded-full bg-gray-100 hover:bg-primary hover:text-white flex items-center justify-center text-gray-500 transition-colors"
                                aria-label="WhatsApp"
                            >
                                <span className="text-sm font-bold">WA</span>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-bold text-text-light mb-4 text-sm md:text-base">Navigasi</h4>
                        <ul className="flex flex-col gap-2 text-sm text-gray-500">
                            {navigationLinks.map((link) => (
                                <li key={link.href + link.label}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-text-light mb-4 text-sm md:text-base">Layanan</h4>
                        <ul className="flex flex-col gap-2 text-sm text-gray-500">
                            {serviceLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="hover:text-primary transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-span-2 sm:col-span-1">
                        <h4 className="font-bold text-text-light mb-4 text-sm md:text-base">Kontak</h4>
                        <ul className="flex flex-col gap-3 text-sm text-gray-500">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-lg shrink-0">location_on</span>
                                <span>Jl. Kesehatan No. 123,<br />Jakarta Selatan, Indonesia</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg shrink-0">call</span>
                                <span>+62 812 3456 7890</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg shrink-0">mail</span>
                                <span>info@dentalcare.id</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg shrink-0">schedule</span>
                                <span>Senin - Sabtu: 09:00 - 20:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-subtle-light pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400 text-center sm:text-left">
                        © {currentYear} DentalCare Clinic. All rights reserved.
                    </p>
                    <div className="flex gap-4 text-sm text-gray-400">
                        <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
