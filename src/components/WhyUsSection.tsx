import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BadgePercent, UserCheck, Leaf, Clock, Award, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { VALUES_DATA } from '../data/content';
import { Language } from '../types';

interface WhyUsSectionProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ lang, onOpenQuote }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const getIcon = (name: string) => {
    switch (name) {
      case 'BadgePercent': return <BadgePercent className="w-6 h-6 text-cyan-600" />;
      case 'UserCheck': return <UserCheck className="w-6 h-6 text-emerald-600" />;
      case 'Leaf': return <Leaf className="w-6 h-6 text-teal-600" />;
      case 'Clock': return <Clock className="w-6 h-6 text-sky-600" />;
      default: return <Sparkles className="w-6 h-6 text-cyan-600" />;
    }
  };

  const leftCards = VALUES_DATA.slice(0, 2);
  const rightCards = VALUES_DATA.slice(2, 4);

  return (
    <section id="vorteile" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-100/60">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'de' ? 'Warum DuaAri Clean?' : 'Why Choose DuaAri Clean?'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {lang === 'de' ? (
              <>
                Ihr verlässlicher Meisterbetrieb mit{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  Handschlagqualität
                </span>
              </>
            ) : (
              <>
                Your Dependable Master Partner with{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  Uncompromising Quality
                </span>
              </>
            )}
          </h2>
        </motion.div>

        {/* Interactive Values Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-center">
          {/* Left Cards */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {leftCards.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActiveIndex(idx)}
                className={`glass-card card-shine rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-white/90 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  activeIndex === idx ? 'ring-2 ring-cyan-500 bg-cyan-50/30' : 'hover:border-cyan-200/80'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                    {getIcon(val.icon)}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative w-full max-w-sm aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl shadow-cyan-900/10 border-4 border-white"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={VALUES_DATA[activeIndex].image}
                  alt={VALUES_DATA[activeIndex].title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Cards */}
          <div className="flex flex-col gap-6 order-3">
            {rightCards.map((val, idx) => {
              const globalIdx = idx + 2;
              return (
                <motion.div
                  key={globalIdx}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setActiveIndex(globalIdx)}
                  className={`glass-card card-shine rounded-3xl p-6 sm:p-7 flex flex-col justify-between border-white/90 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    activeIndex === globalIdx ? 'ring-2 ring-cyan-500 bg-cyan-50/30' : 'hover:border-cyan-200/80'
                  }`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                      {getIcon(val.icon)}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Highlight Banner: Insurance & Trust */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 sm:p-10 border-white/90 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 bg-gradient-to-r from-white via-cyan-50/40 to-white"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-cyan-600/30 shrink-0">
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">
                {lang === 'de' ? 'Vollumfänglich versichert bis 5.000.000 €' : 'Fully Insured up to €5,000,000'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                {lang === 'de'
                  ? 'Ihre Räume und hochwertigen Einrichtungen sind bei uns in sicheren Händen. Unsere gewerbliche Betriebshaftpflicht schützt jedes Detail.'
                  : 'Your premises and high-value furnishings are completely protected with comprehensive commercial liability.'}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuote}
            className="btn-apple-primary px-8 py-3.5 rounded-full text-sm font-semibold shrink-0 cursor-pointer shadow-md"
          >
            {lang === 'de' ? 'Jetzt unverbindlich anfragen' : 'Inquire Without Obligation'}
          </button>
        </motion.div>
      </div>
    </section>
  );
};
