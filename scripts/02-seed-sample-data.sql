-- Insert sample temples
INSERT INTO temples (name, main_deity, description, address, city, phone, email, website, image_url, rating, total_reviews, timings, established_year, is_verified, is_active) VALUES
('Shri Sanatan Dharm Mandir', 'Multi-deity', 'One of the largest Hindu temples in New Zealand, serving the community since 1992.', '98 Balmoral Road, Mount Eden', 'Auckland', '+64 9 630 5540', 'info@aucklandmandir.org.nz', 'https://www.aucklandmandir.org.nz', '/images/shri-sanatan-dharm-mandir-auckland.jpg', 4.8, 120, '6:00 AM - 8:00 PM', 1992, true, true),
('Kurinchi Kumaran Temple', 'Murugan', 'A beautiful temple dedicated to Lord Murugan, serving the Wellington Hindu community.', '3 Batchelor Street, Newlands', 'Wellington', '+64 4 477 4346', 'secretary@kktemplewellington.org', 'https://www.kktemplewellington.org.nz/', '/images/kurinchi-kumaran-temple-ceremony.jpg', 4.7, 95, '6:00 AM - 8:00 PM', 1995, true, true),
('Wellington Indian Association', 'Cultural Center', 'Wellington''s premier Indian cultural organization promoting Indian heritage.', 'Level 2, 126 Vivian Street, Te Aro', 'Wellington', '+64 4 385 2276', 'info@wia.org.nz', 'https://www.wia.org.nz/', '/images/wellington-indian-association-night.jpg', 4.5, 78, '9:00 AM - 5:00 PM', 1950, true, true),
('Hindu Temple Society of Canterbury', 'Multi-deity', 'The main Hindu temple in Christchurch, serving the Canterbury region.', '20 Ombersley Terrace, Opawa', 'Christchurch', '+64 3 332 1952', 'info@hindutemple.org.nz', 'https://www.hindutemple.org.nz/', '/images/hindu-temple-society-canterbury-exterior.jpg', 4.8, 92, '6:30 AM - 8:00 PM', 2010, true, true),
('ISKCON Wellington', 'Krishna', 'International Society for Krishna Consciousness temple promoting Krishna consciousness.', '90 Daniell Street, Newtown', 'Wellington', '+64 4 389 0644', 'wellington@iskcon.org.nz', 'https://iskconwellington.com/', '/images/iskcon-wellington-altar.jpg', 4.8, 134, '4:30 AM - 9:00 PM', 1975, true, true),
('BAPS Shri Swaminarayan Mandir', 'Swaminarayan', 'A magnificent Swaminarayan temple serving the Wellington community.', '15 Raroa Road, Kelburn', 'Wellington', '+64 4 475 8811', 'wellington@baps.org', 'https://www.baps.org/', '/images/baps-wellington-interior.jpg', 4.9, 156, '6:00 AM - 8:30 PM', 2008, true, true),
('Hamilton Shiva Temple', 'Shiva', 'A beautiful temple dedicated to Lord Shiva, known for its peaceful atmosphere.', '12 Temple View Road, Hillcrest', 'Hamilton', '+64 7 855 4200', 'info@hamiltonshivatemple.org.nz', 'https://www.hamiltonshivatemple.org.nz/', '/images/hamilton-shiva-temple-main.jpg', 4.7, 89, '6:00 AM - 8:00 PM', 2005, true, true),
('Dunedin Hindu Temple', 'Durga', 'The southernmost Hindu temple in New Zealand, serving the Otago region.', '156 Great King Street, North Dunedin', 'Dunedin', '+64 3 474 0800', 'info@dunedinhindutemple.org.nz', 'https://www.dunedinhindutemple.org.nz/', '/images/dunedin-hindu-temple-interior.jpg', 4.6, 67, '7:00 AM - 7:00 PM', 2008, true, true),
('Bharatiya Mandir', 'Multi-deity', 'One of Auckland''s oldest Hindu temples, serving the community since 1987.', '252-254 Balmoral Road, Sandringham', 'Auckland', '+64 9 846 2677', 'info@bharatiyamandir.org.nz', 'https://www.bharatiyamandir.org.nz/', '/images/bharatiya-mandir-interior.jpg', 4.7, 105, '6:00 AM - 8:30 PM', 1987, true, true),
('Auckland Sri Ganesh Temple', 'Ganesha', 'Established in 2002, dedicated to Lord Ganesha with regular spiritual activities.', '4 Dent Place, Papakura', 'Auckland', '+64 9 298 4450', 'info@aucklandsriganeshtemple.com', 'https://www.aucklandsriganeshtemple.com/', '/images/auckland-sri-ganesh-temple-deity.jpg', 4.9, 112, '10:00 AM - 1:00 PM, 6:00 PM - 9:00 PM', 2002, true, true),
('BAPS Shri Swaminarayan Mandir, Avondale', 'Swaminarayan', 'A magnificent Swaminarayan temple in Avondale serving the Auckland community.', '21 Fairlands Avenue, Avondale', 'Auckland', '+64 9 828 2277', 'auckland@baps.org', 'https://www.baps.org/', '/images/baps-auckland-avondale-main.jpg', 4.9, 124, '6:00 AM - 8:30 PM', 2007, true, true),
('BAPS Shri Swaminarayan Mandir, Christchurch', 'Swaminarayan', 'A beautiful Swaminarayan temple serving the Christchurch community.', '19 Grahams Road, Papanui', 'Christchurch', '+64 3 352 5000', 'christchurch@baps.org', 'https://www.baps.org/', '/images/baps-christchurch-interior.jpg', 4.9, 78, '7:00 AM - 8:00 PM', 2012, true, true),
('ISKCON Christchurch', 'Krishna', 'ISKCON temple promoting Krishna consciousness in Christchurch.', '83 Bealey Avenue, Christchurch Central', 'Christchurch', '+64 3 366 7699', 'christchurch@iskcon.org.nz', 'https://harekrishnachristchurch.co.nz/', '/images/iskcon-christchurch-deities.jpg', 4.8, 72, '5:00 AM - 8:30 PM', 1980, true, true);

