export function AboutStory() {
    return (
        <section className="flex justify-center bg-white px-4 py-16 md:px-40">
            <div className="flex max-w-[1024px] flex-col items-center gap-12 md:flex-row">
                <div className="flex flex-1 flex-col gap-4">
                    <span className="text-sm font-bold uppercase tracking-wider text-primary">
                        Cerita Kami
                    </span>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight text-text-light">
                        Perjalanan Menuju Senyum Indonesia yang Lebih Sehat
                    </h2>
                    <p className="mt-2 text-base font-normal leading-relaxed text-text-light/80">
                        Cantika Dental Care merupakan fasilitas pelayanan
                        kesehatan gigi dan mulut yang mengedepankan pelayanan
                        prima, pemanfaatan teknologi digital, serta
                        profesionalitas dalam setiap aspek layanan. Didirikan
                        sejak tahun 2013 oleh drg. Anna Fikril Indayati, lulusan
                        Fakultas Kedokteran Gigi Universitas Jember, klinik ini
                        berkomitmen memberikan pelayanan yang aman, berkualitas,
                        dan berorientasi pada kenyamanan serta kepuasan pasien.
                    </p>
                    <p className="text-base font-normal leading-relaxed text-text-light/80">
                        Dengan didukung oleh tenaga medis yang kompeten, sistem
                        pelayanan berbasis digital, serta fasilitas dan
                        peralatan yang terstandar, Cantika Dental Care hadir
                        sebagai mitra terpercaya masyarakat dalam menjaga dan
                        meningkatkan kesehatan gigi dan mulut secara
                        berkelanjutan.
                    </p>
                </div>
                <div className="w-full flex-1">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
                        <img
                            alt="Doctor consulting with a patient in a modern dental office"
                            className="h-full w-full transform object-cover transition-transform duration-500 hover:scale-105"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSJ96vgOT4d5tvK4eM7t8twkTB0ebvtNtA_jqL3yy3y9IMEHRvnZ9NZWxRxwI8gWRNs7n3Tw3l32gI2O9aUHB3_iFFXO8fO21Ku11RgXZ0AIVVRAQDZbqqibspxIjqJJBWWqYFgYd018FwhykuWApgW3rtfMJBdwuOTukQiNYkwUNVyg_mhF1m3jXac8sr7ozqvjmk844opjKO5VPxdbEFi01e73DrK-3TU7zEEu-Ca4VDw7zXmwD_-qfqAx-mzK5HlB9Y87JrXCXZ"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
