import { BookingCalendar } from '@/Components/doctor-detail/BookingCalendar';
import { DoctorProfileHeader } from '@/Components/doctor-detail/DoctorProfileHeader';
import PatientLayout from '@/Layouts/PatientLayout';
import { getDoctorById } from '@/lib/doctors';

interface DoctorDetailPageProps {
    id: string;
}

function DoctorDetailPage({ id }: DoctorDetailPageProps) {
    const doctor = getDoctorById(id);

    if (!doctor) {
        return <div>Dokter tidak ditemukan</div>;
    }

    return (
        <div className="mx-auto w-full max-w-[960px] flex-grow px-4 py-8 pb-24 font-display">
            <DoctorProfileHeader doctor={doctor} />
            <BookingCalendar doctor={doctor} doctorId={id} />
            <div className="h-20"></div>
        </div>
    );
}

DoctorDetailPage.layout = (page: React.ReactNode) => (
    <PatientLayout>{page}</PatientLayout>
);

export default DoctorDetailPage;
