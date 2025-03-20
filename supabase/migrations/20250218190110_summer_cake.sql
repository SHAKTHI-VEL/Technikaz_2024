-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    subject text NOT NULL,
    message text NOT NULL,
    status text DEFAULT 'new',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can submit enquiries"
ON enquiries FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view enquiries"
ON enquiries FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can manage enquiries"
ON enquiries FOR DELETE
TO authenticated
USING (true);

-- Create indexes
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_email ON enquiries(email);

-- Grant necessary permissions
GRANT ALL ON TABLE enquiries TO authenticated;
GRANT INSERT ON TABLE enquiries TO anon;