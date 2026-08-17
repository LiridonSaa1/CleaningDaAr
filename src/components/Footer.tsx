import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/content';
import { LegalModalType } from './LegalModals';
import { Language } from '../types';
import { BrandLogo } from './BrandLogo';

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
  return (
    <footer className="relative bg-slate-900 text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1760px] h-64 pointer-events-none -z-0">
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1760px] w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand & Motto (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="inline-flex items-center transition-transform duration-200 hover:scale-105">
              <BrandLogo size="md" />
            </a>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {lang === 'de'
                ? 'Ihr zertifizierter Meisterpartner für professionelle Gebäudereinigung, Unterhaltsreinigung, Büroreinigung und Glasreinigung in Ingolstadt & bis zu 60 km Region.'
                : 'Your certified master partner for professional commercial cleaning, office maintenance, window cleaning, and post-construction care in Ingolstadt & surrounding regions.'}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Betriebshaftpflichtversichert bis 5 Mio. €</span>
            </div>
          </div>

          {/* Services Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'de' ? 'Unsere Leistungen' : 'Our Services'}
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES_DATA.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="text-slate-400 hover:text-[#1855EA] transition-colors text-left cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact & Address (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'de' ? 'Kontakt & Büro' : 'Contact & HQ'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#1855EA] shrink-0 mt-0.5" />
                <span>
                  {COMPANY_INFO.street}<br />
                  {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#1855EA] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-white">
                  {COMPANY_INFO.phonePrimary}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1855EA] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-[#1855EA] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.hours}</span>
              </li>
            </ul>
          </div>

          {/* Quick CTA Box (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'de' ? 'Schnellstart' : 'Quick Start'}
            </h4>
            <button
              onClick={onOpenQuote}
              className="bg-[#1855EA] hover:bg-[#1242be] text-white w-full py-3 rounded-xl text-xs font-semibold text-center cursor-pointer shadow-md transition-all hover:shadow-lg"
            >
              {lang === 'de' ? 'Angebot anfordern' : 'Get a Quote'}
            </button>

            <a
              href={`https://wa.me/491729137116`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. Alle Rechte vorbehalten.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegal('impressum')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Impressum
            </button>
            <button
              onClick={() => onOpenLegal('datenschutz')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Datenschutz
            </button>
            <button
              onClick={() => onOpenLegal('agb')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              AGB
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
