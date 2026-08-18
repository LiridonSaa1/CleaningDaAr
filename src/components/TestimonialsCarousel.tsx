import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/content';
import { Language } from '../types';
import { getReviews, ReviewItem } from '../lib/supabase';
import { AddReviewModal } from './AddReviewModal';

interface TestimonialsCarouselProps {
  lang: Language;
}

export const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [reviewsList, setReviewsList] = useState<Array<{ id: string; name: string; service: string; rating: number; text: string; avatar?: string }>>([]);
  const [addReviewOpen, setAddReviewOpen] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const approved = await getReviews(true);
        if (approved && approved.length > 0) {
          setReviewsList(approved.map(r => ({
            id: r.id,
            name: r.name,
            service: r.service || 'Gebäudereinigung',
            rating: r.rating,
            text: r.comment,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
          })));
        } else {
          setReviewsList(TESTIMONIALS_DATA);
        }
      } catch {
        setReviewsList(TESTIMONIALS_DATA);
      }
    }

    loadReviews();
  }, []);

  const activeList = reviewsList.length > 0 ? reviewsList : TESTIMONIALS_DATA;

  useEffect(() => {
    if (!isAutoPlaying || activeList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeList.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeList.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeList.length) % activeList.length);
  };

  const current = activeList[currentIndex] || activeList[0];

  return (
    <section id="erfahrungen" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-100/40 overflow-hidden font-sans">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-[#6B7280] uppercase mb-3 block font-sans">
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
                  Dua &amp; Ari
                </span>
              </>
            )}
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base max-w-2xl mx-auto font-normal mb-6">
            {lang === 'de'
              ? 'Über 350 zufriedene Firmen- und Privatkunden vertrauen auf unsere Zuverlässigkeit und Gründlichkeit.'
              : 'Over 350 satisfied business and residential clients rely on our thoroughness and reliability.'}
          </p>

          <button
            onClick={() => setAddReviewOpen(true)}
            className="inline-flex items-center gap-2 bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{lang === 'de' ? 'Eigene Bewertung abgeben' : 'Submit Your Review'}</span>
          </button>
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
          <div className="relative min-h-[360px] sm:min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.id || currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative"
              >
                <div className="flex items-center justify-between mb-6">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(current?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#111827]">{current?.rating || 5}.0 / 5.0</span>
                  </div>

                  {/* Service Used Badge */}
                  <span className="text-xs px-3 py-1 rounded-full bg-[#EBF3FF] border border-[#1855EA]/20 text-[#1855EA] font-semibold">
                    {current?.service || 'Gebäudereinigung'}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-[#374151] text-base sm:text-xl font-normal leading-relaxed italic mb-8 font-serif">
                  "{current?.text}"
                </p>

                {/* Reviewer Profile */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1855EA] to-[#0084FF] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                      {current?.name ? current.name.charAt(0) : 'K'}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111827] text-base font-display">{current?.name}</h4>
                      <span className="text-xs text-[#6B7280]">Verifizierter Kunde • Ingolstadt &amp; Region</span>
                    </div>
                  </div>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#1855EA] text-[#111827] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Previous review"
                    >
                      <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#1855EA] text-[#111827] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                      aria-label="Next review"
                    >
                      <ChevronRight className="w-5 h-5 stroke-[2.2]" />
                    </button>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>

      {/* Public Submit Review Modal */}
      <AddReviewModal
        isOpen={addReviewOpen}
        onClose={() => setAddReviewOpen(false)}
        lang={lang}
      />
    </section>
  );
};
