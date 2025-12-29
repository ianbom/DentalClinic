import { ReactNode } from 'react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    icon?: ReactNode;
    className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
    default: 'bg-gray-100 text-text-secondary',
    success: 'bg-success-light text-green-800',
    warning: 'bg-warning-light text-yellow-800',
    error: 'bg-error-light text-red-800',
    info: 'bg-info-light text-blue-800',
    primary: 'bg-primary-50 text-primary-dark',
    secondary: 'bg-teal-100 text-secondary-dark',
};

const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
};

export default function Badge({
    children,
    variant = 'default',
    size = 'md',
    icon,
    className = '',
}: BadgeProps) {
    return (
        <span
            className={`
        inline-flex items-center gap-1.5
        font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </span>
    );
}
