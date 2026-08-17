import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Building, 
  Sparkles, 
  Car, 
  Package, 
  Layers, 
  HelpCircle,
  Plus,
  Minus,
  Check,
  Calendar,
  Clock,
  MapPin,
  Upload,
  Image as ImageIcon,
  Trash2,
  Send,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  PhoneCall,
  Utensils,
  Bath,
  Bed,
  Tv,
  Maximize,
  Grid,
  Sofa,
  Box,
  Flame,
  Fence,
  Warehouse,
  Trees
} from 'lucide-react';
import { Language } from '../types';

interface QuoteConfiguratorProps {
  lang: Language;
  onOpenFullModal?: () => void;
  onApplyCalculatedQuote?: (
    summary: string,
    objectType: string,
    squareMeters: number,
    frequency: string
  ) => void;
}

export interface QuoteFormData {
  // Step 1: Service
  serviceType: string;
  customServiceText: string;

  // Step 2: Property details
  propertyType: 'apartment' | 'house' | 'floor' | 'commercial';
  squareMeters: number;
  roomsCount: number;
  bathroomsCount: number;
  windowsCount: number;
  sofasCount: number;
  carpetsCount: number;
  frequency: 'onetime' | 'weekly' | 'biweekly' | 'monthly';

  // Step 3: Areas included
  includedAreas: string[];

  // Step 4: Date & Location
  preferredDate: string;
  preferredTime: string;
  address: string;
  city: string;
  zipCode: string;

  // Step 5: Contact & Photos
  fullName: string;
  email: string;
  phone: string;
  additionalNotes: string;
  photos: { name: string; url: string; size: string }[];
}

