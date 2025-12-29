import { DoctorListClient } from "@/app/components/doctors/DoctorListClient";
import { getDoctors } from "@/lib/doctors";

export default function DoctorPage() {
    const doctors = getDoctors();

    return <DoctorListClient doctors={doctors} />;
}
