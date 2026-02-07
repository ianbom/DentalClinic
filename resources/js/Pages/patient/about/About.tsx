import { AboutCTA } from '@/Components/about/AboutCTA';
import { AboutHero } from '@/Components/about/AboutHero';
import { AboutStory } from '@/Components/about/AboutStory';
import { LocationContact } from '@/Components/about/LocationContact';
import { TeamSection } from '@/Components/about/TeamSection';
import { VisionMission } from '@/Components/about/VisionMission';
import { FloatingWhatsApp } from '@/Components/layout/FloatingWhatsApp';
import PatientLayout from '@/Layouts/PatientLayout';
import { Doctor } from '@/types';

interface AboutPageProps {
    doctors: Doctor[];
}

function AboutPage({ doctors }: AboutPageProps) {
    return (
        <div className="flex min-h-screen flex-col font-display">
            <AboutHero />
            <AboutStory />
            <VisionMission />
            <TeamSection doctors={doctors} />
            <LocationContact />
            <AboutCTA />
            <FloatingWhatsApp />
        </div>
    );
}

AboutPage.layout = (page: React.ReactNode) => (
    <PatientLayout>{page}</PatientLayout>
);

export default AboutPage;
