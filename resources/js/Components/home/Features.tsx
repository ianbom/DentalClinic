export function Features() {
    return (
        <section className="py-20 bg-white border-y border-subtle-light">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-text-light mb-4">Cara Kerja Kami</h2>
                    <p className="text-gray-600 text-lg">Proses booking yang dirancang untuk kenyamanan dan keamanan Anda. Hanya dalam 4 langkah mudah.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Step 1 */}
                    <div className="group flex flex-col items-center text-center p-6 rounded-2xl border border-subtle-light bg-background-light hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">person_add</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">1. Daftar Akun</h3>
                        <p className="text-sm text-gray-500">Isi data diri Anda dengan singkat untuk membuat rekam medis digital.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="group flex flex-col items-center text-center p-6 rounded-2xl border border-subtle-light bg-background-light hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">chat</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">2. Verifikasi WA</h3>
                        <p className="text-sm text-gray-500">Verifikasi nomor WhatsApp Anda untuk keamanan data dan notifikasi.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="group flex flex-col items-center text-center p-6 rounded-2xl border border-subtle-light bg-background-light hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">calendar_month</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">3. Pilih Jadwal</h3>
                        <p className="text-sm text-gray-500">Lihat ketersediaan dokter secara real-time dan pilih waktu yang cocok.</p>
                    </div>

                    {/* Step 4 */}
                    <div className="group flex flex-col items-center text-center p-6 rounded-2xl border border-subtle-light bg-background-light hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">4. Bayar Manual</h3>
                        <p className="text-sm text-gray-500">Lakukan transfer manual yang aman dan konfirmasi bukti bayar.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
