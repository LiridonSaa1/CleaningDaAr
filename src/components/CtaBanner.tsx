import React from 'react';
import { motion } from 'motion/react';
import { PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { Language } from '../types';
import realisticSoapBubblesImg from '../assets/images/realistic-soap-bubbles.png';
import ctaCleanerWomanImg from '../assets/images/cta-cleaner-woman.png';

interface CtaBannerProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ lang, onOpenQuote }) => {
  return (
    <section className="mt-20 sm:mt-28 lg:mt-32 bg-[#032B74] text-white relative overflow-visible">
      
      {/* Realistic Soap Bubbles Asset */}
      <div className="absolute top-4 left-6 sm:left-14 w-32 sm:w-48 opacity-75 pointer-events-none z-10">
        <img src={realisticSoapBubblesImg} alt="" className="w-full h-auto object-contain filter drop-shadow-lg" />
      </div>

      <div className="absolute bottom-4 right-6 sm:right-16 w-36 sm:w-52 opacity-70 pointer-events-none z-10 hidden sm:block">
        <img src={realisticSoapBubblesImg} alt="" className="w-full h-auto object-contain scale-x-[-1] filter drop-shadow-lg" />
      </div>

      {/* Background Decorative Abstract Wave Lines */}
      <svg
        className="absolute -bottom-10 -left-10 w-72 sm:w-96 h-auto text-[#16408A]/60 pointer-events-none"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-20 280 C60 200, 160 300, 200 180 C240 80, 140 20, 260 -20"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>

      <svg
        className="absolute -top-10 -right-10 w-72 sm:w-96 h-auto text-[#16408A]/60 pointer-events-none"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M320 20 C240 100, 140 0, 100 120 C60 220, 160 280, 40 320"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
        />
      </svg>

      {/* Main Centered Content Container */}
      <div className="max-w-5xl xl:max-w-6xl w-full mx-auto px-4 sm:px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end relative min-h-[220px] sm:min-h-[250px] lg:min-h-[270px] pt-40 lg:pt-8 pb-8 lg:pb-8">
          
          {/* Left Column: Cleaner Woman Photo anchored flush at bottom, right next to text */}
          <div className="lg:col-span-5 relative flex items-end justify-center lg:justify-end self-end h-full">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-auto lg:right-0 lg:translate-x-0 w-[220px] sm:w-[270px] lg:w-[320px] xl:w-[350px] max-w-none z-30">
              <img
                src={ctaCleanerWomanImg}
                alt="Professional Cleaning Woman"
                className="w-full h-auto object-contain object-bottom drop-shadow-2xl pointer-events-none select-none block"
              />
            </div>
          </div>

          {/* Right Column: Text right next to photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start justify-center z-20"
          >
            {/* Eyebrow */}
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-blue-200 uppercase mb-2 sm:mb-3 block font-sans">
              {lang === 'de' ? 'HEUTE BUCHEN!' : 'BOOK TODAY!'}
            </span>

            {/* Main Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18] mb-3 sm:mb-4 font-display">
              {lang === 'de' ? (
                <>Genießen Sie noch heute ein sauberes & gesundes Umfeld.</>
              ) : (
                <>Enjoy A Cleaner Healthier Space Today.</>
              )}
            </h2>

            {/* Subtext matching reference image */}
            <p className="text-blue-100/90 text-xs sm:text-sm lg:text-base max-w-xl mb-6 font-normal leading-relaxed">
              {lang === 'de'
                ? 'Ein Anruf – Perfekte Sauberkeit garantiert. Erleben Sie erstklassige Ergebnisse, gesundes Raumklima und verlässlichen Service.'
                : 'One Call, Resolve All Your Cleaning Needs. Experience reliable results, healthier environments, and exceptional customer care.'}
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              {/* Call Us Now Button matching reference photo */}
              <a
                href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-bold text-xs sm:text-sm lg:text-base px-6 sm:px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer inline-flex items-center gap-2.5"
              >
                <PhoneCall className="w-5 h-5 fill-white/20" />
                <span>{lang === 'de' ? 'Jetzt anrufen' : 'Call Us Now!'}</span>
              </a>

              {/* Book Cleaning Quote Button */}
              <button
                onClick={onOpenQuote}
                className="bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/30 font-semibold text-xs sm:text-sm lg:text-base px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer inline-block"
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
