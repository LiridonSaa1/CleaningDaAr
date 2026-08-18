import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'https://your-supabase-url.supabase.co');

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

// Types
export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface QuoteRequestItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  property_type: string;
  square_meters: number;
  rooms_count: number;
  bathrooms_count: number;
  frequency: string;
  address: string;
  city: string;
  zip_code: string;
  preferred_date: string;
  preferred_time: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'accepted' | 'rejected';
  created_at: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  email: string;
  service: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface SiteSettingsData {
  id?: number;
  phone_primary: string;
  email_primary: string;
  street: string;
  city: string;
  business_name: string;
  whatsapp_number: string;
  working_hours_mon_wed: string;
  working_hours_thu_fri: string;
  working_hours_weekend: string;
}

// Default Fallback Data for Site Settings
export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  phone_primary: '+49 (0) 172 913 7116',
  email_primary: 'info@duaari-gebaeudereinigung.de',
  street: 'Holznerstraße 11',
  city: '85053 Ingolstadt',
  business_name: 'Dua & Ari Gebäudereinigung',
  whatsapp_number: '+491729137116',
  working_hours_mon_wed: '07:00 – 20:00 Uhr',
  working_hours_thu_fri: '07:00 – 20:00 Uhr',
  working_hours_weekend: 'Notdienst 24/7'
};

// Default Mock Data for Local Testing
const INITIAL_MOCK_MESSAGES: ContactMessageItem[] = [
  {
    id: 'msg-1',
    name: 'Robert Meyer',
    email: 'r.meyer@gmx.de',
    phone: '+49 160 882194',
    subject: 'Büroreinigung Anfrage',
    message: 'Guten Tag, wir suchen für unsere Büroräume in Ingolstadt (ca. 250 m²) eine regelmäßige Unterhaltsreinigung 2x pro Woche. Bitte senden Sie uns ein Angebot.',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'msg-2',
    name: 'Sabine Fischer',
    email: 'sabine.fischer@web.de',
    phone: '+49 171 445210',
    subject: 'Fensterreinigung Privathaushalt',
    message: 'Hallo, ich würde gerne wissen, was die Fensterreinigung für ein 2-stöckiges Einfamilienhaus kostet.',
    status: 'read',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'msg-3',
    name: 'Michael Kurz',
    email: 'm.kurz@autohaus-kurz.de',
    phone: '+49 841 99120',
    subject: 'Grundreinigung Ausstellungsraum',
    message: 'Wir benötigen eine intensivere Grundreinigung für unseren Verkaufsraum vor der Neueröffnung.',
    status: 'replied',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

const INITIAL_MOCK_QUOTES: QuoteRequestItem[] = [
  {
    id: 'quote-1',
    name: 'Alexander Weber',
    email: 'a.weber@tech-solutions.de',
    phone: '+49 172 881234',
    service: 'Büroreinigung',
    property_type: 'commercial',
    square_meters: 350,
    rooms_count: 8,
    bathrooms_count: 3,
    frequency: 'weekly',
    address: 'Münchner Straße 45',
    city: 'Ingolstadt',
    zip_code: '85051',
    preferred_date: '2026-08-25',
    preferred_time: 'morning',
    message: 'Reinigung bevorzugt außerhalb der Bürozeiten morgens vor 08:00 Uhr.',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 5).toISOString()
  },
  {
    id: 'quote-2',
    name: 'Monika Wagner',
    email: 'monika.wagner@outlook.com',
    phone: '+49 151 772391',
    service: 'Grundreinigung',
    property_type: 'house',
    square_meters: 180,
    rooms_count: 5,
    bathrooms_count: 2,
    frequency: 'onetime',
    address: 'Goethestraße 12',
    city: 'Manching',
    zip_code: '85077',
    preferred_date: '2026-08-28',
    preferred_time: 'afternoon',
    message: 'Nach Renovierungsarbeiten gründliche Staubentfernung gewünscht.',
    status: 'quoted',
    created_at: new Date(Date.now() - 3600000 * 30).toISOString()
  }
];

const INITIAL_MOCK_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Markus Weber',
    email: 'm.weber@gmx.de',
    service: 'Büroreinigung',
    rating: 5,
    comment: 'Dua & Ari kümmert sich seit über einem Jahr um unsere Büroflächen in Ingolstadt. Absolut pünktlich, gründlich und zuverlässig!',
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 100).toISOString()
  },
  {
    id: 'rev-2',
    name: 'Elena Schmidt',
    email: 'elena.s@web.de',
    service: 'Fensterreinigung',
    rating: 5,
    comment: 'Die Fensterreinigung in unserem Einfamilienhaus war erstklassig. Streifenfreier Glanz und sehr freundliches Team. Sehr zu empfehlen!',
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 150).toISOString()
  },
  {
    id: 'rev-3',
    name: 'Dr. Thomas Huber',
    email: 't.huber@praxis.de',
    service: 'Grundreinigung',
    rating: 5,
    comment: 'Hervorragende Grundreinigung nach unserem Umbau. Das Team arbeitet schnell, professionell und mit modernsten Geräten.',
    status: 'approved',
    created_at: new Date(Date.now() - 3600000 * 200).toISOString()
  }
];

