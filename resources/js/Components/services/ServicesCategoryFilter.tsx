'use client';

const categories = [
    { id: 'all', label: 'Semua Layanan' },
    { id: 'general', label: 'Umum' },
    { id: 'cosmetic', label: 'Kosmetik' },
    { id: 'orthodontics', label: 'Ortodonti' },
    // { id: 'pediatric', label: 'Anak' },
];

interface ServicesCategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function ServicesCategoryFilter({
    selectedCategory,
    onCategoryChange,
}: ServicesCategoryFilterProps) {
    return (
        <section className="z-40 flex w-full justify-center border-b border-gray-100 bg-background-light px-4 py-6 md:top-[65px] md:border-transparent md:bg-background-light/95 md:px-10 md:py-8 md:backdrop-blur-sm">
            <div
                className="scrollbar-hide w-full max-w-[960px] overflow-x-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <div className="flex min-w-max gap-3 pb-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`group flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full px-6 transition-all ${
                                selectedCategory === category.id
                                    ? 'bg-primary shadow-md shadow-primary/20'
                                    : 'border border-gray-200 bg-white hover:border-primary/50 hover:bg-gray-50'
                            }`}
                        >
                            <p
                                className={`text-sm font-medium leading-normal ${
                                    selectedCategory === category.id
                                        ? 'text-white'
                                        : 'text-gray-600 group-hover:text-primary'
                                }`}
                            >
                                {category.label}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
