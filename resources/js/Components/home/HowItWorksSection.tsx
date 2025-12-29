const steps = [
    {
        step: 1,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
        title: 'Pilih Dokter',
        description: 'Cari dan pilih dokter gigi sesuai kebutuhan Anda dari daftar dokter kami yang berpengalaman.',
    },
    {
        step: 2,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Pilih Jadwal',
        description: 'Lihat ketersediaan jadwal dan pilih tanggal serta jam yang sesuai dengan waktu Anda.',
    },
    {
        step: 3,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        ),
        title: 'Isi Data',
        description: 'Lengkapi data diri dan keluhan Anda untuk persiapan konsultasi dengan dokter.',
    },
    {
        step: 4,
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Booking Selesai',
        description: 'Dapatkan kode booking dan konfirmasi via WhatsApp. Bayar langsung di klinik saat datang.',
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-16 lg:py-24 bg-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 lg:mb-16">
                    <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                        Cara Booking
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
                        Mudah & Cepat dalam 4 Langkah
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        Booking jadwal dokter gigi semudah memesan makanan online. Tidak perlu registrasi atau login.
                    </p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connection Line - Desktop */}
                    <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary"></div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((item, index) => (
                            <div key={item.step} className="relative">
                                {/* Card */}
                                <div className="bg-surface border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    {/* Step Number */}
                                    <div className="relative z-10 w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white shadow-lg">
                                        {item.icon}
                                    </div>

                                    {/* Step Badge */}
                                    <div className="absolute top-4 right-4 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-bold text-primary">{item.step}</span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-text-primary mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-text-secondary text-sm">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Arrow - Mobile/Tablet */}
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden flex justify-center my-4">
                                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
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
