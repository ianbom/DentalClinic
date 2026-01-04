import { CustomerDataForm as PatientDataForm } from '@/Components/booking/PatientDataForm';
import { BookingProvider } from '@/context/BookingContext';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

interface Props {
    provinces: Array<{
        id: number;
        name: string;
    }>;
}

export default function CreatePatient({ provinces }: Props) {
    return (
        <AdminLayout>
            <Head title="Tambah Pasien Baru" />

            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Link
                                href={route('admin.patients.list')}
                                className="hover:text-primary"
                            >
                                Pasien
                            </Link>
                            <span className="material-symbols-outlined text-sm">
                                chevron_right
                            </span>
                            <span className="text-slate-900">Tambah Baru</span>
                        </div>
                        <h1 className="mt-1 text-2xl font-bold text-slate-900">
                            Tambah Pasien Baru
                        </h1>
                    </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
                    <BookingProvider>
                        <PatientDataForm
                            provinces={provinces}
                            doctorId="" // Not used in create mode
                            isAdmin={true}
                            isCreateMode={true} // New prop for create mode
                        />
                    </BookingProvider>
                </div>
            </div>
        </AdminLayout>
    );
}
