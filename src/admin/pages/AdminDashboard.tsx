import React from 'react';
import { 
  Mail, 
  FileText, 
  Star, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  Calendar,
  Sparkles
} from 'lucide-react';
import { ContactMessageItem, QuoteRequestItem, ReviewItem } from '../../lib/supabase';
import { AdminTab } from '../types';

interface AdminDashboardProps {
  messages: ContactMessageItem[];
  quotes: QuoteRequestItem[];
  reviews: ReviewItem[];
  setActiveTab: (tab: AdminTab) => void;
  onOpenMessage: (msg: ContactMessageItem) => void;
  onOpenQuote: (quote: QuoteRequestItem) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  messages,
  quotes,
  reviews,
  setActiveTab,
  onOpenMessage,
  onOpenQuote
}) => {
  // Statistics calculations
  const totalMessages = messages.length;
  const unreadMessages = messages.filter(m => m.status === 'new').length;

  const totalQuotes = quotes.length;
  const pendingQuotes = quotes.filter(q => q.status === 'new' || q.status === 'contacted').length;

  const totalReviews = reviews.length;
  const approvedReviews = reviews.filter(r => r.status === 'approved');
  const pendingReviews = reviews.filter(r => r.status === 'pending').length;

  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0B1838] to-[#1855EA] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold text-blue-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Willkommen im Admin Dashboard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
            Dua &amp; Ari Gebäudereinigung
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl font-normal">
            Verwalten Sie alle eingehenden Kunden-Nachrichten, Angebote, Bewertungen und Kontakteinstellungen in Echtzeit.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('quotes')}
            className="bg-white text-[#1855EA] hover:bg-blue-50 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Offerten prüfen ({newQuotesCount(quotes)})</span>
          </button>
        </div>
      </div>

      {/* 7 Key Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Contact Messages */}
        <div 
          onClick={() => setActiveTab('messages')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Messages</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1855EA] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black font-display text-slate-900 leading-none mb-1">
              {totalMessages}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Gesamte Kontaktnachrichten
            </span>
          </div>
        </div>

        {/* Card 2: New / Unread Messages */}
        <div 
          onClick={() => setActiveTab('messages')}
          className="bg-white rounded-2xl p-5 border border-blue-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#1855EA] uppercase tracking-wider">Ungelesen / Neu</span>
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black font-display text-[#1855EA] leading-none mb-1">
              {unreadMessages}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Benötigen noch Antwort
            </span>
          </div>
        </div>

        {/* Card 3: Total Angebote / Quote Requests */}
        <div 
          onClick={() => setActiveTab('quotes')}
          className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Angebote</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black font-display text-slate-900 leading-none mb-1">
              {totalQuotes}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Offertenanfragen eingegangen
            </span>
          </div>
        </div>

        {/* Card 4: Pending Angebote */}
        <div 
          onClick={() => setActiveTab('quotes')}
          className="bg-white rounded-2xl p-5 border border-amber-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Offene Angebote</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black font-display text-amber-600 leading-none mb-1">
              {pendingQuotes}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              In Bearbeitung / Neu
            </span>
          </div>
        </div>

      </div>

      {/* 3 Additional Rating Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Rating Card 1: Average Rating */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Average Rating</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black font-display text-slate-900">{avgRating}</span>
              <div className="flex items-center text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
            </div>
            <span className="text-xs text-slate-500 mt-1 block">Aus {approvedReviews.length} verifizierten Kunden</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
            ★ 5.0
          </div>
        </div>

        {/* Rating Card 2: Total Reviews */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Ratings</span>
            <span className="text-3xl font-black font-display text-slate-900">{totalReviews}</span>
            <span className="text-xs text-slate-500 mt-1 block">Gesamte Kundenbewertungen</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1855EA] flex items-center justify-center">
            <Star className="w-6 h-6" />
          </div>
        </div>

        {/* Rating Card 3: Pending Reviews */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Ausstehende Freigaben</span>
            <span className="text-3xl font-black font-display text-purple-600">{pendingReviews}</span>
            <span className="text-xs text-slate-500 mt-1 block">Warten auf Modifikationen</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 2-Column Preview Grids: Recent Messages & Recent Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Preview: Recent Contact Messages */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#1855EA]" />
                <h3 className="text-base font-bold text-slate-900 font-display">Neueste Kontaktnachrichten</h3>
              </div>
              <button
                onClick={() => setActiveTab('messages')}
                className="text-xs font-bold text-[#1855EA] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Alle anzeigen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {messages.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Keine Kontaktnachrichten vorhanden.
              </div>
            ) : (
              <div className="space-y-3">
                {messages.slice(0, 4).map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => onOpenMessage(msg)}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/60 border border-slate-200/60 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-[#1855EA] transition-colors truncate">
                          {msg.name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {new Date(msg.created_at).toLocaleDateString('de-DE')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5 font-normal">
                        {msg.subject || msg.message}
                      </p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 uppercase ${
                      msg.status === 'new' ? 'bg-blue-600 text-white' :
                      msg.status === 'replied' ? 'bg-emerald-100 text-emerald-800' :
                      msg.status === 'read' ? 'bg-slate-200 text-slate-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Preview: Recent Angebote / Quote Requests */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900 font-display">Neueste Offertenanfragen</h3>
              </div>
              <button
                onClick={() => setActiveTab('quotes')}
                className="text-xs font-bold text-[#1855EA] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Alle anzeigen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {quotes.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                Keine Offertenanfragen vorhanden.
              </div>
            ) : (
              <div className="space-y-3">
                {quotes.slice(0, 4).map((q) => (
                  <div
                    key={q.id}
                    onClick={() => onOpenQuote(q)}
                    className="p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/60 transition-colors cursor-pointer flex items-center justify-between gap-3 group"
                  >
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                          {q.name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {q.square_meters} m² • {q.service}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate mt-0.5 font-normal">
                        Ort: {q.city} • Termin: {q.preferred_date || 'Flexibel'}
                      </p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 uppercase ${
                      q.status === 'new' ? 'bg-amber-500 text-white' :
                      q.status === 'quoted' ? 'bg-emerald-600 text-white' :
                      q.status === 'contacted' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

function newQuotesCount(quotes: QuoteRequestItem[]): number {
  return quotes.filter(q => q.status === 'new').length;
}
