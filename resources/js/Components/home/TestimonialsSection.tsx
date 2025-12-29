'use client';

import { useState } from 'react';

const testimonials = [
    {
        id: 1,
        name: 'Sari Wulandari',
        role: 'Ibu Rumah Tangga',
        content: 'Booking online sangat mudah! Tidak perlu antri lama. Dokternya ramah dan profesional. Anak saya yang tadinya takut ke dokter gigi jadi berani.',
        rating: 5,
        avatar: 'SW',
    },
    {
        id: 2,
        name: 'Budi Hartono',
        role: 'Karyawan Swasta',
        content: 'Pelayanan sangat memuaskan. Proses scaling cepat dan tidak sakit. Kliniknya juga bersih dan modern. Recommended!',
        rating: 5,
        avatar: 'BH',
    },
    {
        id: 3,
        name: 'Dewi Kusuma',
        role: 'Mahasiswa',
        content: 'Harga terjangkau dengan kualitas premium. Saya pasang behel di sini dan hasilnya bagus. Dokternya juga telaten menjelaskan.',
        rating: 5,
        avatar: 'DK',
    },
    {
        id: 4,
        name: 'Ahmad Fauzi',
        role: 'Pengusaha',
        content: 'Sudah 3 tahun jadi pelanggan tetap. Dari scaling rutin sampai veneer semua di sini. Puas banget sama hasilnya!',
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
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-16 lg:py-24 bg-surface overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-2 bg-warning/10 text-warning rounded-full text-sm font-medium mb-4">
                        Testimoni
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                        Apa Kata Mereka?
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Dengarkan pengalaman pasien yang telah merasakan layanan kami.
                    </p>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Cards Container */}
                    <div className="relative h-[300px] md:h-[250px]">
                        {testimonials.map((testimonial, index) => {
                            const isActive = index === activeIndex;
                            const isPrev = index === (activeIndex - 1 + testimonials.length) % testimonials.length;
                            const isNext = index === (activeIndex + 1) % testimonials.length;

                            let transform = 'translateX(100%) scale(0.8) opacity-0';
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
                                    className={`absolute inset-0 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-50'
                                        }`}
                                    style={{
                                        transform,
                                        zIndex,
                                    }}
                                >
                                    <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-lg h-full flex flex-col">
                                        {/* Rating */}
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <svg key={i} className="w-5 h-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>

                                        {/* Content */}
                                        <p className="text-text-secondary flex-grow text-sm md:text-base">
                                            &ldquo;{testimonial.content}&rdquo;
                                        </p>

                                        {/* Author */}
                                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-text-primary">{testimonial.name}</p>
                                                <p className="text-sm text-text-muted">{testimonial.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="w-10 h-10 bg-primary-50 hover:bg-primary hover:text-white rounded-full flex items-center justify-center text-primary transition-colors"
                            aria-label="Previous testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Dots */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${index === activeIndex
                                            ? 'w-8 bg-primary'
                                            : 'bg-border hover:bg-primary/50'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextSlide}
                            className="w-10 h-10 bg-primary-50 hover:bg-primary hover:text-white rounded-full flex items-center justify-center text-primary transition-colors"
                            aria-label="Next testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
