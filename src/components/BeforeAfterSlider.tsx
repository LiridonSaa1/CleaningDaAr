import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MoveHorizontal, CheckCircle, ArrowRight } from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../data/content';
import { Language } from '../types';

interface BeforeAfterSliderProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ lang, onOpenQuote }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = BEFORE_AFTER_CASES[activeCaseIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min((x / rect.width) * 100, 95));
    setSliderPosition(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging && e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  return (
    <section id="vergleich" className="py-20 md:py-28 relative scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'de' ? 'Sichtbare Resultate' : 'Visible Results'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {lang === 'de' ? (
              <>
                Erleben Sie den Unterschied:{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  Vorher vs. Nachher
                </span>
              </>
            ) : (
              <>
                Experience The Difference:{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  Before vs. After
                </span>
              </>
            )}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {lang === 'de'
              ? 'Verschieben Sie den Regler nach links oder rechts, um die Verwandlung unserer professionellen Reinigung zu sehen.'
              : 'Drag the slider left or right to reveal the transformation powered by our professional cleaning.'}
          </p>
        </motion.div>

        {/* Case Switcher Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 flex-wrap mb-8"
        >
          {BEFORE_AFTER_CASES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCaseIndex === idx
                  ? 'btn-apple-primary shadow-md'
                  : 'btn-apple-glass text-slate-700 hover:text-slate-900'
              }`}
            >
              {item.category}: {item.title.split(' ')[0]}
            </button>
          ))}
        </motion.div>

        {/* Main Interactive Comparison Stage */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card glow-border rounded-3xl p-3 sm:p-4 shadow-2xl border-white/90">
            {/* Interactive Image Split Container */}
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none"
            >
              {/* After Image (Full background) */}
              <img
                src={activeCase.afterImg}
                alt="Nachher"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />

              {/* Before Image (Clipped overlay) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={activeCase.beforeImg}
                  alt="Vorher"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover max-w-none"
                  style={{
                    width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                    height: '100%',
                    filter: 'grayscale(20%) brightness(0.88) contrast(1.1)'
                  }}
                />
              </div>

              {/* Badges Overlaid */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="px-3 py-1.5 rounded-xl glass-card-dark text-slate-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 shadow-md">
                  {lang === 'de' ? 'Vorher (Stark verschmutzt)' : 'Before (Heavy soiled)'}
                </span>
              </div>

              <div className="absolute top-4 right-4 pointer-events-none">
                <span className="px-3 py-1.5 rounded-xl bg-cyan-600/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-cyan-400/40 shadow-md">
                  {lang === 'de' ? 'Nachher (DuaAri Glanz)' : 'After (DuaAri Clean)'}
                </span>
              </div>

              {/* Draggable Vertical Divider & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Floating Round Glass Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-slate-200 flex items-center justify-center text-cyan-700">
                  <MoveHorizontal className="w-5 h-5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bottom Meta & Description */}
            <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-slate-900">{activeCase.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                    {activeCase.subtitle}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                  {activeCase.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-semibold text-slate-500">{activeCase.metrics.label}</div>
                  <div className="text-sm font-bold text-emerald-600">{activeCase.metrics.value}</div>
                </div>
                <button
                  onClick={onOpenQuote}
                  className="btn-apple-primary px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>{lang === 'de' ? 'Gleiches Ergebnis anfragen' : 'Request Similar Clean'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
