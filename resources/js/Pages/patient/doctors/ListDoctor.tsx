import { DoctorListClient } from '@/Components/doctors/DoctorListClient';
import PatientLayout from '@/Layouts/PatientLayout';
import { Doctor } from '@/types';

interface DoctorPageProps {
    doctors: Doctor[];
}

function DoctorPage({ doctors }: DoctorPageProps) {
    return <DoctorListClient doctors={doctors} />;
}

DoctorPage.layout = (page: React.ReactNode) => (
    <PatientLayout>{page}</PatientLayout>
);

export default DoctorPage;
