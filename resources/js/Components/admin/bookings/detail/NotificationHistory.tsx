import { Notification } from '@/types';
import { useState } from 'react';

interface NotificationHistoryProps {
    notifications: Notification[];
    defaultOpen?: boolean;
}

export function NotificationHistory({
    notifications,
    defaultOpen = false,
}: NotificationHistoryProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'sent':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'failed':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getChannelIcon = (channel: string) => {
        switch (channel) {
            case 'whatsapp':
                return 'chat';
            case 'email':
                return 'mail';
            default:
                return 'notifications';
        }
    };

    return (
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            {/* Header - always visible */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
            >
                <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900">
                        Riwayat Notifikasi
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        {notifications.length}
                    </span>
                </div>
                <span
                    className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                >
                    expand_more
                </span>
            </button>

            {/* Collapsible content */}
            <div
                className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                {notifications.length === 0 ? (
                    <div className="border-t border-slate-100 py-8 text-center text-slate-500">
                        Belum ada riwayat notifikasi
                    </div>
                ) : (
                    <div className="space-y-8 border-t border-slate-100 p-6">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className="group flex gap-4"
                            >
                                {/* Timeline Icon */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${notification.status === 'sent' ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
                                    >
                                        <span className="material-symbols-outlined text-[20px]">
                                            {getChannelIcon(
                                                notification.channel,
                                            )}
                                        </span>
                                    </div>
                                    {/* Connector Line */}
                                    <div className="my-2 h-full w-px bg-slate-200 group-last:hidden"></div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 space-y-3 pb-6">
                                    {/* Chat Bubble for Payload */}
                                    <div className="relative rounded-2xl rounded-tl-none border border-slate-200 bg-slate-50 p-4">
                                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(notification.status)} capitalize`}
                                                >
                                                    {notification.status}
                                                </span>
                                                <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                                                    {notification.channel} •{' '}
                                                    {notification.type.replace(
                                                        '_',
                                                        ' ',
                                                    )}
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-400">
                                                {formatDate(
                                                    notification.created_at,
                                                )}
                                            </span>
                                        </div>

                                        <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-700">
                                            {notification.payload}
                                        </div>
                                    </div>

                                    {/* Details Table */}
                                    <div className="pl-2">
                                        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                                            <table className="min-w-full divide-y divide-slate-100">
                                                <tbody className="divide-y divide-slate-100">
                                                    <tr>
                                                        <td className="w-1/4 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
                                                            Penerima
                                                        </td>
                                                        <td className="px-4 py-2 font-mono text-xs text-slate-700">
                                                            {
                                                                notification.recipient
                                                            }
                                                        </td>
                                                    </tr>
                                                    {notification.sent_at && (
                                                        <tr>
                                                            <td className="bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500">
                                                                Terikirim Pada
                                                            </td>
                                                            <td className="px-4 py-2 text-xs text-slate-700">
                                                                {formatDate(
                                                                    notification.sent_at,
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )}
                                                    {notification.last_error && (
                                                        <tr>
                                                            <td className="bg-red-50 px-4 py-2 text-xs font-medium text-red-500">
                                                                Error Log
                                                            </td>
                                                            <td className="break-all px-4 py-2 font-mono text-xs text-red-600">
                                                                {
                                                                    notification.last_error
                                                                }
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
