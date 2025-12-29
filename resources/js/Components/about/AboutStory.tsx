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
                        Didirikan pada tahun 2010, klinik kami berawal dari visi
                        sederhana: menghadirkan perawatan gigi yang nyaman dan
                        terjangkau bagi semua orang di tengah hiruk pikuk kota.
                        Kami percaya bahwa kunjungan ke dokter gigi tidak
                        seharusnya menakutkan.
                    </p>
                    <p className="text-base font-normal leading-relaxed text-text-light/80">
                        Kini, kami telah berkembang menjadi pusat kesehatan gigi
                        terpercaya di wilayah ini, melayani ribuan pasien dengan
                        teknologi sterilisasi modern dan pendekatan yang ramah
                        keluarga. Setiap sudut klinik kami dirancang untuk
                        memberikan ketenangan, dari ruang tunggu hingga ruang
                        perawatan.
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
