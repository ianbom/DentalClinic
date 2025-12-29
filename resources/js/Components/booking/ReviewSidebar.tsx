export function ReviewSidebar() {
    return (
        <div className="hidden space-y-6 lg:block">
            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h4 className="mb-4 flex items-center gap-2 font-semibold text-text-light">
                    <span className="material-symbols-outlined text-primary">
                        help
                    </span>
                    Bantuan
                </h4>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">
                    Jika Anda mengalami kesulitan saat melakukan booking atau
                    ingin mengubah jadwal, silakan hubungi admin kami.
                </p>
                <a
                    className="group flex cursor-pointer items-center gap-3 rounded-lg bg-green-50 p-3 text-green-700 transition-colors hover:bg-green-100"
                    href="#"
                >
                    <div className="flex size-8 items-center justify-center rounded-full bg-green-500 text-white shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">
                            call
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-medium opacity-80">
                            WhatsApp Admin
                        </p>
                        <p className="text-sm font-bold group-hover:underline">
                            +62 812-3456-7890
                        </p>
                    </div>
                </a>
            </div>
        </div>
    );
}
