interface FeatureCardProps {
    icon: string;
    title: string;
    description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="flex flex-col gap-4 rounded-xl bg-background-light border border-transparent p-6 items-start">
            <div className="text-primary">
                <span className="material-symbols-outlined text-[40px]">{icon}</span>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-text-light text-lg font-bold">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

const features: FeatureCardProps[] = [
    {
        icon: "shield_with_heart",
        title: "Steril & Aman",
        description: "Kami menerapkan protokol sterilisasi internasional yang ketat untuk memastikan keamanan Anda setiap saat selama kunjungan."
    },
    {
        icon: "chat",
        title: "Booking via WhatsApp",
        description: "Lewati formulir yang rumit. Pesan jadwal Anda dalam hitungan detik langsung melalui WhatsApp."
    },
    {
        icon: "payments",
        title: "Harga Transparan",
        description: "Tanpa biaya tersembunyi atau kejutan. Kami memberikan estimasi biaya yang jelas sebelum perawatan dimulai."
    }
];

export function WhyChooseUs() {
    return (
        <section className="w-full bg-white py-16 px-4 md:px-10 flex justify-center border-t border-gray-200">
            <div className="max-w-[960px] w-full flex flex-col gap-10">
                <div className="flex flex-col gap-4 text-center items-center">
                    <h2 className="text-text-light text-3xl font-black leading-tight">Mengapa Memilih Klinik Kami</h2>
                    <p className="text-gray-500 text-base max-w-[600px]">
                        Kami menggabungkan teknologi canggih dengan pendekatan mengutamakan pasien untuk memastikan kunjungan Anda nyaman, aman, dan efektif.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
}
