import { DoctorFilters } from '@/Components/admin/doctors/DoctorFilters';
import { DoctorListHeader } from '@/Components/admin/doctors/DoctorListHeader';
import { DoctorPagination } from '@/Components/admin/doctors/DoctorPagination';
import { DoctorTable } from '@/Components/admin/doctors/DoctorTable';
import AdminLayout from '@/Layouts/AdminLayout';

function DoctorsPage() {
    return (
        <div className="flex flex-col gap-6">
            <DoctorListHeader />
            <DoctorFilters />
            <div className="flex flex-col">
                <DoctorTable />
                <DoctorPagination />
            </div>
            {/* Footer Hint */}
            <div className="pb-8 text-center">
                <p className="text-xs text-slate-500">
                    © 2024 Klinik Gigi Sehat Admin Panel. All rights reserved.
                </p>
            </div>
        </div>
    );
}

DoctorsPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default DoctorsPage;
