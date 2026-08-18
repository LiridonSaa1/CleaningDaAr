import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { getSiteSettings, SiteSettingsData } from '../lib/supabase';

interface ServiceAreaMapProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({ lang, onOpenQuote }) => {
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
        console.warn('Failed loading site settings in ServiceAreaMap:', err);
      }
    }
    loadSettings();

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent;
      if (customEvt.detail) {
        setSiteSettings(customEvt.detail);
      } else {
        loadSettings();
      }
    };

    window.addEventListener('duaari_settings_updated', handleUpdate);
    return () => window.removeEventListener('duaari_settings_updated', handleUpdate);
  }, []);

  const coverageArea = [
    "Ingolstadt",
    "Manching",
    "Pfaffenhofen a.d. Ilm",
    "Neuburg a.d. Donau",
    "Eichstätt",
    "Kösching",
    "Gaimersheim",
    "Geisenfeld",
    "Schrobenhausen",
    "München Nord"
  ];

  return (
    <section id="einsatzgebiet" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-100/50">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{lang === 'de' ? 'Ihr lokaler Partner' : 'Your Local Partner'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {lang === 'de' ? (
              <>
                Einsatzgebiet in{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  {siteSettings.city} &amp; bis zu 60 km Region
                </span>
              </>
            ) : (
              <>
                Service Coverage Across{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  {siteSettings.city} &amp; 60km Surrounding Area
                </span>
              </>
            )}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {lang === 'de'
              ? 'Schnelle Anfahrtszeiten, transparente Anfahrtspauschalen und sofortige Verfügbarkeit für Gewerbe und Privathaushalte.'
              : 'Rapid dispatch times, transparent travel terms, and prompt availability for commercial and private customers.'}
          </p>
        </motion.div>

        {/* Coverage Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Towns & Regions List (Left 6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 glass-card rounded-3xl p-6 sm:p-8 border-white/90 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Navigation className="w-5 h-5 text-cyan-600" />
                <h3 className="font-bold text-xl text-slate-900">
                  {lang === 'de' ? 'Städte & Gemeinden im Einzugsgebiet' : 'Cities & Towns Included'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                {lang === 'de'
                  ? 'Wir bedienen alle Stadtteile und umliegenden Orte mit verlässlichen Teams:'
                  : 'We serve all city districts and surrounding towns with dedicated teams:'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
                {coverageArea.map((city, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/70 p-2.5 rounded-xl border border-slate-200/60">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                    <span>{city}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{lang === 'de' ? 'Erreichbarkeit' : 'Availability'}</div>
                  <div className="text-[11px] text-slate-500">{siteSettings.working_hours_mon_wed}</div>
                </div>
              </div>

              <button
                onClick={onOpenQuote}
                className="bg-[#1855EA] hover:bg-[#1344C4] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer shrink-0"
              >
                {lang === 'de' ? 'Anfahrt anfragen' : 'Check Coverage'}
              </button>
            </div>
          </motion.div>

          {/* Interactive Visual Radar Card (Right 6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-6 flex flex-col justify-between"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-auto sm:h-full min-h-[320px] bg-slate-900/90 border border-white/10 flex items-center justify-center p-6 text-center">
              {/* Concentric Radar Rings representing 60km radius */}
              <div className="absolute w-[360px] h-[360px] rounded-full border border-cyan-500/20 animate-ping opacity-25" />
              <div className="absolute w-[280px] h-[280px] rounded-full border border-cyan-400/30" />
              <div className="absolute w-[180px] h-[180px] rounded-full border border-cyan-400/40 bg-cyan-500/5" />
              <div className="absolute w-[80px] h-[80px] rounded-full border border-cyan-300/60 bg-cyan-500/20 animate-pulse" />

              {/* Center Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-sky-400 flex items-center justify-center text-white shadow-xl shadow-cyan-500/50 mb-2">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="font-bold text-base text-white">{siteSettings.city}</div>
                <div className="text-xs text-cyan-300 font-semibold">{siteSettings.street}</div>
                <div className="mt-3 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] text-slate-200">
                  ⚡️ 60 km Aktionsradius aktiv
                </div>
              </div>

              {/* Floating Town Nodes */}
              <div className="absolute top-8 left-8 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 border border-white/10 text-slate-200">
                Neuburg a.d. Donau
              </div>
              <div className="absolute top-10 right-8 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 border border-white/10 text-slate-200">
                Kösching / Eichstätt
              </div>
              <div className="absolute bottom-10 left-8 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 border border-white/10 text-slate-200">
                Schrobenhausen
              </div>
              <div className="absolute bottom-10 right-8 text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 border border-white/10 text-slate-200">
                Pfaffenhofen &amp; München N.
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Zentrale: {siteSettings.street}, {siteSettings.city}</span>
              <span className="text-cyan-400 font-semibold">Täglich Mo-Sa im Einsatz</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
