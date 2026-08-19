import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Save, 
  RefreshCw, 
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AboutFeatureItem, getAboutFeatures, updateAboutFeature } from '../../lib/supabase';

interface AdminAboutFeaturesProps {
  refreshData: () => void;
}

export const AdminAboutFeatures: React.FC<AdminAboutFeaturesProps> = ({ refreshData }) => {
  const [features, setFeatures] = useState<AboutFeatureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string>('best-result');
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<AboutFeatureItem>>({
    title_de: '',
    title_en: '',
    description_de: '',
    description_en: '',
    badge_de: '',
    badge_en: '',
    image: '',
  });

  // AI Prompt State
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  const fetchFeatures = async () => {
    setLoading(true);
    try {
      const data = await getAboutFeatures(true);
      setFeatures(data);
      // Select the first feature
      const current = data.find(f => f.id === activeCardId) || data[0];
      if (current) {
        selectFeature(current);
      }
    } catch (e) {
      console.error('Error fetching about features:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const selectFeature = (feature: AboutFeatureItem) => {
    setActiveCardId(feature.id);
    setFormData({
      title_de: feature.title_de,
      title_en: feature.title_en,
      description_de: feature.description_de,
      description_en: feature.description_en,
      badge_de: feature.badge_de || '',
      badge_en: feature.badge_en || '',
      image: feature.image,
    });
    // Set a good default AI prompt for image generation
    setAiPrompt(`professional cleaning service, ${feature.title_de}, bright modern interior, high quality photo, 8k resolution`);
  };

  const handleCardSwitch = (id: string) => {
    const feature = features.find(f => f.id === id);
    if (feature) {
      selectFeature(feature);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title_de || !formData.image) return;

    try {
      await updateAboutFeature(activeCardId, formData);
      setSaveSuccess('Vorteil erfolgreich aktualisiert!');
      setTimeout(() => setSaveSuccess(null), 3000);
      fetchFeatures();
      refreshData();
    } catch (err) {
      console.error('Error updating feature:', err);
    }
  };

  const generateAiImage = async () => {
    if (!aiPrompt.trim()) return;
    setAiGenerating(true);

    try {
      // Clean and sanitize prompt for URL
      const cleanPrompt = aiPrompt
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s,.-]/g, '') // remove special characters
        .replace(/\s+/g, '_'); // replace spaces with underscores

      const randomSeed = Math.floor(Math.random() * 1000000);
      const url = `https://image.pollinations.ai/p/${cleanPrompt}?width=800&height=1000&seed=${randomSeed}`;
      
      // Update form state with the Pollinations AI URL
      setFormData(prev => ({ ...prev, image: url }));
      
      setSaveSuccess('KI-Bild erfolgreich generiert! Klicken Sie unten auf "Speichern" um es zu sichern.');
      setTimeout(() => setSaveSuccess(null), 5000);
    } catch (e) {
      console.error('Error generating AI image:', e);
    } finally {
      setAiGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[300px]">
        <div className="flex items-center gap-3 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Vorteile laden...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans p-2">
      {/* Tab Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Vorteile &amp; About verwalten</h1>
          <p className="text-sm text-slate-500 mt-1">
            Passen Sie die 4 Vorteile auf der Landingpage an und generieren Sie passende Bilder mit künstlicher Intelligenz (KI).
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-emerald-800 text-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{saveSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Select Feature Card */}
        <div className="lg:col-span-4 space-y-3">
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Vorteilskarte Auswählen
          </label>
          <div className="space-y-2.5">
            {features.map((f) => {
              const isActive = activeCardId === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => handleCardSwitch(f.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                    isActive
                      ? 'bg-blue-50 border-[#1855EA] ring-1 ring-[#1855EA] shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100/50 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-[#1855EA]" />
                  </div>
                  <div className="truncate">
                    <h3 className="font-semibold text-slate-900 text-sm">{f.title_de}</h3>
                    <span className="text-xs text-slate-400 truncate block">{f.description_de}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Real-time Status Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mt-6 space-y-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">💡 Info zur KI-Generierung</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dank der Integration von <strong>Pollinations AI</strong> können Sie Bilder direkt über einen Text-Prompt generieren lassen.
              Der Prompt wird automatisch auf Basis des Titels empfohlen, kann aber von Ihnen frei angepasst werden.
            </p>
          </div>
        </div>

        {/* Right Side: Edit Form & AI generator */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Form Header */}
            <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">
                ID: {activeCardId}
              </span>
              <span className="text-xs text-slate-500">Kartenbereich bearbeiten</span>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Titles DE & EN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Titel (Deutsch)</label>
                  <input
                    type="text"
                    name="title_de"
                    value={formData.title_de || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Titel (Englisch)</label>
                  <input
                    type="text"
                    name="title_en"
                    value={formData.title_en || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Badges DE & EN */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Abzeichen / Badge (Deutsch)</label>
                  <input
                    type="text"
                    name="badge_de"
                    value={formData.badge_de || ''}
                    onChange={handleInputChange}
                    placeholder="z.B. Beste Ergebnisse & Glanz"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Abzeichen / Badge (Englisch)</label>
                  <input
                    type="text"
                    name="badge_en"
                    value={formData.badge_en || ''}
                    onChange={handleInputChange}
                    placeholder="z.B. Best Results & Shine"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Descriptions DE & EN */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Beschreibung (Deutsch)</label>
                  <textarea
                    name="description_de"
                    value={formData.description_de || ''}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Beschreibung (Englisch)</label>
                  <textarea
                    name="description_en"
                    value={formData.description_en || ''}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Image Input & Preview with AI Generator Grid */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-4">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  Bild &amp; KI-Generator
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left Column: Image URL & AI Prompt Input */}
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Bild-URL</label>
                      <input
                        type="url"
                        name="image"
                        value={formData.image || ''}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-slate-200">
                      <label className="text-xs font-bold text-blue-700 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                        KI-Bildgenerator Prompt
                      </label>
                      <textarea
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="Was soll auf dem Bild sein?"
                        rows={2}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={generateAiImage}
                      disabled={aiGenerating || !aiPrompt.trim()}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 disabled:opacity-50 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      {aiGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Generiere KI-Bild...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>KI-Bild generieren</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right Column: Live Preview */}
                  <div className="flex flex-col items-center justify-center border border-slate-200 rounded-lg bg-white overflow-hidden min-h-[180px] p-2 relative">
                    {formData.image ? (
                      <div className="w-full h-full relative flex flex-col items-center">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-36 object-cover rounded-md shadow-xs select-none"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <span className="text-[10px] text-slate-400 mt-2 truncate max-w-full">
                          {formData.image.startsWith('https://image.pollinations.ai') 
                            ? '✨ Generiertes KI-Bild' 
                            : '🔗 Externes Bild'}
                        </span>
                      </div>
                    ) : (
                      <div className="text-center text-slate-400 p-4 space-y-1">
                        <ImageIcon className="w-8 h-8 mx-auto stroke-[1.5]" />
                        <span className="text-xs block">Kein Bild geladen</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Form Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-[#1855EA] hover:bg-[#1242be] active:scale-95 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Änderungen speichern</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
