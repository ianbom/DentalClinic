import { AdminHeader } from '@/Components/admin/layout/AdminHeader';
import { AdminSidebar } from '@/Components/admin/layout/AdminSidebar';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface FlashMessages {
    success?: string;
    error?: string;
}

interface PageProps {
    flash: FlashMessages;
}

function Toast({
    message,
    type,
    onClose,
}: {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}) {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed right-4 top-4 z-[100] flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg transition-all ${
                type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
            }`}
        >
            <span className="material-symbols-outlined text-[20px]">
                {type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span className="max-w-xs text-sm font-medium">{message}</span>
            <button
                onClick={onClose}
                className="ml-2 rounded-full p-1 hover:bg-white/20"
            >
                <span className="material-symbols-outlined text-[16px]">
                    close
                </span>
            </button>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { flash } = usePage<PageProps>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error';
    } | null>(null);

    // Show toast when flash message arrives
    useEffect(() => {
        if (flash?.success) {
            setToast({ message: flash.success, type: 'success' });
        } else if (flash?.error) {
            setToast({ message: flash.error, type: 'error' });
        }
    }, [flash]);

    return (
        <>
            <Head title="Admin | Cantika Dental Care">
                <meta
                    name="description"
                    content="Dashboard admin Cantika Dental Care untuk mengelola jadwal dokter, booking pasien, dan laporan klinik."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

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
