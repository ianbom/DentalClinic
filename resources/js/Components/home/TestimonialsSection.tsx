'use client';

import { useState } from 'react';

const testimonials = [
    {
        id: 1,
        name: 'Sari Wulandari',
        role: 'Ibu Rumah Tangga',
        content:
            'Booking online sangat mudah! Tidak perlu antri lama. Dokternya ramah dan profesional. Anak saya yang tadinya takut ke dokter gigi jadi berani.',
        rating: 5,
        avatar: 'SW',
    },
    {
        id: 2,
        name: 'Budi Hartono',
        role: 'Karyawan Swasta',
        content:
            'Pelayanan sangat memuaskan. Proses scaling cepat dan tidak sakit. Kliniknya juga bersih dan modern. Recommended!',
        rating: 5,
        avatar: 'BH',
    },
    {
        id: 3,
        name: 'Dewi Kusuma',
        role: 'Mahasiswa',
        content:
            'Harga terjangkau dengan kualitas premium. Saya pasang behel di sini dan hasilnya bagus. Dokternya juga telaten menjelaskan.',
        rating: 5,
        avatar: 'DK',
    },
    {
        id: 4,
        name: 'Ahmad Fauzi',
        role: 'Pengusaha',
        content:
            'Sudah 3 tahun jadi pelanggan tetap. Dari scaling rutin sampai veneer semua di sini. Puas banget sama hasilnya!',
        rating: 5,
        avatar: 'AF',
    },
];

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setActiveIndex(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length,
        );
    };

    return (
        <section className="bg-surface overflow-hidden py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center lg:mb-16">
                    <span className="bg-warning/10 text-warning mb-4 inline-block rounded-full px-4 py-2 text-sm font-medium">
                        Testimoni
                    </span>
                    <h2 className="text-text-primary mb-4 text-3xl font-bold lg:text-4xl">
                        Apa Kata Mereka?
                    </h2>
                    <p className="text-text-secondary mx-auto max-w-2xl">
                        Dengarkan pengalaman pasien yang telah merasakan layanan
                        kami.
                    </p>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative mx-auto max-w-4xl">
                    {/* Cards Container */}
                    <div className="relative h-[300px] md:h-[250px]">
                        {testimonials.map((testimonial, index) => {
                            const isActive = index === activeIndex;
                            const isPrev =
                                index ===
                                (activeIndex - 1 + testimonials.length) %
                                    testimonials.length;
                            const isNext =
                                index ===
                                (activeIndex + 1) % testimonials.length;

                            let transform =
                                'translateX(100%) scale(0.8) opacity-0';
                            let zIndex = 0;

                            if (isActive) {
                                transform = 'translateX(0) scale(1)';
                                zIndex = 30;
                            } else if (isPrev) {
                                transform = 'translateX(-30%) scale(0.85)';
                                zIndex = 20;
                            } else if (isNext) {
                                transform = 'translateX(30%) scale(0.85)';
                                zIndex = 20;
                            }

                            return (
                                <div
                                    key={testimonial.id}
                                    className={`absolute inset-0 transition-all duration-500 ${
                                        isActive ? 'opacity-100' : 'opacity-50'
                                    }`}
                                    style={{
                                        transform,
                                        zIndex,
                                    }}
                                >
                                    <div className="bg-surface border-border flex h-full flex-col rounded-2xl border p-6 shadow-lg md:p-8">
                                        {/* Rating */}
                                        <div className="mb-4 flex gap-1">
                                            {[...Array(testimonial.rating)].map(
                                                (_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="text-warning h-5 w-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ),
                                            )}
                                        </div>

                                        {/* Content */}
                                        <p className="text-text-secondary flex-grow text-sm md:text-base">
                                            &ldquo;{testimonial.content}&rdquo;
                                        </p>

                                        {/* Author */}
                                        <div className="border-border mt-4 flex items-center gap-3 border-t pt-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary font-semibold text-white">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <p className="text-text-primary font-semibold">
                                                    {testimonial.name}
                                                </p>
                                                <p className="text-text-muted text-sm">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex items-center justify-center gap-4">
                        <button
                            onClick={prevSlide}
                            className="bg-primary-50 flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-white"
                            aria-label="Previous testimonial"
                        >
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
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`h-2 w-2 rounded-full transition-all ${
                                        index === activeIndex
                                            ? 'w-8 bg-primary'
                                            : 'bg-border hover:bg-primary/50'
                                    }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="bg-primary-50 flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary hover:text-white"
                            aria-label="Next testimonial"
                        >
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
