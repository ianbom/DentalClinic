import { AboutCTA } from '@/Components/about/AboutCTA';
import { AboutHero } from '@/Components/about/AboutHero';
import { AboutStory } from '@/Components/about/AboutStory';
import { LocationContact } from '@/Components/about/LocationContact';
import { TeamSection } from '@/Components/about/TeamSection';
import { VisionMission } from '@/Components/about/VisionMission';
import { FloatingWhatsApp } from '@/Components/layout/FloatingWhatsApp';
import PatientLayout from '@/Layouts/PatientLayout';

function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col font-display">
            <AboutHero />
            <AboutStory />
            <VisionMission />
            <TeamSection />
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
