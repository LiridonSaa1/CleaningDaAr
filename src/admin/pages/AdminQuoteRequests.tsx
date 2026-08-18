import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Send, 
  Trash2, 
  CheckCircle2, 
  X, 
  PhoneCall, 
  Calendar, 
  Home, 
  Building, 
  MapPin,
  AlertCircle,
  Tag
} from 'lucide-react';
import { QuoteRequestItem, updateQuoteRequestStatus, deleteQuoteRequest } from '../../lib/supabase';
import { sendEmailViaBrevo } from '../../lib/brevo';

interface AdminQuoteRequestsProps {
  quotes: QuoteRequestItem[];
  refreshData: () => void;
  selectedQuoteForModal?: QuoteRequestItem | null;
}

export const AdminQuoteRequests: React.FC<AdminQuoteRequestsProps> = ({
  quotes,
  refreshData,
  selectedQuoteForModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'quoted' | 'accepted' | 'rejected'>('all');
  
  // Modals state
  const [inspectModalQuote, setInspectModalQuote] = useState<QuoteRequestItem | null>(selectedQuoteForModal || null);
  const [sendOfferModalQuote, setSendOfferModalQuote] = useState<QuoteRequestItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Email form state
  const [offerPrice, setOfferPrice] = useState('240 €');
  const [offerSubject, setOfferSubject] = useState('');
  const [offerBody, setOfferBody] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccessToast, setEmailSuccessToast] = useState<string | null>(null);
  const [emailErrorAlert, setEmailErrorAlert] = useState<string | null>(null);

  // Filter & Search Logic
  const filteredQuotes = useMemo(() => {
    return quotes.filter((qItem) => {
      const matchesFilter = statusFilter === 'all' || qItem.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        qItem.name.toLowerCase().includes(q) ||
        qItem.email.toLowerCase().includes(q) ||
        qItem.phone.toLowerCase().includes(q) ||
        qItem.service.toLowerCase().includes(q) ||
        (qItem.city && qItem.city.toLowerCase().includes(q)) ||
        (qItem.address && qItem.address.toLowerCase().includes(q));

      return matchesFilter && matchesSearch;
    });
  }, [quotes, statusFilter, searchQuery]);

  const handleOpenSendOffer = (quote: QuoteRequestItem) => {
    setSendOfferModalQuote(quote);
    setOfferSubject(`Ihr Festpreis-Angebot für ${quote.service} – Dua & Ari Gebäudereinigung`);
    setOfferPrice('280 €');
    setOfferBody(`Sehr geehrte/r ${quote.name},\n\nvielen Dank für Ihre Anfrage bezüglich der ${quote.service} in ${quote.city}.\n\nGerne unterbreiten wir Ihnen folgendes verbindliches Festpreisangebot:\n\nLeistung: ${quote.service}\nObjekt: ${quote.property_type} (${quote.square_meters} m²)\nFestpreis: 280,00 € (inkl. MwSt. & Anfahrt)\nWunschtermin: ${quote.preferred_date || 'Nach Vereinbarung'}\n\nBei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.\n\nMit freundlichen Grüßen,\nIhr Team von Dua & Ari Gebäudereinigung\nTel: +49 (0) 172 913 7116`);
    setEmailErrorAlert(null);
  };

  const handleSendOfferEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendOfferModalQuote || !offerBody.trim()) return;

    setIsSendingEmail(true);
    setEmailErrorAlert(null);

    const formattedHtml = `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <div style="background-color: #0B1838; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 22px;">Dua & Ari Gebäudereinigung</h2>
          <span style="color: #60a5fa; font-size: 12px; text-transform: uppercase; font-weight: bold;">Verbindliches Festpreis-Angebot</span>
        </div>
        <div style="padding: 28px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
          ${offerBody.replace(/\n/g, '<br/>')}
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; font-size: 13px;">
            <strong>Anfragedaten:</strong><br/>
            Objektart: ${sendOfferModalQuote.property_type} | Fläche: ${sendOfferModalQuote.square_meters} m² | Ort: ${sendOfferModalQuote.city}
          </div>
        </div>
      </div>
    `;

    const res = await sendEmailViaBrevo({
      to: sendOfferModalQuote.email,
      name: sendOfferModalQuote.name,
      subject: offerSubject,
      htmlContent: formattedHtml
    });

    if (res.success) {
      await updateQuoteRequestStatus(sendOfferModalQuote.id, 'quoted');
      refreshData();
      setIsSendingEmail(false);
      setSendOfferModalQuote(null);
      setEmailSuccessToast(`Angebot erfolgreich per Brevo an ${sendOfferModalQuote.email} gesendet!`);
      setTimeout(() => setEmailSuccessToast(null), 5000);
    } else {
      setIsSendingEmail(false);
      setEmailErrorAlert(res.message || 'Fehler beim Senden der E-Mail über Brevo.');
    }
  };

  const handleStatusChange = async (id: string, newStatus: QuoteRequestItem['status']) => {
    await updateQuoteRequestStatus(id, newStatus);
    refreshData();
    if (inspectModalQuote?.id === id) {
      setInspectModalQuote(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteQuoteRequest(id);
    setDeleteConfirmId(null);
    setInspectModalQuote(null);
    refreshData();
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Success Toast */}
      {emailSuccessToast && (
        <div className="p-4 rounded-xl bg-emerald-600 text-white shadow-lg flex items-center justify-between font-bold text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{emailSuccessToast}</span>
          </div>
          <button onClick={() => setEmailSuccessToast(null)} className="text-white hover:opacity-80">✕</button>
        </div>
      )}

      {/* Top Filter Bar & Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Alle Anfragen' },
            { id: 'new', label: 'Neu' },
            { id: 'contacted', label: 'Kontaktiert' },
            { id: 'quoted', label: 'Angebot erstellt' },
            { id: 'accepted', label: 'Angenommen' },
            { id: 'rejected', label: 'Abgelehnt' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Angebote suchen (Name, Ort, Service)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">Kunde &amp; Kontaktdaten</th>
                <th className="p-4">Reinigungsleistung</th>
                <th className="p-4">Objekt &amp; Ort</th>
                <th className="p-4">Wunschtermin</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 font-medium">
                    Keine Offertenanfragen in dieser Ansicht vorhanden.
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((qItem) => (
                  <tr key={qItem.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Customer */}
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{qItem.name}</div>
                      <div className="text-[11px] text-[#1855EA] font-semibold">{qItem.phone}</div>
                      <div className="text-[10px] text-slate-400">{qItem.email}</div>
                    </td>

                    {/* Service */}
                    <td className="p-4">
                      <span className="font-bold text-slate-800 block text-xs">{qItem.service}</span>
                      <span className="text-[10px] text-slate-500 block">Intervall: {qItem.frequency}</span>
                    </td>

                    {/* Property Specs & Location */}
                    <td className="p-4">
                      <div className="font-bold text-slate-800 text-xs">{qItem.square_meters} m² • {qItem.property_type}</div>
                      <div className="text-[11px] text-slate-500">{qItem.city} ({qItem.zip_code || '85053'})</div>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-slate-700 font-medium whitespace-nowrap">
                      {qItem.preferred_date || 'Nach Vereinbarung'}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <select
                        value={qItem.status}
                        onChange={(e) => handleStatusChange(qItem.id, e.target.value as any)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-md border border-transparent focus:outline-none uppercase cursor-pointer ${
                          qItem.status === 'new' ? 'bg-amber-500 text-white' :
                          qItem.status === 'quoted' ? 'bg-emerald-600 text-white' :
                          qItem.status === 'contacted' ? 'bg-blue-600 text-white' :
                          qItem.status === 'accepted' ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        <option value="new" className="bg-white text-slate-900">NEW</option>
                        <option value="contacted" className="bg-white text-slate-900">CONTACTED</option>
                        <option value="quoted" className="bg-white text-slate-900">QUOTED</option>
                        <option value="accepted" className="bg-white text-slate-900">ACCEPTED</option>
                        <option value="rejected" className="bg-white text-slate-900">REJECTED</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setInspectModalQuote(qItem)}
                          title="Details ansehen"
                          className="p-2 rounded-lg bg-blue-50 text-[#1855EA] hover:bg-[#1855EA] hover:text-white transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenSendOffer(qItem)}
                          title="Angebot senden (Brevo)"
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(qItem.id)}
                          title="Löschen"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECT QUOTE DETAILS MODAL */}
      {inspectModalQuote && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setInspectModalQuote(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Offertenanfrage Details</h3>
                <span className="text-xs text-slate-500">Eingegangen am {new Date(inspectModalQuote.created_at).toLocaleString('de-DE')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl text-xs">
              <div><span className="text-slate-500 block">Kunde:</span> <span className="font-bold text-slate-900">{inspectModalQuote.name}</span></div>
              <div><span className="text-slate-500 block">Telefon:</span> <a href={`tel:${inspectModalQuote.phone}`} className="font-bold text-[#1855EA]">{inspectModalQuote.phone}</a></div>
              <div><span className="text-slate-500 block">E-Mail:</span> <a href={`mailto:${inspectModalQuote.email}`} className="font-bold text-[#1855EA] truncate block">{inspectModalQuote.email}</a></div>
              <div><span className="text-slate-500 block">Service:</span> <span className="font-bold text-emerald-800">{inspectModalQuote.service}</span></div>
              <div><span className="text-slate-500 block">Objekt &amp; Fläche:</span> <span className="font-bold text-slate-900">{inspectModalQuote.property_type} ({inspectModalQuote.square_meters} m²)</span></div>
              <div><span className="text-slate-500 block">Räume &amp; Bäder:</span> <span className="font-bold text-slate-900">{inspectModalQuote.rooms_count} Zimmer, {inspectModalQuote.bathrooms_count} Bäder</span></div>
              <div><span className="text-slate-500 block">Ort &amp; Adresse:</span> <span className="font-bold text-slate-900">{inspectModalQuote.address ? `${inspectModalQuote.address}, ` : ''}{inspectModalQuote.city}</span></div>
              <div><span className="text-slate-500 block">Wunschtermin:</span> <span className="font-bold text-slate-900">{inspectModalQuote.preferred_date || 'Flexibel'} ({inspectModalQuote.preferred_time || 'Tagsüber'})</span></div>
            </div>

            {inspectModalQuote.message && (
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Zusätzliche Anmerkungen:</span>
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-800 border border-slate-200/60 leading-relaxed font-sans">
                  {inspectModalQuote.message}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={() => handleStatusChange(inspectModalQuote.id, 'contacted')}
                className="px-3.5 py-2 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold hover:bg-blue-200 cursor-pointer"
              >
                Als Kontaktiert markieren
              </button>

              <button
                onClick={() => {
                  const target = inspectModalQuote;
                  setInspectModalQuote(null);
                  handleOpenSendOffer(target);
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Angebot per Brevo senden</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SEND OFFER MODAL */}
      {sendOfferModalQuote && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setSendOfferModalQuote(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Offerte per Brevo E-Mail senden</h3>
                <span className="text-xs text-slate-500">Kunde: {sendOfferModalQuote.name} ({sendOfferModalQuote.email})</span>
              </div>
            </div>

            {emailErrorAlert && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{emailErrorAlert}</span>
              </div>
            )}

            <form onSubmit={handleSendOfferEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  E-Mail Betreff
                </label>
                <input
                  type="text"
                  required
                  value={offerSubject}
                  onChange={(e) => setOfferSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Angebots-Text &amp; Konditionen
                </label>
                <textarea
                  rows={9}
                  required
                  value={offerBody}
                  onChange={(e) => setOfferBody(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 leading-relaxed font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSendOfferModalQuote(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  {isSendingEmail ? (
                    <span>Sende Angebot...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Angebot senden</span>
                    </>
                  )}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Anfrage wirklich löschen?</h4>
            <p className="text-xs text-slate-500">Diese Aktion entfernt die Offertenanfrage dauerhaft.</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 cursor-pointer shadow-xs"
              >
                Ja, löschen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
