/**
 * Format time string from HH:mm:ss to HH.mm
 */
export function formatTime(time: string): string {
    return time.slice(0, 5).replace(':', '.');
}

/**
 * Format time string from HH:mm:ss to HH:mm
 */
export function formatTimeColon(time: string): string {
    return time.slice(0, 5);
}

/**
 * Format date to Indonesian locale
 */
export function formatDateIndonesian(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

/**
 * Format date to short Indonesian format (e.g., "Sen, 30 Des 2024")
 */
export function formatDateShort(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}
