-- Add NOT NULL constraints to required fields in mobile_products table

-- Remove NOT NULL constraints from optional fields first (to allow existing data without these values)
ALTER TABLE mobile_products ALTER COLUMN camera_features DROP NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN camera_video DROP NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN selfie_camera DROP NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN selfie_camera_video DROP NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN main_camera_type DROP NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN selfie_camera_type DROP NOT NULL;

-- Then ensure required fields have NOT NULL constraints
ALTER TABLE mobile_products ALTER COLUMN name SET NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN brand SET NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN price SET NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN display_specs SET NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN processor SET NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN ram SET NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN storage SET NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN battery SET NOT NULL;
ALTER TABLE mobile_products ALTER COLUMN camera SET NOT NULL;

-- Notify PostgREST to refresh its schema cache
NOTIFY pgrst, 'reload schema';
