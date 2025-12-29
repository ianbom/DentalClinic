import { AdminHeader } from '@/Components/admin/layout/AdminHeader';
import { AdminSidebar } from '@/Components/admin/layout/AdminSidebar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
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
    );
}
