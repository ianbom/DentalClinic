import { useBooking } from '@/context/BookingContext';

export const getServiceIdByName = (name: string): string => {
    switch (name) {
        case 'Konsultasi/Periksa':
            return 'konsultasi';
        case 'Cabut Gigi Anak':
            return 'cabut_gigi_anak';
        case 'Sakit Gigi / Pengobatan':
            return 'pengobatan';
        case 'Cabut Gigi Dewasa':
            return 'cabut_gigi_dewasa';
        case 'Pembersihan Karang Gigi / Scalling':
            return 'scalling';
        case 'Kontrol Gigi':
            return 'kontrol_gigi';
        case 'Tambal Gigi':
            return 'tambal_gigi';
        case 'Pemutihan Gigi / Bleaching':
            return 'bleaching';
        case 'Pasang Gigi Palsu':
            return 'gigi_palsu';
        case 'Pasang Diamond':
            return 'pasang_diamond';
        case 'Pasang Behel / Kawat Gigi':
            return 'pasang_behel';
        case 'Sisipan':
            return 'sisipan';
        default:
            return '';
    }
};

export const getServiceTypeByName = (
    name: string,
): 'short' | 'long' | 'sisipan' | '' => {
    switch (name) {
        case 'Konsultasi/Periksa':
            return 'short';
        case 'Cabut Gigi Anak':
            return 'short';
        case 'Sakit Gigi / Pengobatan':
            return 'short';
        case 'Cabut Gigi Dewasa':
            return 'long';
        case 'Pembersihan Karang Gigi / Scalling':
            return 'long';
        case 'Kontrol Gigi':
            return 'long';
        case 'Tambal Gigi':
            return 'long';
        case 'Pemutihan Gigi / Bleaching':
            return 'long';
        case 'Pasang Gigi Palsu':
            return 'long';
        case 'Pasang Diamond':
            return 'long';
        case 'Pasang Behel / Kawat Gigi':
            return 'long';
        case 'Sisipan':
            return 'sisipan';
        default:
            return '';
    }
};

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
            case 'pasang_behel':
                serviceName = 'Pasang Behel / Kawat Gigi';
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
            <option value="konsultasi">Konsultasi/Periksa </option>
            <option value="cabut_gigi_anak">Cabut Gigi Anak </option>
            <option value="pengobatan">Sakit Gigi / Pengobatan</option>
            <option value="cabut_gigi_dewasa">Cabut Gigi Dewasa</option>
            <option value="scalling">Pembersihan Karang Gigi / Scalling</option>
            <option value="kontrol_gigi">Kontrol Gigi </option>
            <option value="tambal_gigi">Tambal Gigi </option>
            <option value="bleaching">Pemutihan Gigi / Bleaching</option>
            <option value="gigi_palsu">Pasang Gigi Palsu </option>
            <option value="pasang_behel">Pasang Behel / Kawat Gigi</option>
            <option value="pasang_diamond">Pasang Diamond </option>
            {showSisipan && <option value="sisipan">📋 Sisipan</option>}
        </select>
    );
}
