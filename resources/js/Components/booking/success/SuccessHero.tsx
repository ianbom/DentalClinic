export function SuccessHero() {
    return (
        <div className="animate-fade-in-up flex flex-col items-center pb-8 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <span className="material-symbols-outlined text-[48px] text-green-500">
                    check_circle
                </span>
            </div>
            <h1 className="px-4 pb-2 text-[32px] font-bold leading-tight tracking-tight text-text-light">
                Booking Berhasil!
            </h1>
            <p className="max-w-lg text-base font-normal leading-normal text-gray-600">
                Terima Kasih! Jadwal Anda telah terkonfirmasi. Silakan simpan
                kode booking ini untuk registrasi ulang saat kedatangan.
            </p>
        </div>
    );
}
