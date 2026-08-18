import React, { useState, useMemo } from 'react';
import { 
  Star, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  X, 
  MessageSquare,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { ReviewItem, addReview, updateReview, deleteReview } from '../../lib/supabase';

interface AdminReviewsProps {
  reviews: ReviewItem[];
  refreshData: () => void;
}

export const AdminReviews: React.FC<AdminReviewsProps> = ({ reviews, refreshData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all');
  
  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalReview, setEditModalReview] = useState<ReviewItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Büroreinigung',
    rating: 5,
    comment: '',
    status: 'approved' as 'pending' | 'approved' | 'rejected'
  });

  // Calculate statistics
  const totalReviews = reviews.length;
  const approvedCount = reviews.filter(r => r.status === 'approved').length;
  const pendingCount = reviews.filter(r => r.status === 'pending').length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  // Filter & Search
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const matchesFilter = statusFilter === 'all' || r.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        r.name.toLowerCase().includes(q) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.service && r.service.toLowerCase().includes(q)) ||
        r.comment.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [reviews, statusFilter, searchQuery]);

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      service: 'Gebäudereinigung',
      rating: 5,
      comment: '',
      status: 'approved'
    });
    setAddModalOpen(true);
  };

  const handleOpenEditModal = (review: ReviewItem) => {
    setEditModalReview(review);
    setFormData({
      name: review.name,
      email: review.email || '',
      service: review.service || 'Gebäudereinigung',
      rating: review.rating,
      comment: review.comment,
      status: review.status
    });
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.comment.trim()) return;

    await addReview(formData);
    setAddModalOpen(false);
    refreshData();
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalReview || !formData.name.trim() || !formData.comment.trim()) return;

    await updateReview(editModalReview.id, formData);
    setEditModalReview(null);
    refreshData();
  };

  const handleToggleStatus = async (id: string, newStatus: ReviewItem['status']) => {
    await updateReview(id, { status: newStatus });
    refreshData();
  };

  const handleDelete = async (id: string) => {
    await deleteReview(id);
    setDeleteConfirmId(null);
    refreshData();
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Summary Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex flex-col items-center justify-center font-bold shadow-xs">
            <span className="text-2xl font-black font-display leading-none">{avgRating}</span>
            <div className="flex items-center text-amber-400 mt-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">Kundenbewertungen &amp; Sterne</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Insgesamt {totalReviews} Bewertungen ({approvedCount} freigegeben, {pendingCount} ausstehend). Nur freigegebene Bewertungen werden öffentlich im Carousel angezeigt.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Manuell Bewertung hinzufügen</span>
        </button>
      </div>

      {/* Filter Bar & Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Alle Bewertungen' },
            { id: 'approved', label: 'Freigegeben (Approved)' },
            { id: 'pending', label: 'Ausstehend (Pending)' },
            { id: 'rejected', label: 'Abgelehnt (Rejected)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === tab.id
                  ? 'bg-amber-500 text-white shadow-xs'
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
            placeholder="Bewertungen suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

      </div>

      {/* Reviews Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4">Kunde &amp; Service</th>
                <th className="p-4">Sterne-Bewertung</th>
                <th className="p-4">Kommentar / Erfahrungsbericht</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 font-medium">
                    Keine Bewertungen in dieser Ansicht gefunden.
                  </td>
                </tr>
              ) : (
                filteredReviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Customer */}
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{rev.name}</div>
                      <div className="text-[11px] text-[#1855EA] font-medium">{rev.service}</div>
                      {rev.email && <div className="text-[10px] text-slate-400">{rev.email}</div>}
                    </td>

                    {/* Rating */}
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                          />
                        ))}
                        <span className="ml-1 font-bold text-slate-900">{rev.rating}.0</span>
                      </div>
                    </td>

                    {/* Comment */}
                    <td className="p-4 max-w-sm">
                      <p className="text-slate-700 leading-relaxed italic text-xs font-normal">
                        "{rev.comment}"
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase ${
                        rev.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        rev.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {rev.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleToggleStatus(rev.id, 'approved')}
                            title="Freigeben (Approve)"
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {rev.status !== 'rejected' && (
                          <button
                            onClick={() => handleToggleStatus(rev.id, 'rejected')}
                            title="Ablehnen (Reject)"
                            className="p-2 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEditModal(rev)}
                          title="Bearbeiten"
                          className="p-2 rounded-lg bg-blue-50 text-[#1855EA] hover:bg-[#1855EA] hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(rev.id)}
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

      {/* ADD / EDIT REVIEW MODAL */}
      {(addModalOpen || editModalReview) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 relative">
            <button
              onClick={() => {
                setAddModalOpen(false);
                setEditModalReview(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {addModalOpen ? 'Bewertung manuell hinzufügen' : 'Bewertung bearbeiten'}
                </h3>
                <span className="text-xs text-slate-500">Vergeben Sie Namen, Sterne und Erfahrungsbericht</span>
              </div>
            </div>

            <form onSubmit={addModalOpen ? handleSaveAdd : handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kundenname *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="z. B. Dr. Markus Weber"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Service / Dienstleistung
                  </label>
                  <input
                    type="text"
                    placeholder="z. B. Büroreinigung"
                    value={formData.service}
                    onChange={(e) => setFormData(prev => ({ ...prev, service: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Sterne-Bewertung (1–5 Sterne)
                </label>
                <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star 
                        className={`w-7 h-7 ${star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                      />
                    </button>
                  ))}
                  <span className="ml-3 font-bold text-slate-800 text-sm">{formData.rating}.0 / 5.0</span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kommentar / Erfahrungsbericht *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Geben Sie hier den Erfahrungstext des Kunden ein..."
                  value={formData.comment}
                  onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed font-sans"
                />
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Freigabestatus
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="approved">Freigegeben (Approved – ÖFFENTLICH SHFAQTET)</option>
                  <option value="pending">Ausstehend (Pending)</option>
                  <option value="rejected">Abgelehnt (Rejected)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setAddModalOpen(false);
                    setEditModalReview(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {addModalOpen ? 'Bewertung speichern' : 'Änderungen speichern'}
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
            <h4 className="text-base font-bold text-slate-900">Bewertung wirklich löschen?</h4>
            <p className="text-xs text-slate-500">Diese Bewertung wird dauerhaft entfernt.</p>
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
