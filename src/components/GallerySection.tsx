import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, X, Eye } from 'lucide-react';
import { Language } from '../types';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'office' | 'glass' | 'construction' | 'residential'>('all');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; category: string } | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: 'Modernes Großraumbüro nach Feinreinigung',
      category: 'office',
      categoryLabel: lang === 'de' ? 'Büroreinigung' : 'Office',
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Streifenfreie Glasfassade Gewerbezentrum',
      category: 'glass',
      categoryLabel: lang === 'de' ? 'Glasreinigung' : 'Glass',
      src: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Schlüsselfertige Bauabschlussreinigung Penthouse',
      category: 'construction',
      categoryLabel: lang === 'de' ? 'Baureinigung' : 'Construction',
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Gepflegtes Treppenhaus mit Naturstein-Pflege',
      category: 'residential',
      categoryLabel: lang === 'de' ? 'Treppenhaus' : 'Staircase',
      src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'Praxisreinigung mit lückenlosem Hygieneplan',
      category: 'office',
      categoryLabel: lang === 'de' ? 'Praxis & Hygiene' : 'Clinic',
      src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      title: 'Industrieboden-Tiefenreinigung & Versiegelung',
      category: 'construction',
      categoryLabel: lang === 'de' ? 'Sonderreinigung' : 'Special Clean',
      src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const filtered = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100/80 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>{lang === 'de' ? 'Einblicke & Qualität' : 'Insights & Quality'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {lang === 'de' ? (
              <>
                Unsere Arbeiten in{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  Bildern
                </span>
              </>
            ) : (
              <>
                Our Completed Work in{' '}
                <span className="bg-gradient-to-r from-cyan-600 to-sky-700 bg-clip-text text-transparent">
                  Pictures
                </span>
              </>
            )}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            {lang === 'de'
              ? 'Ein Auszug unserer erfolgreich gereinigten Objekte in Ingolstadt und der umliegenden Region.'
              : 'A glimpse of our successfully serviced premises in Ingolstadt and surrounding area.'}
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 flex-wrap mb-10"
        >
          {[
            { id: 'all', label: lang === 'de' ? 'Alle' : 'All' },
            { id: 'office', label: lang === 'de' ? 'Büro & Praxis' : 'Office & Clinic' },
            { id: 'glass', label: lang === 'de' ? 'Glas & Fenster' : 'Glass & Windows' },
            { id: 'construction', label: lang === 'de' ? 'Bau & Sanierung' : 'Construction' },
            { id: 'residential', label: lang === 'de' ? 'Treppen & Wohnen' : 'Stairs & Living' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'btn-apple-primary shadow-sm'
                  : 'btn-apple-glass text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setLightboxImage(item)}
              className="glass-card rounded-3xl overflow-hidden p-2 group cursor-pointer border-white/90 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full glass-card-dark text-cyan-300 border border-white/20">
                  {item.categoryLabel}
                </span>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h4 className="text-xs sm:text-sm font-bold line-clamp-1">{item.title}</h4>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-4xl w-full rounded-3xl overflow-hidden p-3 relative border-white/20 shadow-2xl"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-slate-950/60 text-white hover:bg-slate-950/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9]">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex items-center justify-between text-slate-900">
                <span className="font-bold text-sm sm:text-base">{lightboxImage.title}</span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
                  {lightboxImage.category}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
