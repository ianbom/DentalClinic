import AdminLayout from '@/Layouts/AdminLayout';
import { router } from '@inertiajs/react';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

interface NotificationItem {
    id: number;
    booking_id: number | null;
    booking_code: string | null;
    patient_name: string | null;
    channel: string;
    type: string;
    recipient: string;
    payload: string | null;
    scheduled_at: string | null;
    scheduled_at_formatted: string | null;
    sent_at: string | null;
    sent_at_formatted: string | null;
    status: string;
    attempt_count: number;
    last_error: string | null;
    created_at: string;
    created_at_formatted: string;
    updated_at: string;
    updated_at_formatted: string;
}

interface PaginatedNotifications {
    data: NotificationItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Statistics {
    total: number;
    pending: number;
    sent: number;
    failed: number;
    retrying: number;
    cancelled: number;
    permanently_failed: number;
    today_sent: number;
    today_failed: number;
}

interface ListNotificationPageProps {
    notifications: PaginatedNotifications;
    statistics: Statistics;
    types: string[];
    channels: string[];
    filters: {
        search?: string;
        status?: string;
        channel?: string;
        type?: string;
        date?: string;
        created_at_filter?: string;
        scheduled_at_filter?: string;
        per_page?: number;
        sort_field?: string;
        sort_order?: string;
    };
}

type SortField =
    | 'id'
    | 'channel'
    | 'type'
    | 'status'
    | 'attempt_count'
    | 'scheduled_at'
    | 'sent_at'
    | 'created_at'
    | '';
type SortOrder = 'asc' | 'desc';

const statusConfig: Record<
    string,
    { label: string; color: string; bgColor: string }
> = {
    pending: {
        label: 'Pending',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
    },
    sent: { label: 'Sent', color: 'text-green-700', bgColor: 'bg-green-100' },
    failed: { label: 'Failed', color: 'text-red-700', bgColor: 'bg-red-100' },
    retrying: {
        label: 'Retrying',
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
    },
    cancelled: {
        label: 'Cancelled',
        color: 'text-gray-700',
        bgColor: 'bg-gray-100',
    },
    permanently_failed: {
        label: 'Permanently Failed',
        color: 'text-red-900',
        bgColor: 'bg-red-200',
    },
};

const typeLabels: Record<string, string> = {
    booking_confirmation: 'Konfirmasi Booking',
    reminder: 'Reminder',
    reschedule: 'Reschedule',
    cancellation: 'Pembatalan',
    checkin: 'Check-in',
    check_booking: 'Cek Booking',
};

// Helper function to format phone number for WhatsApp link
function formatWhatsAppLink(phone: string): string {
    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');

    // If starts with 0, replace with 62 (Indonesia country code)
    let formatted = cleaned;
    if (cleaned.startsWith('0')) {
        formatted = '62' + cleaned.substring(1);
    } else if (!cleaned.startsWith('62')) {
        // If doesn't start with country code, add 62
        formatted = '62' + cleaned;
    }

    return `https://wa.me/${formatted}`;
}

function ListNotificationPage({
    notifications,
    statistics,
    types,
    channels,
    filters,
}: ListNotificationPageProps) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');
    const [channelFilter, setChannelFilter] = useState(filters.channel || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');
    const [dateFilter, setDateFilter] = useState(filters.date || '');
    const [createdAtFilter, setCreatedAtFilter] = useState(
        filters.created_at_filter || '',
    );
    const [scheduledAtFilter, setScheduledAtFilter] = useState(
        filters.scheduled_at_filter || '',
    );
    const [itemsPerPage, setItemsPerPage] = useState(
        Number(filters.per_page) || 10,
    );
    const [sortField, setSortField] = useState<SortField>(
        (filters.sort_field as SortField) || '',
    );
    const [sortOrder, setSortOrder] = useState<SortOrder>(
        (filters.sort_order as SortOrder) || 'desc',
    );
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const debouncedSearch = useCallback(
        debounce((query: string) => {
            updateParams({ search: query, page: 1 });
        }, 500),
        [],
    );

    const updateParams = (newParams: Record<string, unknown>) => {
        router.get(
            '/admin/notifications',
            {
                search: searchQuery,
                status: statusFilter,
                channel: channelFilter,
                type: typeFilter,
                date: dateFilter,
                created_at_filter: createdAtFilter,
                scheduled_at_filter: scheduledAtFilter,
                per_page: itemsPerPage,
                sort_field: sortField,
                sort_order: sortOrder,
                page: notifications.current_page,
                ...newParams,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        debouncedSearch(value);
    };

    const handleFilterChange = (
        type:
            | 'status'
            | 'channel'
            | 'type'
            | 'date'
            | 'created_at_filter'
            | 'scheduled_at_filter',
        value: string,
    ) => {
        const setters: Record<string, (v: string) => void> = {
            status: setStatusFilter,
            channel: setChannelFilter,
            type: setTypeFilter,
            date: setDateFilter,
            created_at_filter: setCreatedAtFilter,
            scheduled_at_filter: setScheduledAtFilter,
        };
        setters[type](value);
        updateParams({ [type]: value, page: 1 });
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setStatusFilter('');
        setChannelFilter('');
        setTypeFilter('');
        setDateFilter('');
        setCreatedAtFilter('');
        setScheduledAtFilter('');
        setSortField('');
        setSortOrder('desc');
        router.get('/admin/notifications');
    };

    const handleItemsPerPageChange = (value: number) => {
        setItemsPerPage(value);
        updateParams({ per_page: value, page: 1 });
    };

    const handlePageChange = (page: number) => {
        updateParams({ page });
    };

    const handleSort = (field: SortField) => {
        let newOrder: SortOrder = 'asc';
        if (sortField === field) {
            newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        }
        setSortField(field);
        setSortOrder(newOrder);
        updateParams({ sort_field: field, sort_order: newOrder });
    };

    const hasFilters =
        searchQuery ||
        statusFilter ||
        channelFilter ||
        typeFilter ||
        dateFilter ||
        createdAtFilter ||
        scheduledAtFilter;

    const SortIcon = ({ field }: { field: SortField }) => (
        <span className="material-symbols-outlined ml-1 text-sm">
            {sortField === field
                ? sortOrder === 'asc'
                    ? 'arrow_upward'
                    : 'arrow_downward'
                : 'unfold_more'}
        </span>
    );

    return (
        <div className="flex flex-col gap-6">
            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        Daftar Notifikasi
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Monitor semua notifikasi yang dikirim ke pasien
                    </p>
                </div>
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                    Total: {notifications.total} notifikasi
                </span>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
                <StatCard
                    icon="schedule"
                    label="Pending"
                    value={statistics.pending}
                    color="yellow"
                />
                <StatCard
                    icon="check_circle"
                    label="Terkirim"
                    value={statistics.sent}
                    color="green"
                />
                <StatCard
                    icon="error"
                    label="Gagal"
                    value={statistics.failed}
                    color="red"
                />
                <StatCard
                    icon="refresh"
                    label="Retrying"
                    value={statistics.retrying}
                    color="blue"
                />
                <StatCard
                    icon="send"
                    label="Hari Ini Terkirim"
                    value={statistics.today_sent}
                    color="emerald"
                />
                <StatCard
                    icon="warning"
                    label="Hari Ini Gagal"
                    value={statistics.today_failed}
                    color="orange"
                />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                    {/* Search */}
                    <div className="relative flex-1 sm:min-w-[240px]">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                            search
                        </span>
                        <input
                            type="text"
                            placeholder="Cari kode booking, nama, atau telepon..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    {/* Created At Filter */}
                    <div className="relative">
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-slate-500">
                            Tgl Dibuat
                        </label>
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                            event_note
                        </span>
                        <input
                            type="date"
                            value={createdAtFilter}
                            onChange={(e) =>
                                handleFilterChange(
                                    'created_at_filter',
                                    e.target.value,
                                )
                            }
                            className="rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Filter Tgl Dibuat"
                        />
                    </div>

                    {/* Scheduled At Filter */}
                    <div className="relative">
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-slate-500">
                            Tgl Dijadwalkan
                        </label>
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400">
                            schedule_send
                        </span>
                        <input
                            type="date"
                            value={scheduledAtFilter}
                            onChange={(e) =>
                                handleFilterChange(
                                    'scheduled_at_filter',
                                    e.target.value,
                                )
                            }
                            className="rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Filter Tgl Dijadwalkan"
                        />
                    </div>

                    {/* Channel Filter */}
                    {/* <select
                        value={channelFilter}
                        onChange={(e) => handleFilterChange('channel', e.target.value)}
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="">Semua Channel</option>
                        {channels.map((channel) => (
                            <option key={channel} value={channel}>
                                {channel.charAt(0).toUpperCase() + channel.slice(1)}
                            </option>
                        ))}
                    </select> */}

                    {/* Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) =>
                            handleFilterChange('type', e.target.value)
                        }
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="">Semua Tipe</option>
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {typeLabels[type] || type}
                            </option>
                        ))}
                    </select>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            handleFilterChange('status', e.target.value)
                        }
                        className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="">Semua Status</option>
                        <option value="pending">Pending</option>
                        <option value="sent">Sent</option>
                        <option value="failed">Failed</option>
                        <option value="retrying">Retrying</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="permanently_failed">
                            Permanently Failed
                        </option>
                    </select>

                    {/* Clear Filters */}
                    {hasFilters && (
                        <button
                            onClick={handleClearFilters}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
                        >
                            <span className="material-symbols-outlined text-lg">
                                close
                            </span>
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="max-w-full overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-slate-50">
                            <tr>
                                <th
                                    className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                                    onClick={() => handleSort('id')}
                                >
                                    <div className="flex items-center">
                                        ID
                                        <SortIcon field="id" />
                                    </div>
                                </th>
                                <th className="min-w-[180px] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Booking / Pasien
                                </th>
                                {/* <th
                                    className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                                    onClick={() => handleSort('channel')}
                                >
                                    <div className="flex items-center">
                                        Channel
                                        <SortIcon field="channel" />
                                    </div>
                                </th> */}
                                <th
                                    className="min-w-[150px] cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                                    onClick={() => handleSort('type')}
                                >
                                    <div className="flex items-center">
                                        Tipe
                                        <SortIcon field="type" />
                                    </div>
                                </th>
                                <th className="min-w-[150px] whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Penerima
                                </th>
                                <th
                                    className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                                    onClick={() => handleSort('status')}
                                >
                                    <div className="flex items-center">
                                        Status
                                        <SortIcon field="status" />
                                    </div>
                                </th>
                                {/* <th
                                    className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                                    onClick={() => handleSort('attempt_count')}
                                >
                                    <div className="flex items-center">
                                        Attempt
                                        <SortIcon field="attempt_count" />
                                    </div>
                                </th> */}
                                <th
                                    className="min-w-[180px] cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                                    onClick={() => handleSort('scheduled_at')}
                                >
                                    <div className="flex items-center">
                                        Dijadwalkan Pada
                                        <SortIcon field="scheduled_at" />
                                    </div>
                                </th>
                                <th
                                    className="min-w-[180px] cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600"
                                    onClick={() => handleSort('created_at')}
                                >
                                    <div className="flex items-center">
                                        Dibuat
                                        <SortIcon field="created_at" />
                                    </div>
                                </th>
                                <th className="whitespace-nowrap px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Kirim Ulang
                                </th>
                                <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {notifications.data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={11}
                                        className="px-4 py-12 text-center text-slate-500"
                                    >
                                        <span className="material-symbols-outlined mb-2 text-4xl text-slate-300">
                                            notifications_off
                                        </span>
                                        <p>Tidak ada notifikasi ditemukan</p>
                                    </td>
                                </tr>
                            ) : (
                                notifications.data.map((notification) => (
                                    <>
                                        <tr
                                            key={notification.id}
                                            className="transition-colors hover:bg-slate-50"
                                        >
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-900">
                                                #{notification.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="whitespace-nowrap text-sm">
                                                    {notification.booking_code ? (
                                                        <a
                                                            href={`/admin/bookings/${notification.booking_id}`}
                                                            className="font-medium text-primary hover:underline"
                                                        >
                                                            {
                                                                notification.booking_code
                                                            }
                                                        </a>
                                                    ) : (
                                                        <span className="text-slate-400">
                                                            -
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="whitespace-nowrap text-xs text-slate-500">
                                                    {notification.patient_name ||
                                                        '-'}
                                                </div>
                                            </td>
                                            {/* <td className="whitespace-nowrap px-4 py-3">
                                                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                                                    <span className="material-symbols-outlined text-sm">
                                                        {notification.channel ===
                                                        'whatsapp'
                                                            ? 'chat'
                                                            : notification.channel ===
                                                                'email'
                                                              ? 'email'
                                                              : 'sms'}
                                                    </span>
                                                    {notification.channel}
                                                </span>
                                            </td> */}
                                            <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                                                {typeLabels[
                                                    notification.type
                                                ] || notification.type}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-sm">
                                                {notification.channel ===
                                                    'whatsapp' &&
                                                    notification.recipient ? (
                                                    <a
                                                        href={formatWhatsAppLink(
                                                            notification.recipient,
                                                        )}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-primary hover:text-primary-dark hover:underline"
                                                        title="Buka WhatsApp"
                                                    >
                                                        <span className="material-symbols-outlined text-sm">
                                                            chat
                                                        </span>
                                                        {notification.recipient}
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-700">
                                                        {notification.recipient}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <StatusBadge
                                                    status={notification.status}
                                                />
                                            </td>
                                            {/* <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-slate-700">
                                                {notification.attempt_count}
                                            </td> */}
                                            <td className="px-4 py-3">
                                                <div className="whitespace-nowrap text-sm text-slate-700">
                                                    {notification.scheduled_at_formatted || (
                                                        <span className="text-slate-400">
                                                            -
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="whitespace-nowrap text-sm text-slate-700">
                                                    {
                                                        notification.created_at_formatted
                                                    }
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3 text-center">
                                                {notification.payload &&
                                                    notification.recipient ? (
                                                    (() => {
                                                        // For reminder type: only enable if within H-24 of scheduled_at
                                                        const isReminder =
                                                            notification.type ===
                                                            'reminder';
                                                        const isReminderDisabled =
                                                            isReminder &&
                                                            (() => {
                                                                if (
                                                                    !notification.scheduled_at
                                                                )
                                                                    return true;
                                                                const scheduledAt =
                                                                    new Date(
                                                                        notification.scheduled_at,
                                                                    );
                                                                const now =
                                                                    new Date();
                                                                const diffMs =
                                                                    scheduledAt.getTime() -
                                                                    now.getTime();
                                                                const diffHours =
                                                                    diffMs /
                                                                    (1000 *
                                                                        60 *
                                                                        60);
                                                                // Enable only if within 24 hours (0 to 24 hours before scheduled_at)
                                                                return (
                                                                    diffHours >
                                                                    24 ||
                                                                    diffHours <
                                                                    0
                                                                );
                                                            })();

                                                        const handleSend =
                                                            () => {
                                                                // Format phone number for WhatsApp
                                                                let phone =
                                                                    notification.recipient.replace(
                                                                        /\D/g,
                                                                        '',
                                                                    );
                                                                if (
                                                                    phone.startsWith(
                                                                        '0',
                                                                    )
                                                                ) {
                                                                    phone =
                                                                        '62' +
                                                                        phone.substring(
                                                                            1,
                                                                        );
                                                                }
                                                                if (
                                                                    !phone.startsWith(
                                                                        '62',
                                                                    )
                                                                ) {
                                                                    phone =
                                                                        '62' +
                                                                        phone;
                                                                }

                                                                const encodedMessage =
                                                                    encodeURIComponent(
                                                                        notification.payload ||
                                                                        '',
                                                                    );
                                                                const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

                                                                router.put(
                                                                    `/admin/notifications/${notification.id}/send`,
                                                                    {},
                                                                    {
                                                                        preserveState: true,
                                                                        preserveScroll: true,
                                                                        onSuccess:
                                                                            (
                                                                                page,
                                                                            ) => {
                                                                                const flash =
                                                                                    page
                                                                                        .props
                                                                                        .flash as
                                                                                    | {
                                                                                        error?: string;
                                                                                        success?: string;
                                                                                    }
                                                                                    | undefined;

                                                                                if (
                                                                                    flash?.error
                                                                                ) {
                                                                                    return;
                                                                                }

                                                                                window.open(
                                                                                    whatsappUrl,
                                                                                    '_blank',
                                                                                    'noopener,noreferrer',
                                                                                );
                                                                            },
                                                                    },
                                                                );
                                                            };

                                                        return (
                                                            <button
                                                                onClick={
                                                                    handleSend
                                                                }
                                                                disabled={
                                                                    isReminderDisabled
                                                                }
                                                                className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${isReminderDisabled
                                                                        ? 'cursor-not-allowed bg-gray-300 text-gray-500'
                                                                        : 'bg-green-600 text-white hover:bg-green-700'
                                                                    }`}
                                                                title={
                                                                    isReminderDisabled
                                                                        ? 'Reminder hanya bisa dikirim H-24 dari jadwal'
                                                                        : 'Kirim ulang via WhatsApp'
                                                                }
                                                            >
                                                                <span className="material-symbols-outlined text-sm">
                                                                    send
                                                                </span>
                                                                Kirim
                                                            </button>
                                                        );
                                                    })()
                                                ) : (
                                                    <span className="text-xs text-slate-400">
                                                        -
                                                    </span>
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-3">
                                                <button
                                                    onClick={() =>
                                                        setExpandedRow(
                                                            expandedRow ===
                                                                notification.id
                                                                ? null
                                                                : notification.id,
                                                        )
                                                    }
                                                    className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                                                    title="Detail"
                                                >
                                                    <span className="material-symbols-outlined text-lg">
                                                        {expandedRow ===
                                                            notification.id
                                                            ? 'expand_less'
                                                            : 'expand_more'}
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                        {expandedRow === notification.id && (
                                            <tr
                                                key={`${notification.id}-detail`}
                                                className="bg-slate-50"
                                            >
                                                <td
                                                    colSpan={11}
                                                    className="px-4 py-4"
                                                >
                                                    <div className="grid gap-4 md:grid-cols-2">
                                                        <div>
                                                            <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">
                                                                Payload / Pesan
                                                            </h4>
                                                            <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700">
                                                                {notification.payload ||
                                                                    '-'}
                                                            </pre>
                                                        </div>
                                                        <div className="space-y-3">
                                                            {notification.scheduled_at_formatted && (
                                                                <div>
                                                                    <span className="text-xs font-semibold uppercase text-slate-500">
                                                                        Dijadwalkan:
                                                                    </span>
                                                                    <p className="text-sm text-slate-700">
                                                                        {
                                                                            notification.scheduled_at_formatted
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {notification.sent_at_formatted && (
                                                                <div>
                                                                    <span className="text-xs font-semibold uppercase text-green-600">
                                                                        Terkirim
                                                                        Pada:
                                                                    </span>
                                                                    <p className="text-sm text-green-700">
                                                                        {
                                                                            notification.sent_at_formatted
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                            {notification.last_error && (
                                                                <div>
                                                                    <span className="text-xs font-semibold uppercase text-red-500">
                                                                        Error
                                                                        Terakhir:
                                                                    </span>
                                                                    <p className="text-sm text-red-600">
                                                                        {
                                                                            notification.last_error
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                            <div>
                                                                <span className="text-xs font-semibold uppercase text-slate-500">
                                                                    Diperbarui:
                                                                </span>
                                                                <p className="text-sm text-slate-700">
                                                                    {
                                                                        notification.updated_at_formatted
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">Tampilkan:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) =>
                            handleItemsPerPageChange(Number(e.target.value))
                        }
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <span className="text-sm text-slate-500">data</span>
                </div>

                <Pagination
                    currentPage={notifications.current_page}
                    totalPages={notifications.last_page}
                    totalItems={notifications.total}
                    itemsPerPage={notifications.per_page}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    color,
}: {
    icon: string;
    label: string;
    value: number;
    color: 'yellow' | 'green' | 'red' | 'blue' | 'emerald' | 'orange' | 'gray';
}) {
    const colorClasses: Record<
        string,
        { bg: string; icon: string; text: string }
    > = {
        yellow: {
            bg: 'bg-yellow-50',
            icon: 'text-yellow-600',
            text: 'text-yellow-700',
        },
        green: {
            bg: 'bg-green-50',
            icon: 'text-green-600',
            text: 'text-green-700',
        },
        red: { bg: 'bg-red-50', icon: 'text-red-600', text: 'text-red-700' },
        blue: {
            bg: 'bg-blue-50',
            icon: 'text-blue-600',
            text: 'text-blue-700',
        },
        emerald: {
            bg: 'bg-emerald-50',
            icon: 'text-emerald-600',
            text: 'text-emerald-700',
        },
        orange: {
            bg: 'bg-orange-50',
            icon: 'text-orange-600',
            text: 'text-orange-700',
        },
        gray: {
            bg: 'bg-gray-50',
            icon: 'text-gray-600',
            text: 'text-gray-700',
        },
    };

    const classes = colorClasses[color];

    return (
        <div className={`rounded-xl ${classes.bg} p-4`}>
            <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${classes.icon}`}>
                    {icon}
                </span>
                <div>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                    <p className={`text-xs ${classes.text}`}>{label}</p>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const config = statusConfig[status] || {
        label: status,
        color: 'text-slate-700',
        bgColor: 'bg-slate-100',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.bgColor} ${config.color}`}
        >
            {config.label}
        </span>
    );
}

function Pagination({
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}) {
    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const visiblePages = Array.from(
        { length: totalPages },
        (_, i) => i + 1,
    ).filter(
        (page) =>
            page === 1 ||
            page === totalPages ||
            Math.abs(page - currentPage) <= 1,
    );

    return (
        <div className="flex items-center gap-4">
            <p className="text-sm text-slate-500">
                Menampilkan {startItem} - {endItem} dari {totalItems}
            </p>
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Prev
                </button>
                {visiblePages.map((page, index, arr) => (
                    <span key={page}>
                        {index > 0 && arr[index - 1] !== page - 1 && (
                            <span className="px-2 text-slate-400">...</span>
                        )}
                        <button
                            onClick={() => onPageChange(page)}
                            className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${currentPage === page
                                    ? 'bg-primary text-white'
                                    : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            {page}
                        </button>
                    </span>
                ))}
                <button
                    onClick={() =>
                        onPageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

ListNotificationPage.layout = (page: React.ReactNode) => (
    <AdminLayout>{page}</AdminLayout>
);

export default ListNotificationPage;
