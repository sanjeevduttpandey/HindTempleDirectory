CREATE TABLE IF NOT EXISTS devotees (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    spiritual_name VARCHAR(100),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(10),
    city VARCHAR(100),
    address TEXT,
    bio TEXT,
    avatar_url TEXT,
    gotra VARCHAR(50),
    rashi VARCHAR(50),
    nakshatra VARCHAR(50),
    spiritual_practices JSONB DEFAULT '[]'::jsonb,
    interests JSONB DEFAULT '[]'::jsonb,
    subscribe_newsletter BOOLEAN DEFAULT FALSE,
    allow_community_contact BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_sessions (
    id SERIAL PRIMARY KEY,
    devotee_id INTEGER NOT NULL REFERENCES devotees(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temples (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100) UNIQUE,
    established_year INTEGER,
    main_deity VARCHAR(100),
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    image_url TEXT, -- Main image for the temple
    admin_name VARCHAR(255),
    admin_email VARCHAR(255),
    admin_phone VARCHAR(20),
    admin_role VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    rating NUMERIC(2,1) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temple_services (
    id SERIAL PRIMARY KEY,
    temple_id INTEGER NOT NULL REFERENCES temples(id) ON DELETE CASCADE,
    service_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS temple_facilities (
    id SERIAL PRIMARY KEY,
    temple_id INTEGER NOT NULL REFERENCES temples(id) ON DELETE CASCADE,
    facility_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    full_description TEXT,
    event_type VARCHAR(100),
    temple_id INTEGER REFERENCES temples(id) ON DELETE SET NULL,
    organizer_devotee_id INTEGER REFERENCES devotees(id) ON DELETE SET NULL,
    organizer_name VARCHAR(255), -- Store organizer name if not linked to a devotee/temple
    organizer_email VARCHAR(255),
    organizer_phone VARCHAR(20),
    organizer_website VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE,
    start_time TIME,
    end_time TIME,
    location TEXT NOT NULL,
    address TEXT,
    city VARCHAR(100) NOT NULL,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    registration_fee NUMERIC(10, 2) DEFAULT 0.00,
    is_free BOOLEAN DEFAULT TRUE,
    image_url TEXT, -- Main image for the event
    image_urls JSONB DEFAULT '[]'::jsonb, -- New: For multiple images
    requirements TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- New: 'pending', 'approved', 'rejected'
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    devotee_id INTEGER NOT NULL REFERENCES devotees(id) ON DELETE CASCADE,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    attendance_status VARCHAR(50) DEFAULT 'registered', -- e.g., 'registered', 'attended', 'cancelled'
    payment_status VARCHAR(50) DEFAULT 'pending', -- e.g., 'pending', 'paid', 'failed', 'refunded'
    payment_amount NUMERIC(10, 2),
    transaction_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS discussions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100),
    author_devotee_id INTEGER NOT NULL REFERENCES devotees(id) ON DELETE CASCADE,
    views_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS discussion_replies (
    id SERIAL PRIMARY KEY,
    discussion_id INTEGER NOT NULL REFERENCES discussions(id) ON DELETE CASCADE,
    author_devotee_id INTEGER NOT NULL REFERENCES devotees(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    devotee_id INTEGER REFERENCES devotees(id) ON DELETE SET NULL,
    temple_id INTEGER REFERENCES temples(id) ON DELETE SET NULL,
    event_id INTEGER REFERENCES events(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    donation_type VARCHAR(100), -- e.g., 'Annadaan', 'Temple Maintenance', 'Festival', 'Charity'
    purpose TEXT,
    payment_method VARCHAR(100),
    payment_status VARCHAR(50) DEFAULT 'pending', -- e.g., 'pending', 'completed', 'failed'
    transaction_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS panchang_data (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    tithi VARCHAR(100),
    nakshatra VARCHAR(100),
    yoga VARCHAR(100),
    karana VARCHAR(100),
    sunrise TIME,
    sunset TIME,
    moonrise TIME,
    moonset TIME,
    special_occasions TEXT[], -- Array of strings for special occasions
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS devotee_activities (
    id SERIAL PRIMARY KEY,
    devotee_id INTEGER NOT NULL REFERENCES devotees(id) ON DELETE CASCADE,
    activity_type VARCHAR(100) NOT NULL, -- e.g., 'login', 'event_registration', 'temple_visit', 'discussion_post', 'donation'
    activity_description TEXT,
    related_temple_id INTEGER REFERENCES temples(id) ON DELETE SET NULL,
    related_event_id INTEGER REFERENCES events(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2), -- For donations or paid registrations
    metadata JSONB DEFAULT '{}'::jsonb, -- For additional structured data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS businesses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(255),
    image_url TEXT, -- Main image for the business
    services JSONB DEFAULT '[]'::jsonb, -- Array of services offered
    operating_hours JSONB DEFAULT '[]'::jsonb, -- e.g., [{"day": "Mon", "open": "09:00", "close": "17:00"}]
    special_offers TEXT,
    social_media JSONB DEFAULT '{}'::jsonb, -- e.g., {"facebook": "url", "instagram": "url"}
    submitted_by_devotee_id INTEGER REFERENCES devotees(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL, -- 'pending', 'approved', 'rejected'
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
