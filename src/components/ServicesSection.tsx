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
import { getServices } from '../lib/supabase';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectServiceForQuote,
}) => {
  const [servicesList, setServicesList] = useState<ServiceItem[]>(SERVICES_DATA);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    async function loadDynamicServices() {
      try {
        const dbItems = await getServices();
        if (dbItems && dbItems.length > 0) {
          const mapped: ServiceItem[] = dbItems.map((db, idx) => ({
            id: db.id,
            title: lang === 'de' ? db.title_de : db.title_en,
            titleDe: db.title_de,
            titleEn: db.title_en,
            category: (db.category as any) || 'residential',
            badge: db.badge,
            popular: idx === 0 || idx === 1,
            priceFrom: db.price_from,
            frequencyRecommendation: 'Regelmäßig nach Wunsch',
            shortDescription: lang === 'de' ? db.short_desc_de : db.short_desc_en,
            shortDescriptionDe: db.short_desc_de,
            shortDescriptionEn: db.short_desc_en,
            fullDescription: db.full_desc || db.short_desc_de,
            iconName: db.icon_name || 'Sparkles',
            image: db.image,
            checklist: db.checklist || [],
            benefits: db.benefits || []
          }));
          setServicesList(mapped);
        }
      } catch (e) {
        console.warn('Failed loading dynamic services:', e);
      }
    }

    loadDynamicServices();
  }, [lang]);

  const totalServices = servicesList.length;

  const handleNext = useCallback(() => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % totalServices);
  }, [totalServices]);

  const handlePrev = useCallback(() => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + totalServices) % totalServices);
  }, [totalServices]);

  // Autoplay functionality
  useEffect(() => {
    if (!isAutoplay || activeModalService || totalServices === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, activeModalService, handleNext, totalServices]);

  // 4 visible items for the 2x2 slider grid view
  const visibleServices = [
    servicesList[currentIndex % totalServices],
    servicesList[(currentIndex + 1) % totalServices],
    servicesList[(currentIndex + 2) % totalServices],
    servicesList[(currentIndex + 3) % totalServices],
  ].filter(Boolean);

  return (
    <section id="leistungen" className="py-20 md:py-28 bg-[#FAFCFF] relative scroll-mt-20 overflow-hidden font-sans">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-[#6B7280] uppercase mb-3 block">
              {lang === 'de' ? 'UNSERE LEISTUNGEN & EXPERTISE' : 'OUR SERVICES & EXPERTISE'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight font-display">
              {lang === 'de' ? (
                <>
                  Professionelle Reinigung für{' '}
                  <span className="text-[#1855EA]">
                    Gewerbe &amp; Privat
                  </span>
                </>
              ) : (
                <>
                  Professional Cleaning for{' '}
                  <span className="text-[#1855EA]">
                    Commercial &amp; Private
                  </span>
                </>
              )}
            </h2>
          </motion.div>

          {/* Slider Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 shrink-0"
          >
            <button
              onClick={handlePrev}
              onMouseEnter={() => setIsAutoplay(false)}
              onMouseLeave={() => setIsAutoplay(true)}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#1855EA] hover:bg-[#1855EA] text-[#111827] hover:text-white flex items-center justify-center transition-all cursor-pointer group"
              aria-label="Previous services"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
            </button>

            <button
              onClick={handleNext}
              onMouseEnter={() => setIsAutoplay(false)}
              onMouseLeave={() => setIsAutoplay(true)}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-[#1855EA] hover:bg-[#1855EA] text-[#111827] hover:text-white flex items-center justify-center transition-all cursor-pointer group"
              aria-label="Next services"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.2]" />
            </button>
          </motion.div>
        </div>

        {/* 2x2 Services Grid Container in Original Light Blue Card Design */}
        <div 
          className="relative min-h-[420px]"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
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
          {servicesList.map((_, idx) => (
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
              className="bg-white max-w-2xl w-full rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-slate-100 font-sans"
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
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                {activeModalService.fullDescription}
              </p>

              {/* Checklist */}
              {activeModalService.checklist && activeModalService.checklist.length > 0 && (
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
              )}

              {/* Benefits */}
              {activeModalService.benefits && activeModalService.benefits.length > 0 && (
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
              )}

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
                    const title = activeModalService.titleDe || activeModalService.title;
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
