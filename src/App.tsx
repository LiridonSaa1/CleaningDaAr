import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { GallerySection } from './components/GallerySection';
import { ServiceAreaMap } from './components/ServiceAreaMap';
import { FAQSection } from './components/FAQSection';
import { ContactQuoteSection } from './components/ContactQuoteSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { LegalModals, LegalModalType } from './components/LegalModals';
import { Language } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('de');
  const [legalModal, setLegalModal] = useState<LegalModalType>(null);
  
  // Prefill states for contact form
  const [prefilledService, setPrefilledService] = useState<string>('');
  const [prefilledSummary, setPrefilledSummary] = useState<string>('');
  const [prefilledSqm, setPrefilledSqm] = useState<number>(0);
  const [prefilledFrequency, setPrefilledFrequency] = useState<string>('');

  const handleOpenCalculator = () => {
    const el = document.getElementById('rechner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuote = () => {
    const el = document.getElementById('kontakt');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForQuote = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    setPrefilledSummary(`Interesse an der Leistung: ${serviceTitle}`);
    handleOpenQuote();
  };

  const handleApplyCalculatedQuote = (
    summary: string,
    objectType: string,
    squareMeters: number,
    frequency: string
  ) => {
    setPrefilledService(objectType);
    setPrefilledSummary(summary);
    setPrefilledSqm(squareMeters);
    setPrefilledFrequency(frequency);
    handleOpenQuote();
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-[#1855EA] selection:text-white flex flex-col relative">
      {/* Top Floating Glass Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={setLang}
        onOpenCalculator={handleOpenCalculator}
        onOpenQuote={handleOpenQuote}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          lang={lang}
          onOpenCalculator={handleOpenCalculator}
          onOpenQuote={handleOpenQuote}
        />

        <AboutSection
          lang={lang}
          onOpenQuote={handleOpenQuote}
        />

        <ServicesSection
          lang={lang}
          onSelectServiceForQuote={handleSelectServiceForQuote}
        />

        {/* Process Section with Integrated Instant Online Quote Engine right below Services */}
        <ProcessSection
          lang={lang}
          onOpenQuote={handleOpenQuote}
          onApplyCalculatedQuote={handleApplyCalculatedQuote}
        />

        <BeforeAfterSlider
          lang={lang}
          onOpenQuote={handleOpenQuote}
        />

        <TestimonialsCarousel
          lang={lang}
        />

        <GallerySection
          lang={lang}
        />

        <ServiceAreaMap
          lang={lang}
          onOpenQuote={handleOpenQuote}
        />

        <FAQSection
          lang={lang}
          onOpenQuote={handleOpenQuote}
        />

        <ContactQuoteSection
          lang={lang}
          prefilledService={prefilledService}
          prefilledSummary={prefilledSummary}
          prefilledSqm={prefilledSqm}
          prefilledFrequency={prefilledFrequency}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenLegal={setLegalModal}
        onSelectService={handleSelectServiceForQuote}
        onOpenQuote={handleOpenQuote}
      />

      {/* Floating Quick Action Bar */}
      <FloatingActions />

      {/* Impressum / Datenschutz / AGB Modals */}
      <LegalModals
        activeModal={legalModal}
        onClose={() => setLegalModal(null)}
      />
    </div>
  );
}
