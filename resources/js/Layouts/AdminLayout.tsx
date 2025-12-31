import { AdminHeader } from '@/Components/admin/layout/AdminHeader';
import { AdminSidebar } from '@/Components/admin/layout/AdminSidebar';
import { Head } from '@inertiajs/react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Head title="Admin | Cantika Dental Care">
                <meta
                    name="description"
                    content="Dashboard admin Cantika Dental Care untuk mengelola jadwal dokter, booking pasien, dan laporan klinik."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex h-screen overflow-hidden bg-background-light font-display text-slate-900">
                <AdminSidebar />
                <div className="flex min-w-0 flex-1 flex-col bg-background-light">
                    <AdminHeader />
                    <main className="flex-1 overflow-y-auto p-8">
                        <div className="mx-auto flex max-w-[1400px] flex-col gap-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
