export function SuccessHero() {
    return (
        <div className="flex flex-col items-center text-center pb-8 animate-fade-in-up">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-green-500 text-[48px]">check_circle</span>
            </div>
            <h1 className="text-text-light tracking-tight text-[32px] font-bold leading-tight px-4 pb-2">
                Booking Berhasil!
            </h1>
            <p className="text-gray-600 text-base font-normal leading-normal max-w-lg">
                Terima Kasih! Jadwal Anda telah terkonfirmasi. Silakan simpan kode booking ini untuk registrasi ulang saat kedatangan.
            </p>
        </div>
    );
}
