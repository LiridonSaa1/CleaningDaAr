import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  X, 
  Check, 
  Clock, 
  ChevronRight,
  Sparkles,
  Building2,
  Maximize2,
  Hammer
} from 'lucide-react';
import { SERVICES_DATA } from '../data/content';
import { ServiceItem, ServiceCategory, Language } from '../types';
import { getServiceIllustration } from './ServiceIllustrations';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectServiceForQuote,
}) => {
  const [showAllServices, setShowAllServices] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  // Four featured services matching the exact 2x2 layout from the reference image
  // 1. Home Cleaning (Unterhaltsreinigung / Wohnungsreinigung)
  // 2. Apartment Cleaning (Wohnungs- & Treppenhausreinigung)
  // 3. Office Cleaning (Büro- & Gewerbereinigung)
  // 4. Mall / Commercial Cleaning (Gewerbe & Einkaufszentren / Baureinigung)
  const featuredServices = [
    {
      id: 'unterhaltsreinigung',
      titleEn: 'Home Cleaning',
      titleDe: 'Unterhaltsreinigung',
      descEn: 'Keep your home fresh, organized, and spotless with routine cleaning tailored to your lifestyle and household needs.',
      descDe: 'Regelmäßige, werterhaltende Sauberkeit für Ihr Zuhause oder Büro mit geschultem Fachpersonal und flexiblen Intervallen.',
      illustrationId: 'home-cleaning',
    },
    {
      id: 'wohnungsreinigung',
      titleEn: 'Apartment Cleaning',
      titleDe: 'Wohnungsreinigung',
      descEn: 'Enjoy a cleaner apartment with detailed cleaning services that ensure maximum comfort, hygiene, and everyday living conditions.',
      descDe: 'Gründliche Reinigung von Wohnungen und Apartments für perfekten Wohnkomfort, Hygiene und ein makelloses Wohlfühlklima.',
      illustrationId: 'apartment-cleaning',
    },
    {
      id: 'buero-gewerbereinigung',
      titleEn: 'Office Cleaning',
      titleDe: 'Büro- & Gewerbereinigung',
      descEn: 'Maintain a professional workplace with thorough cleaning that boosts team productivity and creates positive impressions.',
      descDe: 'Repräsentative Sauberkeit und frische Atmosphäre für Büros, Kanzleien und Praxen für höchste Produktivität und Diskretion.',
      illustrationId: 'office-cleaning',
    },
    {
      id: 'gewerbereinigung',
      titleEn: 'Mall Cleaning',
      titleDe: 'Gewerbe & Verkaufsflächen',
      descEn: 'Ensure shopping areas remain clean, safe, and welcoming with specialized high-traffic commercial cleaning solutions.',
      descDe: 'Fachgerechte Pflege für Einkaufszentren, Ladengeschäfte und stark frequentierte Gewerbeflächen mit modernster Technik.',
      illustrationId: 'mall-cleaning',
    },
  ];

  const allDisplayServices = showAllServices
    ? (selectedCategory === 'all' ? SERVICES_DATA : SERVICES_DATA.filter((s) => s.category === selectedCategory))
    : SERVICES_DATA.slice(0, 4);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: lang === 'de' ? 'Alle Leistungen' : 'All Services' },
    { id: 'commercial', label: lang === 'de' ? 'Büro & Gewerbe' : 'Office & Commercial' },
    { id: 'residential', label: lang === 'de' ? 'Wohnen & Haus' : 'Residential' },
    { id: 'special', label: lang === 'de' ? 'Glas & Spezial' : 'Glass & Special' },
    { id: 'construction', label: lang === 'de' ? 'Baureinigung' : 'Construction' },
  ];

  const handleOpenServiceDetails = (serviceId: string) => {
    const found = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
    setActiveModalService(found);
  };

  return (
    <section id="leistungen" className="py-20 md:py-28 relative scroll-mt-20 bg-white">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Left Title and Right Action Button matching reference design */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start"
          >
            {/* Eyebrow */}
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#6B7280] uppercase mb-3 block font-sans">
              {lang === 'de' ? 'UNSERE LEISTUNGEN' : 'OUR SERVICES'}
            </span>

            {/* Headline matching reference image typography */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111827] tracking-[-0.02em] leading-[1.18] font-display">
              <span>{lang === 'de' ? 'Maßgeschneiderte Reinigung für' : 'Your Trusted Cleaning'}</span>
              <br />
              <span className="text-[#1855EA]">{lang === 'de' ? 'höchste Ansprüche.' : 'Service Partner.'}</span>
            </h2>
          </motion.div>

          {/* Right Action Button: View All Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="shrink-0"
          >
            <button
              onClick={() => setShowAllServices(!showAllServices)}
              className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-semibold text-sm sm:text-[15px] px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <span>
                {showAllServices
                  ? (lang === 'de' ? 'Weniger anzeigen' : 'Show Featured')
                  : (lang === 'de' ? 'Alle Leistungen ansehen' : 'View All Services')}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Optional Category Pills when View All is expanded */}
        <AnimatePresence>
          {showAllServices && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-start gap-2 flex-wrap mb-10 overflow-hidden"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1855EA] text-white shadow-sm'
                      : 'bg-[#F0F5FF] text-[#374151] hover:bg-[#E5EEFF] hover:text-[#1855EA]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary 2x2 Services Cards Grid matching the Reference Image */}
        {!showAllServices ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {featuredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => handleOpenServiceDetails(service.id)}
                className="bg-[#F0F5FF] hover:bg-[#E9F1FF] rounded-2xl p-6 sm:p-8 lg:p-9 transition-all duration-300 flex items-start gap-5 sm:gap-7 cursor-pointer group hover:shadow-md border border-transparent hover:border-blue-200/60"
              >
                {/* Left: 2D Building & Cleaning Tool Illustration */}
                <div className="group-hover:scale-105 transition-transform duration-300">
                  {getServiceIllustration(service.illustrationId, 'w-16 h-16 sm:w-20 sm:h-20')}
                </div>

                {/* Right: Content Block */}
                <div className="flex-1 flex flex-col items-start justify-between min-h-[140px]">
                  <div>
                    <h3 className="text-xl sm:text-[22px] font-bold text-[#111827] group-hover:text-[#1855EA] transition-colors leading-snug mb-2 font-display">
                      {lang === 'de' ? service.titleDe : service.titleEn}
                    </h3>
                    <p className="text-[#4B5563] text-sm sm:text-[15px] leading-relaxed font-normal">
                      {lang === 'de' ? service.descDe : service.descEn}
                    </p>
                  </div>

                  {/* Learn More Link with Blue Arrow */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenServiceDetails(service.id);
                    }}
                    className="text-[#1855EA] font-semibold text-sm sm:text-[15px] inline-flex items-center gap-1.5 mt-4 group/btn hover:underline cursor-pointer"
                  >
                    <span>{lang === 'de' ? 'Mehr erfahren' : 'Learn More'}</span>
                    <div className="w-5 h-5 rounded-full bg-[#1855EA] text-white flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Expanded All Services Grid in the exact same 2-column card style */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {allDisplayServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setActiveModalService(service)}
                className="bg-[#F0F5FF] hover:bg-[#E9F1FF] rounded-2xl p-6 sm:p-8 lg:p-9 transition-all duration-300 flex items-start gap-5 sm:gap-7 cursor-pointer group hover:shadow-md border border-transparent hover:border-blue-200/60"
              >
                {/* Left: 2D Illustration */}
                <div className="group-hover:scale-105 transition-transform duration-300">
                  {getServiceIllustration(service.id, 'w-16 h-16 sm:w-20 sm:h-20')}
                </div>

                {/* Right: Content */}
                <div className="flex-1 flex flex-col items-start justify-between min-h-[140px]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl sm:text-[22px] font-bold text-[#111827] group-hover:text-[#1855EA] transition-colors leading-snug font-display">
                        {service.title}
                      </h3>
                      {service.badge && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#1855EA] text-white">
                          {service.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[#4B5563] text-sm sm:text-[15px] leading-relaxed font-normal mb-3">
                      {service.shortDescription}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalService(service);
                    }}
                    className="text-[#1855EA] font-semibold text-sm sm:text-[15px] inline-flex items-center gap-1.5 mt-2 group/btn hover:underline cursor-pointer"
                  >
                    <span>{lang === 'de' ? 'Mehr erfahren' : 'Learn More'}</span>
                    <div className="w-5 h-5 rounded-full bg-[#1855EA] text-white flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Rich Detail Modal Dialog */}
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

              {/* Modal Header with Illustration */}
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-[#F0F5FF] rounded-xl shrink-0">
                  {getServiceIllustration(activeModalService.id, 'w-14 h-14')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 font-display">{activeModalService.title}</h3>
                  <span className="text-xs font-semibold text-[#1855EA] inline-flex items-center gap-1 mt-0.5">
                    {lang === 'de' ? 'Kostenlose & unverbindliche Offerte' : 'Free & Non-binding Quote'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {activeModalService.fullDescription}
              </p>

              {/* Full Checklist */}
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

              {/* Customer Benefits */}
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

              {/* Modal Bottom CTA */}
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
