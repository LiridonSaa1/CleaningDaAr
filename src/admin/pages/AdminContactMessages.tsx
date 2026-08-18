import React, { useState, useMemo } from 'react';
import { 
  Mail, 
  Search, 
  Filter, 
  Eye, 
  Send, 
  Archive, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  X, 
  PhoneCall, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { ContactMessageItem, updateContactMessageStatus, deleteContactMessage } from '../../lib/supabase';
import { sendEmailViaBrevo } from '../../lib/brevo';

interface AdminContactMessagesProps {
  messages: ContactMessageItem[];
  refreshData: () => void;
  selectedMessageForModal?: ContactMessageItem | null;
}

export const AdminContactMessages: React.FC<AdminContactMessagesProps> = ({
  messages,
  refreshData,
  selectedMessageForModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
  
  // Modals state
  const [inspectModalMessage, setInspectModalMessage] = useState<ContactMessageItem | null>(selectedMessageForModal || null);
  const [replyModalMessage, setReplyModalMessage] = useState<ContactMessageItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Reply email form state
  const [replySubject, setReplySubject] = useState('');
  const [replyBody, setReplyBody] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccessToast, setEmailSuccessToast] = useState<string | null>(null);
  const [emailErrorAlert, setEmailErrorAlert] = useState<string | null>(null);

  // Filter & Search Logic
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesFilter = statusFilter === 'all' || msg.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        (msg.phone && msg.phone.toLowerCase().includes(q)) ||
        (msg.subject && msg.subject.toLowerCase().includes(q)) ||
        msg.message.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [messages, statusFilter, searchQuery]);

  const handleOpenInspect = async (msg: ContactMessageItem) => {
    setInspectModalMessage(msg);
    if (msg.status === 'new') {
      await updateContactMessageStatus(msg.id, 'read');
      refreshData();
    }
  };

  const handleOpenReply = (msg: ContactMessageItem) => {
    setReplyModalMessage(msg);
    setReplySubject(`Re: ${msg.subject || 'Ihre Anfrage bei Dua & Ari Gebäudereinigung'}`);
    setReplyBody(`Sehr geehrte/r ${msg.name},\n\nvielen Dank für Ihre Nachricht an Dua & Ari Gebäudereinigung.\n\n\n\nMit freundlichen Grüßen,\nIhr Team von Dua & Ari Gebäudereinigung\nTel: +49 (0) 172 913 7116\nwww.duaari-gebaeudereinigung.de`);
    setEmailErrorAlert(null);
  };

  const handleSendReplyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyModalMessage || !replyBody.trim()) return;

    setIsSendingEmail(true);
    setEmailErrorAlert(null);

    const formattedHtml = `
      <div font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <div style="background-color: #0B1838; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px;">Dua & Ari Gebäudereinigung</h2>
        </div>
        <div style="padding: 24px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
          ${replyBody.replace(/\n/g, '<br/>')}
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e2e8f0;" />
          <p style="font-size: 12px; color: #64748b;">
            Ihre ursprüngliche Nachricht vom ${new Date(replyModalMessage.created_at).toLocaleDateString('de-DE')}:<br/>
            <em>"${replyModalMessage.message}"</em>
          </p>
        </div>
      </div>
    `;

    const res = await sendEmailViaBrevo({
      to: replyModalMessage.email,
      name: replyModalMessage.name,
      subject: replySubject,
      htmlContent: formattedHtml
    });

    if (res.success) {
      await updateContactMessageStatus(replyModalMessage.id, 'replied');
      refreshData();
      setIsSendingEmail(false);
      setReplyModalMessage(null);
      setEmailSuccessToast(`E-Mail erfolgreich per Brevo an ${replyModalMessage.email} gesendet!`);
      setTimeout(() => setEmailSuccessToast(null), 5000);
    } else {
      setIsSendingEmail(false);
      setEmailErrorAlert(res.message || 'Fehler beim Senden der E-Mail über Brevo.');
    }
  };

  const handleStatusChange = async (id: string, newStatus: ContactMessageItem['status']) => {
    await updateContactMessageStatus(id, newStatus);
    refreshData();
    if (inspectModalMessage?.id === id) {
      setInspectModalMessage(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteContactMessage(id);
    setDeleteConfirmId(null);
    setInspectModalMessage(null);
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
            { id: 'all', label: 'Alle Nachrichten' },
            { id: 'new', label: 'Ungelesen (Neu)' },
            { id: 'read', label: 'Gelesen' },
            { id: 'replied', label: 'Beantwortet' },
            { id: 'archived', label: 'Archiv' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-[#1855EA] text-white shadow-xs'
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
            placeholder="Nachrichten suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
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
                <th className="p-4">Kunde</th>
                <th className="p-4">Kontakt &amp; Betreff</th>
                <th className="p-4">Datum &amp; Uhrzeit</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">
                    Keine Kontaktnachrichten in dieser Ansicht gefunden.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Customer */}
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{msg.name}</div>
                      <div className="text-[11px] text-slate-500">{msg.email}</div>
                    </td>

                    {/* Contact Info & Subject */}
                    <td className="p-4 max-w-xs">
                      <div className="font-bold text-slate-800 truncate">{msg.subject || 'Allgemeine Anfrage'}</div>
                      <div className="text-[11px] text-slate-500 truncate">{msg.message}</div>
                    </td>

                    {/* Date */}
                    <td className="p-4 text-slate-600 font-medium whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString('de-DE', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                        msg.status === 'new' ? 'bg-blue-600 text-white shadow-xs' :
                        msg.status === 'replied' ? 'bg-emerald-100 text-emerald-800' :
                        msg.status === 'read' ? 'bg-slate-200 text-slate-800' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {msg.status}
                      </span>
                    </td>

                    {/* Action Buttons */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenInspect(msg)}
                          title="Nachricht ansehen"
                          className="p-2 rounded-lg bg-blue-50 text-[#1855EA] hover:bg-[#1855EA] hover:text-white transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenReply(msg)}
                          title="Per Brevo E-Mail antworten"
                          className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(msg.id)}
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

      {/* INSPECT DETAIL MODAL */}
      {inspectModalMessage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setInspectModalMessage(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1855EA] flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">Kontaktnachricht Details</h3>
                <span className="text-xs text-slate-500">Eingegangen am {new Date(inspectModalMessage.created_at).toLocaleString('de-DE')}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Name:</span> <span className="font-bold text-slate-900">{inspectModalMessage.name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500 font-medium">E-Mail:</span> <a href={`mailto:${inspectModalMessage.email}`} className="font-bold text-[#1855EA] underline">{inspectModalMessage.email}</a></div>
              {inspectModalMessage.phone && <div className="flex justify-between"><span className="text-slate-500 font-medium">Telefon:</span> <a href={`tel:${inspectModalMessage.phone}`} className="font-bold text-slate-900">{inspectModalMessage.phone}</a></div>}
              <div className="flex justify-between"><span className="text-slate-500 font-medium">Betreff:</span> <span className="font-bold text-slate-900">{inspectModalMessage.subject || 'Kein Betreff'}</span></div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Nachrichtentext:</span>
              <div className="p-4 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap border border-slate-200/60 max-h-60 overflow-y-auto">
                {inspectModalMessage.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleStatusChange(inspectModalMessage.id, 'replied')}
                  className="px-3 py-2 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs hover:bg-emerald-200 cursor-pointer"
                >
                  Als Beantwortet markieren
                </button>
                <button
                  onClick={() => handleStatusChange(inspectModalMessage.id, 'archived')}
                  className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer"
                >
                  Archivieren
                </button>
              </div>

              <button
                onClick={() => {
                  const target = inspectModalMessage;
                  setInspectModalMessage(null);
                  handleOpenReply(target);
                }}
                className="bg-[#1855EA] hover:bg-[#1344C4] text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Per Brevo antworten</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* REPLY MODAL (Brevo Email Integration) */}
      {replyModalMessage && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setReplyModalMessage(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">E-Mail Antwort senden (Brevo)</h3>
                <span className="text-xs text-slate-500">Empfänger: {replyModalMessage.name} &lt;{replyModalMessage.email}&gt;</span>
              </div>
            </div>

            {emailErrorAlert && (
              <div className="p-3 rounded-xl bg-red-100 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{emailErrorAlert}</span>
              </div>
            )}

            <form onSubmit={handleSendReplyEmail} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  E-Mail Betreff
                </label>
                <input
                  type="text"
                  required
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Nachrichtentext
                </label>
                <textarea
                  rows={8}
                  required
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA] leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReplyModalMessage(null)}
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
                    <span>Sende E-Mail...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>E-Mail senden</span>
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
            <h4 className="text-base font-bold text-slate-900">Nachricht wirklich löschen?</h4>
            <p className="text-xs text-slate-500">Diese Aktion kann nicht rückgängig gemacht werden.</p>
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
