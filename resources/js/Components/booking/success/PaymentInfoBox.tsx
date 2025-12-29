export function PaymentInfoBox() {
    return (
        <div className="bg-blue-50 rounded-lg p-4 flex gap-4 items-start mb-10 border border-blue-100">
            <span className="material-symbols-outlined text-primary mt-0.5">info</span>
            <div className="text-sm text-gray-700">
                <p className="font-semibold mb-1 text-text-light">Informasi Pembayaran</p>
                <p>Pembayaran dilakukan secara manual di klinik setelah perawatan selesai. Konfirmasi jadwal juga telah dikirimkan ke nomor WhatsApp Anda.</p>
            </div>
        </div>
    );
}
