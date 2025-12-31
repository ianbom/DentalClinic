/**
 * Get initials from a full name
 * @param name - Full name string
 * @param maxLength - Maximum number of initials (default: 2)
 * @returns Uppercase initials
 */
export function getInitials(name: string, maxLength: number = 2): string {
    if (!name) return '';
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, maxLength)
        .toUpperCase();
}

/**
 * Get status display styles for booking status
 * @param status - Booking status string
 * @returns CSS classes for styling the status badge
 */
export function getStatusStyles(status: string): string {
    switch (status) {
        case 'confirmed':
            return 'bg-green-100 text-green-700 border-green-200';
        case 'checked_in':
            return 'bg-blue-100 text-blue-700 border-blue-200';
        case 'cancelled':
            return 'bg-red-100 text-red-700 border-red-200';
        case 'no_show':
            return 'bg-yellow-100 text-yellow-700 border-yellow-200';
        default:
            return 'bg-slate-100 text-slate-700 border-slate-200';
    }
}

/**
 * Get human-readable label for booking status
 * @param status - Booking status string
 * @returns Display label
 */
export function getStatusLabel(status: string): string {
    switch (status) {
        case 'confirmed':
            return 'Confirmed';
        case 'checked_in':
            return 'Checked In';
        case 'cancelled':
            return 'Cancelled';
        case 'no_show':
            return 'No Show';
        default:
            return status;
    }
}

/**
 * Mask phone number for privacy
 * @param phone - Phone number string
 * @returns Masked phone number (e.g., 0812-****-7890)
 */
export function maskPhone(phone: string): string {
    if (!phone || phone.length < 8) return phone;
    return phone.slice(0, 4) + '-****-' + phone.slice(-4);
}

/**
 * Mask NIK for privacy
 * @param nik - NIK string (16 digits)
 * @returns Masked NIK (e.g., 350123********56)
 */
export function maskNik(nik: string): string {
    if (!nik || nik.length !== 16) return nik;
    return nik.slice(0, 6) + '********' + nik.slice(14);
}

/**
 * Format date to Indonesian locale
 * @param dateString - Date string
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDateId(
    dateString: string,
    options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    },
): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', options);
}

/**
 * Format time string (HH:mm:ss -> HH:mm WIB)
 * @param timeString - Time string in HH:mm:ss format
 * @returns Formatted time with WIB suffix
 */
export function formatTimeWib(timeString: string): string {
    return timeString.slice(0, 5) + ' WIB';
}
