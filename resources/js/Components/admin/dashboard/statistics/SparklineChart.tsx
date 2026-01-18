interface SparklineChartProps {
    data: number[];
    colorClass?: string;
}

export function SparklineChart({
    data,
    colorClass = 'bg-primary',
}: SparklineChartProps) {
    const maxValue = Math.max(...data);

    return (
        <div className="mt-2 flex h-8 w-full items-end gap-1">
            {data.map((value, index) => {
                const heightPercent =
                    maxValue > 0 ? (value / maxValue) * 100 : 0;
                return (
                    <div
                        key={index}
                        className={`flex-1 rounded-sm ${colorClass} opacity-20 transition-opacity hover:opacity-100`}
                        style={{ height: `${heightPercent}%` }}
                    />
                );
            })}
        </div>
    );
}