-- Insert sample events
INSERT INTO events (title, description, event_type, start_date, start_time, end_date, end_time, location, city, temple_id, max_participants, current_participants, registration_fee, image_url, is_active) VALUES
('Diwali Celebration 2024', 'Join us for the grandest Diwali celebration in Auckland with cultural performances, traditional food, and fireworks.', 'Festival', '2024-11-12', '18:00:00', '2024-11-12', '22:00:00', 'Auckland Town Hall', 'Auckland', 1, 500, 450, 0.00, '/placeholder.svg?height=200&width=400', true),
('Hanuman Jayanti Celebration', 'Special puja and bhajan session to celebrate the birth of Lord Hanuman.', 'Religious', '2024-11-15', '07:00:00', '2024-11-15', '12:00:00', 'Wellington Hindu Temple', 'Wellington', 2, 200, 120, 0.00, '/placeholder.svg?height=200&width=400', true),
('Bhagavad Gita Study Circle', 'Weekly study session exploring the teachings of the Bhagavad Gita with discussion and Q&A.', 'Educational', '2024-11-18', '14:00:00', '2024-11-18', '16:00:00', 'Christchurch Community Center', 'Christchurch', 4, 40, 25, 0.00, '/placeholder.svg?height=200&width=400', true),
('Classical Indian Dance Workshop', 'Learn the basics of Bharatanatyam dance with professional instructor.', 'Cultural', '2024-11-20', '10:00:00', '2024-11-20', '15:00:00', 'Hamilton Arts Centre', 'Hamilton', 7, 30, 15, 25.00, '/placeholder.svg?height=200&width=400', true),
('Yoga and Meditation Retreat', 'Day-long retreat focusing on traditional yoga practices and meditation techniques.', 'Wellness', '2024-11-25', '09:00:00', '2024-11-25', '17:00:00', 'Tauranga Wellness Center', 'Tauranga', NULL, 50, 35, 75.00, '/placeholder.svg?height=200&width=400', true),
('Karthik Purnima Celebration', 'Special evening prayers and cultural program to celebrate Karthik Purnima.', 'Religious', '2024-11-27', '18:30:00', '2024-11-27', '21:00:00', 'Dunedin Hindu Temple', 'Dunedin', 8, 120, 80, 0.00, '/placeholder.svg?height=200&width=400', true);

-- Insert sample devotees
INSERT INTO devotees (email, password_hash, first_name, last_name, spiritual_name, phone, date_of_birth, gender, city, address, gotra, rashi, nakshatra, spiritual_practices, interests, bio, avatar_url, subscribe_newsletter, allow_community_contact, is_verified, is_active) VALUES
('ram.sharma@email.com', '$2b$10$example_hash_1', 'Ram', 'Sharma', 'Ramananda', '+64 21 123 4567', '1985-03-15', 'Male', 'Auckland', '123 Queen Street, Auckland', 'Bharadwaj', 'Mesha', 'Ashwini', '["Daily Puja", "Meditation", "Bhajan"]', '["Temple Activities", "Yoga", "Sanskrit"]', 'Devoted follower of Sanatan Dharma, active in community service.', '/placeholder-user.jpg', true, true, true, true),
('priya.patel@email.com', '$2b$10$example_hash_2', 'Priya', 'Patel', 'Priyanka', '+64 21 234 5678', '1990-07-22', 'Female', 'Wellington', '456 Lambton Quay, Wellington', 'Kashyap', 'Vrishabha', 'Rohini', '["Kirtan", "Fasting", "Scripture Study"]', '["Classical Dance", "Music", "Cooking"]', 'Classical dancer and devotee, teaches Bharatanatyam to children.', '/placeholder-user.jpg', true, true, true, true),
('arjun.singh@email.com', '$2b$10$example_hash_3', 'Arjun', 'Singh', 'Arjuna', '+64 21 345 6789', '1988-12-10', 'Male', 'Christchurch', '789 Cathedral Square, Christchurch', 'Atri', 'Dhanu', 'Mula', '["Yoga", "Pranayama", "Satsang"]', '["Philosophy", "Meditation", "Community Service"]', 'Yoga instructor and spiritual seeker, organizes community events.', '/placeholder-user.jpg', false, true, true, true);

