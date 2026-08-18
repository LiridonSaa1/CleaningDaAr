import React from 'react';
import { motion } from 'motion/react';
import { PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { Language } from '../types';
import ctaCleanerWomanImg from '../assets/images/cta-cleaner-woman.png';

interface CtaBannerProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ lang, onOpenQuote }) => {
  return (
    <section className="mt-20 sm:mt-28 lg:mt-32 bg-[#0B1838] text-white relative overflow-visible">
      
      {/* Main Centered Container */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-20">
        <div className="relative min-h-[220px] sm:min-h-[250px] lg:min-h-[280px] pt-36 lg:pt-10 pb-10 lg:pb-10 flex items-center justify-center">
          
          {/* Cleaner Woman Photo 100% FLUSH at bottom-0 with exact requested offset & width */}
          <div 
            className="hidden lg:block absolute bottom-0 left-1/2 pointer-events-none z-30"
            style={{ transform: 'translateX(-193%)', width: '306px' }}
          >
            <img
              src={ctaCleanerWomanImg}
              alt="Professional Cleaning Woman"
              className="w-full h-auto object-contain object-bottom drop-shadow-2xl select-none block"
            />
          </div>

          {/* Centered Text Content Block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55 }}
            className="text-center flex flex-col items-center justify-center max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto lg:ml-auto lg:mr-0 xl:mx-auto z-20"
          >
            {/* Eyebrow / Small Header */}
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-blue-300 uppercase mb-2 sm:mb-3 block font-sans">
              {lang === 'de' ? 'HEUTE BUCHEN!' : 'BOOK TODAY!'}
            </span>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18] mb-3 font-display">
              {lang === 'de' ? (
                <>Genießen Sie noch heute ein sauberes &amp; gesundes Umfeld.</>
              ) : (
                <>Have A Problem With Your Space? Call Us Now!</>
              )}
            </h2>

            {/* Subtitle / Phone info matching reference image format: One Call, Resolve Your Problem ( +123... ) */}
            <p className="text-slate-300 text-xs sm:text-sm lg:text-base max-w-xl mx-auto mb-6 font-medium leading-relaxed">
              {lang === 'de'
                ? `Ein Anruf – Perfekte Sauberkeit garantiert ( ${COMPANY_INFO.phonePrimary} )`
                : `One Call, Resolve Your Problem ( ${COMPANY_INFO.phonePrimary} )`}
            </p>

            {/* CTA Buttons Centered */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              {/* Primary Call Us Now Button */}
              <a
                href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-bold text-xs sm:text-sm lg:text-base px-6 py-3 rounded-lg shadow-md transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5"
              >
                <PhoneCall className="w-4.5 h-4.5 fill-white/20" />
                <span>{lang === 'de' ? 'Jetzt anrufen!' : 'Call Us Now!'}</span>
              </a>

              {/* Secondary Offer Button */}
              <button
                onClick={onOpenQuote}
                className="bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/30 font-semibold text-xs sm:text-sm lg:text-base px-6 py-3 rounded-lg transition-all duration-200 cursor-pointer inline-block"
              >
                {lang === 'de' ? 'Angebot anfordern' : 'Get Quote'}
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
