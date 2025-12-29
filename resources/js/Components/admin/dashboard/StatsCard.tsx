interface StatsCardProps {
    title: string;
    value: string | number;
    icon: string;
    iconBgClass: string;
    iconColorClass: string;
    badge?: {
        text: string;
        className: string;
    };
    borderColorHover: string;
    subText?: string;
}

export function StatsCard({
    title,
    value,
    icon,
    iconBgClass,
    iconColorClass,
    badge,
    borderColorHover,
    subText,
}: StatsCardProps) {
    return (
        <div
            className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:${borderColorHover} transition-all`}
        >
            <div className="flex justify-between items-start">
                <div className={`p-3 rounded-lg ${iconBgClass} ${iconColorClass}`}>
                    <span className="material-symbols-outlined text-2xl">
                        {icon}
                    </span>
                </div>
                {badge ? (
                    <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${badge.className}`}
                    >
                        {badge.text}
                    </span>
                ) : subText ? (
                    <span className="text-xs text-slate-400 font-medium">
                        {subText}
                    </span>
                ) : null}
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-3xl font-bold text-slate-900 mt-1">
                    {value}
                </h3>
            </div>
        </div>
    );
}
