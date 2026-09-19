import React, { useState, useEffect } from 'react';
import CadCrosshairs from './components/common/CadCrosshairs';
import ScrollToTop from './components/common/ScrollToTop';
import FloatingWhatsApp from './components/common/FloatingWhatsApp';
import ToastContainer from './components/common/ToastContainer';

import SiteHeader from './components/layout/SiteHeader';
import MobileDrawer from './components/layout/MobileDrawer';
import SiteFooter from './components/layout/SiteFooter';

import HeroSection from './components/hero/HeroSection';
import SolutionsSection from './components/solutions/SolutionsSection';
import DigitalPillars from './components/solutions/DigitalPillars';
import GrowthJourney from './components/solutions/GrowthJourney';
import WhyUs from './components/solutions/WhyUs';
import FeaturesLibrary from './components/features/FeaturesLibrary';
import WidgetsSection from './components/widgets/WidgetsSection';
import PortfolioSection from './components/portfolio/PortfolioSection';
import PricingSection from './components/pricing/PricingSection';
import BrochureSection from './components/brochure/BrochureSection';
import AddonsSection from './components/addons/AddonsSection';
import TestimonialsSection from './components/testimonials/TestimonialsSection';
import FaqSection from './components/faq/FaqSection';

import LiveViewportModal from './components/modals/LiveViewportModal';
import SpecSheetModal from './components/modals/SpecSheetModal';
import FleetMobilizeModal from './components/modals/FleetMobilizeModal';
import ConsultModal from './components/modals/ConsultModal';
import RfpModal from './components/modals/RfpModal';
import DownloadSuccessModal from './components/modals/DownloadSuccessModal';
import AdminModal from './components/admin/AdminModal';
import { useApp } from './context/AppContext';

export default function App() {
  const { activeModal, closeModal } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // IntersectionObserver scroll reveal for modern fluid entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="contractor-app">
      {/* CAD Blueprint Crosshair Decorators */}
      <CadCrosshairs />

      {/* Header Navigation */}
      <SiteHeader onOpenMobileDrawer={() => setMobileDrawerOpen(true)} />
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Main Sections */}
      <main>
        <HeroSection />
        <SolutionsSection />
        <DigitalPillars />
        <GrowthJourney />
        <WhyUs />
        <FeaturesLibrary />
        <WidgetsSection />
        <PortfolioSection />
        <PricingSection />
        <BrochureSection />
        <AddonsSection />
        <TestimonialsSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <SiteFooter />

      {/* Interactive Modals */}
      <LiveViewportModal />
      <SpecSheetModal />
      <FleetMobilizeModal />
      <ConsultModal />
      <RfpModal />
      <DownloadSuccessModal />
      <AdminModal isOpen={activeModal === 'admin'} onClose={closeModal} />

      {/* Floating Utilities */}
      <ToastContainer />
      <ScrollToTop />
      <FloatingWhatsApp />
    </div>
  );
}
