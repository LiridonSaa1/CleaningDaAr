import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Scale } from 'lucide-react';
import { getSiteSettings, SiteSettingsData } from '../lib/supabase';

export type LegalModalType = 'impressum' | 'datenschutz' | 'agb' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
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
        console.warn('Failed loading site settings in LegalModals:', err);
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

  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-card max-w-3xl w-full rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto relative shadow-2xl border-white font-sans"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {activeModal === 'impressum' && (
            <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Impressum</h3>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Angaben gemäß § 5 TMG</h4>
                <p className="font-semibold text-slate-900">{siteSettings.business_name}</p>
                <p>{siteSettings.street}</p>
                <p>{siteSettings.city}</p>
                <p>Deutschland</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Kontakt</h4>
                <p>Telefon: {siteSettings.phone_primary}</p>
                <p>E-Mail: {siteSettings.email_primary}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Betriebshaftpflichtversicherung</h4>
                <p>Betriebshaftpflichtversicherung mit Deckungssumme bis zu 5.000.000 € für Personen- und Sachschäden.</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Streitschlichtung</h4>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                  https://ec.europa.eu/consumers/odr/. Wir sind nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          )}

          {activeModal === 'datenschutz' && (
            <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Datenschutzerklärung</h3>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. Datenschutz auf einen Blick</h4>
                <p>
                  Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über den Umgang mit Ihren Daten.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. Verantwortliche Stelle</h4>
                <p>{siteSettings.business_name}, {siteSettings.street}, {siteSettings.city}, E-Mail: {siteSettings.email_primary}.</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">3. Erhebung und Speicherung personenbezogener Daten</h4>
                <p>
                  Wenn Sie unser Kontaktformular oder unseren Kostenrechner nutzen, erheben wir die von Ihnen eingegebenen Kontaktdaten (Name, Telefonnummer, E-Mail-Adresse, Objektdaten) ausschließlich zur Bearbeitung und Beantwortung Ihrer Reinigungsanfrage (Art. 6 Abs. 1 lit. b DSGVO).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">4. Ihre Rechte</h4>
                <p>
                  Sie haben jederzeit das Recht auf kostenlose Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
                </p>
              </div>
            </div>
          )}

          {activeModal === 'agb' && (
            <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Allgemeine Geschäftsbedingungen (AGB)</h3>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. Geltungsbereich</h4>
                <p>
                  Für alle Aufträge und Dienstleistungen der {siteSettings.business_name} gelten ausschließlich diese Allgemeinen Geschäftsbedingungen.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. Angebot und Vertragsschluss</h4>
                <p>
                  Unsere Angebote sind freibleibend. Ein Vertrag kommt erst durch die schriftliche Auftragsbestätigung oder den Beginn der Ausführung der Reinigungsarbeiten zustande.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">3. Leistungsumfang und Ausführung</h4>
                <p>
                  Die Reinigungsarbeiten werden gemäß der vereinbarten Leistungsbeschreibung und den festgelegten Reinigungsintervallen sorgfältig ausgeführt.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">4. Zahlungsbedingungen</h4>
                <p>
                  Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum ohne Abzug zahlbar, sofern nicht anders vereinbart.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
