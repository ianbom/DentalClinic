import Link from "next/link";

export function SuccessActions() {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full">
                <Link
                    href="/"
                    className="w-full md:w-auto min-w-[200px] border border-gray-300 hover:bg-gray-50 text-text-light font-bold h-12 px-6 rounded-lg transition-colors order-2 md:order-1 flex items-center justify-center"
                >
                    Kembali ke Beranda
                </Link>

                <Link href={'/check-booking'}>
                    <button className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-white font-bold h-12 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 order-1 md:order-2 cursor-pointer">
                        Cek Status Booking
                    </button>
                </Link>
           
            </div>
            <div className="mt-12 text-center">
                <p className="text-sm text-gray-400">Butuh bantuan? <a className="text-primary hover:underline font-medium" href="#">Chat Admin via WhatsApp</a></p>
            </div>
        </>
    );
}
