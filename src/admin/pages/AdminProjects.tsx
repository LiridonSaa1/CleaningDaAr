import React, { useState, useMemo } from 'react';
import { 
  Image as ImageIcon, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  MapPin,
  TrendingUp,
  Layers
} from 'lucide-react';
import { ProjectDbItem, addProject, updateProject, deleteProject } from '../../lib/supabase';

interface AdminProjectsProps {
  projects: ProjectDbItem[];
  refreshData: () => void;
}

export const AdminProjects: React.FC<AdminProjectsProps> = ({ projects, refreshData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalProject, setEditModalProject] = useState<ProjectDbItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    subtitle: '',
    category: 'Büroreinigung',
    before_img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    after_img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    metrics_label: 'Glanzgrad & Hygiene',
    metrics_value: '100% Wiederhergestellt',
    description: ''
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      return (
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [projects, searchQuery]);

  const handleOpenAddModal = () => {
    setFormData({
      id: `case-${Date.now()}`,
      title: '',
      subtitle: 'Objekt Ingolstadt – 250 m²',
      category: 'Büroreinigung',
      before_img: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
      after_img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      metrics_label: 'Ergebnis',
      metrics_value: '100% Sauber',
      description: ''
    });
    setAddModalOpen(true);
  };

  const handleOpenEditModal = (proj: ProjectDbItem) => {
    setEditModalProject(proj);
    setFormData({
      id: proj.id,
      title: proj.title,
      subtitle: proj.subtitle || '',
      category: proj.category,
      before_img: proj.before_img,
      after_img: proj.after_img,
      metrics_label: proj.metrics_label || '',
      metrics_value: proj.metrics_value || '',
      description: proj.description || ''
    });
  };

  const handleSaveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.before_img.trim() || !formData.after_img.trim()) return;

    await addProject({
      id: formData.id.trim().toLowerCase().replace(/\s+/g, '-'),
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      category: formData.category.trim(),
      before_img: formData.before_img.trim(),
      after_img: formData.after_img.trim(),
      metrics_label: formData.metrics_label.trim(),
      metrics_value: formData.metrics_value.trim(),
      description: formData.description.trim(),
      sort_order: projects.length + 1
    });

    setAddModalOpen(false);
    refreshData();
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editModalProject || !formData.title.trim()) return;

    await updateProject(editModalProject.id, {
      title: formData.title.trim(),
      subtitle: formData.subtitle.trim(),
      category: formData.category.trim(),
      before_img: formData.before_img.trim(),
      after_img: formData.after_img.trim(),
      metrics_label: formData.metrics_label.trim(),
      metrics_value: formData.metrics_value.trim(),
      description: formData.description.trim()
    });

    setEditModalProject(null);
    refreshData();
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    setDeleteConfirmId(null);
    refreshData();
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold text-[#1855EA] uppercase tracking-wider block">
            DYNAMISCHE GALERIE &amp; REFERENZEN
          </span>
          <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
            Galerie &amp; Vorher-Nachher Projekte ({projects.length})
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xl font-normal">
            Verwalten Sie Vorher-Nachher Bilder und Referenzobjekte für die Galerie-Sektion auf der Website.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Neues Projekt hinzufügen</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Projekte suchen (Titel, Ort, Kategorie)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <div 
            key={proj.id} 
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
          >
            <div>
              {/* Dual Image Preview Header (Before vs After) */}
              <div className="relative h-48 grid grid-cols-2 gap-0.5 bg-slate-200 overflow-hidden">
                <div className="relative h-full overflow-hidden">
                  <img src={proj.before_img} alt="Before" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">Vorher</span>
                </div>
                <div className="relative h-full overflow-hidden">
                  <img src={proj.after_img} alt="After" className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">Nachher</span>
                </div>
              </div>

              {/* Project Info Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#1855EA] uppercase bg-blue-50 px-2.5 py-1 rounded-md">
                    {proj.category}
                  </span>
                  {proj.metrics_value && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {proj.metrics_value}
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900 font-display">{proj.title}</h4>
                  {proj.subtitle && <p className="text-xs text-slate-500 mt-0.5 font-medium">{proj.subtitle}</p>}
                </div>

                {proj.description && (
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 font-normal">
                    {proj.description}
                  </p>
                )}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400">ID: {proj.id}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(proj)}
                  className="p-2 rounded-lg bg-blue-50 text-[#1855EA] hover:bg-[#1855EA] hover:text-white transition-colors cursor-pointer"
                  title="Bearbeiten"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(proj.id)}
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

      {/* ADD / EDIT PROJECT MODAL */}
      {(addModalOpen || editModalProject) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setAddModalOpen(false);
                setEditModalProject(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1855EA] flex items-center justify-center font-bold">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {addModalOpen ? 'Neues Projekt hinzufügen' : 'Projekt bearbeiten'}
                </h3>
                <span className="text-xs text-slate-500">Vorher / Nachher Vergleichsbilder für die Galerie</span>
              </div>
            </div>

            <form onSubmit={addModalOpen ? handleSaveAdd : handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Projekttitel *
                </label>
                <input
                  type="text"
                  required
                  placeholder="z. B. Büroboden Tiefenreinigung"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Untertitel / Ort
                  </label>
                  <input
                    type="text"
                    placeholder="z. B. Kanzlei Ingolstadt – 320 m²"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Kategorie
                  </label>
                  <input
                    type="text"
                    placeholder="z. B. Büroreinigung, Glasreinigung"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Vorher-Bild (Before Image URL) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.before_img}
                    onChange={(e) => setFormData(prev => ({ ...prev, before_img: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nachher-Bild (After Image URL) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.after_img}
                    onChange={(e) => setFormData(prev => ({ ...prev, after_img: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ergebnis-Label
                  </label>
                  <input
                    type="text"
                    placeholder="z. B. Glanzgrad &amp; Hygiene"
                    value={formData.metrics_label}
                    onChange={(e) => setFormData(prev => ({ ...prev, metrics_label: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Ergebnis-Wert
                  </label>
                  <input
                    type="text"
                    placeholder="z. B. 100% Wiederhergestellt"
                    value={formData.metrics_value}
                    onChange={(e) => setFormData(prev => ({ ...prev, metrics_value: e.target.value }))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Beschreibung
                </label>
                <textarea
                  rows={3}
                  placeholder="Geben Sie Details zur Reinigungsmethode ein..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setAddModalOpen(false);
                    setEditModalProject(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  {addModalOpen ? 'Projekt speichern' : 'Änderungen speichern'}
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
            <h4 className="text-base font-bold text-slate-900">Projekt wirklich löschen?</h4>
            <p className="text-xs text-slate-500">Dieses Referenzprojekt wird aus der Galerie auf der Website entfernt.</p>
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
