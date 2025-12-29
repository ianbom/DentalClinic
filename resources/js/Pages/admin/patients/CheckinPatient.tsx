import { CheckInHeader } from "@/app/components/admin/patients/checkin/CheckInHeader";
import { CheckInSearchForm } from "@/app/components/admin/patients/checkin/CheckInSearchForm";
import { CheckInResultCard } from "@/app/components/admin/patients/checkin/CheckInResultCard";

export const metadata = {
    title: "Check-in Pasien - Klinik Gigi Sehat",
};

export default function CheckInPage() {
    return (
        <div className="flex flex-col h-full bg-[#f8fbfc]">
            <div className="flex-1 max-w-5xl mx-auto w-full">
                <CheckInHeader />
                <CheckInSearchForm />
                <CheckInResultCard />
            </div>
        </div>
    );
}
