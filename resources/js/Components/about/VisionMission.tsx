interface VisionMissionCardProps {
    icon: string;
    title: string;
    children: React.ReactNode;
}

function VisionMissionCard({ icon, title, children }: VisionMissionCardProps) {
    return (
        <div className="flex flex-col gap-5 rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-3xl">
                    {icon}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-text-light">{title}</h3>
                <div className="text-base leading-relaxed text-gray-500">
                    {children}
                </div>
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
                    {/* Visi */}
                    <VisionMissionCard icon="visibility" title="Visi Kami">
                        <p>
                            Menjadi klinik gigi terpercaya yang unggul dalam
                            pelayanan kesehatan gigi dan mulut dengan
                            mengedepankan profesionalitas tenaga medis,
                            pemanfaatan teknologi digital, serta pelayanan yang
                            aman, nyaman, dan berorientasi pada kepuasan pasien.
                        </p>
                    </VisionMissionCard>

                    {/* Misi */}
                    <VisionMissionCard
                        icon="medical_services"
                        title="Misi Kami"
                    >
                        <ol className="list-inside list-decimal space-y-2">
                            <li>
                                Menyelenggarakan pelayanan kesehatan gigi dan
                                mulut yang berkualitas, aman, dan berfokus pada
                                kebutuhan serta kenyamanan pasien.
                            </li>
                            <li>
                                Menerapkan sistem pelayanan berbasis digital
                                untuk meningkatkan efisiensi, akurasi, dan
                                kemudahan akses layanan bagi pasien.
                            </li>
                            <li>
                                Mengembangkan kompetensi dan profesionalitas
                                tenaga medis serta seluruh staf melalui
                                pelatihan berkelanjutan dan penerapan standar
                                pelayanan yang tinggi.
                            </li>
                            <li>
                                Menyediakan fasilitas dan peralatan kedokteran
                                gigi yang terstandar, higienis, dan sesuai
                                dengan perkembangan teknologi.
                            </li>
                            <li>
                                Membangun budaya pelayanan yang ramah, etis,
                                transparan, dan bertanggung jawab dalam setiap
                                proses pelayanan klinik.
                            </li>
                        </ol>
                    </VisionMissionCard>
                </div>
            </div>
        </section>
    );
}
