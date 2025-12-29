export function ReviewSidebar() {
    return (
        <div className="hidden lg:block space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 sticky top-24">
                <h4 className="font-semibold text-text-light mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">help</span>
                    Bantuan
                </h4>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                    Jika Anda mengalami kesulitan saat melakukan booking atau ingin mengubah jadwal, silakan hubungi admin kami.
                </p>
                <a className="flex items-center gap-3 p-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors group cursor-pointer" href="#">
                    <div className="size-8 rounded-full bg-green-500 flex items-center justify-center text-white shadow-sm">
                        <span className="material-symbols-outlined text-[18px]">call</span>
                    </div>
                    <div>
                        <p className="text-xs font-medium opacity-80">WhatsApp Admin</p>
                        <p className="text-sm font-bold group-hover:underline">+62 812-3456-7890</p>
                    </div>
                </a>
            </div>
        </div>
    );
}
