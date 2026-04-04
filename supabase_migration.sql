-- ============================================
-- Run these SQL statements in Supabase SQL Editor
-- ============================================

-- 1. Arsenal table (for Technical Arsenal / Skills page)
CREATE TABLE IF NOT EXISTS arsenal (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL DEFAULT 'Frontend',
  name text NOT NULL,
  icon_url text DEFAULT '',
  color text DEFAULT '#8b5cf6',
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE arsenal ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON arsenal FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON arsenal FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON arsenal FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete" ON arsenal FOR DELETE USING (true);

-- 2. Experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  company text NOT NULL,
  role text NOT NULL,
  description text DEFAULT '',
  logo_url text DEFAULT '',
  image_urls text[] DEFAULT '{}',
  start_date date NOT NULL,
  end_date date,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON experience FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON experience FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON experience FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete" ON experience FOR DELETE USING (true);

-- 3. Settings table (key-value store for site settings)
CREATE TABLE IF NOT EXISTS settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON settings FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON settings FOR UPDATE USING (true);

-- Insert default language setting
INSERT INTO settings (key, value) VALUES ('site_language', 'en') ON CONFLICT (key) DO NOTHING;
-- 4. Storage Policies for experience_images
-- (Make sure you have created a bucket named 'experience_images' in Supabase Storage first)
BEGIN;
  -- Remove existing if any
  DROP POLICY IF EXISTS "Public Access" ON storage.objects;
  DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
  
  -- Create Public Select
  CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'experience_images');
  
  -- Create Authenticated Insert (Allow anonymous for now if not using Auth, but better to use true for dev)
  CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'experience_images');
  CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE USING (bucket_id = 'experience_images');
  CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE USING (bucket_id = 'experience_images');
COMMIT;
