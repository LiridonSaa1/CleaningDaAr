-- ====================================================================
-- SUPABASE DATABASE SCHEMA FOR CLEANZA / DUA & ARI GEBÄUDEREINIGUNG
-- FULL SEED FOR SERVICES, PROJECTS, REVIEWS & SITE SETTINGS
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

-- 6. SERVICES TABLE (LANDINGPAGE DYNAMIC SERVICES)
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY,
  title_de TEXT NOT NULL,
  title_en TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'residential',
  badge TEXT DEFAULT '',
  price_from TEXT DEFAULT '',
  short_desc_de TEXT NOT NULL,
  short_desc_en TEXT NOT NULL,
  full_desc TEXT DEFAULT '',
  icon_name TEXT DEFAULT 'Sparkles',
  image TEXT NOT NULL,
  checklist JSONB DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- 7. PROJECTS / GALLERY TABLE (BEFORE & AFTER / SHOWCASE)
CREATE TABLE IF NOT EXISTS public.projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Allgemein',
  before_img TEXT NOT NULL,
  after_img TEXT NOT NULL,
  metrics_label TEXT DEFAULT 'Kundenzufriedenheit',
  metrics_value TEXT DEFAULT '100%',
  description TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- 8. SITE SETTINGS (WEBSITE CONTACT INFO & WORKING HOURS)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INT PRIMARY KEY DEFAULT 1,
  phone_primary TEXT NOT NULL DEFAULT '+49 (0) 172 913 7116',
  email_primary TEXT NOT NULL DEFAULT 'DuaAricleanservice@gmail.com',
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

