-- Add currency and publication_status columns to mobile_products table
ALTER TABLE mobile_products 
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR',
ADD COLUMN IF NOT EXISTS publication_status TEXT DEFAULT 'published';

-- Add currency and publication_status columns to laptops table
ALTER TABLE laptops 
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'INR',
ADD COLUMN IF NOT EXISTS publication_status TEXT DEFAULT 'published';

-- Update existing records to set default values
UPDATE mobile_products SET currency = 'INR' WHERE currency IS NULL;
UPDATE mobile_products SET publication_status = 'published' WHERE publication_status IS NULL;
UPDATE laptops SET currency = 'INR' WHERE currency IS NULL;
UPDATE laptops SET publication_status = 'published' WHERE publication_status IS NULL;

-- Add comments to the columns
COMMENT ON COLUMN mobile_products.currency IS 'Currency code for the product price (e.g., INR, USD)';
COMMENT ON COLUMN mobile_products.publication_status IS 'Publication status of the product (draft or published)';
COMMENT ON COLUMN laptops.currency IS 'Currency code for the product price (e.g., INR, USD)';
COMMENT ON COLUMN laptops.publication_status IS 'Publication status of the product (draft or published)';
