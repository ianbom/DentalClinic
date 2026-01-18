import { useMemo, useState } from 'react';

export interface BookingRevenueTrendData {
    day: string;
    bookings: number;
    revenue: number;
}

interface BookingRevenueTrendsChartProps {
    title?: string;
    subtitle?: string;
    data: BookingRevenueTrendData[];
}

export function BookingRevenueTrendsChart({
    title = 'Booking & Revenue Trends',
    subtitle = 'Daily bookings and revenue over the last 7 days',
    data,
}: BookingRevenueTrendsChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Chart dimensions
    const chartWidth = 800;
    const chartHeight = 220;
    const paddingLeft = 50;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 40;
    const innerWidth = chartWidth - paddingLeft - paddingRight;
    const innerHeight = chartHeight - paddingTop - paddingBottom;

    // Calculate max values
    const maxBookings = Math.max(...data.map((d) => d.bookings), 1);
    const maxRevenue = Math.max(...data.map((d) => d.revenue), 1);

    // Calculate which labels to show (max ~10 labels)
    const labelInterval = useMemo(() => {
        if (data.length <= 10) return 1;
        return Math.ceil(data.length / 10);
    }, [data.length]);

    // Generate points for lines
    const getXPosition = (index: number) => {
        if (data.length === 1) return paddingLeft + innerWidth / 2;
        return paddingLeft + (index / (data.length - 1)) * innerWidth;
    };

    const bookingPoints = data.map((item, i) => {
        const x = getXPosition(i);
        const y =
            paddingTop +
            innerHeight -
            (item.bookings / maxBookings) * innerHeight;
        return { x, y, value: item.bookings, index: i };
    });

    const revenuePoints = data.map((item, i) => {
        const x = getXPosition(i);
        const y =
            paddingTop +
            innerHeight -
            (item.revenue / maxRevenue) * innerHeight;
        return { x, y, value: item.revenue, index: i };
    });

    // Create path string for line
    const createLinePath = (points: { x: number; y: number }[]) => {
        if (points.length === 0) return '';
        return points
            .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
            .join(' ');
    };

    // Create path for area fill
    const createAreaPath = (points: { x: number; y: number }[]) => {
        if (points.length === 0) return '';
        const linePath = createLinePath(points);
        const lastX = points[points.length - 1].x;
        const firstX = points[0].x;
        const bottomY = paddingTop + innerHeight;
        return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
    };

    const formatRevenue = (value: number): string => {
        if (value >= 1000000) {
            return `Rp ${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `Rp ${(value / 1000).toFixed(0)}K`;
        }
        return `Rp ${value.toLocaleString('id-ID')}`;
    };

    const formatRevenueShort = (value: number): string => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}K`;
        }
        return value.toString();
    };

    // Get tooltip position
    const getTooltipPosition = (index: number) => {
        const x = getXPosition(index);
        const percentX = ((x - paddingLeft) / innerWidth) * 100;
        return Math.min(Math.max(percentX, 10), 90);
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">
                        {title}
                    </h3>
                    <p className="text-sm text-slate-500">{subtitle}</p>
                </div>
                {/* Legend */}
                <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-slate-600">Bookings</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-green-500" />
                        <span className="text-slate-600">Revenue</span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="relative">
                <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ height: '260px' }}
                >
                    {/* Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                        <line
                            key={i}
                            x1={paddingLeft}
                            y1={paddingTop + innerHeight * (1 - ratio)}
                            x2={chartWidth - paddingRight}
                            y2={paddingTop + innerHeight * (1 - ratio)}
                            stroke="#e2e8f0"
                            strokeWidth="1"
                            strokeDasharray={i === 0 ? undefined : '4,4'}
                        />
                    ))}

                    {/* Y-axis labels */}
                    {[0, 0.5, 1].map((ratio, i) => (
                        <text
                            key={`y-label-${i}`}
                            x={paddingLeft - 8}
                            y={paddingTop + innerHeight * (1 - ratio) + 4}
                            textAnchor="end"
                            className="fill-slate-400 text-[10px]"
                        >
                            {Math.round(maxBookings * ratio)}
                        </text>
                    ))}

                    {/* Revenue Area Fill */}
                    <path
                        d={createAreaPath(revenuePoints)}
                        fill="url(#revenueGradient)"
                        opacity="0.3"
                    />

                    {/* Booking Area Fill */}
                    <path
                        d={createAreaPath(bookingPoints)}
                        fill="url(#bookingGradient)"
                        opacity="0.3"
                    />

                    {/* Revenue Line */}
                    <path
                        d={createLinePath(revenuePoints)}
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Booking Line */}
                    <path
                        d={createLinePath(bookingPoints)}
                        fill="none"
                        stroke="#0da2e7"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Hover indicator line */}
                    {hoveredIndex !== null && (
                        <line
                            x1={getXPosition(hoveredIndex)}
                            y1={paddingTop}
                            x2={getXPosition(hoveredIndex)}
                            y2={paddingTop + innerHeight}
                            stroke="#94a3b8"
                            strokeWidth="1"
                            strokeDasharray="4,4"
                        />
                    )}

                    {/* Revenue Points */}
                    {revenuePoints.map((point, i) => (
                        <circle
                            key={`revenue-${i}`}
                            cx={point.x}
                            cy={point.y}
                            r={hoveredIndex === i ? 6 : 4}
                            fill="#22c55e"
                            stroke="white"
                            strokeWidth="2"
                            className="cursor-pointer"
                            style={{ transition: 'r 0.15s ease' }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    ))}

                    {/* Booking Points */}
                    {bookingPoints.map((point, i) => (
                        <circle
                            key={`booking-${i}`}
                            cx={point.x}
                            cy={point.y}
                            r={hoveredIndex === i ? 6 : 4}
                            fill="#0da2e7"
                            stroke="white"
                            strokeWidth="2"
                            className="cursor-pointer"
                            style={{ transition: 'r 0.15s ease' }}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        />
                    ))}

                    {/* X-axis labels inside SVG */}
                    {data.map((item, i) => {
                        if (i % labelInterval !== 0 && i !== data.length - 1)
                            return null;
                        return (
                            <text
                                key={`x-label-${i}`}
                                x={getXPosition(i)}
                                y={chartHeight - 10}
                                textAnchor="middle"
                                className={`text-[10px] ${
                                    hoveredIndex === i
                                        ? 'fill-primary font-semibold'
                                        : 'fill-slate-500'
                                }`}
                            >
                                {item.day}
                            </text>
                        );
                    })}

                    {/* Gradient Definitions */}
                    <defs>
                        <linearGradient
                            id="bookingGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#0da2e7"
                                stopOpacity="0.4"
                            />
                            <stop
                                offset="100%"
                                stopColor="#0da2e7"
                                stopOpacity="0"
                            />
                        </linearGradient>
                        <linearGradient
                            id="revenueGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#22c55e"
                                stopOpacity="0.4"
                            />
                            <stop
                                offset="100%"
                                stopColor="#22c55e"
                                stopOpacity="0"
                            />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Tooltip */}
                {hoveredIndex !== null && (
                    <div
                        className="pointer-events-none absolute z-20 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg"
                        style={{
                            left: `${getTooltipPosition(hoveredIndex)}%`,
                            top: '20px',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <div className="font-semibold">
                            {data[hoveredIndex].day}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            <span>{data[hoveredIndex].bookings} bookings</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-green-500" />
                            <span>
                                {formatRevenue(data[hoveredIndex].revenue)}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Summary Row */}
            <div className="mt-4 flex justify-around rounded-lg bg-slate-50 py-4 text-center">
                <div>
                    <p className="text-xs text-slate-400">Total Bookings</p>
                    <p className="text-xl font-bold text-primary">
                        {data.reduce((sum, d) => sum + d.bookings, 0)}
                    </p>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div>
                    <p className="text-xs text-slate-400">Total Revenue</p>
                    <p className="text-xl font-bold text-green-600">
                        {formatRevenueShort(
                            data.reduce((sum, d) => sum + d.revenue, 0),
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
