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
import { getServices, ServiceDbItem } from '../lib/supabase';

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

  // Autoplay functionality (pauses when modal is active or user hovers)
  useEffect(() => {
    if (!isAutoplay || activeModalService || totalServices === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, activeModalService, handleNext, totalServices]);

  // 4 visible items for the 2x2 slider grid view in infinite loop
  const visibleServices = [
    servicesList[currentIndex % totalServices],
    servicesList[(currentIndex + 1) % totalServices],
    servicesList[(currentIndex + 2) % totalServices],
    servicesList[(currentIndex + 3) % totalServices],
  ].filter(Boolean);

  return (
    <section id="leistungen" className="py-20 md:py-28 bg-[#FAFCFF] relative scroll-mt-20 overflow-hidden font-sans">
      
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#1855EA]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
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

        {/* 2x2 Services Grid Container */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            {visibleServices.map((service, index) => (
              <motion.div
                key={`${service.id}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  {/* Top Badge & Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#EBF3FF] text-[#1855EA] flex items-center justify-center shadow-xs group-hover:bg-[#1855EA] group-hover:text-white transition-colors duration-300">
                      {getServiceIllustration(service.id, "w-8 h-8")}
                    </div>

                    {service.badge && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F0F5FF] text-[#1855EA] border border-[#1855EA]/20 uppercase tracking-wider">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2 font-display">
                    {lang === 'de' ? service.titleDe : service.titleEn}
                  </h3>

                  <p className="text-xs font-bold text-[#1855EA] mb-4">
                    {service.priceFrom}
                  </p>

                  <p className="text-[#4B5563] text-sm leading-relaxed mb-6 font-normal line-clamp-3">
                    {lang === 'de' ? service.shortDescriptionDe : service.shortDescriptionEn}
                  </p>
                </div>

                {/* Card Bottom CTA Actions */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="text-xs sm:text-sm font-bold text-[#1855EA] hover:underline cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{lang === 'de' ? 'Details & Checkliste' : 'Details & Checklist'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForQuote(service.titleDe || service.title)}
                    className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    {lang === 'de' ? 'Angebot anfordern' : 'Request Quote'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* SERVICE DETAIL MODAL */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto font-sans">
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF3FF] text-[#1855EA] flex items-center justify-center">
                {getServiceIllustration(activeModalService.id, "w-7 h-7")}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {lang === 'de' ? activeModalService.titleDe : activeModalService.titleEn}
                </h3>
                <span className="text-xs text-[#1855EA] font-bold">{activeModalService.priceFrom}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {activeModalService.fullDescription}
            </p>

            {activeModalService.checklist && activeModalService.checklist.length > 0 && (
              <div className="bg-slate-50 p-5 rounded-2xl space-y-2.5">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  {lang === 'de' ? 'Inbegriffene Checklisten-Punkte:' : 'Included Checklist Items:'}
                </span>
                {activeModalService.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                {lang === 'de' ? 'Schließen' : 'Close'}
              </button>

              <button
                onClick={() => {
                  const targetTitle = activeModalService.titleDe || activeModalService.title;
                  setActiveModalService(null);
                  onSelectServiceForQuote(targetTitle);
                }}
                className="bg-[#1855EA] hover:bg-[#1344C4] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
              >
                {lang === 'de' ? 'Angebot für diese Leistung anfordern' : 'Request Quote for this Service'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
