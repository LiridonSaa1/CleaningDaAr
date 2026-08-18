import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, X, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { addReview } from '../lib/supabase';
import { Language } from '../types';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({ isOpen, onClose, lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Büroreinigung');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setIsSubmitting(true);

    await addReview({
      name: name.trim(),
      email: email.trim(),
      service: service,
      rating: rating,
      comment: comment.trim(),
      status: 'pending' // Submitted reviews require admin approval
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setComment('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5 font-sans"
        >
          <button
            onClick={handleResetAndClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <>
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {lang === 'de' ? 'Bewertung abgeben' : 'Write a Review'}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {lang === 'de' ? 'Teilen Sie Ihre Erfahrung mit Dua & Ari Gebäudereinigung' : 'Share your experience with Dua & Ari Cleaning'}
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'de' ? 'Ihr Name *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="z. B. Maria Müller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'de' ? 'E-Mail-Adresse (Optional)' : 'Email Address (Optional)'}
                  </label>
                  <input
                    type="email"
                    placeholder="maria@beispiel.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'de' ? 'Genutzte Reinigungsleistung' : 'Service Received'}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  >
                    <option value="Büroreinigung">Büro- & Gewerbereinigung</option>
                    <option value="Unterhaltsreinigung">Unterhaltsreinigung</option>
                    <option value="Fensterreinigung">Fenster- & Glasreinigung</option>
                    <option value="Grundreinigung">Grund- & Baureinigung</option>
                    <option value="Treppenhausreinigung">Treppenhausreinigung</option>
                    <option value="Sofareinigung">Polster- & Sofareinigung</option>
                  </select>
                </div>

                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    {lang === 'de' ? 'Sterne-Bewertung' : 'Rating'}
                  </label>
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star 
                          className={`w-7 h-7 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                        />
                      </button>
                    ))}
                    <span className="ml-3 font-bold text-slate-800 text-sm">{rating}.0 / 5.0</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {lang === 'de' ? 'Ihr Erfahrungsbericht *' : 'Your Review / Feedback *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={lang === 'de' ? 'Wie zufrieden waren Sie mit unserer Pünktlichkeit und Reinigungsqualität?' : 'How satisfied were you with our cleaning service?'}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA] leading-relaxed font-sans"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    {lang === 'de' ? 'Abbrechen' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>{lang === 'de' ? 'Wird gesendet...' : 'Submitting...'}</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>{lang === 'de' ? 'Bewertung absenden' : 'Submit Review'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 font-display">
                {lang === 'de' ? 'Vielen Dank für Ihre Bewertung!' : 'Thank you for your review!'}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed font-normal">
                {lang === 'de'
                  ? 'Ihre Bewertung wurde erfolgreich übermittelt und wird nach kurzer Prüfung durch unser Team freigeschaltet.'
                  : 'Your review was submitted successfully and will be published after a quick review.'}
              </p>
              <button
                onClick={handleResetAndClose}
                className="bg-[#1855EA] text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer hover:bg-[#1344C4] transition-colors"
              >
                {lang === 'de' ? 'Schließen' : 'Close'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
