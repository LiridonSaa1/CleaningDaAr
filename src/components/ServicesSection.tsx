import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  X, 
  Check 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/content';
import { ServiceItem, Language } from '../types';
import { getServiceIllustration } from './ServiceIllustrations';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectServiceForQuote,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const totalServices = SERVICES_DATA.length; // 8 services

  const handleNext = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalServices);
  }, [totalServices]);

  const handlePrev = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalServices) % totalServices);
  }, [totalServices]);

  // Autoplay functionality (pauses when modal is active or user hovers)
  useEffect(() => {
    if (!isAutoplay || activeModalService) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, activeModalService, handleNext]);

  // 4 visible items for the 2x2 slider grid view in infinite loop
  const visibleServices = [
    SERVICES_DATA[(currentIndex) % totalServices],
    SERVICES_DATA[(currentIndex + 1) % totalServices],
    SERVICES_DATA[(currentIndex + 2) % totalServices],
    SERVICES_DATA[(currentIndex + 3) % totalServices],
  ];

  return (
    <section id="leistungen" className="py-16 sm:py-24 relative scroll-mt-20 bg-white overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Left Title & Right Navigation Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#6B7280] uppercase mb-2 block font-sans">
              {lang === 'de' ? 'UNSERE LEISTUNGEN' : 'OUR SERVICES'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#111827] tracking-[-0.02em] leading-[1.2] font-display">
              <span>{lang === 'de' ? 'Maßgeschneiderte Reinigung für' : 'Your Trusted Cleaning'}</span>
              <br />
              <span className="text-[#1855EA]">{lang === 'de' ? 'höchste Ansprüche.' : 'Service Partner.'}</span>
            </h2>
          </motion.div>

          {/* Navigation Arrow Controls */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Slide Position Indicator Dots */}
            <div className="hidden sm:flex items-center gap-1.5 mr-2">
              {SERVICES_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 'right' : 'left');
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx 
                      ? 'w-6 bg-[#1855EA]' 
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Previous Arrow Button */}
            <button
              onClick={() => {
                setIsAutoplay(false);
                handlePrev();
              }}
              className="w-11 h-11 rounded-full bg-[#F0F5FF] hover:bg-[#1855EA] text-[#1855EA] hover:text-white border border-[#D0E7FF] hover:border-transparent flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Next Arrow Button */}
            <button
              onClick={() => {
                setIsAutoplay(false);
                handleNext();
              }}
              className="w-11 h-11 rounded-full bg-[#1855EA] hover:bg-[#1344C4] text-white flex items-center justify-center transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer active:scale-95"
              aria-label="Next service"
            >
              <ChevronRight className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* 2x2 Cards Grid Slider Container (Matching reference image card design) */}
        <div 
          className="relative min-h-[380px]"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction === 'right' ? 35 : -35 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'right' ? -35 : 35 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
            >
              {visibleServices.map((service, idx) => {
                const title = lang === 'de' ? (service.titleDe || service.title) : (service.titleEn || service.title);
                const desc = lang === 'de' ? (service.shortDescriptionDe || service.shortDescription) : (service.shortDescriptionEn || service.shortDescription);

                return (
                  <div
                    key={`${service.id}-${idx}`}
                    onClick={() => setActiveModalService(service)}
                    className="bg-[#F0F5FF] hover:bg-[#E9F1FF] rounded-2xl p-6 sm:p-8 transition-all duration-300 flex items-start gap-5 sm:gap-7 cursor-pointer group hover:shadow-md border border-transparent hover:border-blue-200/60 h-full"
                  >
                    {/* Left: 2D Building & Cleaning Illustration Icon */}
                    <div className="shrink-0 group-hover:scale-105 transition-transform duration-300 mt-1">
                      {getServiceIllustration(service.id, 'w-16 h-16 sm:w-20 sm:h-20')}
                    </div>

                    {/* Right: Text Content */}
                    <div className="flex-1 flex flex-col justify-between min-h-[130px]">
                      <div>
                        <h3 className="text-xl sm:text-[22px] font-bold text-[#111827] group-hover:text-[#1855EA] transition-colors leading-snug mb-2 font-display">
                          {title}
                        </h3>
                        <p className="text-[#4B5563] text-sm sm:text-[15px] leading-relaxed font-normal mb-4">
                          {desc}
                        </p>
                      </div>

                      {/* Learn More Link with Blue Circular Arrow Icon */}
                      <div className="text-[#1855EA] font-semibold text-sm sm:text-[15px] inline-flex items-center gap-2 group/btn hover:underline">
                        <span>{lang === 'de' ? 'Mehr erfahren' : 'Learn More'}</span>
                        <div className="w-5 h-5 rounded-full bg-[#1855EA] text-white flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                          <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Slide Dots */}
        <div className="flex sm:hidden justify-center items-center gap-1.5 mt-8">
          {SERVICES_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 'right' : 'left');
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-6 bg-[#1855EA]' : 'w-2 bg-slate-200'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Service Details Interactive Modal */}
      <AnimatePresence>
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white max-w-2xl w-full rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalService(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-[#F0F5FF] rounded-xl shrink-0">
                  {getServiceIllustration(activeModalService.id, 'w-14 h-14')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">
                    {lang === 'de' ? (activeModalService.titleDe || activeModalService.title) : (activeModalService.titleEn || activeModalService.title)}
                  </h3>
                  <span className="text-xs font-semibold text-[#1855EA] inline-flex items-center gap-1 mt-0.5">
                    {lang === 'de' ? 'Kostenlose & unverbindliche Offerte' : 'Free & Non-binding Quote'}
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {activeModalService.fullDescription}
              </p>

              {/* Checklist */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  {lang === 'de' ? 'Enthaltene Reinigungsleistungen:' : 'Included Cleaning Tasks:'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModalService.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-[#EBF3FF] text-[#1855EA] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="p-4 rounded-xl bg-[#F0F5FF] border border-blue-100/60 mb-6">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  {lang === 'de' ? 'Ihre DuaAri Clean Vorteile:' : 'Your Benefits with DuaAri Clean:'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {activeModalService.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1855EA]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  {lang === 'de' ? 'Schließen' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    onSelectServiceForQuote(title);
                  }}
                  className="bg-[#1855EA] hover:bg-[#1344C4] text-white px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <span>{lang === 'de' ? 'Jetzt für diesen Service anfragen' : 'Inquire for this Service'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
