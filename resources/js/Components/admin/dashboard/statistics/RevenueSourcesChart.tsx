export interface RevenueSourceData {
    name: string;
    percentage: number;
    amount: string;
    color: string;
}

interface RevenueSourcesChartProps {
    title?: string;
    subtitle?: string;
    totalAmount: string;
    sources: RevenueSourceData[];
}

export function RevenueSourcesChart({
    title = 'Revenue Sources',
    subtitle = 'Breakdown by type',
    totalAmount,
    sources,
}: RevenueSourcesChartProps) {
    // Build conic-gradient from sources
    const buildGradient = () => {
        let currentPercent = 0;
        const gradientParts = sources.map((source) => {
            const start = currentPercent;
            currentPercent += source.percentage;
            return `${source.color} ${start}% ${currentPercent}%`;
        });
        return `conic-gradient(${gradientParts.join(', ')})`;
    };

    return (
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500">{subtitle}</p>
            </div>

            {/* Donut Chart */}
            <div className="flex flex-1 items-center justify-center">
                <div
                    className="relative h-48 w-48 rounded-full"
                    style={{ background: buildGradient() }}
                >
                    <div className="absolute inset-0 m-auto flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-inner">
                        <span className="text-xs text-slate-400">Total</span>
                        <span className="text-xl font-bold text-slate-900">
                            {totalAmount}
                        </span>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-3">
                {sources.map((source, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: source.color }}
                            />
                            <span className="text-slate-700">
                                {source.name} ({source.percentage}%)
                            </span>
                        </div>
                        <span className="font-semibold text-slate-900">
                            {source.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
