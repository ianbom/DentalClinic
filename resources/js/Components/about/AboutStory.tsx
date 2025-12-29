export function AboutStory() {
    return (
        <section className="px-4 py-16 md:px-40 flex justify-center bg-white">
            <div className="flex flex-col md:flex-row gap-12 max-w-[1024px] items-center">
                <div className="flex-1 flex flex-col gap-4">
                    <span className="text-primary font-bold text-sm tracking-wider uppercase">Cerita Kami</span>
                    <h2 className="text-text-light text-3xl font-bold leading-tight tracking-tight">
                        Perjalanan Menuju Senyum Indonesia yang Lebih Sehat
                    </h2>
                    <p className="text-text-light/80 text-base font-normal leading-relaxed mt-2">
                        Didirikan pada tahun 2010, klinik kami berawal dari visi sederhana: menghadirkan perawatan gigi yang nyaman dan terjangkau bagi semua orang di tengah hiruk pikuk kota. Kami percaya bahwa kunjungan ke dokter gigi tidak seharusnya menakutkan.
                    </p>
                    <p className="text-text-light/80 text-base font-normal leading-relaxed">
                        Kini, kami telah berkembang menjadi pusat kesehatan gigi terpercaya di wilayah ini, melayani ribuan pasien dengan teknologi sterilisasi modern dan pendekatan yang ramah keluarga. Setiap sudut klinik kami dirancang untuk memberikan ketenangan, dari ruang tunggu hingga ruang perawatan.
                    </p>
                </div>
                <div className="flex-1 w-full">
                    <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/3]">
                        <img
                            alt="Doctor consulting with a patient in a modern dental office"
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSJ96vgOT4d5tvK4eM7t8twkTB0ebvtNtA_jqL3yy3y9IMEHRvnZ9NZWxRxwI8gWRNs7n3Tw3l32gI2O9aUHB3_iFFXO8fO21Ku11RgXZ0AIVVRAQDZbqqibspxIjqJJBWWqYFgYd018FwhykuWApgW3rtfMJBdwuOTukQiNYkwUNVyg_mhF1m3jXac8sr7ozqvjmk844opjKO5VPxdbEFi01e73DrK-3TU7zEEu-Ca4VDw7zXmwD_-qfqAx-mzK5HlB9Y87JrXCXZ"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
