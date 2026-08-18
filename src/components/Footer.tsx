import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  ArrowUp, 
  Check 
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/content';
import { LegalModalType } from './LegalModals';
import { Language } from '../types';
import cleaningServicesLogo from '../assets/images/cleaning-services-header-logo.png';

interface FooterProps {
  lang: Language;
  onOpenLegal: (type: LegalModalType) => void;
  onSelectService: (serviceTitle: string) => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenLegal,
  onSelectService,
  onOpenQuote,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmailInput('');
    }
  };

  return (
    <footer className="relative bg-[#DDEBFF] text-[#111827] pt-16 pb-10 overflow-hidden font-sans border-t border-blue-200/50">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10"
        >
          
          {/* Column 1: Logo, Tagline & Social Icons (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="inline-block transition-transform duration-200 hover:scale-105">
              <img 
                src={cleaningServicesLogo} 
                alt="Cleaning Services Logo" 
                className="h-15 sm:h-18 w-auto object-contain drop-shadow-xs" 
              />
            </a>

            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-sm font-normal">
              {lang === 'de'
                ? 'Ihr zuverlässiger Partner für erstklassige Gebäudereinigung, Unterhaltsreinigung, Büroreinigung und Glasreinigung in Ingolstadt & Region.'
                : 'Your trusted partner for commercial cleaning, office maintenance, window cleaning, and residential care in Ingolstadt & surrounding areas.'}
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5 pt-2">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white text-[#1855EA] hover:bg-[#1855EA] hover:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white text-[#1855EA] hover:bg-[#1855EA] hover:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white text-[#1855EA] hover:bg-[#1855EA] hover:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white text-[#1855EA] hover:bg-[#1855EA] hover:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: COMPANY Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#6B7280] tracking-widest uppercase mb-4">
              {lang === 'de' ? 'UNTERNEHMEN' : 'COMPANY'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13.5px] font-medium text-[#374151]">
              <li>
                <a href="#vorteile" className="hover:text-[#1855EA] transition-colors">
                  {lang === 'de' ? 'Über uns' : 'About Us'}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <a href="#vorteile" className="hover:text-[#1855EA] transition-colors">
                  {lang === 'de' ? 'Karriere' : 'Career'}
                </a>
                <span className="bg-[#A4C8FF] text-[#1855EA] text-[10px] font-bold px-2 py-0.5 rounded-md">
                  Hiring!
                </span>
              </li>
              <li>
                <a href="#vorteile" className="hover:text-[#1855EA] transition-colors">
                  {lang === 'de' ? 'Unser Team' : 'Our Team'}
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-[#1855EA] transition-colors">
                  {lang === 'de' ? 'Kontakt' : 'Contact Us'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: SERVICES Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#6B7280] tracking-widest uppercase mb-4">
              {lang === 'de' ? 'LEISTUNGEN' : 'SERVICES'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13.5px] font-medium text-[#374151]">
              <li>
                <button 
                  onClick={() => onSelectService('Unterhaltsreinigung')}
                  className="hover:text-[#1855EA] transition-colors text-left cursor-pointer"
                >
                  {lang === 'de' ? 'Unterhaltsreinigung' : 'Residential Cleaning'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectService('Wohnungsreinigung')}
                  className="hover:text-[#1855EA] transition-colors text-left cursor-pointer"
                >
                  {lang === 'de' ? 'Wohnungsreinigung' : 'Apartment Cleaning'}
                </button>
              </li>
              <li className="flex items-center gap-1.5">
                <button 
                  onClick={() => onSelectService('Büro- & Gewerbereinigung')}
                  className="hover:text-[#1855EA] transition-colors text-left cursor-pointer"
                >
                  {lang === 'de' ? 'Büroreinigung' : 'Office Cleaning'}
                </button>
                <span className="bg-[#A4C8FF] text-[#1855EA] text-[10px] font-bold px-2 py-0.5 rounded-md">
                  New!
                </span>
              </li>
              <li>
                <button 
                  onClick={() => onSelectService('Grund- & Sonderreinigung')}
                  className="hover:text-[#1855EA] transition-colors text-left cursor-pointer"
                >
                  {lang === 'de' ? 'Grund- & Kitchen Cleaning' : 'Kitchen Cleaning'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: WORKING HOURS (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#6B7280] tracking-widest uppercase mb-4">
              {lang === 'de' ? 'ÖFFNUNGSZEITEN' : 'WORKING HOURS'}
            </h4>
            <div className="space-y-2 text-xs sm:text-[13px] text-[#374151] font-medium">
              <div className="flex items-center justify-between pb-1.5 border-b border-blue-200/50">
                <span>Monday – Wednesday :</span>
                <span className="font-semibold text-[#111827]">07:00 – 20:00 Uhr</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-blue-200/50">
                <span>Thursday – Friday :</span>
                <span className="font-semibold text-[#111827]">07:00 – 20:00 Uhr</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-blue-200/50">
                <span>Weekend :</span>
                <span className="font-semibold text-[#1855EA]">Notdienst 24/7</span>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Middle Section: OUR GALLERY & Newsletter Subscribe */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 my-6 border-t border-b border-blue-200/60"
        >
          
          {/* Gallery Thumbnails (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold text-[#6B7280] tracking-widest uppercase mb-3">
              {lang === 'de' ? 'GALERIE' : 'OUR GALLERY'}
            </h4>
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80" 
                alt="Cleaning Gallery 1" 
                className="w-24 sm:w-28 h-16 sm:h-18 object-cover rounded-xl shadow-xs"
              />
              <img 
                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=400&q=80" 
                alt="Cleaning Gallery 2" 
                className="w-24 sm:w-28 h-16 sm:h-18 object-cover rounded-xl shadow-xs"
              />
            </div>
          </div>

          {/* Newsletter Box (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-start justify-center gap-2">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-display">
                {lang === 'de' ? (
                  <>Abonnieren Sie unseren <span className="text-[#1855EA]">Newsletter</span></>
                ) : (
                  <>Subscribe Our <span className="text-[#1855EA]">Newsletter</span></>
                )}
              </h3>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-2.5 w-full mt-2">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder={lang === 'de' ? 'Ihre E-Mail-Adresse eingeben...' : 'Enter your email...'}
                className="w-full sm:w-[300px] lg:w-[360px] bg-white px-4 py-3 rounded-lg text-xs sm:text-sm text-[#111827] placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1855EA]/40"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-lg shadow-xs transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                {subscribed ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    {lang === 'de' ? 'Abonniert!' : 'Subscribed!'}
                  </span>
                ) : (
                  <span>{lang === 'de' ? 'Jetzt abonnieren' : 'Subscribe Now'}</span>
                )}
              </button>
            </form>
          </div>

        </motion.div>

        {/* Bottom Bar: Copyright, Legal links & Scroll-to-Top Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4B5563]">
          <div>
            © {new Date().getFullYear()} <span className="font-bold text-[#1855EA]">Cleanza</span>. {lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
            <button
              onClick={() => onOpenLegal('agb')}
              className="hover:text-[#1855EA] transition-colors cursor-pointer"
            >
              {lang === 'de' ? 'AGB' : 'Terms & Conditions'}
            </button>
            <button
              onClick={() => onOpenLegal('datenschutz')}
              className="hover:text-[#1855EA] transition-colors cursor-pointer"
            >
              {lang === 'de' ? 'Datenschutz' : 'Privacy Policy'}
            </button>
            <button
              onClick={() => onOpenLegal('impressum')}
              className="hover:text-[#1855EA] transition-colors cursor-pointer"
            >
              {lang === 'de' ? 'Impressum' : 'Sitemap'}
            </button>
            <button
              onClick={() => onOpenLegal('datenschutz')}
              className="hover:text-[#1855EA] transition-colors cursor-pointer"
            >
              Cookies
            </button>
          </div>

          {/* Scroll To Top Button */}
          <button
            onClick={handleScrollToTop}
            className="w-8 h-8 rounded-md border border-[#1855EA] text-[#1855EA] hover:bg-[#1855EA] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </footer>
  );
};
