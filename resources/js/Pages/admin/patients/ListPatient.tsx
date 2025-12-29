import { PatientFilters } from '@/Components/admin/patients/PatientFilters';
import { PatientListHeader } from '@/Components/admin/patients/PatientListHeader';
import { PatientPagination } from '@/Components/admin/patients/PatientPagination';
import { PatientTable } from '@/Components/admin/patients/PatientTable';
import AdminLayout from '@/Layouts/AdminLayout';

function PatientsPage() {
    return (
        <div className="flex flex-col gap-6">
            <PatientListHeader />
            <div className="flex flex-col rounded-xl shadow-sm">
                <PatientFilters />
                <PatientTable />
                <PatientPagination />
            </div>
            <footer className="mt-8 pb-8 text-center text-xs text-slate-400">
                © 2024 Dental Clinic Admin. All rights reserved.
            </footer>
        </div>
    );
}

PatientsPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default PatientsPage;
