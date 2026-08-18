import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  MessageSquare, 
  Save, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  Database
} from 'lucide-react';
import { SiteSettingsData, getSiteSettings, updateSiteSettings, isSupabaseConfigured } from '../../lib/supabase';

interface AdminSettingsProps {
  onSettingsUpdated: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onSettingsUpdated }) => {
  const [formData, setFormData] = useState<SiteSettingsData>({
    phone_primary: '+49 (0) 172 913 7116',
    email_primary: 'info@duaari-gebaeudereinigung.de',
    street: 'Holznerstraße 11',
    city: '85053 Ingolstadt',
    business_name: 'Dua & Ari Gebäudereinigung',
    whatsapp_number: '+491729137116',
    working_hours_mon_wed: '07:00 – 20:00 Uhr',
    working_hours_thu_fri: '07:00 – 20:00 Uhr',
    working_hours_weekend: 'Notdienst 24/7'
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      const data = await getSiteSettings(true);
      setFormData(data);
      setIsLoading(false);
    }

    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);

    const updated = await updateSiteSettings(formData);
    setFormData(updated);
    setIsSaving(false);
    setSuccessMessage('Die Kontaktdaten wurden erfolgreich in Supabase gespeichert & auf der gesamten Website aktualisiert!');
    onSettingsUpdated();

    setTimeout(() => setSuccessMessage(null), 5000);
  };

  if (isLoading) {
    return (
      <div className="p-12 text-center text-slate-400 text-sm">
        Einstellungen werden geladen...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl font-sans">
      
      {/* Toast Notification */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white shadow-lg flex items-center justify-between font-bold text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-white hover:opacity-80">✕</button>
        </div>
      )}

      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#1855EA] uppercase tracking-wider block">
            DYNAMISCHE STAMMDATEN
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
            Website Kontakteinstellungen &amp; Firmendaten
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl font-normal">
            Änderungen an Telefonnummer, E-Mail oder Adresse werden direkt in der Datenbank gespeichert und sofort auf der öffentlichen Website (Header, Footer, Kontaktsektion) übernommen.
          </p>
        </div>

        <span className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap ${
          isSupabaseConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {isSupabaseConfigured ? '✓ Supabase RLS Synced' : 'Offline Persistence Mode'}
        </span>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        
        {/* Section 1: Firmendaten */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Building className="w-4 h-4 text-[#1855EA]" />
            <span>Unternehmensbezeichnung &amp; Name</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Firmenname / Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.business_name}
                onChange={(e) => setFormData(prev => ({ ...prev, business_name: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                WhatsApp Nummer (International Format)
              </label>
              <input
                type="text"
                value={formData.whatsapp_number}
                onChange={(e) => setFormData(prev => ({ ...prev, whatsapp_number: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Kontaktkanäle */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#1855EA]" />
            <span>Telefon &amp; E-Mail Adressen</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Primäre Telefonnummer *
              </label>
              <input
                type="text"
                required
                value={formData.phone_primary}
                onChange={(e) => setFormData(prev => ({ ...prev, phone_primary: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Website Kontakt E-Mail *
              </label>
              <input
                type="email"
                required
                value={formData.email_primary}
                onChange={(e) => setFormData(prev => ({ ...prev, email_primary: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Standort & Adresse */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#1855EA]" />
            <span>Firmensitz &amp; Adresse</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Straße &amp; Hausnummer *
              </label>
              <input
                type="text"
                required
                value={formData.street}
                onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                PLZ &amp; Stadt / Region *
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Öffnungszeiten */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1855EA]" />
            <span>Öffnungszeiten &amp; Erreichbarkeit</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Montag – Mittwoch
              </label>
              <input
                type="text"
                value={formData.working_hours_mon_wed}
                onChange={(e) => setFormData(prev => ({ ...prev, working_hours_mon_wed: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Donnerstag – Freitag
              </label>
              <input
                type="text"
                value={formData.working_hours_thu_fri}
                onChange={(e) => setFormData(prev => ({ ...prev, working_hours_thu_fri: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Wochenende / Notdienst
              </label>
              <input
                type="text"
                value={formData.working_hours_weekend}
                onChange={(e) => setFormData(prev => ({ ...prev, working_hours_weekend: e.target.value }))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 disabled:opacity-50 text-white font-bold text-xs sm:text-sm px-7 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Speichere Einstellungen...' : 'Einstellungen speichern'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
