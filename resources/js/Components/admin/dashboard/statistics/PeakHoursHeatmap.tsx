export interface PeakHourCell {
    intensity: number; // 0-100
}

interface PeakHoursHeatmapProps {
    title?: string;
    subtitle?: string;
    data: PeakHourCell[][]; // [row][column] - rows are time periods, columns are days
    dayLabels?: string[];
    timeLabels?: { start: string; end: string };
}

export function PeakHoursHeatmap({
    title = 'Peak Hours',
    subtitle = 'Booking density by time & day',
    data,
    dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    timeLabels = { start: '08:00', end: '14:00+' },
}: PeakHoursHeatmapProps) {
    const getIntensityClass = (intensity: number): string => {
        if (intensity === 0) return 'bg-slate-100';
        if (intensity <= 10) return 'bg-primary/10';
        if (intensity <= 20) return 'bg-primary/20';
        if (intensity <= 30) return 'bg-primary/30';
        if (intensity <= 40) return 'bg-primary/40';
        if (intensity <= 50) return 'bg-primary/50';
        if (intensity <= 60) return 'bg-primary/60';
        if (intensity <= 70) return 'bg-primary/70';
        if (intensity <= 80) return 'bg-primary/80';
        if (intensity <= 90) return 'bg-primary/90';
        return 'bg-primary';
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">{title}</h3>
            <p className="mb-6 text-xs text-slate-500">{subtitle}</p>

            {/* Day Labels */}
            <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-slate-400">
                {dayLabels.map((day, index) => (
                    <div key={index}>{day}</div>
                ))}
            </div>

            {/* Heatmap Grid */}
            <div className="grid grid-cols-7 gap-1">
                {data.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`aspect-square rounded ${getIntensityClass(cell.intensity)} transition-opacity hover:opacity-80`}
                            title={`Intensity: ${cell.intensity}%`}
                        />
                    )),
                )}
            </div>

            {/* Time Labels */}
            <div className="mt-2 flex justify-between text-[10px] text-slate-400">
                <span>{timeLabels.start}</span>
                <span>{timeLabels.end}</span>
            </div>
        </div>
    );
}
