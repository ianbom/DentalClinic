interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="flex flex-col items-start gap-4 rounded-xl border border-transparent bg-background-light p-6">
            <div className="text-primary">
                <span className="material-symbols-outlined text-[40px]">
                    {icon}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-text-light">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
}

const features: FeatureCardProps[] = [
    {
        icon: 'shield_with_heart',
        title: 'Steril & Aman',
        description:
            'Kami menerapkan protokol sterilisasi internasional yang ketat untuk memastikan keamanan Anda setiap saat selama kunjungan.',
    },
    {
        icon: 'chat',
        title: 'Booking via WhatsApp',
        description:
            'Lewati formulir yang rumit. Pesan jadwal Anda dalam hitungan detik langsung melalui WhatsApp.',
    },
    {
        icon: 'payments',
        title: 'Harga Transparan',
        description:
            'Tanpa biaya tersembunyi atau kejutan. Kami memberikan estimasi biaya yang jelas sebelum perawatan dimulai.',
    },
];

export function WhyChooseUs() {
    return (
        <section className="flex w-full justify-center border-t border-gray-200 bg-white px-4 py-16 md:px-10">
            <div className="flex w-full max-w-[960px] flex-col gap-10">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-3xl font-black leading-tight text-text-light">
                        Mengapa Memilih Klinik Kami
                    </h2>
                    <p className="max-w-[600px] text-base text-gray-500">
                        Kami menggabungkan teknologi canggih dengan pendekatan
                        mengutamakan pasien untuk memastikan kunjungan Anda
                        nyaman, aman, dan efektif.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
