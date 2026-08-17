import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';

export interface ToastProps {
  id?: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  customerName?: string;
  serviceType?: string;
  lang?: Language;
  duration?: number; // in milliseconds, default 6000
}

export const Toast: React.FC<ToastProps> = ({
  id = 'quote-confirmation-toast',
  isOpen,
  onClose,
  title,
  message,
  customerName,
  serviceType,
  lang = 'de',
  duration = 6000,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= step) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prev - step;
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, duration, onClose]);

  const defaultTitle = lang === 'de' ? 'Anfrage erfolgreich übermittelt!' : 'Quote Request Received!';
  const defaultMessage = lang === 'de'
    ? 'Vielen Dank für Ihr Vertrauen. Unser Team prüft Ihre Angaben und meldet sich innerhalb von 2–4 Stunden mit einem Festpreis-Angebot.'
    : 'Thank you for reaching out. Our team is reviewing your details and will get back to you within 2–4 hours with a fixed-price quote.';

  return (
    <div
      id={`${id}-container`}
      className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 max-w-md w-[calc(100vw-2.5rem)] sm:w-full pointer-events-none"
      role="region"
      aria-label="Notification"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: -24, scale: 0.94, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -16, scale: 0.94, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="pointer-events-auto overflow-hidden rounded-2xl bg-white/92 backdrop-blur-xl border border-white/80 shadow-2xl shadow-slate-900/15 p-4 sm:p-5 relative"
            style={{
              boxShadow: '0 20px 40px -15px rgba(2, 132, 199, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.9), 0 8px 16px -4px rgba(15, 23, 42, 0.08)'
            }}
          >
            {/* Top Cyan/Emerald Ambient Glow bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500" />

            <div className="flex items-start gap-3.5 pt-0.5">
              {/* Icon badge */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/25">
                <CheckCircle className="w-5 h-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-sm font-extrabold text-slate-900 leading-tight tracking-tight">
                    {title || defaultTitle}
                  </h4>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100/90 text-cyan-800 tracking-wide">
                    <Sparkles className="w-2.5 h-2.5 text-cyan-600" />
                    {lang === 'de' ? 'Eingegangen' : 'Received'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                  {message || (
                    customerName ? (
                      lang === 'de' ? (
                        <>
                          Vielen Dank, <span className="font-semibold text-slate-800">{customerName}</span>! Ihre Anfrage für{' '}
                          <span className="font-semibold text-cyan-700">{serviceType || 'unsere Leistungen'}</span> ist bei uns eingegangen.
                        </>
                      ) : (
                        <>
                          Thank you, <span className="font-semibold text-slate-800">{customerName}</span>! Your request for{' '}
                          <span className="font-semibold text-cyan-700">{serviceType || 'our services'}</span> has been received.
                        </>
                      )
                    ) : defaultMessage
                  )}
                </p>

                {/* Sub-info Badge: Response time & guarantee */}
                <div className="flex items-center gap-3 pt-1 border-t border-slate-100 text-[11px] text-slate-500 flex-wrap">
                  <span className="inline-flex items-center gap-1 text-sky-700 font-medium">
                    <Clock className="w-3 h-3" />
                    {lang === 'de' ? 'Antwortzeit: ~2-4 Std.' : 'Response time: ~2-4 hrs'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                    <ShieldCheck className="w-3 h-3" />
                    {lang === 'de' ? 'Unverbindlich' : 'Non-binding'}
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                id="toast-close-button"
                type="button"
                onClick={onClose}
                aria-label={lang === 'de' ? 'Benachrichtigung schließen' : 'Dismiss notification'}
                className="absolute top-3 right-3 w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Countdown Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-sky-500 transition-all duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
