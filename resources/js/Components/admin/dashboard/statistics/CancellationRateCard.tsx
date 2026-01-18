import { SparklineChart } from './SparklineChart';

interface CancellationRateCardProps {
    rate: number;
    target: number;
    sparklineData: number[];
}

export function CancellationRateCard({
    rate,
    target,
    sparklineData,
}: CancellationRateCardProps) {
    return (
        <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
            <div className="relative z-10">
                <p className="mb-1 text-sm font-medium text-slate-500">
                    Cancellation Rate
                </p>
                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-slate-900">
                        {rate}%
                    </h3>
                </div>
            </div>

            <SparklineChart data={sparklineData} colorClass="bg-primary" />
        </div>
    );
}
