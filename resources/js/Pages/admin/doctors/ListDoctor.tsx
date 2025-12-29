import { DoctorListHeader } from "@/app/components/admin/doctors/DoctorListHeader";
import { DoctorFilters } from "@/app/components/admin/doctors/DoctorFilters";
import { DoctorTable } from "@/app/components/admin/doctors/DoctorTable";
import { DoctorPagination } from "@/app/components/admin/doctors/DoctorPagination";

export const metadata = {
    title: "Manajemen Dokter - Klinik Gigi Sehat",
};

export default function DoctorsPage() {
    return (
        <div className="flex flex-col gap-6">
            <DoctorListHeader />
            <DoctorFilters />
            <div className="flex flex-col">
                <DoctorTable />
                <DoctorPagination />
            </div>
            {/* Footer Hint */}
            <div className="text-center pb-8">
                <p className="text-xs text-slate-500">
                    © 2024 Klinik Gigi Sehat Admin Panel. All rights reserved.
                </p>
            </div>
        </div>
    );
}
