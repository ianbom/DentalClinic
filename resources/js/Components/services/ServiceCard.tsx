export interface ServiceData {
    id: string;
    icon: string;
    title: string;
    description: string;
    category: string;
}

interface ServiceCardProps {
    service: ServiceData;
}

export function ServiceCard({ service }: ServiceCardProps) {
    return (
        <div className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-gray-200/50">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-[28px]">
                    {service.icon}
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold leading-tight text-text-light">
                    {service.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-gray-500">
                    {service.description}
                </p>
            </div>
            <div className="mt-auto flex items-center pt-2 text-sm font-bold text-primary">
                <span>Selengkapnya</span>
                <span className="material-symbols-outlined ml-1 text-sm transition-transform group-hover:translate-x-1">
                    arrow_forward
                </span>
            </div>
        </div>
    );
}
