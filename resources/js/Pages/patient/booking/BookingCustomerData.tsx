import { BookingHeader } from "@/app/components/booking/BookingHeader";
import { CustomerDataForm } from "@/app/components/booking/CustomerDataForm";
import { CustomerBookingSidebar } from "@/app/components/booking/CustomerBookingSidebar";
import { getDoctorById } from "@/lib/doctors";

export default async function CustomerDataPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const doctor = getDoctorById(id);

    return (
        <div className="flex-1 flex flex-col items-center py-8 px-4 md:px-10 lg:px-20 min-h-screen bg-background-light font-display">
            <div className="max-w-6xl w-full flex flex-col gap-8">
                {/* Progress Bar */}
                <BookingHeader currentStep={2} />

                {/* Content Area: Grid View */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    {/* Left Column: Customer Form */}
                    <div className="lg:col-span-8">
                        <CustomerDataForm doctorId={id} />
                    </div>

                    {/* Right Column: Booking Summary Sticky Sidebar */}
                    <div className="lg:col-span-4">
                        <CustomerBookingSidebar doctor={doctor} />
                    </div>
                </div>
            </div>
        </div>
    );
}