-- 9. ABOUT FEATURES TABLE (WHY CHOOSE US / ADVANTAGES)
CREATE TABLE IF NOT EXISTS public.about_features (
  id TEXT PRIMARY KEY,
  title_de TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_de TEXT NOT NULL,
  description_en TEXT NOT NULL,
  image TEXT NOT NULL,
  badge_de TEXT DEFAULT '',
  badge_en TEXT DEFAULT '',
  alt_de TEXT DEFAULT '',
  alt_en TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.about_features ENABLE ROW LEVEL SECURITY;

-- ====================================================================
-- SEED DEFAULT SITE SETTINGS
-- ====================================================================
INSERT INTO public.site_settings (id, phone_primary, email_primary, street, city, business_name, whatsapp_number)
VALUES (1, '+49 (0) 172 913 7116', 'DuaAricleanservice@gmail.com', 'Holznerstraße 11', '85053 Ingolstadt', 'Dua & Ari Gebäudereinigung', '+491729137116')
ON CONFLICT (id) DO UPDATE SET
  email_primary = EXCLUDED.email_primary,
  business_name = EXCLUDED.business_name;

-- ====================================================================
-- SEED SERVICES DATA
-- ====================================================================
INSERT INTO public.services (id, title_de, title_en, category, badge, price_from, short_desc_de, short_desc_en, full_desc, icon_name, image, checklist, benefits, sort_order)
VALUES 
  (
    'unterhaltsreinigung', 'Unterhaltsreinigung', 'Routine cleaning', 'residential', 'Empfohlen', 'ab 28,00 € / Std.',
    'Ein sauberes Zuhause oder ein gepflegtes Büro ist das Fundament für Wohlbefinden. Wir kümmern uns um die regelmäßige Reinigung.',
    'A clean home or a well-maintained office is the foundation for well-being. We take care of regular cleaning.',
    'Unsere Routinereinigung & Unterhaltsreinigung sichert dauerhafte Frische, absolute Hygiene und ein rundum angenehmes Ambiente.',
    'Sparkles', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80',
    '["Staub- und Feuchtreinigung aller freien Oberflächen & Tische", "Saugen und Wischen aller Bodenbeläge", "Hygienische Desinfektion und Reinigung der Sanitäranlagen", "Müllentleerung und Mülltrennung"]'::jsonb,
    '["Feste Reinigungsteams für höchste Diskretion", "Flexible Einsatzzeiten nach Ihren Wünschen", "Ökologisch unbedenkliche Pflegemittel"]'::jsonb,
    1
  ),
  (
    'buero-gewerbereinigung', 'Büro- & Gewerbereinigung', 'Office and commercial cleaning', 'commercial', 'Für Unternehmen', 'Festpreisangebot',
    'Ein sauberer Arbeitsplatz ist die Visitenkarte Ihres Unternehmens. Wir sorgen für hygienische Sauberkeit in Büros und Praxen.',
    'A clean workplace is the calling card of your company. We ensure hygienic cleanliness in offices and practices.',
    'Ein sauberes Büro fördert Konzentration, senkt Krankheitsausfälle und vermittelt Professionalität.',
    'Building2', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    '["Ergonomische Tastatur- & Monitor-Oberflächenpflege", "Meetingräume einsatzbereit herrichten", "Kaffeeküchen und Geschirrspülerservice", "Glaswände & Raumteiler streifenfrei polieren"]'::jsonb,
    '["Erprobtes Hygienekonzept gegen Keimverschleppung", "Volle Haftpflichtversicherung für jedes Objekt", "Transparente monatliche Sammelrechnung"]'::jsonb,
    2
  ),
  (
    'glas-fensterreinigung', 'Glas- & Fensterreinigung', 'Glass and window cleaning', 'special', 'Streifenfrei', 'ab 4,50 € / m²',
    'Wir sorgen für perfekten Durchblick. Ob Schaufenster, Wintergärten oder klassische Fensterflächen – streifenfrei.',
    'We ensure a perfect view. Whether shop windows, conservatories or classic window surfaces - streak-free.',
    'Streifenfreie Fenster ohne Schlieren, auch an schwer erreichbaren Stellen. Wir reinigen Scheiben inklusive Fensterrahmen.',
    'Maximize2', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1000&q=80',
    '["Innen- und Außenreinigung von Fenstern aller Art", "Rahmenreinigung & Falzreinigung", "Schaufensterreinigung für den Einzelhandel", "Reinwasser/Osmose-Technik ohne Chemie"]'::jsonb,
    '["Rückstandsfreies Trocknen ohne Kalkflecken", "Sicherheitsgeschultes Personal", "Schnelle Ausführung auch bei kurzfristigem Bedarf"]'::jsonb,
    3
  ),
  (
    'baureinigung', 'Baureinigung', 'Construction cleaning', 'construction', 'Bezugsfertig', 'ab 3,80 € / m²',
    'Wir übernehmen die Grob- und Feinreinigung Ihrer Baustelle nach Neubau oder Renovierung. Bezugsfertig übergeben.',
    'We handle the rough and fine cleaning of your construction site after new construction or renovation.',
    'Nach Bauarbeiten oder Renovierungen befreien wir Ihre Immobilie von Bauschutt, Zementschleiern und Feinstaub.',
    'Hammer', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    '["Bau-Grobreinigung: Entfernung von Bauschutt", "Bau-Feinreinigung bezugsfertig", "Beseitigung von Zementschleiern & Farbspritzern", "Schutzfolienentfernung von Fenstern"]'::jsonb,
    '["Pünktliche Einhaltung straffer Bauzeitenpläne", "Schonende Beseitigung hartnäckiger Baustoffreste", "Abnahmegarantie mit Bauleiter-Protokoll"]'::jsonb,
    4
  ),
  (
    'treppenhausreinigung', 'Treppenhausreinigung', 'Stairwell cleaning', 'residential', 'Hausverwaltungen', 'ab 18,00 € / Etage',
    'Der erste Eindruck eines Gebäudes zählt. Wir reinigen Stufen, Geländer, Briefkästen und Eingangstüren gründlich.',
    'First impressions count. We clean steps, railings, mailboxes and entrance doors regularly and thoroughly.',
    'Ein gepflegtes Treppenhaus ist die Visitenkarte jedes Wohngebäudes. Wir übernehmen die turnusmäßige Reinigung.',
    'Layers', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    '["Kehren und feuchtes Wischen aller Treppen & Podeste", "Abwischen von Geländern & Handläufen", "Reinigung von Eingangs- & Briefkastenanlagen", "Spinnwebenbeseitigung im gesamten Flur"]'::jsonb,
    '["Fester Tourenplan & digitaler Nachweis", "Attraktive Staffelpreise für Liegenschaften", "Kein Ärger mehr mit der Kehrwoche"]'::jsonb,
    5
  ),
  (
    'grundreinigung', 'Grundreinigung', 'Basic cleaning', 'special', 'Tiefenreinigung', 'Festpreis nach Besichtigung',
    'Intensive Pflege bei hartnäckigem Schmutz. Ideal für den Frühjahrsputz oder beim Mieterwechsel.',
    'Intensive care for stubborn dirt. Ideal for spring cleaning or when tenants change.',
    'Wenn die normale Unterhaltsreinigung nicht mehr ausreicht: Wir lösen alte Pflegemittelfilme und versiegeln Böden neu.',
    'ShieldCheck', 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1000&q=80',
    '["Maschinelle Einscheiben-Grundreinigung von PVC & Fliesen", "Neue Einpflege und Versiegelung von Hartböden", "Fugen-Tiefenreinigung und Entkalkung in Nassräumen"]'::jsonb,
    '["Wertsteigerung und Lebensdauer-Verlängerung der Böden", "Einsatz moderner Industriemaschinen", "Maßgeschneiderte Schutzversiegelungen"]'::jsonb,
    6
  )
ON CONFLICT (id) DO UPDATE SET
  title_de = EXCLUDED.title_de,
  short_desc_de = EXCLUDED.short_desc_de,
  image = EXCLUDED.image;

-- ====================================================================
-- SEED PROJECTS / GALLERY DATA
-- ====================================================================
INSERT INTO public.projects (id, title, subtitle, category, before_img, after_img, metrics_label, metrics_value, description, sort_order)
VALUES
  (
    'case-office', 'Büroboden & Konferenzraum Tiefenreinigung', 'Kanzlei Ingolstadt – 320 m²', 'Büroreinigung',
    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    'Glanzgrad & Hygiene', '100% Wiederhergestellt',
    'Vollständige Entfernung alter Laufstraßen und Polymerbeschichtung mit neuem Seidenglanz-Schutzfinish.',
    1
  ),
  (
    'case-glass', 'Fassaden- & Panoramafenster Osmosereinigung', 'Gewerbepark Ingolstadt – 180 m² Glas', 'Glasreinigung',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    'Lichtdurchlässigkeit', '+45% Streifenfrei',
    'Rückstandsfreie Beseitigung hartnäckiger Umweltschadstoffe, Kalkablagerungen und Pollenfilm ohne Chemie.',
    2
  ),
  (
    'case-construction', 'Bauendreinigung nach Kernsanierung', 'Wohnanlage Neuburg – 540 m²', 'Baureinigung',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'Baufeinstaub', '0% Rückstände',
    'Schlüsselfertige Übergabe: Beseitigung von Zementschleiern, Farbklecksen und vollständige Feinstaub-Entfernung.',
    3
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  before_img = EXCLUDED.before_img,
  after_img = EXCLUDED.after_img;

-- ====================================================================
-- SEED REVIEWS & REPUTATION DATA
-- ====================================================================
INSERT INTO public.reviews (id, name, service, rating, comment, status)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Dr. Markus Weber', 'Büro- & Praxisreinigung', 5, 'Dua & Ari kümmert sich seit über zwei Jahren um unsere Praxisräume in Ingolstadt. Die Einhaltung der Hygienevorschriften und die Zuverlässigkeit sind beispielhaft!', 'approved'),
  ('22222222-2222-2222-2222-222222222222', 'Sabine Lindner', 'Treppenhaus- & Glasreinigung', 5, 'Wir lassen über 15 Liegenschaften im Bereich Treppenhaus- und Glasreinigung von Dua & Ari reinigen. Keine Beschwerden mehr von Eigentümern und faire Preise!', 'approved'),
  ('33333333-3333-3333-3333-333333333333', 'Florian Huber', 'Büroreinigung', 5, 'Unser Großraumbüro und die Besprechungsräume glänzen jeden Morgen perfekt. Besonders schätze ich die Diskretion und die umweltfreundlichen Reinigungsmittel.', 'approved'),
  ('44444444-4444-4444-4444-444444444444', 'Elena Petrovic', 'Baureinigung', 5, 'Die Bauendreinigung unseres 8-Parteien-Neubaus wurde in Rekordzeit und mit herausragender Gründlichkeit durchgeführt. Zementschleier und Baustaub restlos beseitigt.', 'approved'),
  ('55555555-5555-5555-5555-555555555555', 'Michael & Claudia Schuster', 'Glas- & Fensterreinigung', 5, 'Wir haben die Fenster- und Wintergartenreinigung gebucht. So sauber waren unsere Scheiben seit dem Einzug nicht mehr! Pünktlich und freundlich.', 'approved')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  comment = EXCLUDED.comment,
  status = EXCLUDED.status;

-- ====================================================================
-- SEED ADMIN USERS IN AUTH.USERS & PROFILES
-- ====================================================================

-- Admin 1: admin@duaari-gebaeudereinigung.de
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

-- Admin 2: duariservice@gmail.com
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

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

CREATE OR REPLACE FUNCTION public.is_admin() RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- POLICIES FOR profiles
DROP POLICY IF EXISTS "Public profiles view" ON public.profiles;
CREATE POLICY "Public profiles view" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());

DROP POLICY IF EXISTS "Admin update profiles" ON public.profiles;
CREATE POLICY "Admin update profiles" ON public.profiles FOR UPDATE USING (public.is_admin());

-- POLICIES FOR contact_messages
DROP POLICY IF EXISTS "Anyone submit contact messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Admin manage contact messages" ON public.contact_messages;
CREATE POLICY "Anyone manage contact messages" ON public.contact_messages FOR ALL USING (true) WITH CHECK (true);

-- POLICIES FOR quote_requests
DROP POLICY IF EXISTS "Anyone submit quote requests" ON public.quote_requests;
DROP POLICY IF EXISTS "Admin manage quote requests" ON public.quote_requests;
CREATE POLICY "Anyone manage quote requests" ON public.quote_requests FOR ALL USING (true) WITH CHECK (true);

-- POLICIES FOR reviews
DROP POLICY IF EXISTS "Anyone read approved reviews" ON public.reviews;
CREATE POLICY "Anyone read approved reviews" ON public.reviews FOR SELECT USING (status = 'approved' OR public.is_admin());

DROP POLICY IF EXISTS "Anyone submit review" ON public.reviews;
CREATE POLICY "Anyone submit review" ON public.reviews FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin manage reviews" ON public.reviews;
CREATE POLICY "Admin manage reviews" ON public.reviews FOR ALL USING (public.is_admin());

-- POLICIES FOR services
DROP POLICY IF EXISTS "Anyone read services" ON public.services;
CREATE POLICY "Anyone read services" ON public.services FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage services" ON public.services;
CREATE POLICY "Admin manage services" ON public.services FOR ALL USING (public.is_admin());

-- POLICIES FOR projects
DROP POLICY IF EXISTS "Anyone read projects" ON public.projects;
CREATE POLICY "Anyone read projects" ON public.projects FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage projects" ON public.projects;
CREATE POLICY "Admin manage projects" ON public.projects FOR ALL USING (public.is_admin());

-- POLICIES FOR site_settings
DROP POLICY IF EXISTS "Anyone view site settings" ON public.site_settings;
CREATE POLICY "Anyone view site settings" ON public.site_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin update site settings" ON public.site_settings;
CREATE POLICY "Admin update site settings" ON public.site_settings FOR ALL USING (public.is_admin());

-- POLICIES FOR about_features
DROP POLICY IF EXISTS "Anyone view about features" ON public.about_features;
CREATE POLICY "Anyone view about features" ON public.about_features FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin manage about features" ON public.about_features;
CREATE POLICY "Admin manage about features" ON public.about_features FOR ALL USING (true); -- Permit read/write for seed & simplicity

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
