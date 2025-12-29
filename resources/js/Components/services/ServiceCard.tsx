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
        <div className="group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:shadow-gray-200/50 hover:border-primary/30 transition-all duration-300 cursor-pointer">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <span className="material-symbols-outlined text-[28px]">{service.icon}</span>
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-text-light text-lg font-bold leading-tight">{service.title}</h3>
                <p className="text-gray-500 text-sm font-normal leading-relaxed">{service.description}</p>
            </div>
            <div className="mt-auto pt-2 flex items-center text-primary text-sm font-bold">
                <span>Selengkapnya</span>
                <span className="material-symbols-outlined text-sm ml-1 transition-transform group-hover:translate-x-1">arrow_forward</span>
            </div>
        </div>
    );
}
