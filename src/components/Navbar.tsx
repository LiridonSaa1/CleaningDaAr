import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCalculator: () => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onOpenCalculator,
  onOpenQuote,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 transition-all duration-300 pointer-events-none">
      {/* Header Container with rounded-lg matching the 'Leistungen entdecken' button */}
      <div className="max-w-7xl w-full mx-auto relative pointer-events-auto bg-white/70 backdrop-blur-md rounded-lg p-2.5 sm:p-3.5 lg:px-6 lg:py-2.5 shadow-lg border border-white/80 transition-all duration-300">
        <nav className="flex items-center justify-between">
          {/* Brand Logo (Always visible on the left for all screen sizes) */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="flex items-center group transition-transform duration-200 active:scale-95 hover:scale-105"
            >
              <BrandLogo size="md" />
            </a>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            <a
              href="#"
              className="text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'STARTSEITE' : 'HOME'}
            </a>
            <a
              href="#vorteile"
              className="text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'ÜBER UNS' : 'ABOUT US'}
            </a>
            <a
              href="#leistungen"
              className="text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'LEISTUNGEN' : 'SERVICES'}
            </a>
            <a
              href="#ablauf"
              className="text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'ABLAUF' : 'PROCESS'}
            </a>
            <a
              href="#kontakt"
              className="text-xs sm:text-[13px] font-semibold tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'KONTAKT' : 'CONTACT'}
            </a>
          </div>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center bg-[#EBF3FF] hover:bg-[#DDEBFF] active:scale-95 text-[#1855EA] text-[13px] sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg transition-all duration-200 hover:shadow-xs cursor-pointer whitespace-nowrap"
            >
              <span>{lang === 'de' ? 'Angebot anfordern' : 'Get Free Quote'}</span>
            </button>
          </div>

          {/* Mobile Right Action Buttons & Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="bg-[#EBF3FF] hover:bg-[#DDEBFF] text-[#1855EA] font-semibold text-xs px-3.5 py-2 rounded-lg transition-transform active:scale-95 whitespace-nowrap"
            >
              {lang === 'de' ? 'Angebot' : 'Get Quote'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-white/80 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-3 pt-4 border-t border-slate-200/60 flex flex-col gap-3"
            >
              <a
                href="#"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                {lang === 'de' ? 'STARTSEITE' : 'HOME'}
              </a>
              <a
                href="#vorteile"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                {lang === 'de' ? 'ÜBER UNS' : 'ABOUT US'}
              </a>
              <a
                href="#leistungen"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                {lang === 'de' ? 'LEISTUNGEN' : 'SERVICES'}
              </a>
              <a
                href="#ablauf"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                {lang === 'de' ? 'ABLAUF' : 'PROCESS'}
              </a>
              <a
                href="#kontakt"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-white/60 transition-colors"
              >
                {lang === 'de' ? 'KONTAKT' : 'CONTACT'}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};


