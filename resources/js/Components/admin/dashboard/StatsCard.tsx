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
            className={`group flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:${borderColorHover} transition-all`}
        >
            <div className="flex items-start justify-between">
                <div
                    className={`rounded-lg p-3 ${iconBgClass} ${iconColorClass}`}
                >
                    <span className="material-symbols-outlined text-2xl">
                        {icon}
                    </span>
                </div>
                {badge ? (
                    <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${badge.className}`}
                    >
                        {badge.text}
                    </span>
                ) : subText ? (
                    <span className="text-xs font-medium text-slate-400">
                        {subText}
                    </span>
                ) : null}
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <h3 className="mt-1 text-3xl font-bold text-slate-900">
                    {value}
                </h3>
            </div>
        </div>
    );
}
