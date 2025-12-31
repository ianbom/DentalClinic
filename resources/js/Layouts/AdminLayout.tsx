import { AdminHeader } from '@/Components/admin/layout/AdminHeader';
import { AdminSidebar } from '@/Components/admin/layout/AdminSidebar';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <AdminSidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Content */}
                <div className="flex min-w-0 flex-1 flex-col bg-background-light">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 md:gap-8">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
