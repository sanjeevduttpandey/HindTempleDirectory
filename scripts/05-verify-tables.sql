-- Verify all required tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('devotees', 'user_sessions', 'devotee_activities', 'temples', 'events', 'panchang_data');

-- Check devotees table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'devotees' 
ORDER BY ordinal_position;
