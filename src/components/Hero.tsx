import React from 'react';
import { motion } from 'motion/react';
import { Play, Star } from 'lucide-react';
import { Language } from '../types';
import heroCleanerImg from '../assets/images/Hero-New-UBZ2K5JP3S-1.png';
import heroBubbleImg from '../assets/images/hero-main-bubble.png';
import realisticSoapBubblesImg from '../assets/images/realistic-soap-bubbles.png';

interface HeroProps {
  lang: Language;
  onOpenCalculator: () => void;
  onOpenQuote: () => void;
  onOpenVideo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenCalculator, onOpenQuote, onOpenVideo }) => {
  return (
    <section
      style={{
        backgroundColor: '#CEDEFF',
        backgroundImage: 'linear-gradient(180deg, #CEDEFF 0%, #CEDEFF 76%, #DDE8FF 84%, #EEF4FF 92%, #FFFFFF 100%)',
      }}
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-0 overflow-hidden"
    >
      {/* Background ambient lighting, bubbles & smooth blur fade into next section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft Ambient Depth */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl pointer-events-none" />

        {/* Realistic Floating Soap Bubbles (User Asset 1 - Top Left) */}
        <motion.div
          animate={{
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            rotate: [-3, 3, -3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-4 sm:left-12 lg:left-20 top-20 sm:top-24 w-[140px] sm:w-[220px] lg:w-[280px] opacity-90 pointer-events-none z-10"
        >
          <img
            src={realisticSoapBubblesImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain filter drop-shadow-lg"
          />
        </motion.div>

        {/* Realistic Floating Soap Bubbles (User Asset 2 - Top Right) */}
        <motion.div
          animate={{
            y: [18, -18, 18],
            x: [10, -10, 10],
            rotate: [4, -4, 4],
            scale: [1.02, 0.98, 1.02],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute right-6 sm:right-20 lg:right-36 top-16 sm:top-28 w-[160px] sm:w-[240px] lg:w-[320px] opacity-85 pointer-events-none z-10 hidden sm:block"
        >
          <img
            src={realisticSoapBubblesImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain scale-x-[-1] filter drop-shadow-md"
          />
        </motion.div>

        {/* Realistic Floating Soap Bubbles (User Asset 3 - Middle Left) */}
        <motion.div
          animate={{
            y: [-22, 22, -22],
            x: [12, -12, 12],
            rotate: [-5, 5, -5],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute left-[3%] top-[48%] w-[120px] sm:w-[180px] opacity-80 pointer-events-none z-10"
        >
          <img
            src={realisticSoapBubblesImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain filter drop-shadow-md"
          />
        </motion.div>

        {/* Realistic Floating Soap Bubbles (User Asset 4 - Center Right) */}
        <motion.div
          animate={{
            y: [-25, 20, -25],
            x: [-15, 10, -15],
            rotate: [3, -3, 3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute right-[18%] top-[55%] w-[150px] sm:w-[210px] opacity-75 pointer-events-none z-10 hidden lg:block"
        >
          <img
            src={realisticSoapBubblesImg}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain filter drop-shadow-lg"
          />
        </motion.div>

        {/* Original Main Bubble Backdrop */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            x: [-6, 6, -6],
            rotate: [-1.5, 1.5, -1.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute left-2 sm:left-12 lg:left-24 top-20 sm:top-24 lg:top-28 w-[320px] sm:w-[440px] lg:w-[560px] max-w-none opacity-60 pointer-events-none select-none z-0"
        >
          <img
            src={heroBubbleImg}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero-main-bubble.png';
            }}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain drop-shadow-md"
          />
        </motion.div>

        {/* Secondary subtle floating bubble group on top-right */}
        <motion.div
          animate={{
            y: [12, -12, 12],
            x: [6, -6, 6],
            rotate: [2, -2, 2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute right-4 sm:right-16 lg:right-32 top-16 sm:top-20 w-[220px] sm:w-[320px] max-w-none opacity-60 pointer-events-none select-none z-0 hidden sm:block"
        >
          <img
            src={heroBubbleImg}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/hero-main-bubble.png';
            }}
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain scale-x-[-1]"
          />
        </motion.div>

        {/* Bottom smooth blur & seamless gradient into next section (eliminates hard borders) */}
        <div className="absolute -bottom-1 left-0 right-0 h-20 sm:h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end flex-1 min-h-[580px] lg:min-h-[640px]">
          {/* Left Column: Eyebrow, Headline, Paragraph, CTAs, Stats */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start justify-between z-20 h-full pt-8 sm:pt-12 lg:pt-14 pb-6 sm:pb-8">
            {/* Top Text Content (Eyebrow, Headline, Paragraph, CTAs) */}
            <div className="flex flex-col items-start w-full">
              {/* Top Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#64748B] text-xs sm:text-[13px] font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-5 font-sans"
              >
                {lang === 'de' ? 'TOP #1 REINIGUNGSSERVICE' : 'TOP #1 CLEANING SERVICES'}
              </motion.div>

              {/* Main Headline - Strict Two Lines with Arial typography */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-[46px] xl:text-[54px] 2xl:text-[60px] font-bold tracking-[-0.02em] leading-[1.12] mb-3 sm:mb-6 font-display"
              >
                <span className="text-[#1855EA] block whitespace-nowrap">
                  {lang === 'de' ? 'Professionelle Reinigung' : 'Professional Cleaning'}
                </span>
                <span className="text-[#111827] block whitespace-nowrap">
                  {lang === 'de' ? 'Für jedes Objekt.' : 'For Every Space.'}
                </span>
              </motion.h1>

              {/* Subtitle / Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="text-[#4B5563] text-sm sm:text-[15px] lg:text-[16px] leading-[1.65] mb-8 sm:mb-9 max-w-lg font-normal"
              >
                {lang === 'de'
                  ? 'Zuverlässige Reinigungslösungen für Gewerbe und Privathaushalte mit geschultem Personal, moderner Ausstattung und gesünderen Umgebungen.'
                  : 'Delivering reliable residential and commercial cleaning solutions with trained professionals, modern equipment, healthier environments.'}
              </motion.p>

              {/* Action Buttons Row (Explore Services + How We Work) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex items-center gap-5 sm:gap-6 flex-wrap mb-8 sm:mb-10"
              >
                {/* Primary Blue Button */}
                <button
                  onClick={onOpenQuote}
                  className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white text-sm sm:text-[15px] font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  {lang === 'de' ? 'Leistungen entdecken' : 'Explore Services'}
                </button>

                {/* Secondary Play Button (How We Work) */}
                <button
                  onClick={onOpenVideo || onOpenCalculator}
                  className="flex items-center gap-3 group cursor-pointer py-1"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1855EA] group-hover:scale-105 transition-transform duration-200">
                    <Play className="w-4 h-4 fill-[#1855EA] ml-0.5" />
                  </div>
                  <span className="text-sm sm:text-[15px] font-semibold text-[#111827] group-hover:text-[#1855EA] transition-colors">
                    {lang === 'de' ? 'Wie wir arbeiten' : 'How We Work'}
                  </span>
                </button>
              </motion.div>
            </div>

            {/* Bottom 3 Numbers Stats Strip (Hollow Text Effect) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 sm:gap-10 lg:gap-12 pt-4 w-full max-w-xl mt-auto"
            >
              <div>
                <div className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight font-display flex items-baseline leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1.8px_#111827]">
                  2.5K <span className="text-transparent [-webkit-text-stroke:1.8px_#1855EA] ml-1 font-black">+</span>
                </div>
                <div className="text-xs sm:text-[13px] font-normal text-[#6B7280] mt-2.5 leading-snug">
                  {lang === 'de' ? 'Erfolgreiche Einsätze' : 'Projects Completed'}
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight font-display flex items-baseline leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1.8px_#111827]">
                  98 <span className="text-transparent [-webkit-text-stroke:1.8px_#1855EA] ml-1 font-black">%</span>
                </div>
                <div className="text-xs sm:text-[13px] font-normal text-[#6B7280] mt-2.5 leading-snug">
                  {lang === 'de' ? 'Kundenzufriedenheit' : 'Client Satisfaction'}
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-black tracking-tight font-display flex items-baseline leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1.8px_#111827]">
                  23 <span className="text-transparent [-webkit-text-stroke:1.8px_#1855EA] ml-1 font-black">+</span>
                </div>
                <div className="text-xs sm:text-[13px] font-normal text-[#6B7280] mt-2.5 leading-snug">
                  {lang === 'de' ? 'Jahre Erfahrung' : 'Years Experience'}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Full Flush Bottom Cleaner Portrait with Overlay Google Review Box on the Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 xl:col-span-6 relative flex items-end justify-center lg:justify-end self-end h-full pb-0 z-20"
          >
            {/* Cleaner Hero Transparent Cutout touching the bottom edge */}
            <div className="relative w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[620px] xl:max-w-[680px] z-20 flex items-end justify-center lg:justify-end self-end">
              <div className="relative flex items-end justify-center w-full">
                <img
                  src={heroCleanerImg}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/Hero-New-UBZ2K5JP3S-1.png';
                  }}
                  alt="Dua & Ari Reinigungsservice Fachkraft"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[62vh] sm:max-h-[72vh] lg:max-h-[82vh] object-contain object-bottom select-none block drop-shadow-2xl"
                />
              </div>

              {/* Overlaid Floating Google Reviews Badge Card on the Right of the Cleaner (Transparent/Glass style) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: [0, -8, 0] 
                }}
                transition={{ 
                  opacity: { duration: 0.6, delay: 0.4 },
                  x: { duration: 0.6, delay: 0.4 },
                  y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }
                }}
                className="absolute top-1/2 -translate-y-6 sm:-translate-y-8 right-1 sm:-right-4 lg:-right-6 bg-white/70 backdrop-blur-md rounded-xl sm:rounded-2xl p-3.5 sm:p-4 lg:p-5 shadow-lg border border-white/80 z-30 min-w-[175px] sm:min-w-[210px]"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs sm:text-[13px] font-bold text-[#111827]">Ratings 4.9/5</span>
                </div>
                <p className="text-[11px] sm:text-xs text-[#6B7280] font-normal mb-2.5 sm:mb-3">
                  {lang === 'de' ? 'Verifizierte Google Bewertungen' : 'Trusted reviews Google'}
                </p>

                {/* Overlapping Customer Avatars */}
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover shadow-xs"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover -ml-2 shadow-xs"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white object-cover -ml-2 shadow-xs"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};




