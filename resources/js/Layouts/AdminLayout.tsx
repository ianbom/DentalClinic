import { AdminHeader } from '@/Components/admin/layout/AdminHeader';
import { AdminSidebar } from '@/Components/admin/layout/AdminSidebar';
import { PageProps } from '@/types'; // Import PageProps dari types
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface FlashMessages {
    success?: string;
    error?: string;
}

// Extend PageProps yang sudah ada dengan flash messages
interface AdminLayoutPageProps extends PageProps {
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
            className={`fixed right-4 top-4 z-50 flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg ${
                type === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
            }`}
        >
            <span className="material-icons">
                {type === 'success' ? 'check_circle' : 'error'}
            </span>
            <span>{message}</span>
            <button
                onClick={onClose}
                className="material-icons text-white hover:text-gray-200"
            >
                close
            </button>
        </div>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { flash } = usePage<AdminLayoutPageProps>().props;
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
            <Head title="Admin Dashboard" />

            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            <div className="flex h-screen overflow-hidden bg-gray-100">
                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <AdminSidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />

                {/* Main Content */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                    <main className="flex-1 overflow-y-auto p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
