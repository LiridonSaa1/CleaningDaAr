import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Image as ImageIcon,
  Tag,
  DollarSign,
  List
} from 'lucide-react';
import { ServiceDbItem, addService, updateService, deleteService } from '../../lib/supabase';

interface AdminServicesProps {
  services: ServiceDbItem[];
  refreshData: () => void;
}

export const AdminServices: React.FC<AdminServicesProps> = ({ services, refreshData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalService, setEditModalService] = useState<ServiceDbItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title_de: '',
    title_en: '',
    category: 'residential',
    badge: 'Empfohlen',
    price_from: 'ab 28,00 € / Std.',
    short_desc_de: '',
    short_desc_en: '',
    full_desc: '',
    icon_name: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
    checklistText: '',
    benefitsText: ''
  });

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        s.title_de.toLowerCase().includes(q) ||
        (s.title_en && s.title_en.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q) ||
        s.short_desc_de.toLowerCase().includes(q)
      );
    });
  }, [services, searchQuery]);

  const handleOpenAddModal = () => {
    setFormData({
      id: `service-${Date.now()}`,
      title_de: '',
      title_en: '',
      category: 'residential',
      badge: 'Empfohlen',
      price_from: 'ab 28,00 € / Std.',
      short_desc_de: '',
      short_desc_en: '',
      full_desc: '',
      icon_name: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
      checklistText: 'Staub- und Feuchtreinigung\nSaugen und Wischen aller Böden\nSanitärdesinfektion',
      benefitsText: 'Feste Reinigungsteams\nFlexible Einsatzzeiten'
    });
    setAddModalOpen(true);
  };

  const handleOpenEditModal = (srv: ServiceDbItem) => {
    setEditModalService(srv);
    setFormData({
      id: srv.id,
      title_de: srv.title_de,
      title_en: srv.title_en || srv.title_de,
      category: srv.category,
      badge: srv.badge || '',
      price_from: srv.price_from || '',
      short_desc_de: srv.short_desc_de,
      short_desc_en: srv.short_desc_en || srv.short_desc_de,
      full_desc: srv.full_desc || '',
      icon_name: srv.icon_name || 'Sparkles',
      image: srv.image,
      checklistText: (srv.checklist || []).join('\n'),
      benefitsText: (srv.benefits || []).join('\n')
    });
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title_de.trim() || !formData.short_desc_de.trim()) return;

    const checklistArr = formData.checklistText.split('\n').map(s => s.trim()).filter(Boolean);
    const benefitsArr = formData.benefitsText.split('\n').map(s => s.trim()).filter(Boolean);

    await addService({
      id: formData.id.trim().toLowerCase().replace(/\s+/g, '-'),
      title_de: formData.title_de.trim(),
      title_en: formData.title_en.trim() || formData.title_de.trim(),
      category: formData.category,
      badge: formData.badge.trim(),
      price_from: formData.price_from.trim(),
      short_desc_de: formData.short_desc_de.trim(),
      short_desc_en: formData.short_desc_en.trim() || formData.short_desc_de.trim(),
      full_desc: formData.full_desc.trim(),
      icon_name: formData.icon_name,
      image: formData.image.trim(),
      checklist: checklistArr,
      benefits: benefitsArr,
      sort_order: services.length + 1
    });

    setAddModalOpen(false);
    refreshData();
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalService || !formData.title_de.trim() || !formData.short_desc_de.trim()) return;

    const checklistArr = formData.checklistText.split('\n').map(s => s.trim()).filter(Boolean);
    const benefitsArr = formData.benefitsText.split('\n').map(s => s.trim()).filter(Boolean);

    await updateService(editModalService.id, {
      title_de: formData.title_de.trim(),
      title_en: formData.title_en.trim() || formData.title_de.trim(),
      category: formData.category,
      badge: formData.badge.trim(),
      price_from: formData.price_from.trim(),
      short_desc_de: formData.short_desc_de.trim(),
      short_desc_en: formData.short_desc_en.trim() || formData.short_desc_de.trim(),
      full_desc: formData.full_desc.trim(),
      icon_name: formData.icon_name,
      image: formData.image.trim(),
      checklist: checklistArr,
      benefits: benefitsArr
    });

    setEditModalService(null);
    refreshData();
  };

  const handleDelete = async (id: string) => {
    await deleteService(id);
    setDeleteConfirmId(null);
    refreshData();
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold text-[#1855EA] uppercase tracking-wider block">
            DYNAMISCHE REINIGUNGSLEISTUNGEN
          </span>
          <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
            Dienstleistungen &amp; Services ({services.length})
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl font-normal">
            Verwalten Sie alle Angebote &amp; Leistungen der Website. Änderungen werden in Supabase gespeichert und direkt in den Services-Karten shfaqen.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Neuen Service hinzufügen</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Leistungen suchen (Titel, Kategorie)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((srv) => (
          <div 
            key={srv.id} 
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div>
              {/* Image Preview Header */}
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img 
                  src={srv.image} 
                  alt={srv.title_de} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                {srv.badge && (
                  <span className="absolute top-3 left-3 bg-[#1855EA] text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs uppercase">
                    {srv.badge}
                  </span>
                )}

                <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {srv.price_from || 'Auf Anfrage'}
                </span>
              </div>

              {/* Service Info Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 font-display">{srv.title_de}</h4>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase bg-slate-100 px-2 py-0.5 rounded">
                    {srv.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                  {srv.short_desc_de}
                </p>

                {/* Checklist Bullet preview */}
                {srv.checklist && srv.checklist.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Checkliste:</span>
                    {srv.checklist.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">ID: {srv.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(srv)}
                  className="p-2 rounded-lg bg-blue-50 text-[#1855EA] hover:bg-[#1855EA] hover:text-white transition-colors cursor-pointer"
                  title="Bearbeiten"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(srv.id)}
                  className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                  title="Löschen"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* ADD / EDIT SERVICE MODAL */}
      {(addModalOpen || editModalService) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setAddModalOpen(false);
                setEditModalService(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1855EA] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {addModalOpen ? 'Neuen Service hinzufügen' : 'Service bearbeiten'}
                </h3>
                <span className="text-xs text-slate-500">Geben Sie alle Produktdetails und Bilder für die Website an</span>
              </div>
            </div>

            <form onSubmit={addModalOpen ? handleSaveAdd : handleSaveEdit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Titel (Deutsch) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="z. B. Büro- &amp; Gewerbereinigung"
                    value={formData.title_de}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_de: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Titel (Englisch)
                  </label>
                  <input
                    type="text"
                    placeholder="z. B. Office & Commercial Cleaning"
                    value={formData.title_en}
                    onChange={(e) => setFormData(prev => ({ ...prev, title_en: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kategorie
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  >
                    <option value="residential">Privat (residential)</option>
                    <option value="commercial">Gewerbe (commercial)</option>
                    <option value="special">Spezial (special)</option>
                    <option value="construction">Baureinigung (construction)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    placeholder="z. B. Empfohlen, Streifenfrei"
                    value={formData.badge}
                    onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Preis ab
                  </label>
                  <input
                    type="text"
                    placeholder="z. B. ab 28,00 € / Std."
                    value={formData.price_from}
                    onChange={(e) => setFormData(prev => ({ ...prev, price_from: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bild URL (Unsplash oder Asset Path) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Kurzbeschreibung (Deutsch) *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Geben Sie eine prägnante Vorschau der Dienstleistung ein..."
                  value={formData.short_desc_de}
                  onChange={(e) => setFormData(prev => ({ ...prev, short_desc_de: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Checkliste (1 Punkt pro Rresht)
                </label>
                <textarea
                  rows={4}
                  placeholder="Punkt 1&#10;Punkt 2&#10;Punkt 3"
                  value={formData.checklistText}
                  onChange={(e) => setFormData(prev => ({ ...prev, checklistText: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setAddModalOpen(false);
                    setEditModalService(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {addModalOpen ? 'Service speichern' : 'Änderungen speichern'}
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
            <h4 className="text-base font-bold text-slate-900">Service wirklich löschen?</h4>
            <p className="text-xs text-slate-500">Diese Dienstleistung wird auch von der öffentlichen Website entfernt.</p>
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
