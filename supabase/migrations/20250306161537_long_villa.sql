/*
  # Add Draft Support
  
  1. Changes
    - Add is_draft column to blogs table
    - Add draft_at timestamp column to blogs table
    - Add published_at timestamp column to blogs table
    - Add indexes for better performance
*/

-- Add draft support columns to blogs table
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS is_draft boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS draft_at timestamptz,
ADD COLUMN IF NOT EXISTS published_at timestamptz;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blogs_is_draft ON blogs(is_draft);
CREATE INDEX IF NOT EXISTS idx_blogs_draft_at ON blogs(draft_at);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON blogs(published_at);

-- Update RLS policies to handle drafts
CREATE POLICY "Anyone can view published blogs" ON blogs
  FOR SELECT
  USING (is_draft = false OR auth.uid() IS NOT NULL);

CREATE POLICY "Only authenticated users can view draft blogs" ON blogs
  FOR SELECT
  USING (auth.uid() IS NOT NULL AND is_draft = true);