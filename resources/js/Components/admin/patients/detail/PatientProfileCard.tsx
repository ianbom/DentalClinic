import { useMemo } from 'react';

interface Patient {
    patient_name: string;
    patient_email: string | null;
    patient_nik: string;
    patient_phone: string;
    patient_gender: string;
    date_of_birth: string;
    patient_address: string;
    // Add other fields matching your DB model
}

interface PatientProfileCardProps {
    patient: Patient;
    totalVisits: number;
}

export function PatientProfileCard({
    patient,
    totalVisits,
}: PatientProfileCardProps) {
    const age = useMemo(() => {
        if (!patient.date_of_birth) return '-';
        const today = new Date();
        const birthDate = new Date(patient.date_of_birth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }, [patient.date_of_birth]);

    const formattedDate = useMemo(() => {
        if (!patient.date_of_birth) return '-';
        return new Date(patient.date_of_birth).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }, [patient.date_of_birth]);

    return (
        <div className="overflow-hidden rounded-xl border border-[#e7f0f4] bg-white shadow-sm dark:border-gray-800 dark:bg-[#15232b]">
            <div className="flex items-center justify-between border-b border-[#e7f0f4] px-6 py-4 dark:border-gray-800">
                <h3 className="font-bold text-[#0d171c] dark:text-white">
                    Data Diri
                </h3>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Aktif
                </span>
            </div>
            <div className="p-6">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Avatar Section */}
                    <div className="flex min-w-[120px] flex-col items-center gap-4">
                        <div
                            className="h-32 w-32 rounded-full border-4 border-[#e7f0f4] bg-cover bg-center dark:border-gray-700"
                            data-alt="Pasien profile photo"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCkBERmg9PvhrApMxq6Cc_Gb7s43whY6-CBsEMqhi_MWwm_jcebz_nQ6xsQzTAmGFxp1tWfzqzIomJcKeDLDy_Sp631oxGsUoP5w-Ds8dWHh_As6xxP4akxNQUAcEIyzJ_O38xxhDnehaiB7srY97W9bkYjmEVlLSiMQeaESfIwY15rp6BXlELCLPVpxfnlQa09HQfF7TYkc6hiAV94fu3bFwZgBOMBGcbgrcsoDN8JHtXCB487-YFeMrZLNUBuq3omEsQ4tg7MK21m")',
                            }}
                        ></div>
                        <div className="text-center">
                            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-[#49829c]">
                                Total Visits
                            </p>
                            <p className="text-xl font-bold text-[#0d171c] dark:text-white">
                                {totalVisits}
                            </p>
                        </div>
                    </div>
                    {/* Details Grid */}
                    <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#49829c]">
                                Nama Lengkap
                            </p>
                            <p className="text-base font-medium text-[#0d171c] dark:text-white">
                                {patient.patient_name}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#49829c]">
                                Email
                            </p>
                            <p className="text-base font-medium text-[#0d171c] dark:text-white">
                                {patient.patient_email || '-'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#49829c]">
                                Nomor Rekam Medis
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-[#49829c]">
                                    id_card
                                </span>
                                <p className="font-mono text-base font-medium text-[#0d171c] dark:text-white">
                                    RM-2023-8891
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#49829c]">
                                No. WhatsApp
                            </p>
                            <a
                                className="group flex w-fit items-center gap-2 font-medium text-green-600 transition-all hover:text-green-700"
                                href={`https://wa.me/${patient.patient_phone.replace(/^0/, '62')}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="flex items-center justify-center rounded-full bg-green-100 p-1 dark:bg-green-900/30">
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
                            <p className="text-xs font-medium uppercase tracking-wide text-[#49829c]">
                                NIK
                            </p>
                            <p className="text-base font-medium text-[#0d171c] dark:text-white">
                                {patient.patient_nik}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#49829c]">
                                Jenis Kelamin
                            </p>
                            <p className="text-base font-medium text-[#0d171c] dark:text-white">
                                {patient.patient_gender === 'L'
                                    ? 'Laki-laki'
                                    : 'Perempuan'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#49829c]">
                                Tanggal Lahir
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm text-[#49829c]">
                                    cake
                                </span>
                                <p className="text-base font-medium text-[#0d171c] dark:text-white">
                                    {formattedDate} ({age} Tahun)
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium uppercase tracking-wide text-[#49829c]">
                                Alamat Domisili
                            </p>
                            <p className="text-base font-medium leading-relaxed text-[#0d171c] dark:text-white">
                                {patient.patient_address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
