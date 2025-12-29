interface VisionMissionCardProps {
    icon: string;
    title: string;
    description: string;
}

function VisionMissionCard({ icon, title, description }: VisionMissionCardProps) {
    return (
        <div className="flex gap-5 rounded-xl border border-gray-200 bg-white p-8 flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">{icon}</span>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-text-light text-xl font-bold">{title}</h3>
                <p className="text-gray-500 text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}

export function VisionMission() {
    return (
        <section className="px-4 py-16 md:px-40 flex justify-center bg-background-light">
            <div className="flex flex-col max-w-[960px] flex-1">
                <div className="text-center mb-12">
                    <h2 className="text-text-light text-3xl font-bold leading-tight mb-4">Visi & Misi</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">
                        Nilai-nilai fundamental yang menjadi landasan pelayanan kami setiap hari kepada setiap pasien.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <VisionMissionCard
                        icon="medical_services"
                        title="Misi Kami"
                        description="Menyediakan perawatan gigi berkualitas tinggi dengan harga yang transparan dan terjangkau, serta mengedukasi masyarakat tentang pentingnya kesehatan mulut."
                    />
                    <VisionMissionCard
                        icon="visibility"
                        title="Visi Kami"
                        description="Menjadi klinik gigi paling terpercaya dan menjadi pilihan utama keluarga di wilayah ini melalui inovasi teknologi dan pelayanan yang humanis."
                    />
                </div>
            </div>
        </section>
    );
}
