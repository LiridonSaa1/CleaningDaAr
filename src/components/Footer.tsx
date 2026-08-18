import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  ArrowUp 
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { LegalModalType } from './LegalModals';
import { Language } from '../types';
import { getSiteSettings, SiteSettingsData } from '../lib/supabase';
import cleaningServicesLogo from '../assets/images/cleaning-services-header-logo.png';

interface FooterProps {
  lang: Language;
  onOpenLegal: (type: LegalModalType) => void;
  onSelectService: (serviceTitle: string) => void;
  onOpenQuote: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onOpenLegal,
  onSelectService,
  onOpenQuote,
  onOpenAdmin,
}) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettingsData>({
    phone_primary: '+49 (0) 172 913 7116',
    email_primary: 'DuaAricleanservice@gmail.com',
    street: 'Holznerstraße 11',
    city: '85053 Ingolstadt',
    business_name: 'Dua & Ari Gebäudereinigung',
    whatsapp_number: '+491729137116',
    working_hours_mon_wed: '07:00 – 20:00 Uhr',
    working_hours_thu_fri: '07:00 – 20:00 Uhr',
    working_hours_weekend: 'Notdienst 24/7'
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getSiteSettings();
        if (settings) setSiteSettings(settings);
      } catch (err) {
        console.warn('Failed to load site settings in footer:', err);
      }
    }

    loadSettings();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                className="h-20 sm:h-24 lg:h-28 w-auto object-contain drop-shadow-md" 
              />
            </a>

            <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-sm font-normal">
              {lang === 'de'
                ? `Ihr zuverlässiger Partner für erstklassige Gebäudereinigung in ${siteSettings.city}.`
                : `Your trusted commercial cleaning partner in ${siteSettings.city}.`}
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
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white text-[#1855EA] hover:bg-[#1855EA] hover:text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: ADDRESS & CONTACT (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#6B7280] tracking-widest uppercase mb-4">
              {lang === 'de' ? 'KONTAKT & ADRESSE' : 'CONTACT & ADDRESS'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13.5px] font-medium text-[#374151]">
              <li className="font-bold text-[#111827]">{siteSettings.business_name}</li>
              <li>{siteSettings.street}</li>
              <li>{siteSettings.city}</li>
              <li className="pt-1">
                <a href={`tel:${siteSettings.phone_primary.replace(/[^0-9+]/g, '')}`} className="font-bold text-[#1855EA] hover:underline">
                  {siteSettings.phone_primary}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteSettings.email_primary}`} className="hover:text-[#1855EA] transition-colors">
                  {siteSettings.email_primary}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: SERVICES LINKS (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
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
                  onClick={() => onSelectService('Büro- & Gewerbereinigung')}
                  className="hover:text-[#1855EA] transition-colors text-left cursor-pointer font-bold text-[#1855EA]"
                >
                  {lang === 'de' ? 'Büroreinigung' : 'Office Cleaning'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectService('Glas- & Fensterreinigung')}
                  className="hover:text-[#1855EA] transition-colors text-left cursor-pointer"
                >
                  {lang === 'de' ? 'Glas- & Fensterreinigung' : 'Window Cleaning'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectService('Baureinigung')}
                  className="hover:text-[#1855EA] transition-colors text-left cursor-pointer"
                >
                  {lang === 'de' ? 'Baureinigung' : 'Construction Cleaning'}
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
                <span>Mo – Mi:</span>
                <span className="font-semibold text-[#111827]">{siteSettings.working_hours_mon_wed}</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-blue-200/50">
                <span>Do – Fr:</span>
                <span className="font-semibold text-[#111827]">{siteSettings.working_hours_thu_fri}</span>
              </div>
              <div className="flex items-center justify-between pb-1.5 border-b border-blue-200/50">
                <span>Wochenende:</span>
                <span className="font-semibold text-[#1855EA]">{siteSettings.working_hours_weekend}</span>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Bottom Bar: Copyright, Legal links & Scroll-to-Top Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4B5563] border-t border-blue-200/40">
          <div>
            © {new Date().getFullYear()} <span className="font-bold text-[#1855EA]">{siteSettings.business_name}</span>. {lang === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </div>

          {/* Center Legal Modals Buttons */}
          <div className="flex flex-wrap items-center gap-4 font-medium text-[#374151]">
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
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[#1855EA] font-bold hover:underline cursor-pointer flex items-center gap-1"
              >
                🔒 Admin Portal
              </button>
            )}
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
