CREATE TABLE IF NOT EXISTS businesses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name VARCHAR(255) NOT NULL,
    category VARCHAR(255),
    description TEXT,
    address VARCHAR(255),
    city VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(255),
    website VARCHAR(255),
    owner_name VARCHAR(255),
    owner_email VARCHAR(255),
    owner_phone VARCHAR(50),
    operating_hours TEXT,
    special_offers TEXT,
    services TEXT[],
    social_media JSONB,
    images TEXT[],
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- 'pending', 'approved', 'rejected'
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT FALSE NOT NULL,
    approved_at TIMESTAMPTZ,
    rating NUMERIC(2, 1)
);
