-- This is a comprehensive migration to add ALL possibly needed columns to mobile_products table

-- Camera-related columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS camera TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS camera_features TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS camera_video TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS selfie_camera TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS selfie_camera_video TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS main_camera_type TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS selfie_camera_type TEXT;

-- Display-related columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_type TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_size TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_resolution TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS display_protection TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS resolution TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS screen_size TEXT;

-- Platform and performance columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS os TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS os_type TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS processor TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS chipset TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS cpu_details TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS gpu_details TEXT;

-- Memory-related columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS ram TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS storage TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS card_slot BOOLEAN DEFAULT false;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS memory_type TEXT;

-- Body and design columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS model_name TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS series TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS thickness TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS dimensions TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS weight TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS build_material TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS sim_type TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS protection_rating TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS color TEXT;

-- Battery and charging columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS battery TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS battery_type TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS charging_specs TEXT;

-- Launch details columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS announced TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS status TEXT;

-- Network and connectivity columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS network_technology TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS network_speed TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_2g TEXT[];
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_3g TEXT[];
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_4g TEXT[];
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bands_5g TEXT[];
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS wlan TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS bluetooth TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS nfc BOOLEAN DEFAULT false;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS gps TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS usb_type TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS radio BOOLEAN DEFAULT false;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS infrared BOOLEAN DEFAULT false;

-- Sound-related columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS loudspeaker_type TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS audio_jack BOOLEAN DEFAULT false;

-- Other features columns
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS sensors TEXT[];
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS available_colors TEXT[];
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS model_variants TEXT[];
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS brand TEXT;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS price NUMERIC;
ALTER TABLE mobile_products ADD COLUMN IF NOT EXISTS currency TEXT;

-- Notify PostgREST to refresh its schema cache
NOTIFY pgrst, 'reload schema';
