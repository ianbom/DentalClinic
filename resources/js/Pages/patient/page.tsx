import { Hero } from "@/app/components/home/Hero";
import { Features } from "@/app/components/home/Features";
import { Services } from "@/app/components/home/Services";
import { Testimonials } from "@/app/components/home/Testimonials";
import { CTA } from "@/app/components/home/CTA";
import { FloatingWhatsApp } from "@/app/components/layout/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full overflow-x-hidden font-display antialiased">
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <CTA />
      <FloatingWhatsApp />
    </div>
  );
}
