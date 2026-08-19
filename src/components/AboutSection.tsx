import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { getAboutFeatures, AboutFeatureItem, INITIAL_MOCK_ABOUT_FEATURES } from '../lib/supabase';

interface AboutSectionProps {
  lang: Language;
  onOpenQuote?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, onOpenQuote }) => {
  const [activeCardId, setActiveCardId] = useState<string>('best-result');
  const [featuresList, setFeaturesList] = useState<AboutFeatureItem[]>([]);

  useEffect(() => {
    async function loadDynamicFeatures() {
      try {
        const data = await getAboutFeatures();
        if (data && data.length > 0) {
          setFeaturesList(data);
        }
      } catch (err) {
        console.warn('Failed loading about features:', err);
      }
    }

    loadDynamicFeatures();

    const handleUpdate = () => {
      loadDynamicFeatures();
    };

    window.addEventListener('duaari_about_features_updated', handleUpdate);
    return () => window.removeEventListener('duaari_about_features_updated', handleUpdate);
  }, []);

  const activeFeatures = featuresList.length > 0 ? featuresList : INITIAL_MOCK_ABOUT_FEATURES;
  const activeCard = activeFeatures.find((c) => c.id === activeCardId) || activeFeatures[0];

  return (
    <section id="vorteile" className="py-20 md:py-28 bg-white relative scroll-mt-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.18em] text-[#6B7280] uppercase mb-3 block">
            {lang === 'de' ? 'WER WIR SIND' : 'WHO WE ARE'}
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-[#111827] tracking-tight leading-[1.18] mb-4">
            {lang === 'de' ? (
              <>
                Engagiert für sauberere <span className="text-[#1855EA] font-normal">bessere Räume.</span>
              </>
            ) : (
              <>
                Dedicated To Cleaner <span className="text-[#1855EA] font-normal">Better Spaces.</span>
              </>
            )}
          </h2>

          <p className="text-[#4B5563] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-8 font-normal">
            {lang === 'de'
              ? 'Wir bieten zuverlässige und zertifizierte Reinigungslösungen für Gewerbe, Büros und Privathaushalte in Ingolstadt und Umgebung – für makellose Sauberkeit, gesunde Hygiene und höchste Wohlfühlatmosphäre.'
              : 'We provide reliable, certified cleaning solutions for commercial, office, and residential clients in Ingolstadt and surrounding areas—ensuring spotless cleanliness, healthy hygiene, and comfortable spaces.'}
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center bg-[#1855EA] hover:bg-[#1242be] text-white font-semibold text-sm sm:text-[15px] px-7 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>{lang === 'de' ? 'Mehr über uns & Angebot anfordern' : 'More About Us & Get Quote'}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        {/* 5-Element Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-stretch pt-6 sm:pt-8">
          {/* LEFT COLUMN: 2 Feature Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            {/* Card 1 */}
            {(() => {
              const card = activeFeatures[0] || INITIAL_MOCK_ABOUT_FEATURES[0];
              const isActive = activeCardId === card.id;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  onClick={() => setActiveCardId(card.id)}
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center flex-1 justify-center transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-[#EBF3FF] ring-2 ring-[#1855EA] shadow-md -translate-y-1'
                      : 'bg-[#F4F8FE] hover:bg-[#EBF3FF]/70 hover:-translate-y-1 hover:shadow-sm'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 text-[11px] font-semibold text-[#1855EA] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1855EA]" />
                      <span>{lang === 'de' ? 'Aktiv' : 'Active'}</span>
                    </div>
                  )}

                  <div className="w-16 h-16 sm:w-18 sm:h-18 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                      <path d="M32 16a16 16 0 1 0 16 16 16 16 0 0 0-16-16zm0 24a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" fill="#DBEAFE" />
                      <path d="M32 10v4M32 50v4M10 32h4M50 32h4M16.4 16.4l2.8 2.8M44.8 44.8l2.8 2.8M16.4 47.6l2.8-2.8M44.8 19.2l2.8-2.8" stroke="#1855EA" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="32" cy="32" r="14" fill="#1855EA" />
                      <path d="M26 32l4 4 8-8" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 48c2-4 6-6 10-6s8 2 10 6" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-2 font-display">
                    {lang === 'de' ? card.title_de : card.title_en}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed max-w-xs font-normal">
                    {lang === 'de' ? card.description_de : card.description_en}
                  </p>

                  <div className="mt-4 text-[11.5px] font-semibold text-[#1855EA] flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    <span>{lang === 'de' ? 'Hier klicken für Foto & Details' : 'Click to view photo & details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })()}

            {/* Card 2 */}
            {(() => {
              const card = activeFeatures[1] || INITIAL_MOCK_ABOUT_FEATURES[1];
              const isActive = activeCardId === card.id;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => setActiveCardId(card.id)}
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center flex-1 justify-center transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-[#EBF3FF] ring-2 ring-[#1855EA] shadow-md -translate-y-1'
                      : 'bg-[#F4F8FE] hover:bg-[#EBF3FF]/70 hover:-translate-y-1 hover:shadow-sm'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 text-[11px] font-semibold text-[#1855EA] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1855EA]" />
                      <span>{lang === 'de' ? 'Aktiv' : 'Active'}</span>
                    </div>
                  )}

                  <div className="w-16 h-16 sm:w-18 sm:h-18 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                      <circle cx="32" cy="22" r="9" fill="#FDE68A" stroke="#111827" strokeWidth="2" />
                      <path d="M23 18c0-5 4-8 9-8s9 3 9 8z" fill="#1855EA" />
                      <path d="M19 46c0-7 6-12 13-12s13 5 13 12" fill="#DBEAFE" stroke="#111827" strokeWidth="2" />
                      <rect x="36" y="28" width="16" height="18" rx="2" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
                      <path d="M40 34l2 2 4-4M40 40h8" stroke="#1855EA" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-2 font-display">
                    {lang === 'de' ? card.title_de : card.title_en}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed max-w-xs font-normal">
                    {lang === 'de' ? card.description_de : card.description_en}
                  </p>

                  <div className="mt-4 text-[11.5px] font-semibold text-[#1855EA] flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    <span>{lang === 'de' ? 'Hier klicken für Foto & Details' : 'Click to view photo & details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })()}
          </div>

          {/* CENTER COLUMN: Interactive Center Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col items-center justify-center h-full min-h-[380px] sm:min-h-[460px] lg:min-h-full"
          >
            <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex items-center justify-center bg-slate-900 ring-1 ring-slate-200">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="w-full h-full relative"
                >
                  <img
                    src={activeCard.image}
                    alt={lang === 'de' ? activeCard.alt_de || activeCard.title_de : activeCard.alt_en || activeCard.title_en}
                    className="w-full h-full object-cover object-center max-h-[560px] min-h-[420px] select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Info Pill on bottom of Center Photo */}
                  <div className="absolute bottom-4 inset-x-4 sm:bottom-5 sm:inset-x-5 bg-white/90 backdrop-blur-md p-4 rounded-xl sm:rounded-2xl border border-white/80 shadow-md">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1855EA] tracking-wide">
                        <Sparkles className="w-3.5 h-3.5 text-[#1855EA]" />
                        {lang === 'de' ? activeCard.badge_de || 'Top' : activeCard.badge_en || 'Top'}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {lang === 'de' ? 'DuaAri Qualitätsstandard' : 'DuaAri Standard'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-slate-800 font-medium line-clamp-2">
                      {lang === 'de' ? activeCard.title_de : activeCard.title_en}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick selector dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {activeFeatures.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCardId(c.id)}
                  aria-label={c.title_de}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeCardId === c.id ? 'w-8 bg-[#1855EA]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: 2 Feature Cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            {/* Card 3 */}
            {(() => {
              const card = activeFeatures[2] || INITIAL_MOCK_ABOUT_FEATURES[2];
              const isActive = activeCardId === card.id;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  onClick={() => setActiveCardId(card.id)}
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center flex-1 justify-center transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-[#EBF3FF] ring-2 ring-[#1855EA] shadow-md -translate-y-1'
                      : 'bg-[#F4F8FE] hover:bg-[#EBF3FF]/70 hover:-translate-y-1 hover:shadow-sm'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 text-[11px] font-semibold text-[#1855EA] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1855EA]" />
                      <span>{lang === 'de' ? 'Aktiv' : 'Active'}</span>
                    </div>
                  )}

                  <div className="w-16 h-16 sm:w-18 sm:h-18 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                      <rect x="14" y="16" width="30" height="24" rx="4" fill="#1855EA" stroke="#111827" strokeWidth="2" />
                      <circle cx="29" cy="28" r="6" fill="#FFFFFF" />
                      <path d="M29 25v3l2 2" stroke="#1855EA" strokeWidth="2" strokeLinecap="round" />
                      <path d="M46 14l-6 32" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M38 46h12v4a2 2 0 0 1-2 2H40a2 2 0 0 1-2-2v-4z" fill="#F59E0B" stroke="#111827" strokeWidth="2" />
                    </svg>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-2 font-display">
                    {lang === 'de' ? card.title_de : card.title_en}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed max-w-xs font-normal">
                    {lang === 'de' ? card.description_de : card.description_en}
                  </p>

                  <div className="mt-4 text-[11.5px] font-semibold text-[#1855EA] flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    <span>{lang === 'de' ? 'Hier klicken für Foto & Details' : 'Click to view photo & details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })()}

            {/* Card 4 */}
            {(() => {
              const card = activeFeatures[3] || INITIAL_MOCK_ABOUT_FEATURES[3];
              const isActive = activeCardId === card.id;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onClick={() => setActiveCardId(card.id)}
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col items-center text-center flex-1 justify-center transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isActive
                      ? 'bg-[#EBF3FF] ring-2 ring-[#1855EA] shadow-md -translate-y-1'
                      : 'bg-[#F4F8FE] hover:bg-[#EBF3FF]/70 hover:-translate-y-1 hover:shadow-sm'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1 text-[11px] font-semibold text-[#1855EA] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1855EA]" />
                      <span>{lang === 'de' ? 'Aktiv' : 'Active'}</span>
                    </div>
                  )}

                  <div className="w-16 h-16 sm:w-18 sm:h-18 mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                      <rect x="14" y="16" width="36" height="26" rx="4" fill="#FFFFFF" stroke="#111827" strokeWidth="2" strokeDasharray="3 3" />
                      <path d="M22 42l-4 6v-6" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
                      <rect x="22" y="20" width="14" height="18" rx="2" fill="#1855EA" />
                      <path d="M29 25v4m-2-2h4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M38 22l4 4-2 6 6-2 4 4-2-8" fill="#F59E0B" />
                      <circle cx="44" cy="26" r="6" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1.5" />
                      <path d="M42 26l1.5 1.5 3-3" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-2 font-display">
                    {lang === 'de' ? card.title_de : card.title_en}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed max-w-xs font-normal">
                    {lang === 'de' ? card.description_de : card.description_en}
                  </p>

                  <div className="mt-4 text-[11.5px] font-semibold text-[#1855EA] flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    <span>{lang === 'de' ? 'Hier klicken für Foto & Details' : 'Click to view photo & details'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              );
            })()}
          </div>
        </div>
      </div>
    </section>
  );
};
