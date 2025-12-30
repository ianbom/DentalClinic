import { Doctor, DoctorWorkingPeriod } from '@/types';

/**
 * Group working periods by day of week
 */
export function groupByDay(
    workingPeriods: DoctorWorkingPeriod[],
): Record<string, DoctorWorkingPeriod[]> {
    return workingPeriods.reduce(
        (acc, wp) => {
            const day = wp.day_of_week;
            if (!acc[day]) {
                acc[day] = [];
            }
            acc[day].push(wp);
            return acc;
        },
        {} as Record<string, DoctorWorkingPeriod[]>,
    );
}

/**
 * Day order for sorting (Monday first)
 */
export const DAY_ORDER = [
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
    'Minggu',
];

/**
 * Sort days according to DAY_ORDER
 */
export function sortDays(days: string[]): string[] {
    return days.sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));
}

/**
 * Get formatted days string from doctor's working periods
 */
export function getDaysFromWorkingPeriods(doctor: Doctor): string {
    if (!doctor.working_periods || doctor.working_periods.length === 0) {
        return '-';
    }
    const uniqueDays = [
        ...new Set(doctor.working_periods.map((wp) => wp.day_of_week)),
    ];
    return sortDays(uniqueDays).join(', ');
}

/**
 * Get formatted practice hours from doctor's working periods
 */
export function getPracticeHours(doctor: Doctor): string {
    if (!doctor.working_periods || doctor.working_periods.length === 0) {
        return '-';
    }
    const times = doctor.working_periods.map(
        (wp) => `${wp.start_time.slice(0, 5)}-${wp.end_time.slice(0, 5)}`,
    );
    const uniqueTimes = [...new Set(times)];
    return uniqueTimes.join(', ');
}
