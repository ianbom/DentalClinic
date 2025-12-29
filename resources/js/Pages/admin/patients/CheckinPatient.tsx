import { CheckInHeader } from '@/Components/admin/patients/checkin/CheckInHeader';
import { CheckInResultCard } from '@/Components/admin/patients/checkin/CheckInResultCard';
import { CheckInSearchForm } from '@/Components/admin/patients/checkin/CheckInSearchForm';
import AdminLayout from '@/Layouts/AdminLayout';

function CheckInPage() {
    return (
        <div className="flex h-full flex-col bg-[#f8fbfc]">
            <div className="mx-auto w-full max-w-5xl flex-1">
                <CheckInHeader />
                <CheckInSearchForm />
                <CheckInResultCard />
            </div>
        </div>
    );
}

CheckInPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default CheckInPage;
