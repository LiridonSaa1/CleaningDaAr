-- ====================================================================
-- SUPABASE DATABASE SCHEMA FOR CLEANZA / DUA & ARI GEBÄUDEREINIGUNG
-- (KOPJONI DHE NGJITENI TË GJITHË KËTË TEKST TE SUPABASE SQL EDITOR)
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. PROFILES & ROLES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT DEFAULT '',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 4. QUOTE REQUESTS
CREATE TABLE IF NOT EXISTS public.quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  property_type TEXT DEFAULT 'apartment',
  square_meters NUMERIC DEFAULT 100,
  rooms_count INT DEFAULT 3,
  bathrooms_count INT DEFAULT 1,
  frequency TEXT DEFAULT 'onetime',
  address TEXT DEFAULT '',
  city TEXT DEFAULT 'Ingolstadt',
  zip_code TEXT DEFAULT '85053',
  preferred_date TEXT DEFAULT '',
  preferred_time TEXT DEFAULT '',
  message TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

-- 5. REVIEWS & RATINGS
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT DEFAULT '',
  service TEXT DEFAULT 'Gebäudereinigung',
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 6. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  phone_primary TEXT NOT NULL DEFAULT '+49 (0) 172 913 7116',
  email_primary TEXT NOT NULL DEFAULT 'info@duaari-gebaeudereinigung.de',
  street TEXT NOT NULL DEFAULT 'Holznerstraße 11',
  city TEXT NOT NULL DEFAULT '85053 Ingolstadt',
  business_name TEXT NOT NULL DEFAULT 'Dua & Ari Gebäudereinigung',
  whatsapp_number TEXT NOT NULL DEFAULT '+491729137116',
  working_hours_mon_wed TEXT NOT NULL DEFAULT '07:00 – 20:00 Uhr',
  working_hours_thu_fri TEXT NOT NULL DEFAULT '07:00 – 20:00 Uhr',
  working_hours_weekend TEXT NOT NULL DEFAULT 'Notdienst 24/7',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- DEFAULT SITE SETTINGS
INSERT INTO public.site_settings (id, phone_primary, email_primary, street, city, business_name, whatsapp_number)
VALUES (1, '+49 (0) 172 913 7116', 'info@duaari-gebaeudereinigung.de', 'Holznerstraße 11', '85053 Ingolstadt', 'Dua & Ari Gebäudereinigung', '+491729137116')
ON CONFLICT (id) DO NOTHING;

-- DEFAULT APPROVED REVIEWS
INSERT INTO public.reviews (id, name, service, rating, comment, status)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Markus Weber', 'Büroreinigung', 5, 'Dua & Ari kümmert sich seit über einem Jahr um unsere Büroflächen in Ingolstadt. Absolut pünktlich, gründlich und zuverlässig!', 'approved'),
  ('22222222-2222-2222-2222-222222222222', 'Elena Schmidt', 'Fensterreinigung', 5, 'Die Fensterreinigung in unserem Einfamilienhaus war erstklassig. Streifenfreier Glanz und sehr freundliches Team. Sehr zu empfehlen!', 'approved'),
  ('33333333-3333-3333-3333-333333333333', 'Dr. Thomas Huber', 'Grundreinigung', 5, 'Hervorragende Grundreinigung nach unserem Umbau. Das Team arbeitet schnell, professionell und mit modernsten Geräten.', 'approved')
ON CONFLICT (id) DO NOTHING;

-- SEED ADMIN 1: admin@duaari-gebaeudereinigung.de
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
  is_super_admin, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000', 'a0000000-0000-0000-0000-000000000001', 'authenticated', 'authenticated',
  'admin@duaari-gebaeudereinigung.de', crypt('Admin123!', gen_salt('bf')), NOW(),
  NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"admin"}',
  FALSE, NOW(), NOW(), '', '', '', ''
)
ON CONFLICT (id) DO UPDATE SET encrypted_password = crypt('Admin123!', gen_salt('bf')), email_confirmed_at = NOW();

INSERT INTO public.profiles (id, email, role)
VALUES ('a0000000-0000-0000-0000-000000000001', 'admin@duaari-gebaeudereinigung.de', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- SEED ADMIN 2: duariservice@gmail.com
INSERT INTO auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data,
  is_super_admin, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000', 'a0000000-0000-0000-0000-000000000002', 'authenticated', 'authenticated',
  'duariservice@gmail.com', crypt('Admin123!', gen_salt('bf')), NOW(),
  NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"role":"admin"}',
  FALSE, NOW(), NOW(), '', '', '', ''
)
ON CONFLICT (id) DO UPDATE SET encrypted_password = crypt('Admin123!', gen_salt('bf')), email_confirmed_at = NOW();

INSERT INTO public.profiles (id, email, role)
VALUES ('a0000000-0000-0000-0000-000000000002', 'duariservice@gmail.com', 'admin')
ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- RLS HELPER FUNCTION
CREATE OR REPLACE FUNCTION public.is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS POLICIES
DROP POLICY IF EXISTS "Public profiles view" ON public.profiles;
CREATE POLICY "Public profiles view" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Admin update profiles" ON public.profiles;
CREATE POLICY "Admin update profiles" ON public.profiles FOR UPDATE USING (public.is_admin());

DROP POLICY IF EXISTS "Anyone submit contact messages" ON public.contact_messages;
CREATE POLICY "Anyone submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage contact messages" ON public.contact_messages;
CREATE POLICY "Admin manage contact messages" ON public.contact_messages FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Anyone submit quote requests" ON public.quote_requests;
CREATE POLICY "Anyone submit quote requests" ON public.quote_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage quote requests" ON public.quote_requests;
CREATE POLICY "Admin manage quote requests" ON public.quote_requests FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Anyone read approved reviews" ON public.reviews;
CREATE POLICY "Anyone read approved reviews" ON public.reviews FOR SELECT USING (status = 'approved' OR public.is_admin());

DROP POLICY IF EXISTS "Anyone submit review" ON public.reviews;
CREATE POLICY "Anyone submit review" ON public.reviews FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage reviews" ON public.reviews;
CREATE POLICY "Admin manage reviews" ON public.reviews FOR ALL USING (public.is_admin());

DROP POLICY IF EXISTS "Anyone view site settings" ON public.site_settings;
CREATE POLICY "Anyone view site settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin update site settings" ON public.site_settings;
CREATE POLICY "Admin update site settings" ON public.site_settings FOR ALL USING (public.is_admin());

-- USER SIGNUP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'role', 'admin'))
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