export const QuoteConfigurator: React.FC<QuoteConfiguratorProps> = ({
  lang,
  onOpenFullModal,
  onApplyCalculatedQuote
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<QuoteFormData>({
    serviceType: 'deep_cleaning',
    customServiceText: '',
    propertyType: 'apartment',
    squareMeters: 120,
    roomsCount: 3,
    bathroomsCount: 2,
    windowsCount: 6,
    sofasCount: 1,
    carpetsCount: 2,
    frequency: 'onetime',
    includedAreas: ['kitchen', 'bathroom', 'living_room', 'floors', 'windows'],
    preferredDate: '',
    preferredTime: 'morning',
    address: '',
    city: 'Ingolstadt',
    zipCode: '85053',
    fullName: '',
    email: '',
    phone: '',
    additionalNotes: '',
    photos: []
  });

  // Services List with Icons
  const serviceOptions = [
    { id: 'house_cleaning', labelDe: 'House Cleaning', labelEn: 'House Cleaning', descDe: 'Hausreinigung', icon: '🏠', basePrice: 1.4 },
    { id: 'office_cleaning', labelDe: 'Office Cleaning', labelEn: 'Office Cleaning', descDe: 'Büroreinigung', icon: '🏢', basePrice: 1.6 },
    { id: 'window_cleaning', labelDe: 'Window Cleaning', labelEn: 'Window Cleaning', descDe: 'Fensterreinigung', icon: '🪟', basePrice: 1.2 },
    { id: 'sofa_cleaning', labelDe: 'Sofa Cleaning', labelEn: 'Sofa Cleaning', descDe: 'Sofareinigung', icon: '🛋️', basePrice: 35 },
    { id: 'carpet_cleaning', labelDe: 'Carpet Cleaning', labelEn: 'Carpet Cleaning', descDe: 'Teppichreinigung', icon: '🧼', basePrice: 1.8 },
    { id: 'car_cleaning', labelDe: 'Car Cleaning', labelEn: 'Car Cleaning', descDe: 'Fahrzeugaufbereitung', icon: '🚗', basePrice: 90 },
    { id: 'deep_cleaning', labelDe: 'Deep Cleaning', labelEn: 'Deep Cleaning', descDe: 'Grundreinigung / Baureinigung', icon: '🏗️', basePrice: 2.2 },
    { id: 'move_cleaning', labelDe: 'Move In / Move Out', labelEn: 'Move In / Move Out', descDe: 'Umzugsreinigung mit Abnahmegarantie', icon: '📦', basePrice: 2.4 },
    { id: 'other', labelDe: 'Other', labelEn: 'Other', descDe: 'Individuelle Reinigung', icon: '✨', basePrice: 1.5 },
  ];

  // Areas included checkbox options
  const areasOptions = [
    { id: 'kitchen', labelDe: 'Kitchen (Küche)', labelEn: 'Kitchen', icon: Utensils },
    { id: 'bathroom', labelDe: 'Bathroom (Badezimmer)', labelEn: 'Bathroom', icon: Bath },
    { id: 'bedrooms', labelDe: 'Bedrooms (Schlafzimmer)', labelEn: 'Bedrooms', icon: Bed },
    { id: 'living_room', labelDe: 'Living Room (Wohnzimmer)', labelEn: 'Living Room', icon: Tv },
    { id: 'windows', labelDe: 'Windows (Fenster)', labelEn: 'Windows', icon: Maximize },
    { id: 'floors', labelDe: 'Floors (Böden)', labelEn: 'Floors', icon: Grid },
    { id: 'furniture', labelDe: 'Furniture (Möbel)', labelEn: 'Furniture', icon: Sofa },
    { id: 'appliances', labelDe: 'Appliances (Küchengeräte)', labelEn: 'Appliances', icon: Flame },
    { id: 'walls', labelDe: 'Walls (Wände & Türen)', labelEn: 'Walls', icon: Box },
    { id: 'balcony', labelDe: 'Balcony (Balkon)', labelEn: 'Balcony', icon: Fence },
    { id: 'garage', labelDe: 'Garage (Garage / Keller)', labelEn: 'Garage', icon: Warehouse },
    { id: 'garden', labelDe: 'Garden (Garten / Terrasse)', labelEn: 'Garden', icon: Trees },
  ];

  // Frequency options without price discounts
  const currentServiceObj = serviceOptions.find(s => s.id === formData.serviceType) || serviceOptions[6];

  const toggleArea = (areaId: string) => {
    setFormData(prev => {
      const exists = prev.includedAreas.includes(areaId);
      return {
        ...prev,
        includedAreas: exists ? prev.includedAreas.filter(a => a !== areaId) : [...prev.includedAreas, areaId]
      };
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newPhotos = Array.from(files).slice(0, 5).map((file: File) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    }));

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos].slice(0, 5)
    }));
  };

  const handleRemovePhoto = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone.trim() && !formData.email.trim()) return;

    if (onApplyCalculatedQuote) {
      const summary = `Offerte: ${currentServiceObj.labelEn} (${formData.propertyType}), ${formData.squareMeters}m², ${formData.roomsCount} Zimmer, ${formData.bathroomsCount} Bäder, ${formData.frequency}, Ort: ${formData.city}. Kontakt: ${formData.fullName} (${formData.phone} / ${formData.email})`;
      onApplyCalculatedQuote(summary, currentServiceObj.labelEn, formData.squareMeters, formData.frequency);
    }
    setIsSubmitted(true);
  };

  const stepTitles = [
    { num: 1, labelDe: '1. Service', labelEn: '1. Service' },
    { num: 2, labelDe: '2. Objekt', labelEn: '2. Property' },
    { num: 3, labelDe: '3. Umfang', labelEn: '3. Areas' },
    { num: 4, labelDe: '4. Termin & Ort', labelEn: '4. Date & Place' },
    { num: 5, labelDe: '5. Kontakt & Fotos', labelEn: '5. Contact' },
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-blue-100/80 shadow-xl overflow-hidden">
      
      {/* Top Step Progress Bar */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/80 px-4 sm:px-8 py-4">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {stepTitles.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => setCurrentStep(s.num)}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                    isCurrent
                      ? 'bg-[#1855EA] text-white ring-4 ring-blue-100 shadow-sm'
                      : isDone
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.num}
                </div>
                <span className={`text-xs font-semibold hidden md:inline transition-colors ${
                  isCurrent ? 'text-[#1855EA]' : isDone ? 'text-slate-700' : 'text-slate-400'
                }`}>
                  {lang === 'de' ? s.labelDe : s.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Form Steps on Left (col-span-8), Live Quote Summary on Right (col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Interactive Wizard */}
        <div className="lg:col-span-7 xl:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
          
          {!isSubmitted ? (
            <div>
              {/* STEP 1: What do you want to clean? */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1855EA] bg-[#EBF3FF] px-2.5 py-0.5 rounded-md mb-2 inline-block">
                      {lang === 'de' ? 'Hapi 1 – Çfarë dëshiron të pastrosh?' : 'Step 1 – What would you like to clean?'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-display">
                      {lang === 'de' ? 'Wählen Sie die gewünschte Reinigungsart' : 'Select your cleaning service'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {serviceOptions.map((service) => {
                      const isSelected = formData.serviceType === service.id;
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, serviceType: service.id }))}
                          className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between min-h-[110px] cursor-pointer group ${
                            isSelected
                              ? 'bg-[#1855EA] text-white border-[#1855EA] shadow-md -translate-y-0.5'
                              : 'bg-[#F0F5FF] hover:bg-[#E9F1FF] text-[#1E293B] border-transparent hover:border-blue-200'
                          }`}
                        >
                          <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                            {service.icon}
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold leading-tight">
                              {service.labelEn}
                            </div>
                            <span className={`text-[10px] block mt-0.5 leading-tight ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                              {service.descDe}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {formData.serviceType === 'other' && (
                    <div className="mt-4">
                      <input
                        type="text"
                        placeholder={lang === 'de' ? 'Beschreiben Sie Ihre gewünschte Reinigung...' : 'Describe your custom cleaning request...'}
                        value={formData.customServiceText}
                        onChange={(e) => setFormData(prev => ({ ...prev, customServiceText: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: Property Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1855EA] bg-[#EBF3FF] px-2.5 py-0.5 rounded-md mb-2 inline-block">
                      {lang === 'de' ? 'Hapi 2 – Detajet e objektit' : 'Step 2 – Property Details'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-display">
                      {lang === 'de' ? 'Objektart & Raumdetails' : 'Property type & Room specs'}
                    </h3>
                  </div>

                  {/* Property Type Pills: Floor / Apartment / House / Commercial */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {lang === 'de' ? 'Objektart (Property Type)' : 'Property Type'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'apartment', label: 'Apartment' },
                        { id: 'house', label: 'House' },
                        { id: 'floor', label: 'Floor / Etage' },
                        { id: 'commercial', label: 'Commercial' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, propertyType: item.id as any }))}
                          className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            formData.propertyType === item.id
                              ? 'bg-[#1855EA] text-white border-[#1855EA] shadow-xs'
                              : 'bg-[#F0F5FF] text-slate-700 border-transparent hover:border-blue-200'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Area Slider */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      <span>{lang === 'de' ? 'Sipërfaqja në m² (Size)' : 'Area Size (m²)'}</span>
                      <span className="text-[#1855EA] text-base font-black lowercase">{formData.squareMeters} m²</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="600"
                      step="10"
                      value={formData.squareMeters}
                      onChange={(e) => setFormData(prev => ({ ...prev, squareMeters: Number(e.target.value) }))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1855EA]"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>30 m²</span>
                      <span>150 m²</span>
                      <span>300 m²</span>
                      <span>600+ m²</span>
                    </div>
                  </div>

                  {/* Stepper Counters Grid (Rooms, Bathrooms, Windows, Sofas, Carpets) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {/* Bedrooms / Rooms */}
                    <div className="p-3 bg-[#F0F5FF] rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-slate-700 block">{lang === 'de' ? 'Dhomat' : 'Bedrooms'}</span>
                        <span className="text-xs text-slate-500">{formData.roomsCount} Rooms</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, roomsCount: Math.max(1, prev.roomsCount - 1) }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-[#1855EA]">{formData.roomsCount}</span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, roomsCount: prev.roomsCount + 1 }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="p-3 bg-[#F0F5FF] rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-slate-700 block">{lang === 'de' ? 'Banjot' : 'Bathrooms'}</span>
                        <span className="text-xs text-slate-500">{formData.bathroomsCount} Baths</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, bathroomsCount: Math.max(1, prev.bathroomsCount - 1) }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-[#1855EA]">{formData.bathroomsCount}</span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, bathroomsCount: prev.bathroomsCount + 1 }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Windows */}
                    <div className="p-3 bg-[#F0F5FF] rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-slate-700 block">{lang === 'de' ? 'Dritaret' : 'Windows'}</span>
                        <span className="text-xs text-slate-500">{formData.windowsCount} Pcs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, windowsCount: Math.max(0, prev.windowsCount - 1) }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-[#1855EA]">{formData.windowsCount}</span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, windowsCount: prev.windowsCount + 1 }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Sofas */}
                    <div className="p-3 bg-[#F0F5FF] rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-slate-700 block">{lang === 'de' ? 'Divanet' : 'Sofas'}</span>
                        <span className="text-xs text-slate-500">{formData.sofasCount} Sofas</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, sofasCount: Math.max(0, prev.sofasCount - 1) }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-[#1855EA]">{formData.sofasCount}</span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, sofasCount: prev.sofasCount + 1 }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Carpets */}
                    <div className="p-3 bg-[#F0F5FF] rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-slate-700 block">{lang === 'de' ? 'Tepihet' : 'Carpets'}</span>
                        <span className="text-xs text-slate-500">{formData.carpetsCount} Carpets</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, carpetsCount: Math.max(0, prev.carpetsCount - 1) }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-5 text-center text-xs font-bold text-[#1855EA]">{formData.carpetsCount}</span>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, carpetsCount: prev.carpetsCount + 1 }))}
                          className="w-7 h-7 rounded-md bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold shadow-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Frequency selector */}
                    <div className="col-span-2 sm:col-span-1 p-3 bg-[#F0F5FF] rounded-xl flex flex-col justify-between">
                      <span className="text-[11px] font-bold text-slate-700 mb-1">{lang === 'de' ? 'Sa shpesh' : 'Frequency'}</span>
                      <select
                        value={formData.frequency}
                        onChange={(e) => setFormData(prev => ({ ...prev, frequency: e.target.value as any }))}
                        className="bg-white border border-slate-200 rounded-md text-[11px] font-semibold text-slate-800 py-1 px-1.5 focus:outline-none"
                      >
                        <option value="onetime">{lang === 'de' ? 'Einmalig' : 'One-time'}</option>
                        <option value="weekly">{lang === 'de' ? 'Wöchentlich' : 'Weekly'}</option>
                        <option value="biweekly">{lang === 'de' ? '2-wöchentlich' : 'Bi-weekly'}</option>
                        <option value="monthly">{lang === 'de' ? 'Monatlich' : 'Monthly'}</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: What's included in cleaning? */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1855EA] bg-[#EBF3FF] px-2.5 py-0.5 rounded-md mb-2 inline-block">
                      {lang === 'de' ? 'Hapi 3 – Çfarë përfshihet në pastrim?' : "Step 3 – What's included in cleaning?"}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-display">
                      {lang === 'de' ? 'Wählen Sie alle gewünschten Bereiche' : 'Select all cleaning areas & scope'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {areasOptions.map((area) => {
                      const isChecked = formData.includedAreas.includes(area.id);
                      const IconComp = area.icon;
                      return (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => toggleArea(area.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-[#1855EA] text-white border-[#1855EA] shadow-xs'
                              : 'bg-[#F0F5FF] text-slate-700 border-transparent hover:border-blue-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComp className={`w-4 h-4 ${isChecked ? 'text-white' : 'text-[#1855EA]'}`} />
                            <span className="text-xs font-bold leading-tight">
                              {area.labelEn}
                            </span>
                          </div>
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                            isChecked ? 'bg-white text-[#1855EA] border-white' : 'border-slate-300 bg-white'
                          }`}>
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Date & Location */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1855EA] bg-[#EBF3FF] px-2.5 py-0.5 rounded-md mb-2 inline-block">
                      {lang === 'de' ? 'Hapi 4 – Data dhe lokacioni' : 'Step 4 – Date & Location'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-display">
                      {lang === 'de' ? 'Wunschtermin & Adresse' : 'Preferred Date & Location'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {lang === 'de' ? 'Wunschdatum (Preferred Date)' : 'Preferred Date'}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                          className="w-full bg-[#F0F5FF] border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {lang === 'de' ? 'Wunschzeit (Preferred Time)' : 'Preferred Time'}
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
                        className="w-full bg-[#F0F5FF] border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                      >
                        <option value="morning">Morning (08:00 – 12:00 Uhr)</option>
                        <option value="afternoon">Afternoon (12:00 – 17:00 Uhr)</option>
                        <option value="flexible">Flexible / Anytime</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {lang === 'de' ? 'Straße & Hausnummer (Address)' : 'Street Address'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'de' ? 'z. B. Holznerstraße 11' : 'e.g. Holznerstraße 11'}
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {lang === 'de' ? 'Stadt / Ort (City)' : 'City / Region'}
                      </label>
                      <input
                        type="text"
                        placeholder="Ingolstadt, Manching, München..."
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        {lang === 'de' ? 'PLZ (ZIP Code)' : 'Postal / ZIP Code'}
                      </label>
                      <input
                        type="text"
                        placeholder="85053"
                        value={formData.zipCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Customer Details & Photo Upload */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1855EA] bg-[#EBF3FF] px-2.5 py-0.5 rounded-md mb-2 inline-block">
                      {lang === 'de' ? 'Hapi 5 – Detajet e klientit & Fotot 📸' : 'Step 5 – Contact Details & Photos 📸'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#111827] font-display">
                      {lang === 'de' ? 'Kontaktdaten & Fotoupload' : 'Your Contact Details & Photo Upload'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        {lang === 'de' ? 'Vor- & Nachname (Full Name) *' : 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Max Mustermann"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        {lang === 'de' ? 'Telefonnummer (Phone) *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+49 172 913 7116"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {lang === 'de' ? 'E-Mail-Adresse (Email)' : 'Email Address'}
                    </label>
                    <input
                      type="email"
                      placeholder="ihre-email@beispiel.de"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                    />
                  </div>

                  {/* Photo Upload Zone (3-5 photos) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {lang === 'de' ? 'Fotos hochladen (3–5 Bilder für genaueste Offerte) 📸' : 'Upload Photos (3–5 images for precise quote) 📸'}
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-blue-200 hover:border-[#1855EA] bg-[#F0F5FF]/60 hover:bg-[#EBF3FF] rounded-xl p-4 text-center cursor-pointer transition-colors"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Upload className="w-6 h-6 text-[#1855EA] mx-auto mb-1" />
                      <span className="text-xs font-bold text-[#1855EA] block">
                        {lang === 'de' ? 'Klicken oder Fotos hierher ziehen' : 'Click or drag photos here'}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        JPG, PNG (max. 5 Fotos)
                      </span>
                    </div>

                    {/* Uploaded Thumbnails */}
                    {formData.photos.length > 0 && (
                      <div className="flex gap-2 mt-3 flex-wrap">
                        {formData.photos.map((p, idx) => (
                          <div key={idx} className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-200 group">
                            <img src={p.url} alt="upload" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => handleRemovePhoto(idx)}
                              className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      {lang === 'de' ? 'Zusätzliche Anmerkungen (Notes)' : 'Additional Notes'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={lang === 'de' ? 'Besondere Wünsche, Schlüsselübergabe, Parkmöglichkeiten...' : 'Special requests, key handover instructions...'}
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1855EA]"
                    />
                  </div>
                </motion.div>
              )}

              {/* Bottom Wizard Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                    className="px-5 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{lang === 'de' ? 'Zurück' : 'Back'}</span>
                  </button>
                ) : <div />}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                    className="bg-[#1855EA] hover:bg-[#1344C4] active:scale-95 text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <span>{lang === 'de' ? 'Weiter zu Schritt' : 'Next Step'} {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === 'de' ? 'Kostenlose Offerte anfordern' : 'Request a Free Quote'}</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Success Feedback */
            <div className="p-8 text-center my-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-2xl font-bold text-emerald-900 mb-2 font-display">
                {lang === 'de' ? 'Offertenanfrage erfolgreich gesendet!' : 'Quote Request Successfully Sent!'}
              </h4>
              <p className="text-sm text-emerald-700 max-w-md mx-auto mb-6">
                {lang === 'de'
                  ? 'Vielen Dank! Unser Team prüft Ihre Objektdaten & Fotos und sendet Ihnen innerhalb von 2 bis 4 Stunden ein verbindliches Festpreisangebot.'
                  : 'Thank you! Our team is reviewing your property specs & photos and will send your binding fixed-price quote within 2 to 4 hours.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                }}
                className="text-xs font-bold text-[#1855EA] hover:underline cursor-pointer"
              >
                {lang === 'de' ? 'Weitere Anfrage konfigurieren' : 'Configure another request'}
              </button>
            </div>
          )}

        </div>

        {/* Right Sidebar: Your Quote Request Live Summary */}
        <div className="lg:col-span-5 xl:col-span-4 bg-gradient-to-br from-[#1855EA] to-[#0B3EA8] p-6 sm:p-8 lg:p-9 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                {lang === 'de' ? 'IHRE ANFRAGE' : 'YOUR QUOTE REQUEST'}
              </span>
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">
                Live Overview
              </span>
            </div>

            {/* Custom Quote Request Header (No Prices) */}
            <div className="mb-6 pb-6 border-b border-white/20">
              <div className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight leading-tight">
                {lang === 'de' ? 'Kostenlose Offerte' : 'Your Quote Request'}
              </div>
              <span className="text-xs text-blue-200 mt-1 block">
                {lang === 'de'
                  ? 'Transparente Festpreisberechnung nach individueller Prüfung'
                  : 'Tailored binding quote with zero hidden fees'}
              </span>
            </div>

            {/* Summary Breakdown List */}
            <div className="space-y-2 text-xs text-blue-50 mb-6">
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-blue-200 font-medium">Service:</span>
                <span className="font-bold text-white">{currentServiceObj.labelEn}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-blue-200 font-medium">Property:</span>
                <span className="font-bold text-white capitalize">{formData.propertyType}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-blue-200 font-medium">Size:</span>
                <span className="font-bold text-white">{formData.squareMeters} m²</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-blue-200 font-medium">Bedrooms:</span>
                <span className="font-bold text-white">{formData.roomsCount}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-blue-200 font-medium">Bathrooms:</span>
                <span className="font-bold text-white">{formData.bathroomsCount}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-blue-200 font-medium">Frequency:</span>
                <span className="font-bold text-white capitalize">
                  {formData.frequency === 'onetime' ? 'One-time' : formData.frequency === 'biweekly' ? 'Bi-weekly' : formData.frequency}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                <span className="text-blue-200 font-medium">Location:</span>
                <span className="font-bold text-white">{formData.city || formData.zipCode || 'Ingolstadt'}</span>
              </div>
              {formData.photos.length > 0 && (
                <div className="flex items-center justify-between py-1.5 border-b border-white/10">
                  <span className="text-blue-200 font-medium">Photos:</span>
                  <span className="font-bold text-emerald-300">{formData.photos.length} uploaded 📸</span>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Festpreisgarantie</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Reaktionszeit unter 2 bis 4 Stunden</span>
              </div>
            </div>
          </div>

          {/* Direct Phone / Action */}
          <div className="relative z-10 pt-6 mt-6 border-t border-white/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-blue-200 block">
                {lang === 'de' ? 'Fragen zur Offerte?' : 'Questions?'}
              </span>
              <a 
                href="tel:+491729137116" 
                className="text-sm font-bold text-white hover:underline flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                +49 (0) 172 913 7116
              </a>
            </div>

            {currentStep < 5 && (
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="bg-white/20 hover:bg-white/30 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'de' ? 'Zum Abschluss' : 'Final Step'}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
