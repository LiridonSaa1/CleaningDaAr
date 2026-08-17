import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageSquare, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="w-11 h-11 rounded-full glass-card hover:bg-white text-slate-800 flex items-center justify-center shadow-lg border border-white/80 cursor-pointer pointer-events-auto transition-transform hover:-translate-y-1"
            title="Nach oben scrollen"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-cyan-700" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Action Pill Bar */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
          className="btn-apple-glass px-4 py-3 rounded-full flex items-center gap-2 text-xs font-bold text-slate-800 shadow-xl border-white/80 hover:bg-white transition-all cursor-pointer group"
          title="Direkt anrufen"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <Phone className="w-4 h-4 text-cyan-600 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Anrufen</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/491729137116?text=${encodeURIComponent('Hallo DuaAri Clean & Service, ich interessiere mich für Ihre Reinigungsdienstleistungen.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 text-xs font-bold shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 cursor-pointer"
          title="WhatsApp Direkt-Chat"
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
