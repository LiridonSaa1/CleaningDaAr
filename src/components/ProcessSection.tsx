import React from 'react';
import { motion } from 'motion/react';
import { 
  ClipboardList, 
  CalendarCheck, 
  FileText,
  Handshake, 
  CheckCircle2, 
} from 'lucide-react';
import { Language } from '../types';
import { QuoteConfigurator } from './QuoteConfigurator';

interface ProcessSectionProps {
  lang: Language;
  onOpenQuote: () => void;
  onApplyCalculatedQuote?: (
    summary: string,
    objectType: string,
    squareMeters: number,
    frequency: string
  ) => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ 
  lang, 
  onOpenQuote,
  onApplyCalculatedQuote
}) => {
  return (
    <section 
      id="ablauf" 
      className="py-20 md:py-28 relative scroll-mt-20 border-t border-blue-100/60"
      style={{ backgroundColor: '#F0F7FF' }}
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#4B5563] uppercase mb-3 block font-sans">
            {lang === 'de' ? 'UNSER ABLAUF' : 'OUR PROCESS'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-4 font-display">
            {lang === 'de' ? (
              <>
                In 5 einfachen Schritten zu{' '}
                <span className="text-[#0084FF]">
                  strahlender Sauberkeit.
                </span>
              </>
            ) : (
              <>
                5 Simple Steps to{' '}
                <span className="text-[#0084FF]">
                  Spotless Results.
                </span>
              </>
            )}
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-normal">
            {lang === 'de'
              ? 'Transparenter Buchungsablauf ohne versteckte Hürden – von der ersten Anfrage bis zum glänzenden Endergebnis.'
              : 'Seamless booking flow with zero friction – from initial appointment to spotless handover.'}
          </p>
        </motion.div>

        {/* 5-Step Diagram Matching the User Design */}
        <div className="relative mb-20 lg:mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-3 items-start relative">
            
            {/* Step 1: Appointment (Light Cyan Badge) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center relative px-2"
            >
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#9CEBFA] text-[#083344] flex items-center justify-center shadow-sm mb-6 transition-transform duration-300 hover:scale-105">
                <ClipboardList className="w-9 h-9 stroke-[2.2]" />
              </div>
              <h3 className="text-xl sm:text-[21px] font-bold text-[#111827] mb-2 font-display">
                {lang === 'de' ? 'Appointment' : 'Appointment'}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed max-w-[200px]">
                {lang === 'de'
                  ? 'Unverbindlich online anfragen oder anrufen in unter 60 Sekunden.'
                  : 'Inquire online or call us in under 60 seconds.'}
              </p>
            </motion.div>

            {/* Connecting Arrow 1 -> 2 (Desktop only, Arcing Upward) */}
            <div className="hidden lg:flex absolute left-[16.5%] top-7 z-10 pointer-events-none items-center justify-center">
              <svg className="w-16 xl:w-20 h-10 text-slate-800" viewBox="0 0 100 40" fill="none">
                <path d="M 8 32 Q 50 2 86 16" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 77 10 L 88 16 L 82 26" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Step 2: Choose Date (Solid Blue Badge) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center relative px-2"
            >
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#0084FF] text-white flex items-center justify-center shadow-md mb-6 transition-transform duration-300 hover:scale-105">
                <CalendarCheck className="w-9 h-9 stroke-[2.2]" />
              </div>
              <h3 className="text-xl sm:text-[21px] font-bold text-[#111827] mb-2 font-display">
                {lang === 'de' ? 'Choose Date' : 'Choose Date'}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed max-w-[200px]">
                {lang === 'de'
                  ? 'Wunschtermin und Reinigungsintervall flexibel festlegen.'
                  : 'Select your preferred date and flexible schedule.'}
              </p>
            </motion.div>

            {/* Connecting Arrow 2 -> 3 (Desktop only, Arcing Downward) */}
            <div className="hidden lg:flex absolute left-[36.5%] top-9 z-10 pointer-events-none items-center justify-center">
              <svg className="w-16 xl:w-20 h-10 text-slate-800" viewBox="0 0 100 40" fill="none">
                <path d="M 8 10 Q 50 38 86 20" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 78 13 L 88 20 L 80 29" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Step 3: Get Offer (Light Cyan Badge) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col items-center text-center relative px-2"
            >
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#9CEBFA] text-[#083344] flex items-center justify-center shadow-sm mb-6 transition-transform duration-300 hover:scale-105">
                <FileText className="w-9 h-9 stroke-[2.2]" />
              </div>
              <h3 className="text-xl sm:text-[21px] font-bold text-[#111827] mb-2 font-display">
                {lang === 'de' ? 'Get Offer' : 'Get Offer'}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed max-w-[200px]">
                {lang === 'de'
                  ? 'Transparente Festpreis-Offerte & Vor-Ort-Beratung.'
                  : 'Fast, binding quote with zero hidden charges.'}
              </p>
            </motion.div>

            {/* Connecting Arrow 3 -> 4 (Desktop only, Arcing Upward) */}
            <div className="hidden lg:flex absolute left-[56.5%] top-7 z-10 pointer-events-none items-center justify-center">
              <svg className="w-16 xl:w-20 h-10 text-slate-800" viewBox="0 0 100 40" fill="none">
                <path d="M 8 32 Q 50 2 86 16" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 77 10 L 88 16 L 82 26" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Step 4: Process (Solid Blue Badge) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center relative px-2"
            >
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#0084FF] text-white flex items-center justify-center shadow-md mb-6 transition-transform duration-300 hover:scale-105">
                <Handshake className="w-9 h-9 stroke-[2.2]" />
              </div>
              <h3 className="text-xl sm:text-[21px] font-bold text-[#111827] mb-2 font-display">
                {lang === 'de' ? 'Process' : 'Process'}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed max-w-[200px]">
                {lang === 'de'
                  ? 'Zuverlässige Profi-Durchführung mit modernen Geräten.'
                  : 'Thorough cleaning executed with modern eco equipment.'}
              </p>
            </motion.div>

            {/* Connecting Arrow 4 -> 5 (Desktop only, Arcing Downward) */}
            <div className="hidden lg:flex absolute left-[76.5%] top-9 z-10 pointer-events-none items-center justify-center">
              <svg className="w-16 xl:w-20 h-10 text-slate-800" viewBox="0 0 100 40" fill="none">
                <path d="M 8 10 Q 50 38 86 20" stroke="#1E293B" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M 78 13 L 88 20 L 80 29" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>

            {/* Step 5: Final Result (Solid Blue Badge) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-col items-center text-center relative px-2"
            >
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-[#0084FF] text-white flex items-center justify-center shadow-md mb-6 transition-transform duration-300 hover:scale-105">
                <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
              </div>
              <h3 className="text-xl sm:text-[21px] font-bold text-[#111827] mb-2 font-display">
                {lang === 'de' ? 'Final Result' : 'Final Result'}
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed max-w-[200px]">
                {lang === 'de'
                  ? 'Gemeinsame Abnahme & 100% Zufriedenheitsgarantie.'
                  : 'Joint handover & 100% satisfaction guarantee.'}
              </p>
            </motion.div>

          </div>
        </div>

        {/* 5-Step Configurator & Live Quote Request Summary */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <QuoteConfigurator
            lang={lang}
            onOpenFullModal={onOpenQuote}
            onApplyCalculatedQuote={onApplyCalculatedQuote}
          />
        </motion.div>

      </div>
    </section>
  );
};
