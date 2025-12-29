"use client";

import { useState } from "react";
import { ServicesHero } from "@/app/components/services/ServicesHero";
import { ServicesCategoryFilter } from "@/app/components/services/ServicesCategoryFilter";
import { ServicesGrid } from "@/app/components/services/ServicesGrid";
import { WhyChooseUs } from "@/app/components/services/WhyChooseUs";
import { ServicesCTA } from "@/app/components/services/ServicesCTA";
import { FloatingWhatsApp } from "@/app/components/layout/FloatingWhatsApp";

export default function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");

    return (
        <div className="flex flex-col min-h-screen font-display bg-background-light">
            <ServicesHero />
            <ServicesCategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
            />
            <ServicesGrid selectedCategory={selectedCategory} />
            <WhyChooseUs />
            <ServicesCTA />
            <FloatingWhatsApp />
        </div>
    );
}
