import { Link } from '@inertiajs/react';
import Button from '../ui/Button';

export default function HeroSection() {
    return (
        <section className="gradient-hero relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <svg
                    className="absolute right-0 top-0 h-full w-1/2"
                    viewBox="0 0 400 800"
                    fill="none"
                >
                    <circle
                        cx="400"
                        cy="400"
                        r="300"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-primary/20"
                    />
                    <circle
                        cx="400"
                        cy="400"
                        r="200"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-primary/20"
                    />
                    <circle
                        cx="400"
                        cy="400"
                        r="100"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-primary/20"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Content */}
                    <div className="animate-slide-up">
                        <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                            <svg
                                className="h-4 w-4"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            #1 Klinik Gigi Terpercaya
                        </span>

                        <h1 className="text-text-primary mb-6 text-4xl font-bold leading-tight lg:text-5xl xl:text-6xl">
                            Senyum Sehat,{' '}
                            <span className="text-primary">Hidup Bahagia</span>
                        </h1>

                        <p className="text-text-secondary mb-8 max-w-xl text-lg lg:text-xl">
                            Booking jadwal dokter gigi dalam hitungan menit.
                            Layanan profesional dengan teknologi modern untuk
                            perawatan gigi terbaik Anda.
                        </p>

                        <div className="mb-10 flex flex-col gap-4 sm:flex-row">
                            <Link href="/dokter">
                                <Button
                                    size="lg"
                                    rightIcon={
                                        <svg
                                            className="h-5 w-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </svg>
                                    }
                                >
                                    Booking Sekarang
                                </Button>
                            </Link>
                            <Link href="/layanan">
                                <Button variant="outline" size="lg">
                                    Lihat Layanan
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <div className="bg-success-light flex h-12 w-12 items-center justify-center rounded-full">
                                    <svg
                                        className="text-success h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-text-primary font-bold">
                                        500+
                                    </p>
                                    <p className="text-text-muted text-sm">
                                        Pasien Puas
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-info-light flex h-12 w-12 items-center justify-center rounded-full">
                                    <svg
                                        className="text-info h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-text-primary font-bold">
                                        10+
                                    </p>
                                    <p className="text-text-muted text-sm">
                                        Dokter Spesialis
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="bg-warning-light flex h-12 w-12 items-center justify-center rounded-full">
                                    <svg
                                        className="text-warning h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-text-primary font-bold">
                                        4.9/5
                                    </p>
                                    <p className="text-text-muted text-sm">
                                        Rating
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="animate-fade-in relative">
                        <div className="relative mx-auto aspect-square w-full max-w-lg">
                            {/* Placeholder for doctor image */}
                            <div className="to-secondary absolute inset-0 rotate-3 transform rounded-3xl bg-gradient-to-br from-primary"></div>
                            <div className="bg-surface absolute inset-4 flex items-center justify-center rounded-2xl shadow-xl">
                                <div className="p-8 text-center">
                                    <div className="bg-primary-50 mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full">
                                        <svg
                                            className="h-16 w-16 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-text-secondary">
                                        Gambar Dokter Gigi
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="bg-surface border-border animate-slide-up absolute -bottom-4 -left-4 rounded-xl border p-4 shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="bg-success-light flex h-10 w-10 items-center justify-center rounded-full">
                                    <svg
                                        className="text-success h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-text-primary text-sm font-semibold">
                                        Klinik Steril
                                    </p>
                                    <p className="text-text-muted text-xs">
                                        Standar Internasional
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
