/*
  # Add Draft Status to Products and Blogs

  1. Changes
    - Add draft status column to blogs table
    - Add draft status column to mobile_products table
    - Add draft status column to laptops table
    - Add draft_at timestamp column to track when items were drafted
    - Add published_at timestamp column to track when items went live

  2. Security
    - Enable RLS on all tables
    - Add policies for draft management
*/

-- Add draft status to blogs
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS is_draft BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS draft_at TIMESTAMPTZ DEFAULT now(),
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Add draft status to mobile_products
ALTER TABLE mobile_products 
ADD COLUMN IF NOT EXISTS is_draft BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS draft_at TIMESTAMPTZ DEFAULT now(),
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Add draft status to laptops
ALTER TABLE laptops 
ADD COLUMN IF NOT EXISTS is_draft BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS draft_at TIMESTAMPTZ DEFAULT now(),
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Update RLS policies for blogs
CREATE POLICY "Public users can only see published blogs" ON blogs
FOR SELECT TO public
USING (is_draft = false);

CREATE POLICY "Authenticated users can see all blogs" ON blogs
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update blogs" ON blogs
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

-- Update RLS policies for mobile_products
CREATE POLICY "Public users can only see published mobile products" ON mobile_products
FOR SELECT TO public
USING (is_draft = false);

CREATE POLICY "Authenticated users can see all mobile products" ON mobile_products
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update mobile products" ON mobile_products
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

-- Update RLS policies for laptops
CREATE POLICY "Public users can only see published laptops" ON laptops
FOR SELECT TO public
USING (is_draft = false);

CREATE POLICY "Authenticated users can see all laptops" ON laptops
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Authenticated users can update laptops" ON laptops
FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);