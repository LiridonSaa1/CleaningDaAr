import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Shield, Lock, Mail, Sparkles, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

interface AdminLoginProps {
  onGoToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onGoToWebsite }) => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    const res = await login(email, password);

    if (!res.success) {
      setErrorMessage(res.error || 'Anmeldung fehlgeschlagen. Bitte prüfen Sie Ihre Anmeldedaten.');
      setIsSubmitting(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@duaari-gebaeudereinigung.de');
    setPassword('Admin123!');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#0B1838] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#1855EA]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1855EA] to-[#0084FF] text-white flex items-center justify-center mx-auto mb-4 shadow-xl border border-white/20">
            <Sparkles className="w-8 h-8 stroke-[2.2]" />
          </div>
          <span className="text-xs font-bold text-blue-300 uppercase tracking-widest block mb-1">
            Dua &amp; Ari Gebäudereinigung
          </span>
          <h1 className="text-3xl font-black font-display tracking-tight text-white">
            Admin Panel Login
          </h1>
          <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto font-normal">
            Geschützter Verwaltungsbereich für Kundennachrichten, Angebote &amp; Bewertungen.
          </p>
        </div>

        {/* Login Card Container */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {/* Status Pills */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Geschützter Admin-Zugang</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              isSupabaseConfigured ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
            }`}>
              {isSupabaseConfigured ? 'Supabase Connected' : 'Demo Offline Mode'}
            </span>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                {errorMessage}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                Admin E-Mail-Adresse
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="admin@duaari-gebaeudereinigung.de"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1855EA] focus:border-transparent transition-all"
                />
                <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
                Passwort
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900/60 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1855EA] focus:border-transparent transition-all"
                />
                <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 disabled:opacity-50 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <span>Anmeldung wird geprüft...</span>
              ) : (
                <>
                  <span>Als Admin anmelden</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          {!isSupabaseConfigured && (
            <div className="mt-6 pt-4 border-t border-white/10 text-center">
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs text-blue-300 hover:text-white underline cursor-pointer inline-flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Demo Admin-Zugangsdaten einfügen</span>
              </button>
            </div>
          )}
        </div>

        {/* Back to main website link */}
        <div className="text-center mt-6">
          <button
            onClick={onGoToWebsite}
            className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Zurück zur Haupt-Website
          </button>
        </div>

      </div>
    </div>
  );
};
