"use client";

export function AdminHeader() {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
            {/* Search */}
            <div className="flex items-center w-full max-w-md">
                <div className="relative w-full">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                        search
                    </span>
                    <input
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-100 border-none focus:ring-2 focus:ring-primary text-sm text-slate-700 placeholder-slate-400 outline-none"
                        placeholder="Search patient or doctor..."
                        type="text"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <button className="relative text-slate-500 hover:text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-2xl">
                        notifications
                    </span>
                    <span className="absolute top-0 right-0 size-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900">
                            Dr. Sarah Admin
                        </p>
                        <p className="text-xs text-slate-500">Clinic Manager</p>
                    </div>
                    <div className="size-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-primary/20">
                        <img
                            alt="Profile photo of the admin user"
                            className="w-full h-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz5fyNIy77EPR1btdB7QxuZo506CnC-Fgks-YYigzvyIwSe3vZOBEA5OojSTMDaKamPV4KovRVdSe-asBS8CJjpM0cZdXDynhjDRIMHviUQA2tSmJtMKGJICT7QisadxpGeKY2UiCLJegbYzxEAuicmRoarJtTBjIS904HaA3DDefujkHsPPAK0NUXR7vsNy4lJ14c5_8vU8jJ5N0PremQmixeEyJHe-dgT3ytMKPeUIP3HaQtZjp0RMuglGGLQ2u3r4Tc9wICqa-e"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
