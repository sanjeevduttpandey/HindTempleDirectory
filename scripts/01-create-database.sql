-- Create database for Sanatan New Zealand platform
-- This script creates all necessary tables for devotees, temples, events, and community features

-- Users/Devotees table
CREATE TABLE devotees (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    spiritual_name VARCHAR(100),
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(20),
    city VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(500),
    favorite_deity VARCHAR(100),
    gotra VARCHAR(100),
    rashi VARCHAR(50),
    nakshatra VARCHAR(50),
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Spiritual practices junction table
CREATE TABLE devotee_spiritual_practices (
    id SERIAL PRIMARY KEY,
    devotee_id INTEGER REFERENCES devotees(id) ON DELETE CASCADE,
    practice_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interests junction table
CREATE TABLE devotee_interests (
    id SERIAL PRIMARY KEY,
    devotee_id INTEGER REFERENCES devotees(id) ON DELETE CASCADE,
    interest_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Temples table
CREATE TABLE temples (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100),
    established_year INTEGER,
    main_deity VARCHAR(100),
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    pincode VARCHAR(20),
    phone VARCHAR(20),
    email VARCHAR(255),
    website VARCHAR(500),
    image_url VARCHAR(500),
    admin_devotee_id INTEGER REFERENCES devotees(id),
    admin_name VARCHAR(255) NOT NULL,
    admin_email VARCHAR(255) NOT NULL,
    admin_phone VARCHAR(20) NOT NULL,
    admin_role VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Temple services junction table
CREATE TABLE temple_services (
    id SERIAL PRIMARY KEY,
    temple_id INTEGER REFERENCES temples(id) ON DELETE CASCADE,
    service_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Temple facilities junction table
CREATE TABLE temple_facilities (
    id SERIAL PRIMARY KEY,
    temple_id INTEGER REFERENCES temples(id) ON DELETE CASCADE,
    facility_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events/Satsangs table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type VARCHAR(50) NOT NULL, -- 'Festival', 'Puja', 'Satsang', 'Cultural', 'Educational'
    temple_id INTEGER REFERENCES temples(id),
    organizer_devotee_id INTEGER REFERENCES devotees(id),
    start_date DATE NOT NULL,
    end_date DATE,
    start_time TIME,
    end_time TIME,
    location VARCHAR(255),
    city VARCHAR(100),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    registration_fee DECIMAL(10,2) DEFAULT 0.0,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event registrations
CREATE TABLE event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    devotee_id INTEGER REFERENCES devotees(id) ON DELETE CASCADE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attendance_status VARCHAR(20) DEFAULT 'registered', -- 'registered', 'attended', 'cancelled'
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
    UNIQUE(event_id, devotee_id)
);

-- Community discussions
CREATE TABLE discussions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100), -- 'General', 'Spiritual', 'Cultural', 'Help', 'Events'
    author_devotee_id INTEGER REFERENCES devotees(id),
    is_pinned BOOLEAN DEFAULT FALSE,
    is_locked BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Discussion replies
CREATE TABLE discussion_replies (
    id SERIAL PRIMARY KEY,
    discussion_id INTEGER REFERENCES discussions(id) ON DELETE CASCADE,
    author_devotee_id INTEGER REFERENCES devotees(id),
    content TEXT NOT NULL,
    parent_reply_id INTEGER REFERENCES discussion_replies(id), -- For nested replies
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donations/Daan
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    devotee_id INTEGER REFERENCES devotees(id),
    temple_id INTEGER REFERENCES temples(id),
    event_id INTEGER REFERENCES events(id),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'NZD',
    donation_type VARCHAR(50), -- 'General', 'Annadaan', 'Temple Maintenance', 'Festival', 'Charity'
    purpose TEXT,
    payment_method VARCHAR(50), -- 'Credit Card', 'Bank Transfer', 'Cash', 'Online'
    transaction_id VARCHAR(255),
    payment_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Temple reviews and ratings
CREATE TABLE temple_reviews (
    id SERIAL PRIMARY KEY,
    temple_id INTEGER REFERENCES temples(id) ON DELETE CASCADE,
    devotee_id INTEGER REFERENCES devotees(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    visit_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(temple_id, devotee_id)
);

-- Devotee activity log
CREATE TABLE devotee_activities (
    id SERIAL PRIMARY KEY,
    devotee_id INTEGER REFERENCES devotees(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL, -- 'temple_visit', 'event_attendance', 'donation', 'puja_performed', 'discussion_post'
    activity_description TEXT,
    related_temple_id INTEGER REFERENCES temples(id),
    related_event_id INTEGER REFERENCES events(id),
    related_discussion_id INTEGER REFERENCES discussions(id),
    metadata JSONB, -- For storing additional activity-specific data
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Spiritual calendar/Panchang data
CREATE TABLE panchang_data (
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
    special_occasions TEXT[], -- Array of festivals/special days
    auspicious_times JSONB, -- Store muhurat timings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions for authentication
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    devotee_id INTEGER REFERENCES devotees(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social login providers
CREATE TABLE social_logins (
    id SERIAL PRIMARY KEY,
    devotee_id INTEGER REFERENCES devotees(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'google', 'facebook', 'github'
    provider_user_id VARCHAR(255) NOT NULL,
    provider_email VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider, provider_user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_devotees_email ON devotees(email);
CREATE INDEX idx_devotees_city ON devotees(city);
CREATE INDEX idx_temples_city ON temples(city);
CREATE INDEX idx_events_date ON events(start_date);
CREATE INDEX idx_events_temple ON events(temple_id);
CREATE INDEX idx_discussions_category ON discussions(category);
CREATE INDEX idx_donations_devotee ON donations(devotee_id);
CREATE INDEX idx_activities_devotee ON devotee_activities(devotee_id);
CREATE INDEX idx_panchang_date ON panchang_data(date);
