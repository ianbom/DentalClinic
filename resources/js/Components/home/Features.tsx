export function Features() {
    return (
        <section className="border-y border-subtle-light bg-white py-20">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <h2 className="mb-4 text-3xl font-bold text-text-light md:text-4xl">
                        Alur Pelayanan Booking Jadwal
                    </h2>
                    <p className="text-lg text-gray-600">
                        Proses booking yang dirancang untuk kenyamanan dan
                        keamanan Anda. Hanya dalam 4 langkah mudah.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Step 1 */}
                    <div className="group flex flex-col items-center rounded-2xl border border-subtle-light bg-background-light p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-primary transition-transform group-hover:scale-110">
                            <span className="material-symbols-outlined text-3xl">
                                person_add
                            </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            1. Booking Jadwal
                        </h3>
                        <p className="text-sm text-gray-500">
                            Isi data diri Anda dengan singkat untuk membuat
                            rekam medis digital.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="group flex flex-col items-center rounded-2xl border border-subtle-light bg-background-light p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600 transition-transform group-hover:scale-110">
                            <span className="material-symbols-outlined text-3xl">
                                chat
                            </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            2. Verifikasi WA
                        </h3>
                        <p className="text-sm text-gray-500">
                            Verifikasi nomor WhatsApp Anda untuk keamanan data
                            dan notifikasi.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="group flex flex-col items-center rounded-2xl border border-subtle-light bg-background-light p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-purple-600 transition-transform group-hover:scale-110">
                            <span className="material-symbols-outlined text-3xl">
                                calendar_month
                            </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            3. Pilih Jadwal
                        </h3>
                        <p className="text-sm text-gray-500">
                            Lihat ketersediaan dokter secara real-time dan pilih
                            waktu yang cocok.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="group flex flex-col items-center rounded-2xl border border-subtle-light bg-background-light p-6 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition-transform group-hover:scale-110">
                            <span className="material-symbols-outlined text-3xl">
                                account_balance_wallet
                            </span>
                        </div>
                        <h3 className="mb-2 text-xl font-bold">
                            4. Bayar Di Klinik
                        </h3>
                        <p className="text-sm text-gray-500">
                            Lakukan pembayaran di klinik dengan tunai maupun non
                            tunai
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
