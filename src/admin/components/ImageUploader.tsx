import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, Check, RefreshCw } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  required?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  required = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Convert local image file to base64 Data URL for instant rendering & saving
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-2 font-sans">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-bold text-[#1855EA] hover:underline cursor-pointer"
        >
          {showUrlInput ? '← Datei hochladen' : 'Oder Bild-URL eingeben'}
        </button>
      </div>

      {!showUrlInput ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 ${
            isDragOver
              ? 'border-[#1855EA] bg-blue-50/80 scale-[0.99]'
              : value
              ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-400'
              : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-400'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {value ? (
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative group">
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-left flex-1 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Bild erfolgreich hochgeladen</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Klicken Sie hier, um ein anderes Foto von Ihrem Gerät auszuwählen.
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1855EA] hover:underline">
                    <RefreshCw className="w-3 h-3" />
                    <span>Neues Foto auswählen</span>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                className="p-2 rounded-full hover:bg-red-100 text-red-500 cursor-pointer self-start sm:self-center"
                title="Foto entfernen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-4 space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1855EA] flex items-center justify-center mx-auto shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Foto vom Gerät hochladen (Datei auswählen)
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  PNG, JPG, WEBP bis zu 10 MB (oder per Drag &amp; Drop hier ablegen)
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <input
          type="text"
          placeholder="https://images.unsplash.com/photo-..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
        />
      )}
    </div>
  );
};
