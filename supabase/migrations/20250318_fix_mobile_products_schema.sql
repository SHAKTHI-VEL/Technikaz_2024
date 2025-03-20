-- Remove os_type column if it exists
ALTER TABLE mobile_products 
DROP COLUMN IF EXISTS os_type;

-- Add os_type to laptops table if it doesn't exist
ALTER TABLE laptops 
ADD COLUMN IF NOT EXISTS os_type TEXT;
