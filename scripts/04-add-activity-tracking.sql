-- Add activity tracking enhancements
ALTER TABLE devotee_activities 
ADD COLUMN IF NOT EXISTS amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_devotee_activities_devotee_date 
ON devotee_activities(devotee_id, created_at DESC);

-- Add some sample activity types if they don't exist
INSERT INTO activity_types (name, description) VALUES 
('event', 'Event participation'),
('donation', 'Financial donation'),
('puja', 'Puja or ritual participation'),
('visit', 'Temple visit'),
('seva', 'Service or volunteer work'),
('satsang', 'Spiritual gathering'),
('learning', 'Learning or study session')
ON CONFLICT (name) DO NOTHING;
