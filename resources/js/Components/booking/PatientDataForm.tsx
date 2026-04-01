'use client';

import { useBooking } from '@/context/BookingContext';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface Province {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
}

interface District {
    id: number;
    name: string;
}

interface Village {
    id: number;
    name: string;
}

interface CustomerDataFormProps {
    doctorId: string;
    doctorName?: string;
    isAdmin?: boolean;
    provinces?: Province[];
    isCreateMode?: boolean;
    isEditMode?: boolean;
    patientId?: number;
}

export function CustomerDataForm({
    doctorId,
    doctorName,
    isAdmin = false,
    provinces = [],
    isCreateMode = false,
    isEditMode = false,
    patientId,
}: CustomerDataFormProps) {
    const { bookingData, setBookingData } = useBooking();
    const [isCheckingNik, setIsCheckingNik] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [nikMessage, setNikMessage] = useState<{
        type: 'success' | 'info' | 'error';
        text: string;
    } | null>(null);

    // Derive isAddressPreFilled from bookingData - this persists across refreshes
    // Address is pre-filled if NIK was checked and address exists, and districtId is 'prefilled'
    const isAddressPreFilled =
        bookingData.isNikChecked &&
        bookingData.address.trim() !== '' &&
        bookingData.districtId === 'prefilled';

    // Derived lists for cascading dropdowns
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [villages, setVillages] = useState<Village[]>([]);

    // Loading states for API calls
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
    const [isLoadingVillages, setIsLoadingVillages] = useState(false);

    // Fetch cities when province changes
    useEffect(() => {
        if (bookingData.provinceId) {
            setIsLoadingCities(true);
            setCities([]);
            setDistricts([]);
            setVillages([]);

            fetch(`/api/provinces/${bookingData.provinceId}/cities`)
                .then((res) => res.json())
                .then((data) => {
                    setCities(data);
                    setIsLoadingCities(false);
                })
                .catch((err) => {
                    console.error('Error fetching cities:', err);
                    setIsLoadingCities(false);
                });
        } else {
            setCities([]);
            setDistricts([]);
            setVillages([]);
        }
    }, [bookingData.provinceId]);

    // Fetch districts when city changes
    useEffect(() => {
        if (bookingData.cityId) {
            setIsLoadingDistricts(true);
            setDistricts([]);
            setVillages([]);

            fetch(`/api/cities/${bookingData.cityId}/districts`)
                .then((res) => res.json())
                .then((data) => {
                    setDistricts(data);
                    setIsLoadingDistricts(false);
                })
                .catch((err) => {
                    console.error('Error fetching districts:', err);
                    setIsLoadingDistricts(false);
                });
        } else {
            setDistricts([]);
            setVillages([]);
        }
    }, [bookingData.cityId]);

    // Fetch villages when district changes
    useEffect(() => {
        if (bookingData.districtId) {
            setIsLoadingVillages(true);
            setVillages([]);

            fetch(`/api/districts/${bookingData.districtId}/villages`)
                .then((res) => res.json())
                .then((data) => {
                    setVillages(data);
                    setIsLoadingVillages(false);
                })
                .catch((err) => {
                    console.error('Error fetching villages:', err);
                    setIsLoadingVillages(false);
                });
        } else {
            setVillages([]);
        }
    }, [bookingData.districtId]);

    // Update address when location selection changes
    useEffect(() => {
        if (
            bookingData.villageName &&
            bookingData.districtName &&
            bookingData.cityName &&
            bookingData.provinceName
        ) {
            const fullAddress = `${bookingData.villageName}, ${bookingData.districtName}, ${bookingData.cityName}, ${bookingData.provinceName}`;
            setBookingData({ address: fullAddress });
        }
    }, [
        bookingData.villageName,
        bookingData.districtName,
        bookingData.cityName,
        bookingData.provinceName,
    ]);

    const handleInputChange = (field: string, value: string) => {
        // Auto-capitalize for fullName
        const processedValue =
            field === 'fullName' ? value.toUpperCase() : value;

        setBookingData({ [field]: processedValue });
        // Reset NIK check when NIK changes
        if (field === 'nik') {
            setBookingData({ isNikChecked: false });
            setNikMessage(null);
        }
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const provinceId = e.target.value;
        const selectedProvince = provinces.find(
            (p) => String(p.id) === provinceId,
        );
        setBookingData({
            provinceId,
            provinceName: selectedProvince?.name || '',
            cityId: '',
            cityName: '',
            districtId: '',
            districtName: '',
            address: '',
        });
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = e.target.value;
        const selectedCity = cities.find((c) => String(c.id) === cityId);
        setBookingData({
            cityId,
            cityName: selectedCity?.name || '',
            districtId: '',
            districtName: '',
            address: '',
        });
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = e.target.value;
        const selectedDistrict = districts.find(
            (d) => String(d.id) === districtId,
        );
        setBookingData({
            districtId,
            districtName: selectedDistrict?.name || '',
            villageId: '',
            villageName: '',
        });
    };

    const handleVillageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const villageId = e.target.value;
        const selectedVillage = villages.find(
            (v) => String(v.id) === villageId,
        );
        setBookingData({
            villageId,
            villageName: selectedVillage?.name || '',
        });
    };

    const handleCheckNik = () => {
        if (!bookingData.nik || bookingData.nik.length < 16) {
            setNikMessage({
                type: 'error',
                text: 'NIK harus 16 digit',
            });
            return;
        }

        setIsCheckingNik(true);
        setNikMessage(null);

        router.post(
            '/check-nik',
            { nik: bookingData.nik },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    const flash = page.props.flash as {
                        nikCheck?: {
                            found: boolean;
                            patient?: {
                                patient_name: string;
                                patient_phone: string;
                                patient_birthdate: string;
                                patient_address: string;
                                gender: string;
                            };
                            hasActiveBooking?: boolean;
                            bookingCode?: string;
                        };
                    };

                    // Check if patient has active booking
                    if (flash?.nikCheck?.hasActiveBooking) {
                        setNikMessage({
                            type: 'error',
                            text: `Anda sudah memiliki booking aktif dengan kode: ${flash.nikCheck.bookingCode}. Silakan selesaikan booking tersebut terlebih dahulu atau batalkan untuk membuat booking baru.`,
                        });
                        setBookingData({ isNikChecked: false });
                        setIsCheckingNik(false);
                        return;
                    }

                    if (flash?.nikCheck?.found && flash.nikCheck.patient) {
                        // Auto-fill form with existing patient data
                        const hasExistingAddress =
                            !!flash.nikCheck.patient.patient_address;
                        setBookingData({
                            fullName:
                                flash.nikCheck.patient.patient_name?.toUpperCase() ||
                                '',
                            whatsapp:
                                flash.nikCheck.patient.patient_phone || '',
                            birthdate:
                                flash.nikCheck.patient.patient_birthdate || '',
                            address:
                                flash.nikCheck.patient.patient_address || '',
                            gender:
                                (flash.nikCheck.patient.gender as
                                    | 'male'
                                    | 'female') || '',
                            isNikChecked: true,
                            // If address exists, set districtId to a placeholder to pass validation
                            districtId: hasExistingAddress ? 'prefilled' : '',
                        });
                        setNikMessage({
                            type: 'success',
                            text: 'Data ditemukan! Form telah terisi otomatis.',
                        });
                    } else {
                        setBookingData({ isNikChecked: true });
                        setNikMessage({
                            type: 'info',
                            text: 'NIK belum terdaftar. Silakan isi data lengkap.',
                        });
                    }
                    setIsCheckingNik(false);
                },
                onError: () => {
                    setNikMessage({
                        type: 'error',
                        text: 'Gagal memeriksa NIK. Coba lagi.',
                    });
                    setIsCheckingNik(false);
                },
            },
        );
    };

    // Form validation
    const isFormValid =
        bookingData.fullName.trim() !== '' &&
        bookingData.nik.trim() !== '' &&
        bookingData.nik.length >= 16 &&
        bookingData.whatsapp.trim() !== '' &&
        bookingData.whatsapp.length >= 10 &&
        bookingData.birthdate.trim() !== '' &&
        bookingData.gender !== '' &&
        (bookingData.villageId !== '' || bookingData.address.trim() !== '') &&
        (isCreateMode || isEditMode ? true : bookingData.isNikChecked);

    // Helper function to format phone number for WhatsApp
    const formatPhoneForWhatsApp = (phone: string): string => {
        // Remove all non-digit characters
        let cleaned = phone.replace(/\D/g, '');

        // Convert 08xxx to 628xxx
        if (cleaned.startsWith('0')) {
            cleaned = '62' + cleaned.substring(1);
        }

        // If doesn't start with 62, add it
        if (!cleaned.startsWith('62')) {
            cleaned = '62' + cleaned;
        }

        return cleaned;
    };

    // Handler for admin WhatsApp confirmation - saves booking first, then redirects to WhatsApp
    const handleAdminWhatsAppConfirmation = () => {
        if (!isFormValid || isSubmitting) return;

        setIsSubmitting(true);

        const patientPhone = formatPhoneForWhatsApp(bookingData.whatsapp);
        const genderLabel =
            bookingData.gender === 'male' ? 'Laki-laki' : 'Perempuan';

        // Build check booking URL with NIK parameter
        const checkBookingUrl = `${window.location.origin}/check-booking?nik=${bookingData.nik}`;

        // Menyusun pesan menggunakan Array agar format newline (\n) konsisten di semua device
        const messageLines = [
            `Halo *${bookingData.fullName}*,`,
            '',
            'Berikut data booking anda di *Cantika Dental Care*! 🦷',
            '',
            '📋 *DETAIL BOOKING ANDA*',
            '━━━━━━━━━━━━━━━━━━━━━',
            `👨‍⚕️ Dokter: ${doctorName || 'Dokter'}`,
            `📅 Tanggal: ${bookingData.selectedDate}`,
            `🕐 Jam: ${bookingData.selectedTime || 'Akan dikonfirmasi'}`,
            `🦷 Layanan: ${bookingData.service}`,
            '',
            '👤 *DATA PASIEN*',
            '━━━━━━━━━━━━━━━━━',
            `Nama: ${bookingData.fullName}`,
            `NIK: ${bookingData.nik}`,
            `No. HP: ${bookingData.whatsapp}`,
            `Tgl Lahir: ${bookingData.birthdate}`,
            `Jenis Kelamin: ${genderLabel}`,
            `Alamat: ${bookingData.address}`,
            '',
            '🔗 *CEK STATUS BOOKING*',
            checkBookingUrl,
            '',
            'Terima kasih! 🙏',
        ];

        const message = messageLines.join('\n');
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${patientPhone}&text=${encodedMessage}`;

        // Save booking first, then open WhatsApp only on success
        router.post(
            '/admin/bookings/store',
            {
                doctor_id: doctorId,
                patient_name: bookingData.fullName,
                patient_nik: bookingData.nik,
                patient_phone: bookingData.whatsapp,
                patient_birthdate: bookingData.birthdate,
                patient_address: bookingData.address,
                gender: bookingData.gender,
                booking_date: bookingData.rawSelectedDate,
                start_time: bookingData.selectedTime || null,
                service: bookingData.service,
                type: bookingData.serviceType || 'sisipan',
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    setIsSubmitting(false);

                    // Check flash message for error
                    const flash = page.props.flash as
                        | { error?: string; success?: string }
                        | undefined;

                    if (flash?.error) {
                        // Controller returned error via flash message
                        alert(flash.error);
                        return; // Don't open WhatsApp
                    }

                    // Only open WhatsApp if there's a success message or no error
                    if (flash?.success || !flash?.error) {
                        window.open(
                            whatsappUrl,
                            '_blank',
                            'noopener,noreferrer',
                        );
                    }
                },
                onError: (errors) => {
                    // Validation errors (422)
                    console.error('Booking failed:', errors);
                    setIsSubmitting(false);
                    const errorMessages = Object.values(errors)
                        .flat()
                        .join('\n');
                    alert('Gagal menyimpan booking:\n' + errorMessages);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    // Common input class
    const inputClass =
        'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';
    const selectClass =
        'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-100 disabled:text-gray-400';
    const labelClass = 'block text-sm font-medium text-text-light mb-1.5';

    return (
        <div className="border-border-light overflow-hidden rounded-xl border bg-white p-5 shadow-sm lg:p-8">
            {/* Page Heading */}
            <div className="border-border-light mb-6 border-b pb-4 lg:mb-8">
                <h1 className="mb-2 text-xl font-bold text-text-light lg:text-2xl">
                    Lengkapi Data Pasien
                </h1>
                <p className="text-text-secondary text-sm">
                    Mohon isi data diri pasien dengan benar untuk keperluan
                    rekam medis.
                </p>
            </div>

            {/* Form Fields */}
            <form
                className="flex flex-col gap-6 lg:gap-8"
                onSubmit={(e) => e.preventDefault()}
            >
                {/* Section 1: Identitas Diri */}
                <div className="flex flex-col gap-4">
                    <h3 className="flex items-center gap-2 text-base font-bold text-text-light">
                        <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-primary">
                            1
                        </span>
                        Identitas Diri
                    </h3>

                    {/* Medical Records - only in create mode */}
                    {isCreateMode && (
                        <div className="w-full">
                            <label
                                className={labelClass}
                                htmlFor="medicalRecords"
                            >
                                No. Rekam Medis*
                            </label>
                            <input
                                className={inputClass}
                                id="medicalRecords"
                                placeholder="Masukkan No. Rekam Medis"
                                type="text"
                                required
                                value={bookingData.medicalRecords}
                                onChange={(e) =>
                                    handleInputChange(
                                        'medicalRecords',
                                        e.target.value.toUpperCase(),
                                    )
                                }
                            />
                        </div>
                    )}

                    {/* NIK with Check Button */}
                    <div className="w-full">
                        <label className={labelClass} htmlFor="nik">
                            NIK (Nomor Induk Kependudukan)*
                        </label>
                        <input
                            className={`w-full ${inputClass} ${
                                nikMessage?.type === 'success'
                                    ? 'border-green-300 focus:border-green-400 focus:ring-green-400'
                                    : nikMessage?.type === 'error'
                                      ? 'border-red-300 focus:border-red-400 focus:ring-red-400'
                                      : ''
                            }`}
                            id="nik"
                            placeholder="16 digit nomor NIK"
                            type="text"
                            maxLength={16}
                            required
                            value={bookingData.nik}
                            onChange={(e) =>
                                handleInputChange(
                                    'nik',
                                    e.target.value.replace(/\D/g, ''),
                                )
                            }
                        />
                        <button
                            type="button"
                            onClick={handleCheckNik}
                            disabled={
                                isCheckingNik || bookingData.nik.length < 16
                            }
                            className={`mt-2 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                                isCheckingNik || bookingData.nik.length < 16
                                    ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                    : bookingData.isNikChecked
                                      ? 'cursor-pointer bg-green-100 text-green-700'
                                      : 'cursor-pointer bg-primary text-white hover:bg-primary-dark'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {isCheckingNik
                                    ? 'hourglass_empty'
                                    : bookingData.isNikChecked
                                      ? 'check_circle'
                                      : 'search'}
                            </span>
                            {isCheckingNik
                                ? 'Memeriksa...'
                                : bookingData.isNikChecked
                                  ? 'Terverifikasi'
                                  : 'Cek NIK'}
                        </button>

                        {/* NIK Message */}
                        {nikMessage && (
                            <div
                                className={`mt-2 rounded-lg border p-3 text-sm ${
                                    nikMessage.type === 'success'
                                        ? 'border-green-200 bg-green-50 text-green-700'
                                        : nikMessage.type === 'info'
                                          ? 'border-blue-200 bg-blue-50 text-blue-700'
                                          : 'border-red-200 bg-red-50 text-red-700'
                                }`}
                            >
                                <div className="flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[18px]">
                                        {nikMessage.type === 'success'
                                            ? 'check_circle'
                                            : nikMessage.type === 'info'
                                              ? 'info'
                                              : 'error'}
                                    </span>
                                    <p>{nikMessage.text}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Nama Lengkap */}
                    <div className="w-full">
                        <label className={labelClass} htmlFor="fullname">
                            Nama Lengkap*
                        </label>
                        <input
                            className={`${inputClass} uppercase placeholder:normal-case`}
                            id="fullname"
                            placeholder="Sesuai KTP"
                            type="text"
                            required
                            value={bookingData.fullName}
                            onChange={(e) =>
                                handleInputChange('fullName', e.target.value)
                            }
                        />
                    </div>

                    {/* Tanggal Lahir & Gender - 2 columns on md+ */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Tanggal Lahir */}
                        <div className="w-full">
                            <label className={labelClass} htmlFor="dob">
                                Tanggal Lahir*
                            </label>
                            <input
                                className={inputClass}
                                id="dob"
                                type="date"
                                required
                                value={bookingData.birthdate}
                                onChange={(e) =>
                                    handleInputChange(
                                        'birthdate',
                                        e.target.value,
                                    )
                                }
                            />
                        </div>

                        {/* Jenis Kelamin */}
                        <div className="w-full">
                            <label className={labelClass}>Jenis Kelamin*</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="relative cursor-pointer">
                                    <input
                                        className="peer sr-only"
                                        name="gender"
                                        type="radio"
                                        value="male"
                                        checked={bookingData.gender === 'male'}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'gender',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <div
                                        className={`flex h-[46px] items-center gap-2 rounded-lg border px-3 py-3 transition-colors ${
                                            bookingData.gender === 'male'
                                                ? 'border-primary bg-blue-50 text-primary'
                                                : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div
                                            className={`size-4 shrink-0 rounded-full border transition-all ${
                                                bookingData.gender === 'male'
                                                    ? 'border-primary bg-primary shadow-[inset_0_0_0_2px_white]'
                                                    : 'border-gray-400'
                                            }`}
                                        ></div>
                                        <span className="text-sm">
                                            Laki-laki
                                        </span>
                                    </div>
                                </label>
                                <label className="relative cursor-pointer">
                                    <input
                                        className="peer sr-only"
                                        name="gender"
                                        type="radio"
                                        value="female"
                                        checked={
                                            bookingData.gender === 'female'
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                'gender',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <div
                                        className={`flex h-[46px] items-center gap-2 rounded-lg border px-3 py-3 transition-colors ${
                                            bookingData.gender === 'female'
                                                ? 'border-primary bg-blue-50 text-primary'
                                                : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div
                                            className={`size-4 shrink-0 rounded-full border transition-all ${
                                                bookingData.gender === 'female'
                                                    ? 'border-primary bg-primary shadow-[inset_0_0_0_2px_white]'
                                                    : 'border-gray-400'
                                            }`}
                                        ></div>
                                        <span className="text-sm">
                                            Perempuan
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-border-light" />

                {/* Section 2: Kontak */}
                <div className="flex flex-col gap-4">
                    <h3 className="flex items-center gap-2 text-base font-bold text-text-light">
                        <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-primary">
                            2
                        </span>
                        Kontak
                    </h3>

                    {/* Nomor WhatsApp */}
                    <div className="w-full">
                        <label className={labelClass} htmlFor="whatsapp">
                            Nomor WhatsApp*
                        </label>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-sm font-medium text-gray-500">
                                    📞
                                </span>
                                <div className="ml-2 h-4 w-px bg-gray-300"></div>
                            </div>
                            <input
                                className={`${inputClass} pl-[55px] pr-4`}
                                id="whatsapp"
                                placeholder="6281234567890"
                                type="tel"
                                required
                                value={bookingData.whatsapp}
                                onChange={(e) => {
                                    const value = e.target.value.replace(
                                        /\D/g,
                                        '',
                                    );
                                    handleInputChange('whatsapp', value);
                                }}
                            />
                        </div>
                        <p className="text-text-secondary mt-1 text-xs">
                            Nomor ini akan digunakan untuk konfirmasi booking.
                        </p>
                    </div>
                </div>

                <hr className="border-border-light" />

                {/* Section 3: Alamat Domisili */}
                <div className="flex flex-col gap-4">
                    <h3 className="flex items-center gap-2 text-base font-bold text-text-light">
                        <span className="flex size-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-primary">
                            3
                        </span>
                        Alamat Domisili
                    </h3>

                    {isAddressPreFilled ? (
                        <div className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3">
                            <p className="text-sm text-text-light">
                                {bookingData.address}
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Alamat dari data pasien terdaftar
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Location Dropdowns - 2 columns grid */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Province */}
                                <div className="w-full">
                                    <label
                                        className={labelClass}
                                        htmlFor="provinsi"
                                    >
                                        Provinsi*
                                    </label>
                                    <select
                                        className={selectClass}
                                        id="provinsi"
                                        value={bookingData.provinceId}
                                        onChange={handleProvinceChange}
                                    >
                                        <option disabled value="">
                                            Pilih Provinsi
                                        </option>
                                        {provinces.map((province) => (
                                            <option
                                                key={province.id}
                                                value={province.id}
                                            >
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* City */}
                                <div className="w-full">
                                    <label
                                        className={labelClass}
                                        htmlFor="kota"
                                    >
                                        Kota/Kabupaten*
                                    </label>
                                    <select
                                        className={selectClass}
                                        id="kota"
                                        value={bookingData.cityId}
                                        onChange={handleCityChange}
                                        disabled={
                                            !bookingData.provinceId ||
                                            isLoadingCities
                                        }
                                    >
                                        <option disabled value="">
                                            {isLoadingCities
                                                ? 'Memuat...'
                                                : 'Pilih Kota'}
                                        </option>
                                        {cities.map((city) => (
                                            <option
                                                key={city.id}
                                                value={city.id}
                                            >
                                                {city.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* District */}
                                <div className="w-full">
                                    <label
                                        className={labelClass}
                                        htmlFor="kecamatan"
                                    >
                                        Kecamatan*
                                    </label>
                                    <select
                                        className={selectClass}
                                        id="kecamatan"
                                        value={bookingData.districtId}
                                        onChange={handleDistrictChange}
                                        disabled={
                                            !bookingData.cityId ||
                                            isLoadingDistricts
                                        }
                                    >
                                        <option disabled value="">
                                            {isLoadingDistricts
                                                ? 'Memuat...'
                                                : 'Pilih Kecamatan'}
                                        </option>
                                        {districts.map((district) => (
                                            <option
                                                key={district.id}
                                                value={district.id}
                                            >
                                                {district.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Village */}
                                <div className="w-full">
                                    <label
                                        className={labelClass}
                                        htmlFor="desa"
                                    >
                                        Desa/Kelurahan*
                                    </label>
                                    <select
                                        className={selectClass}
                                        id="desa"
                                        value={bookingData.villageId}
                                        onChange={handleVillageChange}
                                        disabled={
                                            !bookingData.districtId ||
                                            isLoadingVillages
                                        }
                                    >
                                        <option disabled value="">
                                            {isLoadingVillages
                                                ? 'Memuat...'
                                                : 'Pilih Desa'}
                                        </option>
                                        {villages.map((village) => (
                                            <option
                                                key={village.id}
                                                value={village.id}
                                            >
                                                {village.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Alamat Lengkap */}
                            {/* <div className="w-full">
                                <label className={labelClass} htmlFor="address">
                                    Alamat Lengkap*
                                </label>
                                <textarea
                                    className={`${inputClass} min-h-[80px]`}
                                    id="address"
                                    placeholder="Nama jalan, nomor rumah, RT/RW, patokan..."
                                    value={bookingData.address}
                                    onChange={(e) =>
                                        handleInputChange(
                                            'address',
                                            e.target.value,
                                        )
                                    }
                                />
                            </div> */}
                        </>
                    )}
                </div>

                {/* Verification Warning */}
                {!bookingData.isNikChecked && !isCreateMode && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                        <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[20px]">
                                warning
                            </span>
                            <p>
                                <strong>Verifikasi diperlukan:</strong>
                                {
                                    ' Klik "Cek NIK" untuk memverifikasi NIK Anda.'
                                }
                            </p>
                        </div>
                    </div>
                )}

                {/* CTA Buttons */}
                <div className="mt-2 pt-4">
                    {isEditMode && patientId ? (
                        /* Edit Mode: Update patient button */
                        <button
                            type="button"
                            disabled={!isFormValid}
                            onClick={() => {
                                if (isFormValid) {
                                    router.put(
                                        `/admin/patients/${patientId}/update`,
                                        {
                                            patient_name: bookingData.fullName,
                                            patient_nik: bookingData.nik,
                                            patient_phone: bookingData.whatsapp,
                                            patient_birthdate:
                                                bookingData.birthdate,
                                            patient_email:
                                                bookingData.email || null,
                                            patient_address:
                                                bookingData.address,
                                            gender: bookingData.gender,
                                            province_id:
                                                bookingData.provinceId || null,
                                            city_id: bookingData.cityId || null,
                                            district_id:
                                                bookingData.districtId || null,
                                            village_id:
                                                bookingData.villageId || null,
                                        },
                                    );
                                }
                            }}
                            className={`flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold shadow-lg transition-all ${
                                isFormValid
                                    ? 'transform cursor-pointer bg-primary text-white shadow-primary/30 hover:bg-primary-dark active:scale-[0.99]'
                                    : 'cursor-not-allowed bg-gray-300 text-gray-500'
                            }`}
                        >
                            <span>Simpan Perubahan</span>
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                                save
                            </span>
                        </button>
                    ) : isCreateMode ? (
                        <button
                            type="button"
                            disabled={!isFormValid}
                            onClick={() => {
                                if (isFormValid) {
                                    router.post('/admin/patients/store', {
                                        patient_name: bookingData.fullName,
                                        patient_nik: bookingData.nik,
                                        patient_phone: bookingData.whatsapp,
                                        patient_birthdate:
                                            bookingData.birthdate,
                                        patient_address: bookingData.address,
                                        gender: bookingData.gender,
                                        medical_records:
                                            bookingData.medicalRecords,
                                    });
                                }
                            }}
                            className={`flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold shadow-lg transition-all ${
                                isFormValid
                                    ? 'transform cursor-pointer bg-primary text-white shadow-primary/30 hover:bg-primary-dark active:scale-[0.99]'
                                    : 'cursor-not-allowed bg-gray-300 text-gray-500'
                            }`}
                        >
                            <span>Simpan Pasien</span>
                            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                                save
                            </span>
                        </button>
                    ) : isAdmin ? (
                        /* Admin: Save booking then redirect to WhatsApp */
                        <button
                            type="button"
                            disabled={!isFormValid || isSubmitting}
                            onClick={handleAdminWhatsAppConfirmation}
                            className={`flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-base font-bold shadow-lg transition-all ${
                                isFormValid && !isSubmitting
                                    ? 'transform cursor-pointer bg-green-600 text-white shadow-green-600/30 hover:bg-green-700 active:scale-[0.99]'
                                    : 'cursor-not-allowed bg-gray-300 text-gray-500'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="animate-spin">⏳</span>
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[20px]">
                                        chat
                                    </span>
                                    <span>Simpan & Kirim via WhatsApp</span>
                                </>
                            )}
                        </button>
                    ) : (
                        /* Patient: Back + Continue buttons */
                        <>
                            <div className="flex flex-col gap-3 sm:flex-row-reverse">
                                {isFormValid ? (
                                    <Link
                                        href={`/doctors/${doctorId}/booking/patient-data/review`}
                                        className="group flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary-dark active:scale-[0.99] sm:flex-1"
                                    >
                                        <span>Lanjut ke Review</span>
                                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                                            arrow_forward
                                        </span>
                                    </Link>
                                ) : (
                                    <button
                                        type="button"
                                        disabled
                                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-300 px-8 py-4 text-base font-bold text-gray-500 sm:flex-1"
                                    >
                                        <span>Lanjut ke Review</span>
                                        <span className="material-symbols-outlined">
                                            arrow_forward
                                        </span>
                                    </button>
                                )}
                                <Link
                                    href={`/doctors/${doctorId}/booking`}
                                    className="group flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-4 text-base font-medium text-gray-700 transition-all hover:bg-gray-50 sm:w-auto"
                                >
                                    <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
                                        arrow_back
                                    </span>
                                    <span>Kembali</span>
                                </Link>
                            </div>
                            <p className="text-text-secondary mt-4 flex items-center justify-center gap-1 text-center text-xs opacity-80">
                                <span className="material-symbols-outlined text-sm">
                                    lock
                                </span>
                                Data Anda terlindungi
                            </p>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
