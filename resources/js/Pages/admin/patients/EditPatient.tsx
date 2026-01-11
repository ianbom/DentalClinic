import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
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

interface PatientData {
    id: number;
    medical_records: string | null;
    patient_nik: string | null;
    patient_name: string;
    patient_phone: string;
    patient_birthdate: string | null;
    patient_address: string | null;
    gender: 'male' | 'female';
    province_id: number | null;
    city_id: number | null;
    district_id: number | null;
    village_id: number | null;
}

interface Props {
    patient: PatientData;
    provinces: Province[];
}

export default function EditPatient({ patient, provinces }: Props) {
    const [formData, setFormData] = useState({
        medical_records: patient.medical_records || '',
        patient_name: patient.patient_name || '',
        patient_nik: patient.patient_nik || '',
        patient_phone: patient.patient_phone || '',
        patient_birthdate: patient.patient_birthdate
            ? patient.patient_birthdate.split('T')[0]
            : '',
        gender: patient.gender || 'male',
        province_id: patient.province_id ? String(patient.province_id) : '',
        city_id: patient.city_id ? String(patient.city_id) : '',
        district_id: patient.district_id ? String(patient.district_id) : '',
        village_id: patient.village_id ? String(patient.village_id) : '',
    });

    // Location names for address display
    const [provinceName, setProvinceName] = useState('');
    const [cityName, setCityName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [villageName, setVillageName] = useState('');

    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [villages, setVillages] = useState<Village[]>([]);
    const [isLoadingCities, setIsLoadingCities] = useState(false);
    const [isLoadingDistricts, setIsLoadingDistricts] = useState(false);
    const [isLoadingVillages, setIsLoadingVillages] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch cities when province changes
    useEffect(() => {
        if (formData.province_id) {
            setIsLoadingCities(true);
            const province = provinces.find(
                (p) => String(p.id) === formData.province_id,
            );
            if (province) setProvinceName(province.name);

            fetch(`/api/provinces/${formData.province_id}/cities`)
                .then((res) => res.json())
                .then((data) => {
                    setCities(data);
                    setIsLoadingCities(false);
                })
                .catch(() => setIsLoadingCities(false));
        } else {
            setCities([]);
            setDistricts([]);
            setVillages([]);
            setProvinceName('');
            setCityName('');
            setDistrictName('');
            setVillageName('');
        }
    }, [formData.province_id, provinces]);

    // Fetch districts when city changes
    useEffect(() => {
        if (formData.city_id) {
            setIsLoadingDistricts(true);
            const city = cities.find((c) => String(c.id) === formData.city_id);
            if (city) setCityName(city.name);

            fetch(`/api/cities/${formData.city_id}/districts`)
                .then((res) => res.json())
                .then((data) => {
                    setDistricts(data);
                    setIsLoadingDistricts(false);
                })
                .catch(() => setIsLoadingDistricts(false));
        } else {
            setDistricts([]);
            setVillages([]);
            setCityName('');
            setDistrictName('');
            setVillageName('');
        }
    }, [formData.city_id, cities]);

    // Fetch villages when district changes
    useEffect(() => {
        if (formData.district_id) {
            setIsLoadingVillages(true);
            const district = districts.find(
                (d) => String(d.id) === formData.district_id,
            );
            if (district) setDistrictName(district.name);

            fetch(`/api/districts/${formData.district_id}/villages`)
                .then((res) => res.json())
                .then((data) => {
                    setVillages(data);
                    setIsLoadingVillages(false);
                })
                .catch(() => setIsLoadingVillages(false));
        } else {
            setVillages([]);
            setDistrictName('');
            setVillageName('');
        }
    }, [formData.district_id, districts]);

    // Set village name when selected
    useEffect(() => {
        if (formData.village_id) {
            const village = villages.find(
                (v) => String(v.id) === formData.village_id,
            );
            if (village) setVillageName(village.name);
        } else {
            setVillageName('');
        }
    }, [formData.village_id, villages]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Reset dependent dropdowns
        if (name === 'province_id') {
            setFormData((prev) => ({
                ...prev,
                province_id: value,
                city_id: '',
                district_id: '',
                village_id: '',
            }));
        } else if (name === 'city_id') {
            setFormData((prev) => ({
                ...prev,
                city_id: value,
                district_id: '',
                village_id: '',
            }));
        } else if (name === 'district_id') {
            setFormData((prev) => ({
                ...prev,
                district_id: value,
                village_id: '',
            }));
        }
    };

    // Generate address from location names, fallback to old address
    const generatedAddress = [villageName, districtName, cityName, provinceName]
        .filter(Boolean)
        .join(', ');

    // Use generated address if any dropdown is selected, otherwise use old address
    const displayAddress = generatedAddress || patient.patient_address || '';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.put(
            `/admin/patients/${patient.id}/update`,
            {
                ...formData,
                patient_address: displayAddress || null,
                province_id: formData.province_id || null,
                city_id: formData.city_id || null,
                district_id: formData.district_id || null,
                village_id: formData.village_id || null,
            },
            {
                onFinish: () => setIsSubmitting(false),
            },
        );
    };

    const isFormValid =
        formData.patient_name.trim() !== '' &&
        formData.patient_phone.trim() !== '';

    const inputClass =
        'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';
    const selectClass =
        'w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-gray-100 disabled:text-gray-400';
    const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

    return (
        <AdminLayout>
            <Head title={`Edit Pasien - ${patient.patient_name}`} />

            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Link
                                href={route('admin.patients.list')}
                                className="hover:text-primary"
                            >
                                Pasien
                            </Link>
                            <span className="material-symbols-outlined text-sm">
                                chevron_right
                            </span>
                            <Link
                                href={route('admin.patients.show', patient.id)}
                                className="hover:text-primary"
                            >
                                {patient.patient_name}
                            </Link>
                            <span className="material-symbols-outlined text-sm">
                                chevron_right
                            </span>
                            <span className="text-slate-900">Edit</span>
                        </div>
                        <h1 className="mt-1 text-2xl font-bold text-slate-900">
                            Edit Data Pasien
                        </h1>
                    </div>
                </div>

                {/* Form Card */}
                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Section 1: Identitas */}
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                    1
                                </span>
                                Identitas Pasien
                            </h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Medical Records */}
                                <div>
                                    <label
                                        htmlFor="medical_records"
                                        className={labelClass}
                                    >
                                        No. Rekam Medis (6 digit)
                                    </label>
                                    <input
                                        type="text"
                                        id="medical_records"
                                        name="medical_records"
                                        value={formData.medical_records}
                                        onChange={(e) => {
                                            // Only allow digits, max 6
                                            const value = e.target.value
                                                .replace(/\D/g, '')
                                                .slice(0, 6);
                                            setFormData((prev) => ({
                                                ...prev,
                                                medical_records: value,
                                            }));
                                        }}
                                        onBlur={() => {
                                            // Pad with zeros on blur to make 6 digits
                                            if (formData.medical_records) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    medical_records:
                                                        prev.medical_records.padStart(
                                                            6,
                                                            '0',
                                                        ),
                                                }));
                                            }
                                        }}
                                        className={inputClass}
                                        placeholder="000001"
                                        maxLength={6}
                                    />
                                    <p className="mt-1 text-xs text-slate-500">
                                        Contoh: 000001, 000123
                                    </p>
                                </div>

                                {/* NIK */}
                                <div>
                                    <label
                                        htmlFor="patient_nik"
                                        className={labelClass}
                                    >
                                        NIK
                                    </label>
                                    <input
                                        type="text"
                                        id="patient_nik"
                                        name="patient_nik"
                                        value={formData.patient_nik}
                                        onChange={handleChange}
                                        className={inputClass}
                                        placeholder="16 digit NIK"
                                        maxLength={16}
                                    />
                                </div>

                                {/* Nama Lengkap */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="patient_name"
                                        className={labelClass}
                                    >
                                        Nama Lengkap *
                                    </label>
                                    <input
                                        type="text"
                                        id="patient_name"
                                        name="patient_name"
                                        value={formData.patient_name}
                                        onChange={handleChange}
                                        className={inputClass}
                                        placeholder="Nama lengkap pasien"
                                        required
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label
                                        htmlFor="gender"
                                        className={labelClass}
                                    >
                                        Jenis Kelamin *
                                    </label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className={selectClass}
                                        required
                                    >
                                        <option value="male">Laki-laki</option>
                                        <option value="female">
                                            Perempuan
                                        </option>
                                    </select>
                                </div>

                                {/* Birthdate */}
                                <div>
                                    <label
                                        htmlFor="patient_birthdate"
                                        className={labelClass}
                                    >
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        id="patient_birthdate"
                                        name="patient_birthdate"
                                        value={formData.patient_birthdate}
                                        onChange={handleChange}
                                        className={inputClass}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Kontak */}
                        <div className="space-y-4 border-t border-slate-100 pt-6">
                            <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                    2
                                </span>
                                Informasi Kontak
                            </h3>

                            <div>
                                <label
                                    htmlFor="patient_phone"
                                    className={labelClass}
                                >
                                    No. Telepon / WhatsApp *
                                </label>
                                <input
                                    type="tel"
                                    id="patient_phone"
                                    name="patient_phone"
                                    value={formData.patient_phone}
                                    onChange={handleChange}
                                    className={`${inputClass} max-w-md`}
                                    placeholder="08xxxxxxxxxx"
                                    required
                                />
                            </div>
                        </div>

                        {/* Section 3: Alamat */}
                        <div className="space-y-4 border-t border-slate-100 pt-6">
                            <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                                <span className="flex size-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                    3
                                </span>
                                Alamat
                            </h3>

                            <div className="grid gap-4 md:grid-cols-2">
                                {/* Province */}
                                <div>
                                    <label
                                        htmlFor="province_id"
                                        className={labelClass}
                                    >
                                        Provinsi
                                    </label>
                                    <select
                                        id="province_id"
                                        name="province_id"
                                        value={formData.province_id}
                                        onChange={handleChange}
                                        className={selectClass}
                                    >
                                        <option value="">Pilih Provinsi</option>
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
                                <div>
                                    <label
                                        htmlFor="city_id"
                                        className={labelClass}
                                    >
                                        Kota/Kabupaten
                                    </label>
                                    <select
                                        id="city_id"
                                        name="city_id"
                                        value={formData.city_id}
                                        onChange={handleChange}
                                        className={selectClass}
                                        disabled={
                                            !formData.province_id ||
                                            isLoadingCities
                                        }
                                    >
                                        <option value="">
                                            {isLoadingCities
                                                ? 'Memuat...'
                                                : 'Pilih Kota/Kabupaten'}
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
                                <div>
                                    <label
                                        htmlFor="district_id"
                                        className={labelClass}
                                    >
                                        Kecamatan
                                    </label>
                                    <select
                                        id="district_id"
                                        name="district_id"
                                        value={formData.district_id}
                                        onChange={handleChange}
                                        className={selectClass}
                                        disabled={
                                            !formData.city_id ||
                                            isLoadingDistricts
                                        }
                                    >
                                        <option value="">
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
                                <div>
                                    <label
                                        htmlFor="village_id"
                                        className={labelClass}
                                    >
                                        Kelurahan/Desa
                                    </label>
                                    <select
                                        id="village_id"
                                        name="village_id"
                                        value={formData.village_id}
                                        onChange={handleChange}
                                        className={selectClass}
                                        disabled={
                                            !formData.district_id ||
                                            isLoadingVillages
                                        }
                                    >
                                        <option value="">
                                            {isLoadingVillages
                                                ? 'Memuat...'
                                                : 'Pilih Kelurahan/Desa'}
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

                                {/* Generated Address (Read-only) */}
                                <div className="md:col-span-2">
                                    <label className={labelClass}>
                                        Alamat Lengkap
                                    </label>
                                    <div className="min-h-[60px] rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-600">
                                        {displayAddress || (
                                            <span className="italic text-gray-400">
                                                Belum ada alamat
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
                            <Link
                                href={route('admin.patients.show', patient.id)}
                                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    close
                                </span>
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={!isFormValid || isSubmitting}
                                className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition-all ${
                                    isFormValid && !isSubmitting
                                        ? 'bg-primary text-white hover:bg-primary-dark'
                                        : 'cursor-not-allowed bg-gray-300 text-gray-500'
                                }`}
                            >
                                <span className="material-symbols-outlined text-lg">
                                    save
                                </span>
                                {isSubmitting
                                    ? 'Menyimpan...'
                                    : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
