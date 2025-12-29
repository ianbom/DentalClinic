import { CTA } from '@/Components/home/CTA';
import { Features } from '@/Components/home/Features';
import { Hero } from '@/Components/home/Hero';
import { Services } from '@/Components/home/Services';
import { Testimonials } from '@/Components/home/Testimonials';
import { FloatingWhatsApp } from '@/Components/layout/FloatingWhatsApp';
import PatientLayout from '@/Layouts/PatientLayout';

function Home() {
    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden font-display antialiased">
            <Hero />
            <Features />
            <Services />
            <Testimonials />
            <CTA />
            <FloatingWhatsApp />
        </div>
    );
}

Home.layout = (page: React.ReactNode) => <PatientLayout>{page}</PatientLayout>;

export default Home;
