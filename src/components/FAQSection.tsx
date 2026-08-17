import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { FAQ_DATA, COMPANY_INFO } from '../data/content';
import { Language } from '../types';

interface FAQSectionProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang, onOpenQuote }) => {
  // Default first left and right FAQ open matching reference design
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const leftFaqs = FAQ_DATA.filter((_, idx) => idx % 2 === 0);
  const rightFaqs = FAQ_DATA.filter((_, idx) => idx % 2 !== 0);

  const renderFaqCard = (faq: typeof FAQ_DATA[0], index: number) => {
    const isOpen = openIds.includes(faq.id);
    const qText = lang === 'de' ? (faq.questionDe || faq.question) : (faq.questionEn || faq.question);
    const aText = lang === 'de' ? (faq.answerDe || faq.answer) : (faq.answerEn || faq.answer);

    return (
      <motion.div
        key={faq.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45, delay: index * 0.08 }}
        onClick={() => toggleFaq(faq.id)}
        className={`rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden group ${
          isOpen
            ? 'bg-[#1855EA] text-white p-6 sm:p-7 shadow-lg border border-transparent'
            : 'bg-[#F0F5FF] hover:bg-[#E5EEFF] text-[#1E293B] p-6 sm:p-7 border border-transparent hover:border-blue-200/60'
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className={`text-base sm:text-[18px] font-bold leading-snug ${isOpen ? 'text-white' : 'text-[#1E293B] group-hover:text-[#1855EA] transition-colors'}`}>
            {qText}
          </h3>
          <div className={`shrink-0 transition-transform duration-200 flex items-center justify-center ${isOpen ? 'text-white' : 'text-[#4B5563]'}`}>
            {isOpen ? (
              <div className="w-4 h-[2px] bg-white rounded-full"></div>
            ) : (
              <Plus className="w-5 h-5 stroke-[2.2]" />
            )}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-blue-100 text-xs sm:text-sm leading-relaxed pt-3.5 mt-3.5 border-t border-blue-400/30 font-normal">
                {aText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative scroll-mt-20 bg-white">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Badge & Centered Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* Blue Badge Pill */}
          <div className="flex justify-center mb-3">
            <span className="bg-[#1855EA] text-white text-[11px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-md shadow-xs">
              {lang === 'de' ? 'HÄUFIGE FRAGEN' : 'COMMON QUESTIONS'}
            </span>
          </div>

          {/* Headline matching reference image */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111827] tracking-tight leading-tight font-display">
            {lang === 'de' ? (
              <>
                Antworten auf Ihre <span className="text-[#1855EA]">Reinigungsfragen.</span>
              </>
            ) : (
              <>
                Answers To Your <span className="text-[#1855EA]">Cleaning Questions.</span>
              </>
            )}
          </h2>
        </motion.div>

        {/* 2-Column Accordion Layout matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-5">
            {leftFaqs.map((faq, idx) => renderFaqCard(faq, idx))}
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-5">
            {rightFaqs.map((faq, idx) => renderFaqCard(faq, idx))}
          </div>
        </div>

        {/* Bottom Direct Contact Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#F0F5FF] border border-blue-100/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1855EA] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-[#111827] text-base">
                {lang === 'de' ? 'Ihre Frage war nicht dabei?' : 'Have more questions?'}
              </h4>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-0.5">
                {lang === 'de' ? 'Wir beraten Sie gerne unverbindlich am Telefon oder per E-Mail.' : 'We are happy to assist you personally via phone or email.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuote}
            className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md shrink-0 whitespace-nowrap"
          >
            {lang === 'de' ? 'Direkt Kontakt aufnehmen' : 'Contact Us Directly'}
          </button>
        </motion.div>

      </div>
    </section>
  );
};
