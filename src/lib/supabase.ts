import { createClient } from '@supabase/supabase-js';
import { SERVICES_DATA, BEFORE_AFTER_CASES } from '../data/content';

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

export interface ServiceDbItem {
  id: string;
  title_de: string;
  title_en: string;
  category: string;
  badge?: string;
  price_from?: string;
  short_desc_de: string;
  short_desc_en: string;
  full_desc?: string;
  icon_name?: string;
  image: string;
  checklist?: string[];
  benefits?: string[];
  sort_order?: number;
  created_at?: string;
}

export interface ProjectDbItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  before_img: string;
  after_img: string;
  metrics_label?: string;
  metrics_value?: string;
  description?: string;
  sort_order?: number;
  created_at?: string;
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
  updated_at?: string;
}

// Initial Mock Data Fallbacks
export const INITIAL_MOCK_MESSAGES: ContactMessageItem[] = [
  {
    id: 'msg-1',
    name: 'Dr. Markus Weber',
    email: 'm.weber@praxis-ingolstadt.de',
    phone: '+49 171 2345678',
    subject: 'Anfrage Büroreinigung',
    message: 'Guten Tag, wir suchen eine zuverlässige Reinigungsfirma für unsere Praxisräume in Ingolstadt (ca. 220 m²). Bitte um Rückruf.',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'msg-2',
    name: 'Sabine Lindner',
    email: 's.lindner@bayern-immo.de',
    phone: '+49 172 9876543',
    subject: 'Treppenhausreinigung Liegenschaften',
    message: 'Hallo Team Dua & Ari, wir betreuen 12 Wohnanlagen in Pfaffenhofen und möchten die Treppenhausreinigung auslagern.',
    status: 'read',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export const INITIAL_MOCK_QUOTES: QuoteRequestItem[] = [
  {
    id: 'quote-1',
    name: 'Michael Schuster',
    email: 'm.schuster@gmx.de',
    phone: '+49 176 11223344',
    service: 'Unterhaltsreinigung',
    property_type: 'Haus',
    square_meters: 140,
    rooms_count: 5,
    bathrooms_count: 2,
    frequency: '14-Tägig',
    address: 'Feldkirchener Str. 42',
    city: 'Ingolstadt',
    zip_code: '85055',
    preferred_date: '2026-09-01',
    preferred_time: 'Vormittags',
    message: 'Wir haben Haustiere (Hund). Bitte ökologische Reiniger verwenden.',
    status: 'new',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

export const INITIAL_MOCK_REVIEWS: ReviewItem[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Dr. Markus Weber',
    email: 'm.weber@praxis.de',
    service: 'Büroreinigung',
    rating: 5,
    comment: 'Dua & Ari kümmert sich seit über einem Jahr um unsere Büroflächen in Ingolstadt. Absolut pünktlich, gründlich und zuverlässig!',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString()
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Elena Schmidt',
    email: 'elena@schmidt.de',
    service: 'Fensterreinigung',
    rating: 5,
    comment: 'Die Fensterreinigung in unserem Einfamilienhaus war erstklassig. Streifenfreier Glanz und sehr freundliches Team.',
    status: 'approved',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString()
  }
];

export const DEFAULT_SITE_SETTINGS: SiteSettingsData = {
  id: 1,
  phone_primary: '+49 (0) 172 913 7116',
  email_primary: 'DuaAricleanservice@gmail.com',
  street: 'Holznerstraße 11',
  city: '85053 Ingolstadt',
  business_name: 'Dua & Ari Gebäudereinigung',
  whatsapp_number: '+491729137116',
  working_hours_mon_wed: '07:00 – 20:00 Uhr',
  working_hours_thu_fri: '07:00 – 20:00 Uhr',
  working_hours_weekend: 'Notdienst 24/7'
};

// Helper for localStorage fallback
function getLocal<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(`duaari_${key}`);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(`duaari_${key}`, JSON.stringify(val));
  } catch (e) {
    console.error('Error setting localStorage', e);
  }
}

// ====================================================================
// CONTACT MESSAGES CRUD
// ====================================================================
export async function getContactMessages(): Promise<ContactMessageItem[]> {
  if (isSupabaseConfigured) {
    try {
      const queryPromise = supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      const timeoutPromise = new Promise<{ data: null; error: true }>((resolve) => 
        setTimeout(() => resolve({ data: null, error: true }), 1500)
      );

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

      if (!error && data) {
        // If Supabase returns data (even an array of user submissions), return it
        const localList = getLocal<ContactMessageItem[]>('contact_messages', []);
        // Merge local submissions that might not have reached Supabase yet
        const map = new Map<string, ContactMessageItem>();
        (data as ContactMessageItem[]).forEach(item => map.set(item.id, item));
        localList.forEach(item => {
          if (!map.has(item.id)) map.set(item.id, item);
        });
        const combined = Array.from(map.values()).sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        return combined.length > 0 ? combined : INITIAL_MOCK_MESSAGES;
      }
    } catch (err) {
      console.warn('Supabase contact messages fetch error:', err);
    }
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

  // Always save to local backup immediately
  const list = getLocal<ContactMessageItem[]>('contact_messages', INITIAL_MOCK_MESSAGES);
  const updated = [newItem, ...list];
  setLocal('contact_messages', updated);

  if (isSupabaseConfigured) {
    try {
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
    } catch (err) {
      console.warn('Error inserting contact message to Supabase:', err);
    }
  }

  return newItem;
}

export async function updateContactMessageStatus(id: string, status: ContactMessageItem['status']): Promise<boolean> {
  const list = getLocal<ContactMessageItem[]>('contact_messages', INITIAL_MOCK_MESSAGES);
  const updated = list.map(item => item.id === id ? { ...item, status } : item);
  setLocal('contact_messages', updated);

  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);
    } catch (e) {
      console.warn('Error updating status in Supabase:', e);
    }
  }

  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const list = getLocal<ContactMessageItem[]>('contact_messages', INITIAL_MOCK_MESSAGES);
  const updated = list.filter(item => item.id !== id);
  setLocal('contact_messages', updated);

  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
    } catch (e) {
      console.warn('Error deleting message from Supabase:', e);
    }
  }

  return true;
}

