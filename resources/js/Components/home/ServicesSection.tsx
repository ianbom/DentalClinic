import Link from 'next/link';
import Card from '../ui/Card';

const services = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        title: 'Pembersihan Gigi',
        description: 'Scaling dan polishing untuk gigi bersih dan sehat',
        price: 'Mulai Rp 150.000',
        color: 'bg-blue-50 text-blue-600',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        title: 'Tambal Gigi',
        description: 'Penambalan dengan bahan berkualitas tinggi',
        price: 'Mulai Rp 200.000',
        color: 'bg-pink-50 text-pink-600',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        ),
        title: 'Cabut Gigi',
        description: 'Pencabutan aman dengan anestesi modern',
        price: 'Mulai Rp 250.000',
        color: 'bg-red-50 text-red-600',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
        title: 'Veneer',
        description: 'Senyum sempurna dengan veneer premium',
        price: 'Mulai Rp 1.500.000',
        color: 'bg-purple-50 text-purple-600',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Orthodonti',
        description: 'Pemasangan kawat gigi & clear aligner',
        price: 'Mulai Rp 5.000.000',
        color: 'bg-teal-50 text-teal-600',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        title: 'Bleaching',
        description: 'Pemutihan gigi aman dan tahan lama',
        price: 'Mulai Rp 800.000',
        color: 'bg-yellow-50 text-yellow-600',
    },
];

export default function ServicesSection() {
    return (
        <section className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
                        Layanan Kami
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                        Perawatan Gigi Lengkap
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Kami menyediakan berbagai layanan perawatan gigi dengan teknologi modern dan dokter berpengalaman.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service) => (
                        <Card key={service.title} interactive className="group">
                            <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-text-primary mb-2">
                                {service.title}
                            </h3>
                            <p className="text-text-secondary text-sm mb-4">
                                {service.description}
                            </p>
                            <p className="text-primary font-semibold">
                                {service.price}
                            </p>
                        </Card>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                    <Link
                        href="/layanan"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                        Lihat Semua Layanan
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
