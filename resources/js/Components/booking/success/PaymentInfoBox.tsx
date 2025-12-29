export function PaymentInfoBox() {
    return (
        <div className="mb-10 flex items-start gap-4 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <span className="material-symbols-outlined mt-0.5 text-primary">
                info
            </span>
            <div className="text-sm text-gray-700">
                <p className="mb-1 font-semibold text-text-light">
                    Informasi Pembayaran
                </p>
                <p>
                    Pembayaran dilakukan secara manual di klinik setelah
                    perawatan selesai. Konfirmasi jadwal juga telah dikirimkan
                    ke nomor WhatsApp Anda.
                </p>
            </div>
        </div>
    );
}
