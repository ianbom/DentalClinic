const steps = [
    {
        step: 1,
        icon: (
            <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        ),
        title: 'Pilih Dokter',
        description:
            'Cari dan pilih dokter gigi sesuai kebutuhan Anda dari daftar dokter kami yang berpengalaman.',
    },
    {
        step: 2,
        icon: (
            <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
        title: 'Pilih Jadwal',
        description:
            'Lihat ketersediaan jadwal dan pilih tanggal serta jam yang sesuai dengan waktu Anda.',
    },
    {
        step: 3,
        icon: (
            <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
            </svg>
        ),
        title: 'Isi Data',
        description:
            'Lengkapi data diri dan keluhan Anda untuk persiapan konsultasi dengan dokter.',
    },
    {
        step: 4,
        icon: (
            <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
        title: 'Booking Selesai',
        description:
            'Dapatkan kode booking dan konfirmasi via WhatsApp. Bayar langsung di klinik saat datang.',
    },
];

export default function HowItWorksSection() {
    return (
        <section className="bg-surface py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center lg:mb-16">
                    <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        Cara Booking
                    </span>
                    <h2 className="text-text-primary mb-4 text-3xl font-bold lg:text-4xl">
                        Mudah & Cepat dalam 4 Langkah
                    </h2>
                    <p className="text-text-secondary mx-auto max-w-2xl">
                        Booking jadwal dokter gigi semudah memesan makanan
                        online. Tidak perlu registrasi atau login.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line - Desktop */}
                    <div className="via-secondary absolute left-1/2 top-24 hidden h-0.5 w-3/4 -translate-x-1/2 transform bg-gradient-to-r from-primary to-primary lg:block"></div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((item, index) => (
                            <div key={item.step} className="relative">
                                {/* Card */}
                                <div className="bg-surface border-border rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    {/* Step Number */}
                                    <div className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg">
                                        {item.icon}
                                    </div>

                                    {/* Step Badge */}
                                    <div className="bg-primary-50 absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full">
                                        <span className="text-sm font-bold text-primary">
                                            {item.step}
                                        </span>
                                    </div>

                                    <h3 className="text-text-primary mb-3 text-lg font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Arrow - Mobile/Tablet */}
                                {index < steps.length - 1 && (
                                    <div className="my-4 flex justify-center lg:hidden">
                                        <svg
                                            className="h-6 w-6 text-primary"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
