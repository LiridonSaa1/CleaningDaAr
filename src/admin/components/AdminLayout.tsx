import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Mail, 
  FileText, 
  Star, 
  Settings, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Shield, 
  Sparkles,
  Database,
  Send
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AdminTab } from '../types';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminLayoutProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  onGoToWebsite: () => void;
  unreadMessagesCount: number;
  newQuotesCount: number;
  pendingReviewsCount: number;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  setActiveTab,
  onGoToWebsite,
  unreadMessagesCount,
  newQuotesCount,
  pendingReviewsCount,
  children
}) => {
  const { user, logout } = useAdminAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard' as AdminTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 0
    },
    {
      id: 'messages' as AdminTab,
      label: 'Kontakt-Nachrichten',
      icon: Mail,
      badge: unreadMessagesCount
    },
    {
      id: 'quotes' as AdminTab,
      label: 'Angebote & Anfragen',
      icon: FileText,
      badge: newQuotesCount
    },
    {
      id: 'services' as AdminTab,
      label: 'Dienstleistungen / Services',
      icon: Sparkles,
      badge: 0
    },
    {
      id: 'projects' as AdminTab,
      label: 'Galerie & Referenzen',
      icon: Send,
      badge: 0
    },
    {
      id: 'reviews' as AdminTab,
      label: 'Bewertungen & Sterne',
      icon: Star,
      badge: pendingReviewsCount
    },
    {
      id: 'settings' as AdminTab,
      label: 'Website Einstellungen',
      icon: Settings,
      badge: 0
    }
  ];

  const handleTabClick = (tab: AdminTab) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col lg:flex-row">
      
      {/* Mobile Header Bar */}
      <div className="lg:hidden bg-[#0B1838] text-white px-4 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1855EA] flex items-center justify-center text-white">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-bold font-display text-base tracking-tight text-white">
            Cleanza Admin
          </span>
        </div>

        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0B1838] text-white flex flex-col justify-between transition-transform duration-300 transform ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:static lg:z-auto shadow-2xl lg:shadow-none`}
      >
        <div>
          {/* Sidebar Header Brand */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1855EA] to-[#0084FF] flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg text-white leading-none tracking-tight">
                  CLEANZA
                </span>
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mt-1">
                  Management Panel
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#1855EA] text-white shadow-md translate-x-1'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'text-white' : 'text-blue-300'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white text-[#1855EA]' : 'bg-[#1855EA] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Info & Status */}
        <div className="p-4 border-t border-white/10 space-y-3">
          {/* Status Badges */}
          <div className="bg-white/5 rounded-xl p-3 space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                Supabase DB
              </span>
              <span className={`font-bold px-1.5 py-0.2 rounded text-[9px] ${
                isSupabaseConfigured ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
              }`}>
                {isSupabaseConfigured ? 'Verbunden' : 'Mock Mode'}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-blue-400" />
                Brevo Email
              </span>
              <span className="font-bold px-1.5 py-0.2 rounded text-[9px] bg-blue-500/20 text-blue-300">
                Bereit
              </span>
            </div>
          </div>

          {/* User Email & Logout Button */}
          <div className="flex items-center justify-between pt-1">
            <div className="overflow-hidden mr-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Angemeldet als</span>
              <span className="text-xs font-bold text-white truncate block">{user?.email || 'admin@duaari.de'}</span>
            </div>
            <button
              onClick={() => logout()}
              title="Abmelden"
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-300 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Right Content Panel */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar */}
        <header className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div>
            <span className="text-[11px] font-bold text-[#1855EA] uppercase tracking-wider block">
              Dua &amp; Ari Gebäudereinigung • Admin Control
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-display capitalize mt-0.5">
              {activeTab === 'dashboard' && 'Dashboard Overview'}
              {activeTab === 'messages' && 'Kontakt-Nachrichten'}
              {activeTab === 'quotes' && 'Angebote & Offerten-Anfragen'}
              {activeTab === 'services' && 'Dienstleistungen & Reinigungs-Services'}
              {activeTab === 'projects' && 'Galerie & Referenz-Projekte'}
              {activeTab === 'reviews' && 'Bewertungen & Kundenerfahrungen'}
              {activeTab === 'settings' && 'Website Kontakteinstellungen'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToWebsite}
              className="inline-flex items-center gap-2 bg-[#F0F5FF] hover:bg-[#E0ECFF] text-[#1855EA] text-xs font-bold px-4 py-2.5 rounded-xl border border-blue-100 transition-colors cursor-pointer shadow-xs whitespace-nowrap"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Zur Haupt-Website</span>
            </button>
          </div>
        </header>

        {/* Dynamic Page Tab Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-8xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