// LocalStorage Persistence Helpers for offline testing
function getLocal<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem(`cleanza_${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`cleanza_${key}`, JSON.stringify(data));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

// ====================================================================
// CONTACT MESSAGES CRUD
// ====================================================================
export async function getContactMessages(): Promise<ContactMessageItem[]> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) return data as ContactMessageItem[];
  }

  return getLocal<ContactMessageItem[]>('contact_messages', INITIAL_MOCK_MESSAGES);
}

export async function addContactMessage(msg: Omit<ContactMessageItem, 'id' | 'created_at' | 'status'>): Promise<ContactMessageItem> {
  const newItem: ContactMessageItem = {
    ...msg,
    id: `msg-${Date.now()}`,
    status: 'new',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: msg.name,
        email: msg.email,
        phone: msg.phone,
        subject: msg.subject,
        message: msg.message,
        status: 'new'
      }])
      .select()
      .single();

    if (!error && data) return data as ContactMessageItem;
  }

  const list = getLocal<ContactMessageItem[]>('contact_messages', INITIAL_MOCK_MESSAGES);
  const updated = [newItem, ...list];
  setLocal('contact_messages', updated);
  return newItem;
}

export async function updateContactMessageStatus(id: string, status: ContactMessageItem['status']): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status })
      .eq('id', id);

    if (!error) return true;
  }

  const list = getLocal<ContactMessageItem[]>('contact_messages', INITIAL_MOCK_MESSAGES);
  const updated = list.map(item => item.id === id ? { ...item, status } : item);
  setLocal('contact_messages', updated);
  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (!error) return true;
  }

  const list = getLocal<ContactMessageItem[]>('contact_messages', INITIAL_MOCK_MESSAGES);
  const updated = list.filter(item => item.id !== id);
  setLocal('contact_messages', updated);
  return true;
}

// ====================================================================
// QUOTE REQUESTS (ANGEBOTE) CRUD
// ====================================================================
export async function getQuoteRequests(): Promise<QuoteRequestItem[]> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) return data as QuoteRequestItem[];
  }

  return getLocal<QuoteRequestItem[]>('quote_requests', INITIAL_MOCK_QUOTES);
}

export async function addQuoteRequest(quote: Omit<QuoteRequestItem, 'id' | 'created_at' | 'status'>): Promise<QuoteRequestItem> {
  const newItem: QuoteRequestItem = {
    ...quote,
    id: `quote-${Date.now()}`,
    status: 'new',
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('quote_requests')
      .insert([{
        name: quote.name,
        email: quote.email,
        phone: quote.phone,
        service: quote.service,
        property_type: quote.property_type,
        square_meters: quote.square_meters,
        rooms_count: quote.rooms_count,
        bathrooms_count: quote.bathrooms_count,
        frequency: quote.frequency,
        address: quote.address,
        city: quote.city,
        zip_code: quote.zip_code,
        preferred_date: quote.preferred_date,
        preferred_time: quote.preferred_time,
        message: quote.message,
        status: 'new'
      }])
      .select()
      .single();

    if (!error && data) return data as QuoteRequestItem;
  }

  const list = getLocal<QuoteRequestItem[]>('quote_requests', INITIAL_MOCK_QUOTES);
  const updated = [newItem, ...list];
  setLocal('quote_requests', updated);
  return newItem;
}

export async function updateQuoteRequestStatus(id: string, status: QuoteRequestItem['status']): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('quote_requests')
      .update({ status })
      .eq('id', id);

    if (!error) return true;
  }

  const list = getLocal<QuoteRequestItem[]>('quote_requests', INITIAL_MOCK_QUOTES);
  const updated = list.map(item => item.id === id ? { ...item, status } : item);
  setLocal('quote_requests', updated);
  return true;
}

export async function deleteQuoteRequest(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('quote_requests')
      .delete()
      .eq('id', id);

    if (!error) return true;
  }

  const list = getLocal<QuoteRequestItem[]>('quote_requests', INITIAL_MOCK_QUOTES);
  const updated = list.filter(item => item.id !== id);
  setLocal('quote_requests', updated);
  return true;
}

// ====================================================================
// REVIEWS & RATINGS CRUD
// ====================================================================
export async function getReviews(onlyApproved = false): Promise<ReviewItem[]> {
  if (isSupabaseConfigured) {
    let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (onlyApproved) {
      query = query.eq('status', 'approved');
    }

    const { data, error } = await query;
    if (!error && data) return data as ReviewItem[];
  }

  const list = getLocal<ReviewItem[]>('reviews', INITIAL_MOCK_REVIEWS);
  return onlyApproved ? list.filter(r => r.status === 'approved') : list;
}

export async function addReview(review: Omit<ReviewItem, 'id' | 'created_at'>): Promise<ReviewItem> {
  const newItem: ReviewItem = {
    ...review,
    id: `rev-${Date.now()}`,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([{
        name: review.name,
        email: review.email,
        service: review.service,
        rating: review.rating,
        comment: review.comment,
        status: review.status
      }])
      .select()
      .single();

    if (!error && data) return data as ReviewItem;
  }

  const list = getLocal<ReviewItem[]>('reviews', INITIAL_MOCK_REVIEWS);
  const updated = [newItem, ...list];
  setLocal('reviews', updated);
  return newItem;
}

export async function updateReview(id: string, updates: Partial<Omit<ReviewItem, 'id' | 'created_at'>>): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', id);

    if (!error) return true;
  }

  const list = getLocal<ReviewItem[]>('reviews', INITIAL_MOCK_REVIEWS);
  const updated = list.map(item => item.id === id ? { ...item, ...updates } : item);
  setLocal('reviews', updated);
  return true;
}

export async function deleteReview(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (!error) return true;
  }

  const list = getLocal<ReviewItem[]>('reviews', INITIAL_MOCK_REVIEWS);
  const updated = list.filter(item => item.id !== id);
  setLocal('reviews', updated);
  return true;
}

// ====================================================================
// SITE SETTINGS CRUD
// ====================================================================
export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (!error && data) return data as SiteSettingsData;
  }

  return getLocal<SiteSettingsData>('site_settings', DEFAULT_SITE_SETTINGS);
}

export async function updateSiteSettings(settings: Partial<SiteSettingsData>): Promise<SiteSettingsData> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('site_settings')
      .update({ ...settings, updated_at: new Date().toISOString() })
      .eq('id', 1)
      .select()
      .single();

    if (!error && data) return data as SiteSettingsData;
  }

  const current = getLocal<SiteSettingsData>('site_settings', DEFAULT_SITE_SETTINGS);
  const updated = { ...current, ...settings };
  setLocal('site_settings', updated);
  return updated;
}