// ====================================================================
// QUOTE REQUESTS (ANGEBOTE) CRUD
// ====================================================================
export async function getQuoteRequests(): Promise<QuoteRequestItem[]> {
  if (isSupabaseConfigured) {
    try {
      const queryPromise = supabase
        .from('quote_requests')
        .select('*')
        .order('created_at', { ascending: false });

      const timeoutPromise = new Promise<{ data: null; error: true }>((resolve) => 
        setTimeout(() => resolve({ data: null, error: true }), 1500)
      );

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

      if (!error && data) return data as QuoteRequestItem[];
    } catch (err) {
      console.warn('Supabase quote requests fetch error:', err);
    }
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
    try {
      let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (onlyApproved) {
        query = query.eq('status', 'approved');
      }

      const timeoutPromise = new Promise<{ data: null; error: true }>((resolve) => 
        setTimeout(() => resolve({ data: null, error: true }), 1500)
      );

      const { data, error } = await Promise.race([query, timeoutPromise]);

      if (!error && data && data.length > 0) return data as ReviewItem[];
    } catch (err) {
      console.warn('Supabase reviews fetch error:', err);
    }
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

export async function updateReview(id: string, updates: Partial<ReviewItem>): Promise<boolean> {
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
// SERVICES DYNAMIC CRUD
// ====================================================================
export async function getServices(): Promise<ServiceDbItem[]> {
  if (isSupabaseConfigured) {
    try {
      const queryPromise = supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      const timeoutPromise = new Promise<{ data: null; error: true }>((resolve) => 
        setTimeout(() => resolve({ data: null, error: true }), 1500)
      );

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

      if (!error && data && data.length > 0) return data as ServiceDbItem[];
    } catch (err) {
      console.warn('Supabase services fetch error:', err);
    }
  }

  // Fallback to static SERVICES_DATA mapped to DB format
  const fallbackServices: ServiceDbItem[] = SERVICES_DATA.map((s, idx) => ({
    id: s.id,
    title_de: s.titleDe || s.title,
    title_en: s.titleEn || s.title,
    category: s.category,
    badge: s.badge || '',
    price_from: s.priceFrom || '',
    short_desc_de: s.shortDescriptionDe || s.shortDescription,
    short_desc_en: s.shortDescriptionEn || s.shortDescription,
    full_desc: s.fullDescription || '',
    icon_name: s.iconName || 'Sparkles',
    image: s.image,
    checklist: s.checklist || [],
    benefits: s.benefits || [],
    sort_order: idx + 1
  }));

  return getLocal<ServiceDbItem[]>('services', fallbackServices);
}

export async function addService(service: Omit<ServiceDbItem, 'created_at'>): Promise<ServiceDbItem> {
  const newItem: ServiceDbItem = {
    ...service,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single();

    if (!error && data) return data as ServiceDbItem;
  }

  const current = await getServices();
  const updated = [...current, newItem];
  setLocal('services', updated);
  return newItem;
}

export async function updateService(id: string, updates: Partial<ServiceDbItem>): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id);

    if (!error) return true;
  }

  const current = await getServices();
  const updated = current.map(s => s.id === id ? { ...s, ...updates } : s);
  setLocal('services', updated);
  return true;
}

