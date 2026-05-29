import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import ValueProposition from '@/components/sections/ValueProposition';
import Services from '@/components/sections/Services';
import Technologies from '@/components/sections/Technologies';
import Brands from '@/components/sections/Brands';
import Process from '@/components/sections/Process';
import BeforeAfter from '@/components/sections/BeforeAfter';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProposition />
        <Services />
        <Technologies />
        <Brands />
        <Process />
        <BeforeAfter />
        <Testimonials />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
