import { AdminSidebar } from "../components/admin/layout/AdminSidebar";
import { AdminHeader } from "../components/admin/layout/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        // Added font-display and background variables to match HTML body classes
        <div className="h-screen overflow-hidden flex font-display bg-background-light text-slate-900">
            <AdminSidebar />
            <div className="flex-1 flex flex-col min-w-0 bg-background-light">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
