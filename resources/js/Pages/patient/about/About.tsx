import { AboutHero } from "@/app/components/about/AboutHero";
import { AboutStory } from "@/app/components/about/AboutStory";
import { VisionMission } from "@/app/components/about/VisionMission";
import { TeamSection } from "@/app/components/about/TeamSection";
import { LocationContact } from "@/app/components/about/LocationContact";
import { AboutCTA } from "@/app/components/about/AboutCTA";
import { FloatingWhatsApp } from "@/app/components/layout/FloatingWhatsApp";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen font-display">
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
