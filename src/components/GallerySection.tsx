import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface GallerySectionProps {
  lang: Language;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [activeModalProject, setActiveModalProject] = useState<{
    id: string;
    title: string;
    titleDe: string;
    titleEn: string;
    badgeDe: string;
    badgeEn: string;
    descDe: string;
    descEn: string;
    image: string;
  } | null>(null);

  const featuredProject = {
    id: 'project-home',
    title: lang === 'de' ? 'Glänzendes Einfamilienhaus' : 'Sparkling Family Residence',
    titleDe: 'Glänzendes Einfamilienhaus',
    titleEn: 'Sparkling Family Residence',
    badgeDe: 'Unterhaltsreinigung',
    badgeEn: 'Home Cleaning',
    descDe: 'Vollständige Unterhaltsreinigung für Wohnräume, Bäder, Schlafbereiche und Küchen für dauerhafte Frische und hygienischen Komfort.',
    descEn: 'Complete home cleaning focused on living areas, bedrooms, bathrooms, and kitchen spaces for a fresher environment.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
  };

  const projectCards = [
    {
      id: 'project-office',
      title: lang === 'de' ? 'Professionelle Büroflächen' : 'Corporate Workspace Care',
      titleDe: 'Professionelle Büroflächen',
      titleEn: 'Corporate Workspace Care',
      badgeDe: 'Büroreinigung',
      badgeEn: 'Office Cleaning',
      descDe: 'Repräsentative Büroreinigung für saubere Arbeitsplätze, hygienische Oberflächen und ein produktives Geschäftsumfeld.',
      descEn: 'Professional office cleaning maintaining organized workspaces, sanitized surfaces, and a productive business environment.',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'project-apartment',
      title: lang === 'de' ? 'Moderne Wohnungsreinigung' : 'Modern Apartment Refresh',
      titleDe: 'Moderne Wohnungsreinigung',
      titleEn: 'Modern Apartment Refresh',
      badgeDe: 'Wohnungsreinigung',
      badgeEn: 'Apartment Cleaning',
      descDe: 'Umfassende Wohnungsreinigung für perfekten Wohnkomfort, Hygiene und ein makelloses Wohlfühlklima für die Bewohner.',
      descEn: 'Comprehensive apartment cleaning to improve cleanliness, comfort, and everyday living experiences for residents.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <section id="projekte" className="py-20 md:py-28 relative scroll-mt-20 bg-[#F4F8FF]">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#6B7280] uppercase mb-2 block font-sans">
            {lang === 'de' ? 'UNSERE ARBEITEN IN BILDERN' : 'OUR PROJECTS'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111827] tracking-tight leading-tight font-display">
            {lang === 'de' ? (
              <>
                Reinigungsergebnisse, die <span className="text-[#1855EA]">überzeugen.</span>
              </>
            ) : (
              <>
                Cleaning Results That <span className="text-[#1855EA]">Speak Volumes.</span>
              </>
            )}
          </h2>
        </motion.div>

        {/* Featured Wide Project Card (Row 1) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55 }}
          className="bg-white rounded-[24px] p-6 sm:p-8 lg:p-9 shadow-xs hover:shadow-md transition-shadow border border-slate-100/90 mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Photo */}
            <div 
              onClick={() => setActiveModalProject(featuredProject)}
              className="relative w-full h-[280px] sm:h-[340px] lg:h-[360px] overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={featuredProject.image}
                alt={featuredProject.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Right Details */}
            <div className="flex flex-col items-start justify-center">
              <span className="bg-[#F0F5FF] text-[#1855EA] text-xs font-semibold px-3 py-1 rounded-md inline-block mb-3">
                {lang === 'de' ? featuredProject.badgeDe : featuredProject.badgeEn}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-3 font-display leading-snug">
                {featuredProject.title}
              </h3>
              <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed font-normal mb-6">
                {lang === 'de' ? featuredProject.descDe : featuredProject.descEn}
              </p>
              <button
                onClick={() => setActiveModalProject(featuredProject)}
                className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-lg shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>{lang === 'de' ? 'Mehr erfahren' : 'Read More'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom 2 Equal Column Project Cards (Row 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projectCards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: 0.1 * (idx + 1) }}
              className="bg-white rounded-[24px] p-6 sm:p-8 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-slate-100/90 flex flex-col justify-between h-full"
            >
              <div>
                {/* Photo */}
                <div 
                  onClick={() => setActiveModalProject(card)}
                  className="relative w-full h-[240px] sm:h-[270px] overflow-hidden rounded-2xl mb-6 group cursor-pointer"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Badge & Title */}
                <span className="bg-[#F0F5FF] text-[#1855EA] text-xs font-semibold px-3 py-1 rounded-md inline-block mb-3">
                  {lang === 'de' ? card.badgeDe : card.badgeEn}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827] mb-2 font-display leading-snug">
                  {card.title}
                </h3>
                <p className="text-[#4B5563] text-sm sm:text-[15px] leading-relaxed font-normal mb-6">
                  {lang === 'de' ? card.descDe : card.descEn}
                </p>
              </div>

              {/* Button */}
              <div>
                <button
                  onClick={() => setActiveModalProject(card)}
                  className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-lg shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>{lang === 'de' ? 'Mehr erfahren' : 'Read More'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Project Lightbox Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white max-w-3xl w-full rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl border border-slate-100"
            >
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-xl overflow-hidden h-[300px] sm:h-[380px] mb-6">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="bg-[#F0F5FF] text-[#1855EA] text-xs font-semibold px-3 py-1 rounded-md inline-block mb-2">
                {lang === 'de' ? activeModalProject.badgeDe : activeModalProject.badgeEn}
              </span>

              <h3 className="text-2xl font-bold text-[#111827] mb-3 font-display">
                {activeModalProject.title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {lang === 'de' ? activeModalProject.descDe : activeModalProject.descEn}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
