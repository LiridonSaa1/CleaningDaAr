import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, ShieldCheck, Phone, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { Language } from '../types';

interface ServiceAreaMapProps {
  lang: Language;
  onOpenQuote: () => void;
}

export const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({ lang, onOpenQuote }) => {
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
                  Ingolstadt & bis zu 60 km Region
                </span>
              </>
            ) : (
              <>
                Service Coverage Across{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  Ingolstadt & 60km Surrounding Area
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
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {lang === 'de' ? 'Unsere Einsatzstandorte' : 'Our Service Locations'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {lang === 'de' ? 'Zentrale in 85053 Ingolstadt' : 'Headquartered in 85053 Ingolstadt'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <Navigation className="w-5 h-5" />
                </div>
              </div>

              {/* Towns Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 mb-8">
                {COMPANY_INFO.coverageArea.map((town, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex items-center gap-2.5 hover:bg-white hover:border-cyan-200 transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-800">{town}</span>
                  </div>
                ))}
              </div>

              {/* Guarantee Points */}
              <div className="space-y-3 pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                <div className="flex items-center gap-2.5 font-medium">
                  <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>{lang === 'de' ? 'Innerhalb von 24h bei Ihnen vor Ort' : 'On-site within 24 hours'}</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{lang === 'de' ? 'Keine versteckten Anfahrtskosten im 25km Kerngebiet' : 'No hidden travel fees in 25km core zone'}</span>
                </div>
                <div className="flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>{lang === 'de' ? 'Feste Teams & verlässliche Ansprechpartner' : 'Dedicated teams & direct account managers'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenQuote}
                className="btn-apple-primary py-3 px-6 rounded-full text-xs sm:text-sm font-semibold flex-1 flex items-center justify-center cursor-pointer shadow-md"
              >
                {lang === 'de' ? 'Standort jetzt anfragen' : 'Check Your Location Now'}
              </button>
              <a
                href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                className="btn-apple-glass py-3 px-5 rounded-full text-xs font-semibold text-slate-800 flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-600" />
                <span>{COMPANY_INFO.phonePrimary}</span>
              </a>
            </div>
          </motion.div>

          {/* Interactive Map Visual Simulation (Right 6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 glass-card rounded-3xl p-4 sm:p-6 border-white/90 shadow-xl flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 text-white"
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
                <div className="font-bold text-base text-white">Ingolstadt Zentrum</div>
                <div className="text-xs text-cyan-300 font-semibold">{COMPANY_INFO.street}</div>
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
                Pfaffenhofen & München N.
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-400">
              <span>{lang === 'de' ? 'Zentrale: Holznerstraße 11, 85053 Ingolstadt' : 'HQ: Holznerstraße 11, 85053 Ingolstadt'}</span>
              <span className="text-cyan-400 font-semibold">Täglich Mo-Sa im Einsatz</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