export async function deleteService(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (!error) return true;
  }

  const current = await getServices();
  const updated = current.filter(s => s.id !== id);
  setLocal('services', updated);
  return true;
}

// ====================================================================
// PROJECTS / GALLERY DYNAMIC CRUD
// ====================================================================
export async function getProjects(): Promise<ProjectDbItem[]> {
  if (isSupabaseConfigured) {
    try {
      const queryPromise = supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });

      const timeoutPromise = new Promise<{ data: null; error: true }>((resolve) => 
        setTimeout(() => resolve({ data: null, error: true }), 1500)
      );

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

      if (!error && data && data.length > 0) return data as ProjectDbItem[];
    } catch (err) {
      console.warn('Supabase projects fetch error:', err);
    }
  }

  // Fallback to static BEFORE_AFTER_CASES mapped to DB format
  const fallbackProjects: ProjectDbItem[] = BEFORE_AFTER_CASES.map((p, idx) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    category: p.category,
    before_img: p.beforeImg,
    after_img: p.afterImg,
    metrics_label: p.metrics?.label || 'Kundenzufriedenheit',
    metrics_value: p.metrics?.value || '100%',
    description: p.description,
    sort_order: idx + 1
  }));

  return getLocal<ProjectDbItem[]>('projects', fallbackProjects);
}

export async function addProject(project: Omit<ProjectDbItem, 'created_at'>): Promise<ProjectDbItem> {
  const newItem: ProjectDbItem = {
    ...project,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (!error && data) return data as ProjectDbItem;
  }

  const current = await getProjects();
  const updated = [...current, newItem];
  setLocal('projects', updated);
  return newItem;
}

export async function updateProject(id: string, updates: Partial<ProjectDbItem>): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id);

    if (!error) return true;
  }

  const current = await getProjects();
  const updated = current.map(p => p.id === id ? { ...p, ...updates } : p);
  setLocal('projects', updated);
  return true;
}

export async function deleteProject(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (!error) return true;
  }

  const current = await getProjects();
  const updated = current.filter(p => p.id !== id);
  setLocal('projects', updated);
  return true;
}

// ====================================================================
// SITE SETTINGS CRUD
// ====================================================================
export async function getSiteSettings(): Promise<SiteSettingsData> {
  if (isSupabaseConfigured) {
    try {
      const queryPromise = supabase
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .single();

      const timeoutPromise = new Promise<{ data: null; error: true }>((resolve) => 
        setTimeout(() => resolve({ data: null, error: true }), 1500)
      );

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]);

      if (!error && data) return data as SiteSettingsData;
    } catch (err) {
      console.warn('Supabase site_settings fetch error:', err);
    }
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
