import { ProfileCard } from '@/Components/admin/doctors/detail/ProfileCard';
import { RecentBookingsCard } from '@/Components/admin/doctors/detail/RecentBookingsCard';
import { ScheduleCard } from '@/Components/admin/doctors/detail/ScheduleCard';
import { StatsGrid } from '@/Components/admin/doctors/detail/StatsGrid';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface DoctorData {
    id: number;
    name: string;
    sip: string;
    experience: number;
    profile_pic: string | null;
    is_active: boolean;
    stats: {
        total_bookings: number;
        completed_bookings: number;
        unique_patients: number;
    };
    today_schedule: Array<{
        id: number;
        shift: string;
        start_time: string;
        end_time: string;
        is_active: boolean;
    }>;
    recent_bookings: Array<{
        id: number;
        patient_name: string;
        patient_avatar: string | null;
        treatment: string;
        date: string;
        time: string;
        status: string;
    }>;
}

interface Props {
    doctor: DoctorData;
}

const DetailDoctor = ({ doctor }: Props) => {
    return (
        <div className="flex h-full flex-col">
            <Head title={`Detail Dokter - ${doctor.name}`} />

            {/* Breadcrumb */}
            <nav className="mb-6 flex flex-wrap gap-2 text-sm text-slate-500">
                <Link href="/admin" className="font-medium hover:text-primary">
                    Beranda
                </Link>
                <span>/</span>
                <Link
                    href="/admin/doctors"
                    className="font-medium hover:text-primary"
                >
                    Manajemen Dokter
                </Link>
                <span>/</span>
                <span className="font-medium text-slate-900">
                    Detail Dokter
                </span>
            </nav>

            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                        Detail Dokter
                    </h1>
                    <p className="text-base text-slate-500">
                        Informasi lengkap profil dan performa dokter.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50">
                        <span className="material-symbols-outlined text-[20px]">
                            edit
                        </span>
                        <span>Edit Dokter</span>
                    </button>
                    <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-md shadow-primary/20 transition-colors hover:bg-sky-600">
                        <span className="material-symbols-outlined text-[20px]">
                            calendar_clock
                        </span>
                        <span>Kelola Jadwal</span>
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Left Column - Profile & Schedule */}
                <div className="flex flex-col gap-6 lg:col-span-4">
                    <ProfileCard doctor={doctor} />
                    <ScheduleCard schedule={doctor.today_schedule} />
                </div>

                {/* Right Column - Stats & Bookings */}
                <div className="flex flex-col gap-6 lg:col-span-8">
                    <StatsGrid stats={doctor.stats} />
                    <RecentBookingsCard bookings={doctor.recent_bookings} />
                </div>
            </div>
        </div>
    );
};

DetailDoctor.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default DetailDoctor;
