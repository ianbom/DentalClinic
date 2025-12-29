'use client';

import { FloatingWhatsApp } from '@/Components/layout/FloatingWhatsApp';
import { ServicesCategoryFilter } from '@/Components/services/ServicesCategoryFilter';
import { ServicesCTA } from '@/Components/services/ServicesCTA';
import { ServicesGrid } from '@/Components/services/ServicesGrid';
import { ServicesHero } from '@/Components/services/ServicesHero';
import { WhyChooseUs } from '@/Components/services/WhyChooseUs';
import PatientLayout from '@/Layouts/PatientLayout';
import { useState } from 'react';

function ServicesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    return (
        <div className="flex min-h-screen flex-col bg-background-light font-display">
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

ServicesPage.layout = (page: React.ReactNode) => (
    <PatientLayout>{page}</PatientLayout>
);

export default ServicesPage;
