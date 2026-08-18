import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import { getProjects, ProjectDbItem } from '../lib/supabase';
import { BEFORE_AFTER_CASES } from '../data/content';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [projectsList, setProjectsList] = useState<ProjectDbItem[]>([]);
  const [activeModalProject, setActiveModalProject] = useState<ProjectDbItem | null>(null);

  useEffect(() => {
    async function loadDynamicProjects() {
      try {
        const dbProjects = await getProjects();
        setProjectsList(dbProjects);
      } catch (err) {
        console.warn('Failed loading projects:', err);
      }
    }

    loadDynamicProjects();
  }, []);

  const displayProjects = projectsList.length > 0 ? projectsList : BEFORE_AFTER_CASES.map(p => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    before_img: p.beforeImg,
    after_img: p.afterImg,
    metrics_label: p.metrics?.label || 'Glanzgrad',
    metrics_value: p.metrics?.value || '100%',
    description: p.description
  }));

  const featured = displayProjects[0];
  const sideCards = displayProjects.slice(1, 4);

  return (
    <section id="galerie" className="py-20 md:py-28 bg-white relative scroll-mt-20 overflow-hidden font-sans">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-[#6B7280] uppercase mb-3 block">
            {lang === 'de' ? 'UNSERE GALERIE & PROJEKTE' : 'OUR GALLERY & PROJECTS'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-4 font-display">
            {lang === 'de' ? (
              <>
                Ergebnisse, die für{' '}
                <span className="text-[#1855EA]">
                  sich sprechen
                </span>
              </>
            ) : (
              <>
                Results That Speak for{' '}
                <span className="text-[#1855EA]">
                  Themselves
                </span>
              </>
            )}
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base max-w-2xl mx-auto font-normal">
            {lang === 'de'
              ? 'Ein Einblick in unsere professionell gereinigten Vorher-Nachher Referenzobjekte in Ingolstadt & Region.'
              : 'A glimpse into our professionally cleaned before-and-after projects across the region.'}
          </p>
        </motion.div>

        {/* Dynamic Gallery Grid (Featured Left + 3 Cards Right) */}
        {featured && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            
            {/* Left Featured Big Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              onClick={() => setActiveModalProject(featured)}
              className="lg:col-span-7 bg-slate-900 rounded-3xl overflow-hidden shadow-xl relative min-h-[380px] sm:min-h-[440px] flex flex-col justify-end group cursor-pointer border border-slate-200/80"
            >
              {/* Dual Before / After Image Split */}
              <div className="absolute inset-0 grid grid-cols-2 gap-0.5 opacity-90 group-hover:scale-105 transition-transform duration-500">
                <div className="relative h-full overflow-hidden">
                  <img src={featured.before_img} alt="Before" className="w-full h-full object-cover" />
                  <span className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">Vorher</span>
                </div>
                <div className="relative h-full overflow-hidden">
                  <img src={featured.after_img} alt="After" className="w-full h-full object-cover" />
                  <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">Nachher</span>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Text Badge Info */}
              <div className="relative z-10 p-6 sm:p-8 space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#1855EA] text-white text-xs font-bold uppercase tracking-wider">
                  {featured.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  {featured.title}
                </h3>

                {featured.subtitle && (
                  <p className="text-xs text-blue-200 font-medium">
                    {featured.subtitle}
                  </p>
                )}
              </div>
            </motion.div>

            {/* Right Stack of 3 Side Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-4">
              {sideCards.map((proj, idx) => (
                <motion.div
                  key={proj.id || idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  onClick={() => setActiveModalProject(proj)}
                  className="bg-slate-50 hover:bg-blue-50/50 rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-4 group"
                >
                  <div className="w-24 h-20 rounded-xl overflow-hidden relative shrink-0 bg-slate-200">
                    <img src={proj.after_img} alt={proj.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <span className="absolute bottom-1 right-1 bg-emerald-600 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">Nachher</span>
                  </div>

                  <div className="overflow-hidden flex-1">
                    <span className="text-[10px] font-bold text-[#1855EA] uppercase tracking-wider block">
                      {proj.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 truncate font-display group-hover:text-[#1855EA] transition-colors">
                      {proj.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate mt-0.5 font-normal">
                      {proj.subtitle || proj.description}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#1855EA] group-hover:translate-x-1 transition-all shrink-0" />
                </motion.div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* PROJECT DETAIL MODAL */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto font-sans">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1855EA] flex items-center justify-center font-bold">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">{activeModalProject.title}</h3>
                <span className="text-xs text-[#1855EA] font-bold">{activeModalProject.category} • {activeModalProject.subtitle}</span>
              </div>
            </div>

            {/* Before vs After Dual Comparison */}
            <div className="grid grid-cols-2 gap-3 h-56 rounded-2xl overflow-hidden bg-slate-100">
              <div className="relative h-full">
                <img src={activeModalProject.before_img} alt="Before" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-slate-900/80 text-white text-xs font-bold px-3 py-1 rounded-md uppercase">Vorher</span>
              </div>
              <div className="relative h-full">
                <img src={activeModalProject.after_img} alt="After" className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase">Nachher</span>
              </div>
            </div>

            {activeModalProject.metrics_value && (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/60 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-900">{activeModalProject.metrics_label || 'Kundenzufriedenheit'}</span>
                <span className="font-extrabold text-emerald-700">{activeModalProject.metrics_value}</span>
              </div>
            )}

            {activeModalProject.description && (
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {activeModalProject.description}
              </p>
            )}

            <div className="flex items-center justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveModalProject(null)}
                className="bg-[#1855EA] text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer hover:bg-[#1344C4] transition-colors"
              >
                {lang === 'de' ? 'Schließen' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
