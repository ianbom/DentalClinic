import Link from 'next/link';
import Button from '../ui/Button';

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden gradient-hero">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <svg className="absolute right-0 top-0 h-full w-1/2" viewBox="0 0 400 800" fill="none">
                    <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
                    <circle cx="400" cy="400" r="200" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
                    <circle cx="400" cy="400" r="100" stroke="currentColor" strokeWidth="1" className="text-primary/20" />
                </svg>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <div className="animate-slide-up">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            #1 Klinik Gigi Terpercaya
                        </span>

                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-text-primary mb-6 leading-tight">
                            Senyum Sehat,{' '}
                            <span className="text-primary">Hidup Bahagia</span>
                        </h1>

                        <p className="text-lg lg:text-xl text-text-secondary mb-8 max-w-xl">
                            Booking jadwal dokter gigi dalam hitungan menit. Layanan profesional dengan teknologi modern untuk perawatan gigi terbaik Anda.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Link href="/dokter">
                                <Button size="lg" rightIcon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                }>
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
                                <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary">500+</p>
                                    <p className="text-sm text-text-muted">Pasien Puas</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 bg-info-light rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-info" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary">10+</p>
                                    <p className="text-sm text-text-muted">Dokter Spesialis</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-12 h-12 bg-warning-light rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-warning" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-bold text-text-primary">4.9/5</p>
                                    <p className="text-sm text-text-muted">Rating</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative animate-fade-in">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            {/* Placeholder for doctor image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl transform rotate-3"></div>
                            <div className="absolute inset-4 bg-surface rounded-2xl shadow-xl flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-32 h-32 mx-auto mb-4 bg-primary-50 rounded-full flex items-center justify-center">
                                        <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-text-secondary">Gambar Dokter Gigi</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Card */}
                        <div className="absolute -bottom-4 -left-4 bg-surface p-4 rounded-xl shadow-lg border border-border animate-slide-up">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-success-light rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-semibold text-text-primary text-sm">Klinik Steril</p>
                                    <p className="text-xs text-text-muted">Standar Internasional</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
