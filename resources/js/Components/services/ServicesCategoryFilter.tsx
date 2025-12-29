"use client";

import { useState } from "react";

const categories = [
    { id: "all", label: "Semua Layanan" },
    { id: "general", label: "Umum" },
    { id: "cosmetic", label: "Kosmetik" },
    { id: "orthodontics", label: "Ortodonti" },
    { id: "pediatric", label: "Anak" },
];

interface ServicesCategoryFilterProps {
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export function ServicesCategoryFilter({ selectedCategory, onCategoryChange }: ServicesCategoryFilterProps) {
    return (
        <section className="w-full px-4 md:px-10 flex justify-center py-6 md:py-8 md:top-[65px] z-40 bg-background-light md:bg-background-light/95 md:backdrop-blur-sm border-b border-gray-100 md:border-transparent">
            <div className="max-w-[960px] w-full overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <div className="flex gap-3 pb-2 min-w-max">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`group flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 transition-all cursor-pointer ${selectedCategory === category.id
                                ? "bg-primary shadow-md shadow-primary/20"
                                : "bg-white border border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                                }`}
                        >
                            <p className={`text-sm font-medium leading-normal ${selectedCategory === category.id
                                ? "text-white"
                                : "text-gray-600 group-hover:text-primary"
                                }`}>
                                {category.label}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
