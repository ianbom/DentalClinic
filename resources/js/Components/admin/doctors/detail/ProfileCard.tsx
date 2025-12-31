interface ProfileCardProps {
    doctor: {
        name: string;
        sip: string;
        experience: number;
        profile_pic: string | null;
        is_active: boolean;
    };
}

export function ProfileCard({ doctor }: ProfileCardProps) {
    return (
        <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="group relative mb-4 cursor-pointer">
                <div
                    className="size-32 rounded-full border-4 border-teal-100 bg-cover bg-center shadow-lg"
                    style={{
                        backgroundImage: doctor.profile_pic
                            ? `url("${doctor.profile_pic}")`
                            : 'url("/img/default-avatar.png")',
                    }}
                ></div>
                <div
                    className={`absolute bottom-1 right-1 size-4 rounded-full border-2 border-white ${
                        doctor.is_active ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                    title={doctor.is_active ? 'Online' : 'Offline'}
                ></div>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{doctor.name}</h2>
            <div className="my-6 h-px w-full bg-slate-100"></div>
            <div className="flex w-full flex-col gap-4 text-left">
                <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-teal-50 p-2 text-teal-600">
                        <span className="material-symbols-outlined text-[20px]">
                            workspace_premium
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            Pengalaman
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                            {doctor.experience} Tahun
                        </p>
                    </div>
                </div>
                <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-teal-50 p-2 text-teal-600">
                        <span className="material-symbols-outlined text-[20px]">
                            badge
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                            No. SIP
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                            {doctor.sip}
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-6 grid w-full grid-cols-2 gap-3">
                <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                    <span className="material-symbols-outlined text-[18px]">
                        mail
                    </span>
                    Email
                </button>
                <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50">
                    <span className="material-symbols-outlined text-[18px]">
                        call
                    </span>
                    Call
                </button>
            </div>
        </div>
    );
}
