import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import videoPosterImg from '../assets/images/give_best_result_cleaning_1786976252414.jpg';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, lang }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-close modal smoothly when the user scrolls down or up
  useEffect(() => {
    if (!isOpen) return;

    const initialScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - initialScrollY) > 40) {
        onClose();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen, onClose]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="video-modal-overlay"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md font-sans"
        >
          {/* Backdrop click to close */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Main Video Dialog Box */}
          <div className="relative max-w-4xl w-full bg-[#0B1838] text-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-10">
            {/* Top Bar Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#08122B]/90">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1855EA] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-display">
                    {lang === 'de' ? 'Wie wir arbeiten – DuAri Hausmeister' : 'How We Work – DuAri Hausmeister'}
                  </h3>
                  <span className="text-[11px] text-blue-200 block">
                    {lang === 'de' ? 'Professionelle Gebäudereinigung & Objektbetreuung' : 'Professional Facility Cleaning & Maintenance'}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={lang === 'de' ? 'Schließen (oder zum Schließen scrollen)' : 'Close (or scroll to close)'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Container */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                poster={videoPosterImg}
                className="w-full h-full object-cover"
              >
                {/* 1. Project local video file */}
                <source src="/videos/video.mp4" type="video/mp4" />
                <source src="/videos/video.mp4.mp4" type="video/mp4" />
                <source src="/videos/cleaning-showcase.mp4" type="video/mp4" />
                {/* 2. Backup Online Stream Video */}
                <source src="https://cdn.coverr.co/videos/coverr-cleaning-a-glass-window-5441/1080p.mp4" type="video/mp4" />
                {lang === 'de' 
                  ? 'Ihr Browser unterstützt dieses Video nicht.' 
                  : 'Your browser does not support HTML5 video.'}
              </video>

              {/* Scroll Notice Overlay Badge */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-slate-200 border border-white/20 pointer-events-none shadow-lg">
                📜 {lang === 'de' ? 'Zum Schließen einfach scrollen' : 'Scroll down to close'}
              </div>
            </div>

            {/* Bottom Info Strip */}
            <div className="p-4 sm:p-5 bg-[#08122B] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'de' ? '100% Festpreisgarantie' : '100% Fixed Price Guarantee'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-300 font-semibold hidden sm:flex">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'de' ? 'Geschultes Fachpersonal' : 'Trained Specialists'}</span>
                </div>
              </div>

              <span className="text-[11px] text-slate-400">
                DuAri Hausmeister &amp; Gebäudereinigung • Ingolstadt
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
