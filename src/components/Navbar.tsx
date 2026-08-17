import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Language } from '../types';
import cleaningServicesLogo from '../assets/images/cleaning-services-header-logo.png';

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
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-300 pointer-events-none">
      {/* Sleek Floating Header Container */}
      <div className="max-w-7xl w-full mx-auto relative pointer-events-auto bg-white/90 backdrop-blur-md rounded-xl px-4 sm:px-6 py-2 shadow-lg border border-white/90 transition-all duration-300">
        <nav className="flex items-center justify-between h-12 sm:h-14">
          
          {/* Mobile Logo (Visible on small screens) */}
          <div className="flex lg:hidden items-center">
            <a href="#" className="flex items-center">
              <img 
                src={cleaningServicesLogo} 
                alt="Cleaning Services Logo" 
                className="h-12 sm:h-14 w-auto object-contain" 
              />
            </a>
          </div>

          {/* Desktop Nav: Centered Tight Group (Links + Logo in one continuous line) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6 mx-auto">
            <a
              href="#"
              className="text-xs sm:text-[13px] font-medium tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'STARTSEITE' : 'HOME'}
            </a>
            <a
              href="#vorteile"
              className="text-xs sm:text-[13px] font-medium tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'ÜBER UNS' : 'ABOUT US'}
            </a>
            <a
              href="#leistungen"
              className="text-xs sm:text-[13px] font-medium tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'LEISTUNGEN' : 'SERVICES'}
            </a>

            {/* Logo positioned directly between LEISTUNGEN & ABLAUF with tight spacing */}
            <a
              href="#"
              className="flex items-center mx-1.5 hover:scale-105 transition-transform shrink-0"
              title="Cleaning Services"
            >
              <img
                src={cleaningServicesLogo}
                alt="Cleaning Services Logo"
                className="h-13 sm:h-15 lg:h-16 xl:h-17 w-auto object-contain drop-shadow-xs"
              />
            </a>

            <a
              href="#ablauf"
              className="text-xs sm:text-[13px] font-medium tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'ABLAUF' : 'PROCESS'}
            </a>
            <a
              href="#projekte"
              className="text-xs sm:text-[13px] font-medium tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'PROJEKTE' : 'OUR PROJECTS'}
            </a>
            <a
              href="#kontakt"
              className="text-xs sm:text-[13px] font-medium tracking-wider uppercase text-[#374151] hover:text-[#1855EA] transition-colors whitespace-nowrap"
            >
              {lang === 'de' ? 'KONTAKT' : 'CONTACT'}
            </a>
          </div>

          {/* Desktop Right CTA Button */}
          <div className="hidden lg:flex items-center shrink-0">
            <button
              onClick={onOpenQuote}
              className="inline-flex items-center justify-center bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white text-xs sm:text-[13px] font-semibold px-4.5 py-2 rounded-lg transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span>{lang === 'de' ? 'Angebot anfordern' : 'Get Free Quote'}</span>
            </button>
          </div>

          {/* Mobile Right Buttons & Hamburger Icon */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenQuote}
              className="bg-[#1855EA] hover:bg-[#1344C4] text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-transform active:scale-95 whitespace-nowrap shadow-sm"
            >
              {lang === 'de' ? 'Angebot' : 'Get Quote'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </nav>

        {/* Mobile Menu Drawer */}
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
                className="text-xs font-medium tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {lang === 'de' ? 'STARTSEITE' : 'HOME'}
              </a>
              <a
                href="#vorteile"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {lang === 'de' ? 'ÜBER UNS' : 'ABOUT US'}
              </a>
              <a
                href="#leistungen"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {lang === 'de' ? 'LEISTUNGEN' : 'SERVICES'}
              </a>
              <a
                href="#ablauf"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {lang === 'de' ? 'ABLAUF' : 'PROCESS'}
              </a>
              <a
                href="#projekte"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {lang === 'de' ? 'PROJEKTE' : 'OUR PROJECTS'}
              </a>
              <a
                href="#kontakt"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-medium tracking-wider uppercase text-slate-800 hover:text-[#1855EA] py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors"
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
