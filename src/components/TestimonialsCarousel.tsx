import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/content';
import { Language } from '../types';

interface TestimonialsCarouselProps {
  lang: Language;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section id="erfahrungen" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-100/40 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-[#6B7280] uppercase mb-3 block">
            {lang === 'de' ? 'KUNDENSTIMMEN & REFERENZEN' : 'TESTIMONIALS & REVIEWS'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-4 font-display">
            {lang === 'de' ? (
              <>
                Was unsere Kunden in der Region über{' '}
                <span className="text-[#1855EA]">
                  uns sagen
                </span>
              </>
            ) : (
              <>
                What Our Clients in the Region Say About{' '}
                <span className="text-[#1855EA]">
                  Dua & Ari
                </span>
              </>
            )}
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base max-w-2xl mx-auto font-normal">
            {lang === 'de'
              ? 'Über 350 zufriedene Firmen- und Privatkunden vertrauen auf unsere Zuverlässigkeit und Gründlichkeit.'
              : 'Over 350 satisfied business and residential clients rely on our thoroughness and reliability.'}
          </p>
        </motion.div>

        {/* Carousel Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl mx-auto relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative min-h-[380px] sm:min-h-[320px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative"
              >
                <div className="flex items-center justify-between mb-6">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#111827]">5.0 / 5.0</span>
                  </div>

                  {/* Service Used Badge */}
                  <span className="text-xs px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#1855EA]/20 text-[#1855EA] font-semibold">
                    {current.service}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-[#374151] text-base sm:text-xl font-normal leading-relaxed italic mb-8 font-serif">
                  "{current.text}"
                </p>

                {/* Reviewer Profile */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <img
                      src={current.avatar}
                      alt={current.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#111827] text-sm sm:text-base font-display">{current.name}</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" title="Verifizierter Kunde" />
                      </div>
                      <div className="text-xs text-[#6B7280] font-medium">
                        {current.role} {current.company ? `• ${current.company}` : ''}
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-xs text-[#6B7280]">
                    <MapPin className="w-3.5 h-3.5 text-[#9CA3AF]" />
                    <span>{current.location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-[#1855EA]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full bg-white hover:bg-slate-50 text-[#374151] border border-slate-200 transition-colors shadow-sm cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-white hover:bg-slate-50 text-[#374151] border border-slate-200 transition-colors shadow-sm cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
