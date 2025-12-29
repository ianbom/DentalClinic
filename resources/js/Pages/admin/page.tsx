import { StatsCard } from "../components/admin/dashboard/StatsCard";
import { TodaySchedule } from "../components/admin/dashboard/TodaySchedule";
import { RecentBookings } from "../components/admin/dashboard/RecentBookings";

export default function AdminDashboardPage() {
    // Mock Data based on HTML content
    const stats = [
        {
            title: "Booking Hari Ini",
            value: 12,
            icon: "event_available",
            iconBgClass: "bg-blue-50",
            iconColorClass: "text-primary",
            badge: { text: "+2 new", className: "bg-green-100 text-green-700" },
            borderColorHover: "border-primary/50",
        },
        {
            title: "Pending Review",
            value: 3,
            icon: "pending_actions",
            iconBgClass: "bg-orange-50",
            iconColorClass: "text-orange-500",
            badge: { text: "Urgent", className: "bg-orange-100 text-orange-700" },
            borderColorHover: "border-orange-300",
        },
        {
            title: "Selesai Hari Ini",
            value: 8,
            icon: "task_alt",
            iconBgClass: "bg-green-50",
            iconColorClass: "text-green-500",
            borderColorHover: "border-green-300",
        },
        {
            title: "Check-in Hari Ini",
            value: 4,
            icon: "how_to_reg",
            iconBgClass: "bg-purple-50",
            iconColorClass: "text-purple-500",
            subText: "Since 8 AM",
            borderColorHover: "border-purple-300",
        },
    ];

    const schedule = [
        {
            id: "1",
            time: "09:00 - 10:00",
            doctorName: "Dr. Budi Santoso",
            treatment: "Scaling & Polishing",
            patientName: "Andi Pratama",
            patientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbDOKNvuvr0hQn7Dbv-3gClQ643CjZmLWfnVbrTAM2x_pQAVi1aFFaJ5Feb_Z4dfsK_dT5zY00ZFUzqxcdbenDxw9cDcXwIKmtQ8XAM4Lsx6mGmCYMWgpfaHeh62eRSUFjgY4AlSUOVfuHgcgpexE721zadbn9DT3j8jh2AiyM4KDF8O6p77SRQOZSVIjeKpDOKJi4xCTNuExRBtpZFzpCRs0idq2kDCUbOzwg-PkYOa2SLHOsSWRIR5M9VL1IvU7RCFhexRcjnTqS",
            status: "ongoing" as const,
        },
        {
            id: "2",
            time: "10:30 - 11:30",
            doctorName: "Dr. Siti Aminah",
            treatment: "Root Canal Treatment",
            patientName: "Maya Wijaya",
            patientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW6q7zyYJ1X_J-1cie00qAcGtKHQEfHugIE5ta2_1WTUnsPUiYOKUKkebXkNDwaVkWr1_t8Cbl9GCvnFj8s6VwPXdkaqPIR_IPnEC5yWQAF_5bSb1ZigxrE8NORMmUiCmmqn-QdE3bE91fxjYgjaXeQAYeVHKTsCs7DBFytXSXIM6NJGn9eUgmUuRUCkADR3e6M2XPO2EZpUy9ehcvbVt-aBZB8iGHitbGv0SLgYEL_BgHH0jWLv8tBudkWOzYsw0EJ-EQ6XC_h_ZS",
            status: "upcoming" as const,
        },
        {
            id: "3",
            time: "13:00 - 14:00",
            doctorName: "Dr. Budi Santoso",
            treatment: "General Checkup",
            patientName: "Reza Rahadian",
            patientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCthIoBfu14GtjadjMHBhYNtvjSNiG1yYqtCYoyPyQ9WZqulr-KrzrkfZKkvpkeo81Zh2EbTtwVZSfj7dM4MKdxM3PA5Sbt3ProWIsrenEyYc7lmUzbY07sAnlijwg51ihVmFZ5Y67JGtRrcOcenwtyVlIgWSB_uGoay8ri0yaTgtQ9z-BnAM9HXC-TBNOCxQa9MBICdjEal1ER_WzDwHMBq1Jlz7wjiF7eI9WCHWCSQAtNhZy32pEWIXNo5c4oYURT0MRECFcpmCWC",
            status: "past" as const,
        },
        {
            id: "4",
            time: "14:30 - 15:00",
            doctorName: "Dr. Sarah Admin",
            treatment: "Consultation",
            patientName: "Linda Kusuma",
            patientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAe4sgw_5sA167ryywzTD7gOaRzLVx1FQYZS9RhWBFGCAsrl7PVjRAE8miH0UnsuSqcEocbbdRT7H6pGhLte-0NBCP_cRG8r5TX6bke2opFWNAzdTgZFKSQU-h_w__pKnmyrqtPrxHixJcK3aJOP_HaelGJt4_AXtcU0Cf7VpAsFqltRUisDGJ8-UpBxZHsSMqeoeiXsVNVd-A_gc1dbQ0qopikTT3_er9M2kUWurR2mUJdGek3fpjBRKidEjXj4NuSg3ddY2q_pbPi",
            status: "past" as const,
        },
    ];

    const bookings = [
        {
            id: "1",
            patientName: "John Doe",
            patientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWHm6P4Y7Vk8jnfaSnfuduymM5kbEwpOSsB5l63a7odOJ83irdOaLYjC3jiNEMMMxcc7oxDJ1PCG9XQCbL5yuLAwrAlWpwYeFCn36CjMLw1-5dygk9VZQpnrxeC9_iE4_NGtNB7N7mCVWmvHAdQrCO4WiHcw5MpPWLd4A68NVWl2DdsrHPWaaMEw4vkd4iQsPInmr3BK73R6t60EOuhXsHxWsIVY9uYrKXXC4U1ZKt9csm8RX7KapAuHnKzHO9YO267-eRejfK1ip1",
            service: "Teeth Whitening",
            doctorName: "Dr. Siti Aminah",
            date: "Oct 24, 2023",
            time: "09:00 AM",
            status: "Confirmed" as const,
        },
        {
            id: "2",
            patientName: "Alice Smith",
            patientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuApLxdKCEie7B0huSWcZesGjN0qq1ScEVic_l3nuWdeiPm-10t7ATSEMlNIhc1VnPpYCFmlZ-2WDIX1Q6ujKMTfEq_aGP2-fvqmF6ZH53YkE5Nqz8a2ZnceihwcRjP1m4w8IS6eVwrmISoBuFnFrGMTy36Q-WvGN2QvZgNCAaOc5tR8MoGr1V2abX2DEAjxK9dUKTrOr-mUHo4vGMkit2B5EeqhCjqTD0F_hBBQVix3n3_4W_EdTGYj3eZrUxJAi_WiSYWu2xYsxoMH",
            service: "Dental Implant",
            doctorName: "Dr. Budi Santoso",
            date: "Oct 24, 2023",
            time: "11:00 AM",
            status: "Pending" as const,
        },
        {
            id: "3",
            patientName: "Robert Johnson",
            patientAvatar: null,
            patientInitials: "RJ",
            service: "Routine Checkup",
            doctorName: "Dr. Sarah Admin",
            date: "Oct 25, 2023",
            time: "02:30 PM",
            status: "New" as const,
        },
        {
            id: "4",
            patientName: "Michael Brown",
            patientAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgOx8Q0Vl5Pvh9o1chUlVOJNZRTTxej-KFU9Anv8Teab8OOXqEJRxenbQzhd1Kho7ID-xqXdx3dISfQkrO9DsGVz1DJWOiKVhXsTfbHpmZyUDcrgMErwdw7GQrrJ5YnRToUvfeQFhetDHwG95p7ZQ_pbKHKjAYcbeKp4kA2PKOEQ5zPK0v16upyJyc_7QDy5Ls0PqNxzTXPMfNIPuma3utooYdT9LlJDPqJhMifYoFzlf5K22KCgjwSJnP6Loy1Mon4G1k6MYKU35M",
            service: "Root Canal",
            doctorName: "Dr. Siti Aminah",
            date: "Oct 25, 2023",
            time: "04:00 PM",
            status: "Confirmed" as const,
        },
    ];

    return (
        <>
            {/* Page Heading & Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                        Dashboard Overview
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Welcome back, here&apos;s what&apos;s happening today at the clinic.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Filter:</span>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:border-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-primary text-xl">
                            calendar_today
                        </span>
                        Hari Ini
                        <span className="material-symbols-outlined text-slate-400 ml-1 text-xl">
                            keyboard_arrow_down
                        </span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            {/* Lower Section: Timeline & Table */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
                {/* Left: Jadwal Hari Ini (Timeline) */}
                <div className="xl:col-span-1 h-full">
                    <TodaySchedule schedule={schedule} />
                </div>

                {/* Right: Booking Terbaru (Table) */}
                <div className="xl:col-span-2 h-full">
                    <RecentBookings bookings={bookings} />
                </div>
            </div>
        </>
    );
}
