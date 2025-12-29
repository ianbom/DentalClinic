'use client';

export function AdminHeader() {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
            {/* Search */}
            <div className="flex w-full max-w-md items-center">
                <div className="relative w-full">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                        search
                    </span>
                    <input
                        className="w-full rounded-lg border-none bg-slate-100 py-2 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Search patient or doctor..."
                        type="text"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
                <button className="relative cursor-pointer text-slate-500 transition-colors hover:text-primary">
                    <span className="material-symbols-outlined text-2xl">
                        notifications
                    </span>
                    <span className="absolute right-0 top-0 size-2 rounded-full border-2 border-white bg-red-500"></span>
                </button>
                <div className="flex items-center gap-3 border-l border-slate-200 pl-6">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-slate-900">
                            Dr. Sarah Admin
                        </p>
                        <p className="text-xs text-slate-500">Clinic Manager</p>
                    </div>
                    <div className="size-10 overflow-hidden rounded-full bg-slate-200 ring-2 ring-primary/20">
                        <img
                            alt="Profile photo of the admin user"
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz5fyNIy77EPR1btdB7QxuZo506CnC-Fgks-YYigzvyIwSe3vZOBEA5OojSTMDaKamPV4KovRVdSe-asBS8CJjpM0cZdXDynhjDRIMHviUQA2tSmJtMKGJICT7QisadxpGeKY2UiCLJegbYzxEAuicmRoarJtTBjIS904HaA3DDefujkHsPPAK0NUXR7vsNy4lJ14c5_8vU8jJ5N0PremQmixeEyJHe-dgT3ytMKPeUIP3HaQtZjp0RMuglGGLQ2u3r4Tc9wICqa-e"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
