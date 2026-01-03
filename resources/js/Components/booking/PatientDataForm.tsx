'use client';

import { useBooking } from '@/context/BookingContext';
import { Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Province {
    id: number;
    name: string;
    cities: City[];
}

interface City {
    id: number;
    name: string;
    districts: District[];
}

interface District {
    id: number;
    name: string;
}

interface CustomerDataFormProps {
    doctorId: string;
    isAdmin?: boolean;
    provinces?: Province[];
}

export function CustomerDataForm({
    doctorId,
    isAdmin = false,
    provinces = [],
}: CustomerDataFormProps) {
    const { bookingData, setBookingData } = useBooking();
    const [isVerifying, setIsVerifying] = useState(false);
    const [isCheckingNik, setIsCheckingNik] = useState(false);
    const [verificationError, setVerificationError] = useState('');
    const [nikMessage, setNikMessage] = useState<{
        type: 'success' | 'info' | 'error';
        text: string;
    } | null>(null);
    const [isAddressPreFilled, setIsAddressPreFilled] = useState(false);

    // Derived lists for cascading dropdowns
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);

    // Update cities when province changes
    useEffect(() => {
        if (bookingData.provinceId) {
            const selectedProvince = provinces.find(
                (p) => String(p.id) === bookingData.provinceId
            );
            setCities(selectedProvince?.cities || []);
        } else {
            setCities([]);
        }
        // Reset city and district when province changes
        if (!bookingData.provinceId) {
            setBookingData({ cityId: '', cityName: '', districtId: '', districtName: '' });
        }
    }, [bookingData.provinceId, provinces]);

    // Update districts when city changes
    useEffect(() => {
        if (bookingData.cityId && cities.length > 0) {
            const selectedCity = cities.find(
                (c) => String(c.id) === bookingData.cityId
            );
            setDistricts(selectedCity?.districts || []);
        } else {
            setDistricts([]);
        }
        // Reset district when city changes
        if (!bookingData.cityId) {
            setBookingData({ districtId: '', districtName: '' });
        }
    }, [bookingData.cityId, cities]);

    // Update address when location selection changes
    useEffect(() => {
        if (bookingData.districtName && bookingData.cityName && bookingData.provinceName) {
            const fullAddress = `${bookingData.districtName}, ${bookingData.cityName}, ${bookingData.provinceName}`;
            setBookingData({ address: fullAddress });
        }
    }, [bookingData.districtName, bookingData.cityName, bookingData.provinceName]);

    const handleInputChange = (field: string, value: string) => {
        // Auto-capitalize for fullName
        const processedValue = field === 'fullName' ? value.toUpperCase() : value;

        setBookingData({ [field]: processedValue });
        // Reset verification error when phone number changes
        if (field === 'whatsapp') {
            setVerificationError('');
        }
        // Reset NIK check when NIK changes
        if (field === 'nik') {
            setBookingData({ isNikChecked: false });
            setNikMessage(null);
        }
    };

    const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const provinceId = e.target.value;
        const selectedProvince = provinces.find((p) => String(p.id) === provinceId);
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
        const selectedDistrict = districts.find((d) => String(d.id) === districtId);
        setBookingData({
            districtId,
            districtName: selectedDistrict?.name || '',
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
                        };
                    };

                    if (flash?.nikCheck?.found && flash.nikCheck.patient) {
                        // Auto-fill form with existing patient data
                        const hasExistingAddress = !!flash.nikCheck.patient.patient_address;
                        setBookingData({
                            fullName: flash.nikCheck.patient.patient_name?.toUpperCase() || '',
                            whatsapp:
                                flash.nikCheck.patient.patient_phone || '',
                            birthdate:
                                flash.nikCheck.patient.patient_birthdate || '',
                            address:
                                flash.nikCheck.patient.patient_address || '',
                            gender: (flash.nikCheck.patient.gender as 'male' | 'female') || '',
                            isNikChecked: true,
                            // If address exists, set districtId to a placeholder to pass validation
                            districtId: hasExistingAddress ? 'prefilled' : '',
                        });
                        setIsAddressPreFilled(hasExistingAddress);
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

    const handleVerifyWhatsApp = () => {
        if (!bookingData.whatsapp || bookingData.whatsapp.length < 10) {
            setVerificationError('Masukkan nomor WhatsApp yang valid');
            return;
        }

        setIsVerifying(true);
        setVerificationError('');

        router.post(
            '/verify-wa',
            { patient_phone: bookingData.whatsapp },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setBookingData({ isWhatsappVerified: true });
                    setIsVerifying(false);
                },
                onError: () => {
                    setVerificationError(
                        'Gagal mengirim pesan verifikasi. Coba lagi.',
                    );
                    setIsVerifying(false);
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
        (bookingData.districtId !== '' || bookingData.address.trim() !== '') &&
        bookingData.isWhatsappVerified &&
        bookingData.isNikChecked;

    return (
        <div className="flex flex-col gap-6">
            {/* Page Heading */}
            <div className="flex flex-col gap-2 border-b border-subtle-light pb-6">
                <h1 className="text-3xl font-bold leading-tight text-text-light">
                    Isi Data Diri
                </h1>
                <p className="text-sm text-gray-500">
                    Pastikan nomor WhatsApp aktif untuk verifikasi pesanan dan
                    notifikasi jadwal.
                </p>
            </div>

            {/* Form Fields */}
            <form className="flex flex-col gap-6">
                {/* NIK with Check Button */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-sm font-medium text-text-light"
                        htmlFor="nik"
                    >
                        NIK (Nomor Induk Kependudukan)*
                    </label>
                    <div className="flex gap-2">
                        <input
                            className={`flex h-12 flex-1 rounded-lg border bg-white px-4 py-3 text-base text-text-light transition-shadow placeholder:text-gray-400 focus:outline-none focus:ring-1 ${nikMessage?.type === 'success'
                                ? 'border-green-300 focus:border-green-400 focus:ring-green-400'
                                : nikMessage?.type === 'error'
                                    ? 'border-red-300 focus:border-red-400 focus:ring-red-400'
                                    : 'border-gray-200 focus:border-primary focus:ring-primary'
                                }`}
                            id="nik"
                            placeholder="Masukkan 16 digit NIK Anda"
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
                            className={`flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 text-sm font-medium transition-all ${isCheckingNik || bookingData.nik.length < 16
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
                    </div>

                    {/* NIK Message */}
                    {nikMessage && (
                        <div
                            className={`mt-2 rounded-lg border p-3 text-sm ${nikMessage.type === 'success'
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

                    {!bookingData.isNikChecked && !nikMessage && (
                        <p className="mt-1 text-xs text-gray-400">
                            Klik tombol "Cek NIK" untuk memverifikasi dan
                            melihat apakah data Anda sudah terdaftar.
                        </p>
                    )}
                </div>

                {/* Nama Lengkap */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-sm font-medium text-text-light"
                        htmlFor="fullname"
                    >
                        Nama Lengkap*
                    </label>
                    <input
                        className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-text-light uppercase transition-shadow placeholder:text-gray-400 placeholder:normal-case focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        id="fullname"
                        placeholder="Masukkan nama lengkap Anda sesuai KTP"
                        type="text"
                        required
                        value={bookingData.fullName}
                        onChange={(e) =>
                            handleInputChange('fullName', e.target.value)
                        }
                    />
                </div>

                {/* Gender Selection */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-light">
                        Jenis Kelamin*
                    </label>
                    <div className="flex gap-4">
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={bookingData.gender === 'male'}
                                onChange={(e) =>
                                    handleInputChange('gender', e.target.value)
                                }
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-text-light">Laki-laki</span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 transition-all hover:border-primary has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={bookingData.gender === 'female'}
                                onChange={(e) =>
                                    handleInputChange('gender', e.target.value)
                                }
                                className="h-4 w-4 text-primary focus:ring-primary"
                            />
                            <span className="text-sm text-text-light">Perempuan</span>
                        </label>
                    </div>
                </div>

                {/* Tanggal Lahir */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-sm font-medium text-text-light"
                        htmlFor="birthdate"
                    >
                        Tanggal Lahir*
                    </label>
                    <input
                        className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-text-light transition-shadow placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        id="birthdate"
                        type="date"
                        required
                        value={bookingData.birthdate}
                        onChange={(e) =>
                            handleInputChange('birthdate', e.target.value)
                        }
                    />
                </div>

                {/* Location Dropdowns */}
                <div className="flex flex-col gap-4">
                    <label className="text-sm font-medium text-text-light">
                        Alamat*
                    </label>

                    {isAddressPreFilled ? (
                        <div className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3">
                            <p className="text-base text-text-light">{bookingData.address}</p>
                            <p className="mt-1 text-xs text-gray-500">Alamat dari data pasien terdaftar</p>
                        </div>
                    ) : (
                        <>
                            {/* Province */}
                            <div className="flex flex-col gap-2">
                                <select
                                    className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-text-light transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={bookingData.provinceId}
                                    onChange={handleProvinceChange}
                                >
                                    <option value="">Pilih Provinsi</option>
                                    {provinces.map((province) => (
                                        <option key={province.id} value={province.id}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* City */}
                            <div className="flex flex-col gap-2">
                                <select
                                    className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-text-light transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-100 disabled:text-gray-400"
                                    value={bookingData.cityId}
                                    onChange={handleCityChange}
                                    disabled={!bookingData.provinceId}
                                >
                                    <option value="">Pilih Kota/Kabupaten</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* District */}
                            <div className="flex flex-col gap-2">
                                <select
                                    className="flex h-12 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-text-light transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-100 disabled:text-gray-400"
                                    value={bookingData.districtId}
                                    onChange={handleDistrictChange}
                                    disabled={!bookingData.cityId}
                                >
                                    <option value="">Pilih Kecamatan</option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.id}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Display selected address */}
                            {bookingData.address && (
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">Alamat terpilih:</span> {bookingData.address}
                                </p>
                            )}
                        </>
                    )}
                </div>

                {/* Nomor WhatsApp */}
                <div className="flex flex-col gap-2">
                    <label
                        className="text-sm font-medium text-text-light"
                        htmlFor="whatsapp"
                    >
                        Nomor WhatsApp*
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <span className="font-medium text-gray-500">
                                📞
                            </span>
                            <div className="ml-2 h-4 w-px bg-gray-300"></div>
                        </div>
                        <input
                            className={`flex h-12 w-full rounded-lg border bg-white py-3 pl-[70px] pr-4 text-base text-text-light transition-shadow placeholder:text-gray-400 focus:outline-none focus:ring-1 ${bookingData.isWhatsappVerified
                                ? 'border-green-300 focus:border-green-400 focus:ring-green-400'
                                : 'border-gray-200 focus:border-primary focus:ring-primary'
                                }`}
                            id="whatsapp"
                            placeholder="0812-3456-7890"
                            type="tel"
                            required
                            value={bookingData.whatsapp}
                            onChange={(e) =>
                                handleInputChange('whatsapp', e.target.value)
                            }
                        />
                        {bookingData.isWhatsappVerified && (
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                <span className="material-symbols-outlined text-green-500">
                                    verified
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Verify WhatsApp Button */}
                    {!bookingData.isWhatsappVerified && (
                        <button
                            type="button"
                            onClick={handleVerifyWhatsApp}
                            disabled={
                                isVerifying ||
                                !bookingData.whatsapp ||
                                bookingData.whatsapp.length < 10
                            }
                            className={`mt-2 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${isVerifying ||
                                !bookingData.whatsapp ||
                                bookingData.whatsapp.length < 10
                                ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                                : 'cursor-pointer bg-green-100 text-green-700 hover:bg-green-200'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                {isVerifying ? 'hourglass_empty' : 'send'}
                            </span>
                            {isVerifying
                                ? 'Mengirim...'
                                : 'Kirim Verifikasi WhatsApp'}
                        </button>
                    )}

                    {/* Success Message */}
                    {bookingData.isWhatsappVerified && (
                        <div className="mt-2 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    check_circle
                                </span>
                                <p>
                                    Nomor WhatsApp telah terverifikasi. Anda
                                    dapat melanjutkan proses booking.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {verificationError && (
                        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-[18px]">
                                    error
                                </span>
                                <p>{verificationError}</p>
                            </div>
                        </div>
                    )}

                    {!bookingData.isWhatsappVerified && (
                        <p className="mt-1 text-xs text-gray-400">
                            Klik tombol di atas untuk memverifikasi nomor
                            WhatsApp Anda sebelum melanjutkan.
                        </p>
                    )}
                </div>

                {/* Verification Warning */}
                {(!bookingData.isWhatsappVerified ||
                    !bookingData.isNikChecked) && (
                        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                            <div className="flex items-start gap-2">
                                <span className="material-symbols-outlined text-[20px]">
                                    warning
                                </span>
                                <p>
                                    <strong>Verifikasi diperlukan:</strong>
                                    {!bookingData.isNikChecked &&
                                        ' Klik "Cek NIK" untuk memverifikasi NIK Anda.'}
                                    {!bookingData.isWhatsappVerified &&
                                        ' Verifikasi nomor WhatsApp sebelum melanjutkan.'}
                                </p>
                            </div>
                        </div>
                    )}

                {/* CTA Buttons */}
                <div className="mt-4 flex flex-col justify-end gap-3 border-t border-subtle-light pt-4 sm:flex-row">
                    {isAdmin ? (
                        /* Admin: Single "Simpan Booking" button */
                        <button
                            type="button"
                            disabled={!isFormValid}
                            onClick={() => {
                                if (isFormValid) {
                                    router.post('/admin/bookings/store', {
                                        doctor_id: doctorId,
                                        patient_name: bookingData.fullName,
                                        patient_nik: bookingData.nik,
                                        patient_phone: bookingData.whatsapp,
                                        patient_birthdate:
                                            bookingData.birthdate,
                                        patient_address: bookingData.address,
                                        gender: bookingData.gender,
                                        booking_date:
                                            bookingData.rawSelectedDate,
                                        start_time:
                                            bookingData.selectedTime || null,
                                        service: bookingData.service,
                                        type:
                                            bookingData.serviceType ||
                                            'sisipan',
                                    });
                                }
                            }}
                            className={`flex w-full items-center justify-center gap-2 rounded-lg px-8 py-3 font-bold transition-all md:w-auto ${isFormValid
                                ? 'cursor-pointer bg-primary text-white hover:bg-primary-dark focus:ring-4 focus:ring-primary/20'
                                : 'cursor-not-allowed bg-gray-300 text-gray-500'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[20px]">
                                save
                            </span>
                            <span>Simpan Booking</span>
                        </button>
                    ) : (
                        /* Patient: Back + Continue buttons */
                        <>
                            {/* Tombol Kembali */}
                            <Link
                                href={`/doctors/${doctorId}/booking`}
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 md:w-auto"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    arrow_back
                                </span>
                                <span>Kembali</span>
                            </Link>

                            {/* Tombol Lanjut */}
                            {isFormValid ? (
                                <Link
                                    href={`/doctors/${doctorId}/booking/patient-data/review`}
                                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3 font-bold text-white transition-all hover:bg-primary-dark focus:ring-4 focus:ring-primary/20 md:w-auto"
                                >
                                    <span>Lanjut ke Review</span>
                                    <span className="material-symbols-outlined text-[20px]">
                                        arrow_forward
                                    </span>
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    disabled
                                    className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-300 px-8 py-3 font-bold text-gray-500 md:w-auto"
                                >
                                    <span>Lanjut ke Review</span>
                                    <span className="material-symbols-outlined text-[20px]">
                                        arrow_forward
                                    </span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
