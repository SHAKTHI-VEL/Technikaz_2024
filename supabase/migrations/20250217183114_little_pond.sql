-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    category text NOT NULL,
    subcategories text[] DEFAULT '{}',
    author text NOT NULL,
    image_url text,
    slug text UNIQUE NOT NULL,
    featured boolean DEFAULT false,
    featured_in_category boolean DEFAULT false,
    popular boolean DEFAULT false,
    popular_in_tech boolean DEFAULT false,
    popular_in_games boolean DEFAULT false,
    popular_in_entertainment boolean DEFAULT false,
    popular_in_stocks boolean DEFAULT false,
    popular_in_gadgets boolean DEFAULT false,
    meta_title text,
    meta_description text,
    meta_keywords text,
    view_count integer DEFAULT 0,
    share_count integer DEFAULT 0,
    average_rating numeric DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Blogs are viewable by everyone" ON blogs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage blogs" ON blogs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_blogs_category ON blogs(category);
CREATE INDEX idx_blogs_subcategories ON blogs USING GIN (subcategories);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_created_at ON blogs(created_at);

-- Insert sample data
INSERT INTO blogs (
    title,
    content,
    category,
    subcategories,
    author,
    slug,
    meta_title,
    meta_description
) VALUES (
    'Sample Blog Post',
    '<p>This is a sample blog post content.</p>',
    'TECH',
    ARRAY['Tech Deals'],
    'Admin',
    'sample-blog-post',
    'Sample Blog Post - Technikaz',
    'This is a sample blog post for testing purposes.'
);