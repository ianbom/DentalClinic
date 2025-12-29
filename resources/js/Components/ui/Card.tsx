import { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    interactive?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

export default function Card({
    children,
    className = '',
    interactive = false,
    padding = 'md',
    onClick,
}: CardProps) {
    const Component = onClick ? 'button' : 'div';

    return (
        <Component
            onClick={onClick}
            className={`bg-surface border-border rounded-xl border shadow-sm transition-all duration-200 ${interactive ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg' : ''} ${paddingStyles[padding]} ${onClick ? 'w-full text-left' : ''} ${className} `}
        >
            {children}
        </Component>
    );
}

// Card Header component
interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
    return <div className={`mb-4 ${className}`}>{children}</div>;
}

// Card Title component
interface CardTitleProps {
    children: ReactNode;
    className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
    return (
        <h3 className={`text-text-primary text-lg font-semibold ${className}`}>
            {children}
        </h3>
    );
}

// Card Content component
interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
    return <div className={className}>{children}</div>;
}

// Card Footer component
interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
    return (
        <div className={`border-border mt-4 border-t pt-4 ${className}`}>
            {children}
        </div>
    );
}
