interface VisionMissionCardProps {
    icon: string;
    title: string;
    description: string;
}

function VisionMissionCard({
    icon,
    title,
    description,
}: VisionMissionCardProps) {
    return (
        <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">
                    {icon}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-text-light">{title}</h3>
                <p className="text-base leading-relaxed text-gray-500">
                    {description}
                </p>
            </div>
        </div>
    );
}

export function VisionMission() {
    return (
        <section className="flex justify-center bg-background-light px-4 py-16 md:px-40">
            <div className="flex max-w-[960px] flex-1 flex-col">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold leading-tight text-text-light">
                        Visi & Misi
                    </h2>
                    <p className="mx-auto max-w-xl text-gray-500">
                        Nilai-nilai fundamental yang menjadi landasan pelayanan
                        kami setiap hari kepada setiap pasien.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
