interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    iconColorClass?: string;
    change?: {
        value: number;
        isPositive: boolean;
    };
    subText?: string;
}

export function StatCard({
    title,
    value,
    icon,
    iconColorClass = 'text-primary',
    change,
    subText,
}: StatCardProps) {
    return (
        <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            {/* Decorative Icon Overlay */}
            <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
                <span
                    className={`material-symbols-outlined text-6xl ${iconColorClass}`}
                >
                    {icon}
                </span>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col">
                <p className="mb-1 text-sm font-medium text-slate-500">
                    {title}
                </p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-slate-900">
                        {value}
                    </h3>
                    {change && (
                        <span
                            className={`flex items-center rounded px-1.5 py-0.5 text-xs font-semibold ${
                                change.isPositive
                                    ? 'bg-green-100 text-green-600'
                                    : 'bg-red-100 text-red-600'
                            }`}
                        >
                            <span className="material-symbols-outlined mr-0.5 text-[14px]">
                                {change.isPositive
                                    ? 'trending_up'
                                    : 'trending_down'}
                            </span>
                            {Math.abs(change.value)}%
                        </span>
                    )}
                </div>
                {subText && (
                    <p className="mt-3 text-xs text-slate-400">{subText}</p>
                )}
            </div>
        </div>
    );
}
