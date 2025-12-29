import { DoctorListClient } from '@/Components/doctors/DoctorListClient';
import PatientLayout from '@/Layouts/PatientLayout';
import { getDoctors } from '@/lib/doctors';

function DoctorPage() {
    const doctors = getDoctors();

    return <DoctorListClient doctors={doctors} />;
}

DoctorPage.layout = (page: React.ReactNode) => (
    <PatientLayout>{page}</PatientLayout>
);

export default DoctorPage;
