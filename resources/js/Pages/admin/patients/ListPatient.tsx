import { PatientListHeader } from "@/app/components/admin/patients/PatientListHeader";
import { PatientFilters } from "@/app/components/admin/patients/PatientFilters";
import { PatientTable } from "@/app/components/admin/patients/PatientTable";
import { PatientPagination } from "@/app/components/admin/patients/PatientPagination";

export const metadata = {
    title: "Manajemen Pasien - Klinik Gigi Sehat",
};

export default function PatientsPage() {
    return (
        <div className="flex flex-col gap-6">
            <PatientListHeader />
            <div className="flex flex-col shadow-sm rounded-xl">
                <PatientFilters />
                <PatientTable />
                <PatientPagination />
            </div>
            <footer className="mt-8 text-center text-xs text-slate-400 pb-8">
                © 2024 Dental Clinic Admin. All rights reserved.
            </footer>
        </div>
    );
}
