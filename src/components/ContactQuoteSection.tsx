import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  Send, 
  CheckCircle 
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/content';
import { QuoteFormData, Language } from '../types';
import { Toast } from './Toast';
import { addContactMessage } from '../lib/supabase';
import { sendEmailViaBrevo } from '../lib/brevo';

// Image import matching cleaner woman portrait
import cleanerPortraitImg from '../assets/images/cleaner_woman_hero_1786998129641.jpg';

interface ContactQuoteSectionProps {
  lang: Language;
  prefilledService?: string;
  prefilledSummary?: string;
  prefilledSqm?: number;
  prefilledFrequency?: string;
}

export const ContactQuoteSection: React.FC<ContactQuoteSectionProps> = ({
  lang,
  prefilledService = '',
  prefilledSummary = '',
  prefilledSqm = 0,
  prefilledFrequency = '',
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: prefilledService || 'Unterhaltsreinigung',
    squareMeters: prefilledSqm ? `${prefilledSqm}` : '150',
    frequency: prefilledFrequency || '1x Wöchentlich',
    preferredDate: '',
    preferredTime: 'vormittags (08:00 - 12:00)',
    address: 'Ingolstadt',
    message: prefilledSummary || '',
    agreedToPrivacy: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState<{ name: string; service: string }>({
    name: '',
    service: '',
  });

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceType: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledSummary) {
      setFormData((prev) => ({
        ...prev,
        message: prefilledSummary,
        squareMeters: prefilledSqm ? `${prefilledSqm}` : prev.squareMeters,
        frequency: prefilledFrequency || prev.frequency,
      }));
    }
  }, [prefilledSummary, prefilledSqm, prefilledFrequency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentName = formData.name;
    const currentService = formData.serviceType;
    const currentEmail = formData.email;

    try {
      // 1. Store in Supabase
      await addContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Anfrage: ${formData.serviceType}`,
        message: `Service: ${formData.serviceType}\nFläche: ${formData.squareMeters} m²\nIntervall: ${formData.frequency}\nDatum: ${formData.preferredDate}\nNachricht: ${formData.message}`
      });

      // 2. Trigger Brevo Email Notification
      await sendEmailViaBrevo({
        to: currentEmail,
        name: currentName,
        subject: 'Bestätigung Ihrer Kontaktanfrage – Dua & Ari Gebäudereinigung',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
            <div style="background-color: #0B1838; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h2 style="color: #ffffff; margin: 0;">Dua & Ari Gebäudereinigung</h2>
            </div>
            <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
              <p>Sehr geehrte/r ${currentName},</p>
              <p>vielen Dank für Ihre Anfrage bezüglich <strong>${currentService}</strong>. Wir haben Ihre Nachricht erfolgreich erhalten.</p>
              <p>Unser Team wird Ihre Angaben prüfen und sich innerhalb von 2 bis 4 Stunden mit Ihnen in Verbindung setzen.</p>
              <br/>
              <p>Mit freundlichen Grüßen,<br/><strong>Dua & Ari Gebäudereinigung</strong><br/>Tel: +49 (0) 172 913 7116</p>
            </div>
          </div>
        `
      });
    } catch (err) {
      console.error('Contact submission error:', err);
    }

    setIsSubmitting(false);
    setIsSuccess(true);
    setSubmittedDetails({
      name: currentName,
      service: currentService,
    });
    setShowToast(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1855EA', '#2563EB', '#3B82F6', '#60A5FA'],
      });
    } catch (err) {
      // Fallback
    }
  };

  return (
    <section id="kontakt" className="py-20 md:py-28 relative scroll-mt-20 bg-white">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Grid (Left Info & Photo, Right Light Blue Form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Heading, Trust Badges & Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between items-start"
          >
            <div>
              {/* Eyebrow */}
              <span className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-[#6B7280] uppercase mb-3 block font-sans">
                {lang === 'de' ? 'KONTAKT & ANFRAGE' : 'CONTACT US'}
              </span>

              {/* Main Headline matching reference design */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#111827] tracking-tight leading-[1.15] mb-5 font-display">
                {lang === 'de' ? (
                  <>
                    Fordern Sie jetzt Ihr <span className="text-[#1855EA]">Festpreis-Angebot an.</span>
                  </>
                ) : (
                  <>
                    Get Professional Cleaning Help <span className="text-[#1855EA]">Starting Today.</span>
                  </>
                )}
              </h2>

              {/* Checkmarks Row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm font-semibold text-[#374151] mb-6">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1855EA] fill-[#1855EA]/10 shrink-0" />
                  <span>{lang === 'de' ? 'Schnelle Antwort (2-4 Std.)' : 'Fast Response'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1855EA] fill-[#1855EA]/10 shrink-0" />
                  <span>{lang === 'de' ? 'Erfahrene Fachkräfte' : 'Trusted Experts'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1855EA] fill-[#1855EA]/10 shrink-0" />
                  <span>{lang === 'de' ? 'Flexible Termine' : 'Flexible Scheduling'}</span>
                </div>
              </div>
            </div>

            {/* Cleaner Photo */}
            <div className="w-full h-[280px] sm:h-[320px] lg:h-[340px] rounded-2xl overflow-hidden shadow-xs mt-2">
              <img
                src={cleanerPortraitImg || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80'}
                alt="Professional Cleaner"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Right Column: Light Blue Form Card matching reference image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 h-full flex flex-col"
          >
            <div className="bg-[#F0F5FF] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs border border-blue-100/60 h-full flex flex-col justify-between">
              {isSuccess ? (
                <div className="text-center py-10 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#1855EA] text-white flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-display">
                    {lang === 'de' ? 'Vielen Dank für Ihre Anfrage!' : 'Thank you for your message!'}
                  </h3>
                  <p className="text-[#4B5563] text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    {lang === 'de'
                      ? `Hallo ${submittedDetails.name}, wir haben Ihre Anfrage für ${submittedDetails.service} erhalten. Unser Team prüft Ihre Angaben und meldet sich innerhalb von 2-4 Stunden.`
                      : `Hello ${submittedDetails.name}, we received your inquiry for ${submittedDetails.service}. We will get back to you within 2-4 hours.`}
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-[#1855EA] hover:bg-[#1344C4] text-white px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold cursor-pointer shadow-xs transition-colors"
                  >
                    {lang === 'de' ? 'Weitere Anfrage stellen' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between space-y-4 sm:space-y-5">
                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                        {lang === 'de' ? 'Ihr Name *' : 'Full Name'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={lang === 'de' ? 'z.B. Max Mustermann' : 'e.g. John Does'}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1855EA]/40 transition-shadow"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                        {lang === 'de' ? 'Ihre E-Mail-Adresse *' : 'Your Email'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={lang === 'de' ? 'z.B. kontakt@beispiel.de' : 'e.g. contact@skyword.com'}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1855EA]/40 transition-shadow"
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone & Service / Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                        {lang === 'de' ? 'Ihre Telefonnummer *' : 'Your Phone'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={lang === 'de' ? 'z.B. +49 172 9137116' : 'e.g. +1 445 2736 3536'}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1855EA]/40 transition-shadow"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                        {lang === 'de' ? 'Gewünschte Leistung *' : 'Subject'}
                      </label>
                      <select
                        required
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1855EA]/40 transition-shadow cursor-pointer"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title}>
                            {lang === 'de' ? (s.titleDe || s.title) : (s.titleEn || s.title)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Message Textarea */}
                  <div className="flex-1 flex flex-col">
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5">
                      {lang === 'de' ? 'Ihre Nachricht / Objektangaben' : 'Message'}
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'de' ? 'Beschreiben Sie kurz Ihr Objekt oder Ihre Wünsche...' : 'Write your message here...'}
                      className="w-full flex-1 min-h-[140px] px-4 py-3 rounded-lg bg-white border border-slate-200 text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1855EA]/40 transition-shadow resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-semibold text-sm sm:text-[15px] px-8 py-3 rounded-lg shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>{lang === 'de' ? 'Wird gesendet...' : 'Sending...'}</span>
                      ) : (
                        <span>{lang === 'de' ? 'Jetzt Angebot anfordern' : 'Send Message'}</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Row: 3 Quick Contact Info Cards (CALL US, MAIL US, FIND US) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-12">
          {/* Card 1: Call Us */}
          <motion.a
            href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-[#F0F5FF] hover:bg-[#E6F0FF] rounded-2xl p-5 sm:p-6 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 border border-blue-100/60 group"
          >
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] tracking-wider uppercase block">
                {lang === 'de' ? 'ANRUFEN' : 'CALL US'}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#111827] group-hover:text-[#1855EA] transition-colors block mt-1">
                {COMPANY_INFO.phonePrimary}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-white text-[#1855EA] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <PhoneCall className="w-5 h-5" />
            </div>
          </motion.a>

          {/* Card 2: Mail Us */}
          <motion.a
            href={`mailto:${COMPANY_INFO.email}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="bg-[#F0F5FF] hover:bg-[#E6F0FF] rounded-2xl p-5 sm:p-6 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 border border-blue-100/60 group"
          >
            <div className="overflow-hidden mr-2">
              <span className="text-[11px] font-bold text-[#6B7280] tracking-wider uppercase block">
                {lang === 'de' ? 'E-MAIL' : 'MAIL US'}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#111827] group-hover:text-[#1855EA] transition-colors block mt-1 truncate">
                {COMPANY_INFO.email}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-white text-[#1855EA] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
          </motion.a>

          {/* Card 3: Find Us */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="bg-[#F0F5FF] hover:bg-[#E6F0FF] rounded-2xl p-5 sm:p-6 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 border border-blue-100/60 group"
          >
            <div>
              <span className="text-[11px] font-bold text-[#6B7280] tracking-wider uppercase block">
                {lang === 'de' ? 'STANDORT' : 'FIND US'}
              </span>
              <span className="text-sm sm:text-base font-bold text-[#111827] group-hover:text-[#1855EA] transition-colors block mt-1">
                {COMPANY_INFO.street}, {COMPANY_INFO.city}
              </span>
            </div>
            <div className="w-11 h-11 rounded-xl bg-white text-[#1855EA] flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Confirmation Toast Notification */}
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        customerName={submittedDetails.name}
        serviceType={submittedDetails.service}
        lang={lang}
        duration={6500}
      />
    </section>
  );
};
