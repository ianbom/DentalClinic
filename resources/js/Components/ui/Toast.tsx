import { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose: () => void;
}

const toastStyles = {
    success: {
        bg: 'bg-green-500',
        icon: 'check_circle',
    },
    error: {
        bg: 'bg-red-500',
        icon: 'error',
    },
    warning: {
        bg: 'bg-amber-500',
        icon: 'warning',
    },
    info: {
        bg: 'bg-blue-500',
        icon: 'info',
    },
};

export function Toast({ message, type, duration = 5000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLeaving(true);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(onClose, 300);
    };

    if (!isVisible) return null;

    const style = toastStyles[type];

    return (
        <div
            className={`fixed right-4 top-4 z-50 flex items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg transition-all duration-300 ${
                style.bg
            } ${isLeaving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}
        >
            <span className="material-symbols-outlined text-[20px]">
                {style.icon}
            </span>
            <span className="max-w-xs text-sm font-medium">{message}</span>
            <button
                onClick={handleClose}
                className="ml-2 rounded-full p-1 transition-colors hover:bg-white/20"
            >
                <span className="material-symbols-outlined text-[18px]">
                    close
                </span>
            </button>
        </div>
    );
}

// Hook for managing toast state
export function useToast() {
    const [toast, setToast] = useState<{
        message: string;
        type: 'success' | 'error' | 'warning' | 'info';
    } | null>(null);

    const showToast = (
        message: string,
        type: 'success' | 'error' | 'warning' | 'info' = 'info',
    ) => {
        setToast({ message, type });
    };

    const hideToast = () => {
        setToast(null);
    };

    return { toast, showToast, hideToast };
}
