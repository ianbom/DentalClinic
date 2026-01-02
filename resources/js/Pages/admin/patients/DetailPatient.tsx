import {
    BookingFilters,
    useBookingFilters,
} from '@/Components/admin/bookings/BookingFilters';
import {
    BookingTable,
    SortField,
    SortOrder,
} from '@/Components/admin/bookings/BookingTable';
import AdminLayout from '@/Layouts/AdminLayout';
import { BookingFullItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface Patient {
    id: number;
    medical_records: string | null;
    patient_name: string;
    patient_nik: string;
    patient_email: string | null;
    patient_phone: string;
    patient_birthdate: string | null;
    patient_address: string | null;
}

interface DoctorOption {
    id: number;
    name: string;
}

interface DetailPatientProps {
    patient: Patient;
    bookings: BookingFullItem[];
    doctors: DoctorOption[];
    total_visits: number;
}

export default function DetailPatient({
    patient,
    bookings,
    doctors,
    total_visits,
}: DetailPatientProps) {
    // Filter states
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [doctorFilter, setDoctorFilter] = useState('');

    // Sorting states
    const [sortField, setSortField] = useState<SortField>('booking_date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    const { filterBookings } = useBookingFilters(bookings);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setStatusFilter('');
        setDateFilter('');
        setDoctorFilter('');
    };

    // Filter and sort bookings
    const processedBookings = useMemo(() => {
        let result = filterBookings(
            searchQuery,
            statusFilter,
            dateFilter,
            doctorFilter,
        );

        // Sort
        if (sortField) {
            result = [...result].sort((a, b) => {
                let aVal: string | number = '';
                let bVal: string | number = '';

                if (sortField === 'booking_date') {
                    aVal = a.booking_date;
                    bVal = b.booking_date;
                } else if (sortField === 'created_at') {
                    aVal = a.created_at;
                    bVal = b.created_at;
                } else if (sortField === 'patient_name') {
                    aVal = a.patient_name.toLowerCase();
                    bVal = b.patient_name.toLowerCase();
                }

                if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [
        filterBookings,
        searchQuery,
        statusFilter,
        dateFilter,
        doctorFilter,
        sortField,
        sortOrder,
    ]);

    const age = useMemo(() => {
        if (!patient.patient_birthdate) return '-';
        const today = new Date();
        const birthDate = new Date(patient.patient_birthdate);
        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            calculatedAge--;
        }
        return calculatedAge;
    }, [patient.patient_birthdate]);

    const formattedBirthdate = useMemo(() => {
        if (!patient.patient_birthdate) return '-';
        return new Date(patient.patient_birthdate).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }, [patient.patient_birthdate]);

    return (
        <div className="flex h-full flex-col bg-[#f5f7f8]">
            <Head title={`Detail Pasien - ${patient.patient_name}`} />

            <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-6 pb-10">
                {/* Breadcrumbs */}
                <nav className="flex text-sm font-medium text-[#49829c]">
                    <Link
                        className="transition-colors hover:text-primary"
                        href="/admin/dashboard"
                    >
                        Home
                    </Link>
                    <span className="mx-2">/</span>
                    <Link
                        className="transition-colors hover:text-primary"
                        href="/admin/patients"
                    >
                        Manajemen Customer
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-primary">Detail Pasien</span>
                </nav>

                {/* Page Heading & Actions */}
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-black tracking-[-0.033em] text-[#0d171c]">
                            {patient.patient_name}
                        </h1>
                        <p className="text-sm text-[#49829c]">
                            Informasi lengkap dan riwayat medis pasien
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#e7f0f4] bg-white px-4 text-sm font-semibold text-[#0d171c] transition-colors hover:bg-gray-50">
                            <span className="material-symbols-outlined text-lg">
                                print
                            </span>
                            <span>Cetak</span>
                        </button>
                        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#0d171c] px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#1a2930]">
                            <span className="material-symbols-outlined text-lg">
                                edit
                            </span>
                            <span>Edit Profile</span>
                        </button>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-xl border border-[#e7f0f4] bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-[#e7f0f4] px-6 py-4">
                        <h3 className="font-bold text-[#0d171c]">Data Diri</h3>
                        <span className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-primary">
                            Aktif
                        </span>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col gap-8 md:flex-row">
                            {/* Avatar Section */}
                            <div className="flex min-w-[140px] flex-col items-center gap-4">
                                <div
                                    className="h-28 w-28 rounded-full border-4 border-[#e7f0f4] bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCkBERmg9PvhrApMxq6Cc_Gb7s43whY6-CBsEMqhi_MWwm_jcebz_nQ6xsQzTAmGFxp1tWfzqzIomJcKeDLDy_Sp631oxGsUoP5w-Ds8dWHh_As6xxP4akxNQUAcEIyzJ_O38xxhDnehaiB7srY97W9bkYjmEVlLSiMQeaESfIwY15rp6BXlELCLPVpxfnlQa09HQfF7TYkc6hiAV94fu3bFwZgBOMBGcbgrcsoDN8JHtXCB487-YFeMrZLNUBuq3omEsQ4tg7MK21m")',
                                    }}
                                ></div>
                                <div className="text-center">
                                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
                                        Total Visits
                                    </p>
                                    <p className="text-2xl font-bold text-[#0d171c]">
                                        {total_visits}
                                    </p>
                                </div>
                            </div>
                            {/* Details Grid */}
                            <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-2">
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                                        Nama Lengkap
                                    </p>
                                    <p className="text-base font-medium text-[#0d171c]">
                                        {patient.patient_name}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                                        Email
                                    </p>
                                    <p className="text-base font-medium text-[#0d171c]">
                                        {patient.patient_email || '-'}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                                        Nomor Rekam Medis
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-[#49829c]">
                                            id_card
                                        </span>
                                        <p className="font-mono text-base font-medium text-[#0d171c]">
                                            {patient.medical_records || '-'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                                        No. WhatsApp
                                    </p>
                                    <a
                                        className="group flex w-fit items-center gap-2 font-medium text-green-600 transition-all hover:text-green-700"
                                        href={`https://wa.me/${patient.patient_phone?.replace(/^0/, '62')}`}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <span className="flex items-center justify-center rounded-full bg-green-100 p-1">
                                            <svg
                                                className="h-4 w-4 fill-current"
                                                viewBox="0 0 448 512"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.9 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                                            </svg>
                                        </span>
                                        <span>{patient.patient_phone}</span>
                                        <span className="material-symbols-outlined text-sm opacity-0 transition-opacity group-hover:opacity-100">
                                            open_in_new
                                        </span>
                                    </a>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                                        NIK
                                    </p>
                                    <p className="text-base font-medium text-[#0d171c]">
                                        {patient.patient_nik}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                                        Jenis Kelamin
                                    </p>
                                    <p className="text-base font-medium text-[#0d171c]">
                                        Laki-laki
                                    </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                                        Tanggal Lahir
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm text-[#49829c]">
                                            cake
                                        </span>
                                        <p className="text-base font-medium text-[#0d171c]">
                                            {formattedBirthdate} ({age} Tahun)
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs font-medium uppercase tracking-wide text-primary">
                                        Alamat Domisili
                                    </p>
                                    <p className="text-base font-medium leading-relaxed text-[#0d171c]">
                                        {patient.patient_address || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking History */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-[#0d171c]">
                        Riwayat Booking
                    </h3>

                    <BookingFilters
                        searchQuery={searchQuery}
                        statusFilter={statusFilter}
                        dateFilter={dateFilter}
                        doctorFilter={doctorFilter}
                        doctors={doctors}
                        onSearchChange={setSearchQuery}
                        onStatusChange={setStatusFilter}
                        onDateChange={setDateFilter}
                        onDoctorChange={setDoctorFilter}
                        onClearFilters={handleClearFilters}
                    />

                    <BookingTable
                        bookings={processedBookings}
                        showExpandable={false}
                        showActions={true}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                        emptyMessage="Tidak ada riwayat booking."
                    />
                </div>
            </div>
        </div>
    );
}

DetailPatient.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);
