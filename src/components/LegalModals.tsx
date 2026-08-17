import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, Scale } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

export type LegalModalType = 'impressum' | 'datenschutz' | 'agb' | null;

interface LegalModalsProps {
  activeModal: LegalModalType;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {
  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="glass-card max-w-3xl w-full rounded-3xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto relative shadow-2xl border-white"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
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
                <h3 className="text-2xl font-bold text-slate-900">Impressum</h3>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Angaben gemäß § 5 TMG</h4>
                <p className="font-semibold text-slate-900">{COMPANY_INFO.name}</p>
                <p>{COMPANY_INFO.street}</p>
                <p>{COMPANY_INFO.postalCode} {COMPANY_INFO.city}</p>
                <p>Deutschland</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">Kontakt</h4>
                <p>Telefon: {COMPANY_INFO.phonePrimary}</p>
                <p>Zweites Telefon: {COMPANY_INFO.phoneSecondary}</p>
                <p>E-Mail: {COMPANY_INFO.email}</p>
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
                <h3 className="text-2xl font-bold text-slate-900">Datenschutzerklärung</h3>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. Datenschutz auf einen Blick</h4>
                <p>
                  Wir freuen uns über Ihr Interesse an unserer Website. Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über den Umgang mit Ihren Daten.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. Verantwortliche Stelle</h4>
                <p>{COMPANY_INFO.name}, {COMPANY_INFO.street}, {COMPANY_INFO.postalCode} {COMPANY_INFO.city}, E-Mail: {COMPANY_INFO.email}.</p>
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
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung oder Löschung dieser Daten.
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
                <h3 className="text-2xl font-bold text-slate-900">Allgemeine Geschäftsbedingungen (AGB)</h3>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. Geltungsbereich</h4>
                <p>
                  Diese AGB gelten für alle Verträge über Reinigungs- und Servicedienstleistungen zwischen {COMPANY_INFO.name} und dem Auftraggeber (sowohl gewerblich als auch privat).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. Leistungsdurchführung & Qualität</h4>
                <p>
                  Die Reinigungsarbeiten werden sach- und fachgerecht nach den anerkannten Regeln der Gebäudereinigung und unter Verwendung schonender, umweltgerechter Reinigungsmittel ausgeführt.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">3. Abnahme & Gewährleistung</h4>
                <p>
                  Der Auftraggeber ist verpflichtet, die Leistungen nach Durchführung abzunehmen. Eventuelle Beanstandungen sind unverzüglich mitzuteilen. Wir beseitigen berechtigte Mängel umgehend kostenlos.
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="btn-apple-primary px-6 py-2 rounded-full text-xs font-semibold"
            >
              Schließen
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