-- Insert sample panchang data
INSERT INTO panchang_data (date, tithi, nakshatra, yoga, karana, sunrise, sunset, moonrise, moonset, rahu_kaal, gulika_kaal, yamaganda_kaal, abhijit_muhurat, brahma_muhurat, good_time, avoid_time, special_notes) VALUES
('2024-11-15', 'Chaturdashi', 'Bharani', 'Siddha', 'Bava', '06:15:00', '19:45:00', '02:30:00', '15:20:00', '07:30:00-09:00:00', '13:30:00-15:00:00', '10:30:00-12:00:00', '11:45:00-12:30:00', '04:30:00-06:15:00', '06:15:00-07:30:00,15:00:00-16:30:00', '07:30:00-09:00:00,13:30:00-15:00:00', 'Auspicious day for new beginnings'),
('2024-11-16', 'Purnima', 'Krittika', 'Vyaghata', 'Balava', '06:16:00', '19:46:00', '03:15:00', '16:10:00', '08:00:00-09:30:00', '14:00:00-15:30:00', '11:00:00-12:30:00', '11:46:00-12:31:00', '04:31:00-06:16:00', '06:16:00-08:00:00,15:30:00-17:00:00', '08:00:00-09:30:00,14:00:00-15:30:00', 'Full moon day, good for spiritual practices');

-- Insert business submissions (approved)
INSERT INTO business_submissions (
    business_name, category, description, address, city, phone, email, website,
    owner_name, owner_email, owner_phone, services, social_media, operating_hours,
    special_offers, status, submitted_at, reviewed_at, review_notes, rating, images
) VALUES 
(
    'BizApps365',
    'IT',
    'Microsoft 365 solutions, business applications, and digital transformation services. Specializing in SharePoint, Power Platform, Teams integration, and business process automation for small to medium businesses.',
    'Auckland CBD',
    'Auckland',
    '+64 9 123 4567',
    'info@bizapps365.co.nz',
    'https://www.bizapps365.co.nz/',
    'BizApps365 Team',
    'info@bizapps365.co.nz',
    '+64 9 123 4567',
    '["Microsoft 365 Solutions", "SharePoint Development", "Power Platform", "Teams Integration", "Business Process Automation", "Cloud Migration", "Custom Applications", "IT Consulting"]',
    '{"website": "https://www.bizapps365.co.nz/", "linkedin": "https://www.linkedin.com/company/bizapps365"}',
    'Monday-Friday: 9:00 AM - 5:00 PM, Saturday-Sunday: Closed',
    'Free consultation for new clients. 10% discount on first project for Sanatan community members.',
    'approved',
    '2024-01-15 10:00:00',
    '2024-01-16 14:30:00',
    'Excellent technology services provider with strong Microsoft certifications. Great addition to our directory.',
    4.9,
    '["/images/bizapps365-logo.png"]'
),
(
    'Spice Garden Restaurant',
    'Restaurants & Food',
    'Authentic Indian vegetarian restaurant serving traditional North and South Indian cuisine. Family-owned business with recipes passed down through generations.',
    '123 Queen Street',
    'Auckland',
    '+64 9 234 5678',
    'info@spicegarden.co.nz',
    'https://www.spicegarden.co.nz',
    'Raj Patel',
    'raj@spicegarden.co.nz',
    '+64 21 234 5678',
    '["Vegetarian Cuisine", "Catering Services", "Private Dining", "Cooking Classes", "Takeaway"]',
    '{"facebook": "https://facebook.com/spicegardenakl", "instagram": "@spicegardenakl"}',
    'Tuesday-Sunday: 11:00 AM - 9:00 PM, Monday: Closed',
    '20% off for temple events catering. Free delivery within 5km.',
    'approved',
    '2024-02-01 09:30:00',
    '2024-02-02 11:15:00',
    'Excellent vegetarian restaurant with authentic flavors. Highly recommended.',
    4.7,
    '["/placeholder.svg?height=200&width=300"]'
),
(
    'Ganesh Grocery & Spices',
    'Grocery & Spices',
    'Your one-stop shop for Indian groceries, spices, and religious items. We stock fresh vegetables, authentic spices, and hard-to-find Indian ingredients.',
    '456 Dominion Road',
    'Auckland',
    '+64 9 345 6789',
    'info@ganeshgrocery.co.nz',
    '',
    'Sunita Sharma',
    'sunita@ganeshgrocery.co.nz',
    '+64 21 345 6789',
    '["Indian Groceries", "Fresh Spices", "Religious Items", "Fresh Vegetables", "Frozen Foods", "Home Delivery"]',
    '{"facebook": "https://facebook.com/ganeshgrocery"}',
    'Monday-Saturday: 9:00 AM - 8:00 PM, Sunday: 10:00 AM - 6:00 PM',
    'Free home delivery for orders over $50. 5% discount for temple members.',
    'approved',
    '2024-02-10 16:20:00',
    '2024-02-11 10:45:00',
    'Well-stocked grocery store with competitive prices and good service.',
    4.5,
    '["/placeholder.svg?height=200&width=300"]'
);
