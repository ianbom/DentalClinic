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

        let serviceName = '';
        let serviceType: 'short' | 'long' | 'sisipan' | '' = '';

        switch (selectedValue) {
            case 'konsultasi':
                serviceName = 'Konsultasi/Periksa';
                serviceType = 'short';
                break;
            case 'cabut_gigi_anak':
                serviceName = 'Cabut Gigi Anak';
                serviceType = 'short';
                break;
            case 'pengobatan':
                serviceName = 'Sakit Gigi / Pengobatan';
                serviceType = 'short';
                break;
            case 'cabut_gigi_dewasa':
                serviceName = 'Cabut Gigi Dewasa';
                serviceType = 'long';
                break;
            case 'scalling':
                serviceName = 'Pembersihan Karang Gigi / Scalling';
                serviceType = 'long';
                break;
            case 'kontrol_gigi':
                serviceName = 'Kontrol Gigi';
                serviceType = 'long';
                break;
            case 'tambal_gigi':
                serviceName = 'Tambal Gigi';
                serviceType = 'long';
                break;
            case 'bleaching':
                serviceName = 'Pemutihan Gigi / Bleaching';
                serviceType = 'long';
                break;
            case 'gigi_palsu':
                serviceName = 'Pasang Gigi Palsu';
                serviceType = 'long';
                break;
            case 'pasang_diamond':
                serviceName = 'Pasang Diamond';
                serviceType = 'long';
                break;
            case 'sisipan':
                serviceName = 'Sisipan';
                serviceType = 'sisipan';
                break;
            default:
                serviceName = '';
                serviceType = '';
        }

        setBookingData({
            service: serviceName,
            serviceType,
            serviceId: selectedValue,
        });
    };

    return (
        <select
            value={value}
            onChange={handleChange}
            className="w-full rounded-lg border border-[#cee0e8] bg-white px-4 py-3 text-[#0d171c] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
            <option value="">-- Pilih Layanan --</option>
            <option value="konsultasi">Konsultasi/Periksa (±15 menit)</option>
            <option value="cabut_gigi_anak">Cabut Gigi Anak (±15 menit)</option>
            <option value="pengobatan">
                Sakit Gigi / Pengobatan (±15 menit)
            </option>
            <option value="cabut_gigi_dewasa">
                Cabut Gigi Dewasa (±45 menit)
            </option>
            <option value="scalling">
                Pembersihan Karang Gigi / Scalling (±45 menit)
            </option>
            <option value="kontrol_gigi">Kontrol Gigi (±45 menit)</option>
            <option value="tambal_gigi">Tambal Gigi (±45 menit)</option>
            <option value="bleaching">
                Pemutihan Gigi / Bleaching (±45 menit)
            </option>
            <option value="gigi_palsu">Pasang Gigi Palsu (±45 menit)</option>
            <option value="pasang_diamond">Pasang Diamond (±45 menit)</option>
            {showSisipan && <option value="sisipan">📋 Sisipan</option>}
        </select>
    );
}
