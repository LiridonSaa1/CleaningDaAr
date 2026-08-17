import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, Search, Sparkles, MessageCircle } from 'lucide-react';
import { FAQ_DATA, COMPANY_INFO } from '../data/content';
import { Language } from '../types';

interface FAQSectionProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang, onOpenQuote }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQ_DATA.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-[#6B7280] uppercase mb-3 block">
            {lang === 'de' ? 'HÄUFIG GESTELLTE FRAGEN' : 'FREQUENTLY ASKED QUESTIONS'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-4 font-display">
            {lang === 'de' ? (
              <>
                Transparente Antworten auf{' '}
                <span className="text-[#1855EA]">
                  Ihre Fragen
                </span>
              </>
            ) : (
              <>
                Clear Answers to{' '}
                <span className="text-[#1855EA]">
                  Your Questions
                </span>
              </>
            )}
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base font-normal">
            {lang === 'de'
              ? 'Alles Wissenswerte rund um Versicherung, Ablauf, Kosten und Reinigungsmittel.'
              : 'Everything you need to know about insurance, procedure, costs, and equipment.'}
          </p>
        </motion.div>

        {/* Quick Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mb-8 max-w-xl mx-auto"
        >
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'de' ? 'Frage oder Stichwort suchen (z.B. Versicherung, Kosten, Schlüssel)...' : 'Search question or keyword (e.g. insurance, cost, keys)...'}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass-card text-sm text-slate-900 placeholder-slate-400 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-sm"
          />
        </motion.div>

        {/* Accordion List */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="space-y-3.5"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="glass-card rounded-2xl border-white/90 overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 shrink-0 ${
                        isOpen ? 'bg-cyan-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm glass-card rounded-2xl p-6">
              Keine passenden Fragen gefunden. Kontaktieren Sie uns gerne direkt telefonisch unter{' '}
              <a href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`} className="font-bold text-cyan-700">
                {COMPANY_INFO.phonePrimary}
              </a>
            </div>
          )}
        </motion.div>

        {/* Still have questions banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-6 sm:p-8 rounded-3xl glass-card border-white/90 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">
                {lang === 'de' ? 'Ihre Frage war nicht dabei?' : 'Have more questions?'}
              </h4>
              <p className="text-xs text-slate-500">
                {lang === 'de' ? 'Wir beraten Sie gerne unverbindlich und persönlich am Telefon oder per Mail.' : 'We are happy to assist you personally via phone or email.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuote}
            className="btn-apple-primary px-6 py-3 rounded-full text-xs sm:text-sm font-semibold shrink-0 cursor-pointer shadow-md"
          >
            {lang === 'de' ? 'Direkt Kontakt aufnehmen' : 'Contact Us Directly'}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
