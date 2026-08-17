import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  MessageSquare, 
  Calendar,
  Building,
  User,
  Check
} from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/content';
import { QuoteFormData, Language } from '../types';
import { Toast } from './Toast';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentName = formData.name;
    const currentService = formData.serviceType;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setSubmittedDetails({
        name: currentName,
        service: currentService,
      });
      setShowToast(true);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#06b6d4', '#10b981', '#38bdf8'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 800);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hallo DuaAri Clean Team! Ich interessiere mich für eine professionelle Reinigung:\n\n• Leistung: ${formData.serviceType}\n• Fläche: ${formData.squareMeters} m²\n• Intervall: ${formData.frequency}\n• Ort: ${formData.address}\n\nBitte um ein unverbindliches Angebot. Vielen Dank!`
    );
    window.open(`https://wa.me/491729137116?text=${text}`, '_blank');
  };

  return (
    <section id="kontakt" className="py-20 md:py-28 relative scroll-mt-20 bg-slate-100/60">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.18em] text-[#6B7280] uppercase mb-3 block">
            {lang === 'de' ? 'KONTAKT & ANGEBOT' : 'CONTACT & QUOTE'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-4 font-display">
            {lang === 'de' ? (
              <>
                Fordern Sie jetzt Ihr{' '}
                <span className="text-[#1855EA]">
                  Festpreis-Angebot
                </span>{' '}
                an
              </>
            ) : (
              <>
                Request Your{' '}
                <span className="text-[#1855EA]">
                  Fixed-Price Quote
                </span>{' '}
                Today
              </>
            )}
          </h2>
          <p className="text-[#4B5563] text-sm sm:text-base max-w-2xl mx-auto font-normal">
            {lang === 'de'
              ? 'Füllen Sie das Formular aus – wir melden uns innerhalb von 2 bis 4 Stunden mit einer maßgeschneiderten Kalkulation.'
              : 'Fill out the form – we will get back to you within 2 to 4 hours with a custom proposal.'}
          </p>
        </motion.div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Quick Channels (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Glass Card */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 border-white/90 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                {lang === 'de' ? 'Direkter Kontakt' : 'Direct Contact'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'de'
                  ? 'Sie bevorzugen den schnellen Draht? Rufen Sie uns direkt an oder schreiben Sie uns per WhatsApp!'
                  : 'Prefer the direct route? Call us right away or send us a WhatsApp message!'}
              </p>

              <div className="space-y-4 pt-2">
                {/* Phone Primary */}
                <a
                  href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-white hover:bg-cyan-50/50 border border-slate-200/80 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Mobil / Hotline</div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{COMPANY_INFO.phonePrimary}</div>
                  </div>
                </a>

                {/* Phone Secondary */}
                <a
                  href={`tel:${COMPANY_INFO.phoneSecondary.replace(/\s+/g, '')}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-white hover:bg-cyan-50/50 border border-slate-200/80 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Zweites Büro-Telefon</div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{COMPANY_INFO.phoneSecondary}</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-white hover:bg-cyan-50/50 border border-slate-200/80 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">E-Mail Anfrage</div>
                    <div className="font-bold text-slate-900 text-sm sm:text-base">{COMPANY_INFO.email}</div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-slate-200/80">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Firmensitz</div>
                    <div className="font-bold text-slate-900 text-sm">
                      {COMPANY_INFO.street}, {COMPANY_INFO.postalCode} {COMPANY_INFO.city}
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-white border border-slate-200/80">
                  <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">Öffnungszeiten</div>
                    <div className="font-bold text-slate-900 text-xs sm:text-sm">{COMPANY_INFO.hours}</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Fast CTA */}
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{lang === 'de' ? 'Schnellanfrage via WhatsApp senden' : 'Quick WhatsApp Inquiry'}</span>
              </button>
            </div>

            {/* Promise Card */}
            <div className="glass-card-dark rounded-3xl p-6 text-white border-white/20 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>{lang === 'de' ? 'Das DuaAri Clean Qualitätsversprechen' : 'The DuaAri Clean Promise'}</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Kostenlose & unverbindliche Angebotserstellung</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Transparente Festpreise ohne Nachverhandlungen</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>100% DSGVO-konforme Datenverarbeitung</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column: Interactive Apple Glass Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-3xl p-6 sm:p-10 border-white/90 shadow-2xl relative">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {lang === 'de' ? 'Vielen Dank für Ihre Anfrage!' : 'Thank you for your inquiry!'}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                    {lang === 'de'
                      ? 'Ihre Daten wurden erfolgreich übermittelt. Unser Reinigungsteam prüft Ihre Angaben und meldet sich innerhalb von 2 bis 4 Stunden bei Ihnen.'
                      : 'Your information has been successfully received. Our cleaning management will review it and get back to you within 2 to 4 hours.'}
                  </p>

                  <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs text-cyan-900 max-w-md mx-auto">
                    <strong>Dringender Fall?</strong> Rufen Sie uns direkt an unter{' '}
                    <a href={`tel:${COMPANY_INFO.phonePrimary.replace(/\s+/g, '')}`} className="font-bold underline">
                      {COMPANY_INFO.phonePrimary}
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        serviceType: 'Unterhaltsreinigung',
                        squareMeters: '150',
                        frequency: '1x Wöchentlich',
                        preferredDate: '',
                        preferredTime: 'vormittags (08:00 - 12:00)',
                        address: 'Ingolstadt',
                        message: '',
                        agreedToPrivacy: true,
                      });
                    }}
                    className="btn-apple-glass px-6 py-2.5 rounded-full text-xs font-semibold text-slate-800"
                  >
                    {lang === 'de' ? 'Weitere Anfrage stellen' : 'Send Another Inquiry'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service & Property Type Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {lang === 'de' ? 'Gewünschte Leistung *' : 'Requested Service *'}
                      </label>
                      <select
                        required
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {lang === 'de' ? 'Reinigungsintervall' : 'Frequency'}
                      </label>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      >
                        <option value="Einmalig">{lang === 'de' ? 'Einmalig / Nach Bedarf' : 'One-time'}</option>
                        <option value="1x Wöchentlich">{lang === 'de' ? '1x Wöchentlich' : 'Weekly'}</option>
                        <option value="2x Wöchentlich">{lang === 'de' ? '2x Wöchentlich' : '2x Weekly'}</option>
                        <option value="Täglich (Mo-Fr)">{lang === 'de' ? 'Täglich (Mo-Fr)' : 'Daily (Mon-Fri)'}</option>
                        <option value="14-tägig">{lang === 'de' ? '14-tägig' : 'Bi-weekly'}</option>
                        <option value="Monatlich">{lang === 'de' ? 'Monatlich' : 'Monthly'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Area & Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {lang === 'de' ? 'Fläche ca. (m²)' : 'Area approx. (sqm)'}
                      </label>
                      <input
                        type="text"
                        value={formData.squareMeters}
                        onChange={(e) => setFormData({ ...formData, squareMeters: e.target.value })}
                        placeholder="z.B. 150"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {lang === 'de' ? 'Objektstandort / PLZ *' : 'Location / Postal Code *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="z.B. 85053 Ingolstadt"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                  </div>

                  {/* Personal Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {lang === 'de' ? 'Ihr Name *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="z.B. Max Mustermann"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {lang === 'de' ? 'Firma (optional)' : 'Company (optional)'}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="z.B. Mustermann GmbH"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {lang === 'de' ? 'E-Mail Adresse *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@beispiel.de"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        {lang === 'de' ? 'Telefonnummer *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="0172 1234567"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    </div>
                  </div>

                  {/* Message / Details */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      {lang === 'de' ? 'Ihre Nachricht / Besonderheiten (optional)' : 'Additional Notes / Message (optional)'}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'de' ? 'Beschreiben Sie Ihr Objekt oder besondere Wünsche...' : 'Describe special requirements or notes...'}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                    />
                  </div>

                  {/* Privacy Checkbox */}
                  <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedToPrivacy}
                      onChange={(e) => setFormData({ ...formData, agreedToPrivacy: e.target.checked })}
                      className="w-4 h-4 rounded text-cyan-600 accent-cyan-600 mt-0.5"
                    />
                    <span>
                      {lang === 'de'
                        ? 'Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen gespeichert werden (Datenschutz).'
                        : 'I agree that my details will be stored for contacting and quote preparation (Privacy Policy).'}
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1855EA] hover:bg-[#1242be] text-white w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-[#1855EA]/20 transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {lang === 'de' ? 'Wird übertragen...' : 'Transmitting...'}
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        <span>{lang === 'de' ? 'Jetzt kostenloses Angebot anfordern' : 'Submit Free Quote Request'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
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
