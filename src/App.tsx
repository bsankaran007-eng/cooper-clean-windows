import { useCallback, useState } from 'react';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import EstimateSection from './components/EstimateSection';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import ReviewsAndAreaSection from './components/ReviewsAndAreaSection';
import ServicesSection from './components/ServicesSection';
import StickyMobileBar from './components/StickyMobileBar';
import type { ServiceId } from './utils/estimateCalculator';

export default function App() {
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([
    'windows',
    'driveway',
  ]);

  const scrollToEstimate = useCallback(() => {
    const target = document.getElementById('estimate-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleToggleService = useCallback((serviceId: ServiceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  }, []);

  const handleSelectServiceForEstimate = useCallback(
    (serviceId: ServiceId) => {
      setSelectedServices((prev) =>
        prev.includes(serviceId) ? prev : [...prev, serviceId]
      );
      scrollToEstimate();
    },
    [scrollToEstimate]
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <Header onScrollToEstimate={scrollToEstimate} />

      <main>
        <Hero onScrollToEstimate={scrollToEstimate} />
        <ServicesSection onSelectServiceForEstimate={handleSelectServiceForEstimate} />
        <BeforeAfterSlider onSelectServiceForEstimate={handleSelectServiceForEstimate} />
        <EstimateSection
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
        />
        <ReviewsAndAreaSection onScrollToEstimate={scrollToEstimate} />
      </main>

      <Footer onScrollToEstimate={scrollToEstimate} />
      <StickyMobileBar onScrollToEstimate={scrollToEstimate} />
    </div>
  );
}
