import { useState } from 'react';

export interface TopServiceData {
    name: string;
    count: number;
    percentage: number;
}

interface TopServicesChartProps {
    title?: string;
    subtitle?: string;
    services: TopServiceData[];
}

// Predefined colors for the pie chart segments
const COLORS = [
    '#0da2e7', // primary blue
    '#22c55e', // green
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ec4899', // pink
];

export function TopServicesChart({
    title = 'Top Services',
    subtitle = 'Most booked services',
    services,
}: TopServicesChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const total = services.reduce((sum, s) => sum + Number(s.count), 0);

    // Calculate pie chart segments
    const size = 160;
    const strokeWidth = 32;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const centerX = size / 2;
    const centerY = size / 2;

    // Calculate stroke-dasharray and stroke-dashoffset for each segment
    let cumulativePercentage = 0;
    const segments = services.map((service, index) => {
        const percentage = total > 0 ? (service.count / total) * 100 : 0;
        const dashArray = (percentage / 100) * circumference;
        const dashOffset = -((cumulativePercentage / 100) * circumference);
        cumulativePercentage += percentage;

        return {
            ...service,
            percentage,
            dashArray,
            dashOffset,
            color: COLORS[index % COLORS.length],
        };
    });

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500">{subtitle}</p>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center">
                {services.length === 0 ? (
                    <div className="flex items-center justify-center py-8 text-sm text-slate-400">
                        No service data available.
                    </div>
                ) : (
                    <>
                        {/* Donut Chart */}
                        <div className="relative mb-4">
                            <svg
                                width={size}
                                height={size}
                                viewBox={`0 0 ${size} ${size}`}
                                className="-rotate-90"
                            >
                                {/* Background circle */}
                                <circle
                                    cx={centerX}
                                    cy={centerY}
                                    r={radius}
                                    fill="none"
                                    stroke="#f1f5f9"
                                    strokeWidth={strokeWidth}
                                />

                                {/* Pie segments - butt linecap for square edges */}
                                {segments.map((segment, index) => {
                                    const isHovered = hoveredIndex === index;
                                    return (
                                        <circle
                                            key={index}
                                            cx={centerX}
                                            cy={centerY}
                                            r={radius}
                                            fill="none"
                                            stroke={segment.color}
                                            strokeWidth={strokeWidth}
                                            strokeDasharray={`${segment.dashArray} ${circumference}`}
                                            strokeDashoffset={
                                                segment.dashOffset
                                            }
                                            strokeLinecap="butt"
                                            className="cursor-pointer transition-all duration-200"
                                            onMouseEnter={() =>
                                                setHoveredIndex(index)
                                            }
                                            onMouseLeave={() =>
                                                setHoveredIndex(null)
                                            }
                                            style={{
                                                opacity:
                                                    hoveredIndex !== null &&
                                                        !isHovered
                                                        ? 0.5
                                                        : 1,
                                            }}
                                        />
                                    );
                                })}
                            </svg>

                            {/* Center text */}
                            <div className="absolute inset-0 flex rotate-0 flex-col items-center justify-center">
                                <span className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                                    Total
                                </span>
                                <span className="text-2xl font-bold text-slate-900">
                                    {total}
                                </span>
                            </div>
                        </div>

                        {/* Legend */}
                        <div className="w-full space-y-1.5">
                            {segments.map((segment, index) => (
                                <div
                                    key={index}
                                    className={`flex cursor-pointer items-center justify-between rounded px-2 py-1.5 transition-all ${hoveredIndex === index
                                            ? 'bg-slate-100'
                                            : 'hover:bg-slate-50'
                                        }`}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                            style={{
                                                backgroundColor: segment.color,
                                            }}
                                        />
                                        <span className="text-xs text-slate-600">
                                            {segment.name} (
                                            {Math.round(segment.percentage)}%)
                                        </span>
                                    </div>
                                    <span className="text-xs font-semibold text-slate-900">
                                        {segment.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
