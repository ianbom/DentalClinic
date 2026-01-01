import { useBooking } from '@/context/BookingContext';

interface ServiceSelectionProps {
    value: string;
    onChange: (value: string) => void;
    showSisipan?: boolean;
}

export function ServiceSelection({
    value,
    onChange,
    showSisipan = false,
}: ServiceSelectionProps) {
    const { setBookingData } = useBooking();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        onChange(selectedValue);

        if (selectedValue === 'konsultasi') {
            setBookingData({ service: 'Konsultasi', serviceType: 'short' });
        } else if (selectedValue === 'pengobatan') {
            setBookingData({ service: 'Pengobatan', serviceType: 'long' });
        } else if (selectedValue === 'sisipan') {
            setBookingData({ service: 'Sisipan', serviceType: 'sisipan' });
        } else {
            setBookingData({ service: '', serviceType: '' });
        }
    };

    return (
        <select
            value={value}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#cee0e8] bg-white px-4 py-3 text-[#0d171c] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
            <option value="">-- Pilih Layanan --</option>
            <option value="konsultasi">🩺 Konsultasi (±15 menit)</option>
            <option value="pengobatan">🦷 Pengobatan (±45 menit)</option>
            {showSisipan && <option value="sisipan">📋 Sisipan</option>}
        </select>
    );
}
