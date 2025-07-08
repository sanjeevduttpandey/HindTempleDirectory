-- Seed sample data for Sanatan New Zealand platform
-- This script populates the database with sample devotees, temples, and events

-- Insert sample devotees
INSERT INTO devotees (email, password_hash, first_name, last_name, spiritual_name, phone, date_of_birth, gender, city, bio, favorite_deity, gotra, rashi, nakshatra) VALUES
('priya.sharma@email.com', '$2b$10$example_hash_1', 'Priya', 'Sharma', 'Bhakti Priya', '+64 21 123 4567', '1990-05-15', 'female', 'Auckland', 'Devoted follower of Lord Krishna, passionate about Bhakti Yoga and community service.', 'Krishna', 'Bharadwaj', 'Vrishabha', 'Rohini'),
('raj.kumar@email.com', '$2b$10$example_hash_2', 'Raj', 'Kumar', 'Dharma Raj', '+64 21 234 5678', '1985-08-22', 'male', 'Wellington', 'Sanskrit scholar and yoga instructor, dedicated to spreading Vedic knowledge.', 'Shiva', 'Kashyap', 'Simha', 'Magha'),
('meera.patel@email.com', '$2b$10$example_hash_3', 'Meera', 'Patel', 'Seva Meera', '+64 21 345 6789', '1992-12-03', 'female', 'Christchurch', 'Active in temple activities and community service, loves organizing cultural events.', 'Durga', 'Atri', 'Dhanu', 'Mula'),
('arjun.singh@email.com', '$2b$10$example_hash_4', 'Arjun', 'Singh', 'Karma Arjun', '+64 21 456 7890', '1988-03-18', 'male', 'Hamilton', 'Bhagavad Gita study group leader, passionate about spiritual discussions.', 'Krishna', 'Vasishtha', 'Mesha', 'Ashwini'),
('lakshmi.reddy@email.com', '$2b$10$example_hash_5', 'Lakshmi', 'Reddy', 'Bhakti Lakshmi', '+64 21 567 8901', '1995-07-25', 'female', 'Auckland', 'Classical music enthusiast, leads bhajan sessions at local temple.', 'Saraswati', 'Angiras', 'Karka', 'Pushya');

-- Insert spiritual practices for devotees
INSERT INTO devotee_spiritual_practices (devotee_id, practice_name) VALUES
(1, 'Daily Puja'), (1, 'Meditation'), (1, 'Bhajan/Kirtan'), (1, 'Fasting (Vrat)'),
(2, 'Yoga'), (2, 'Pranayama'), (2, 'Scripture Reading'), (2, 'Meditation'),
(3, 'Seva (Service)'), (3, 'Daily Puja'), (3, 'Satsang'), (3, 'Bhajan/Kirtan'),
(4, 'Scripture Reading'), (4, 'Meditation'), (4, 'Satsang'), (4, 'Japa Meditation'),
(5, 'Bhajan/Kirtan'), (5, 'Daily Puja'), (5, 'Classical Music'), (5, 'Meditation');

-- Insert interests for devotees
INSERT INTO devotee_interests (devotee_id, interest_name) VALUES
(1, 'Temple Activities'), (1, 'Cultural Events'), (1, 'Sanskrit Learning'), (1, 'Classical Music'),
(2, 'Yoga & Meditation'), (2, 'Philosophy'), (2, 'Sanskrit Learning'), (2, 'Community Service'),
(3, 'Cultural Events'), (3, 'Community Service'), (3, 'Festivals'), (3, 'Cooking'),
(4, 'Philosophy'), (4, 'Sanskrit Learning'), (4, 'Youth Programs'), (4, 'Temple Activities'),
(5, 'Classical Music'), (5, 'Dance'), (5, 'Cultural Events'), (5, 'Temple Activities');

-- Insert sample temples
INSERT INTO temples (name, registration_number, established_year, main_deity, description, address, city, pincode, phone, email, website, admin_name, admin_email, admin_phone, admin_role, is_verified, rating, total_reviews) VALUES
('Shri Sanatan Dharm Mandir', 'REG001', 1992, 'Multi-deity', 'One of the largest Hindu temples in New Zealand, serving the community with traditional worship and cultural programs.', '98 Balmoral Road, Mount Eden', 'Auckland', '1024', '+64 9 630 5540', 'info@aucklandtemple.org.nz', 'https://www.aucklandtemple.org.nz', 'Pandit Sharma', 'admin@aucklandtemple.org.nz', '+64 9 630 5540', 'Head Priest', TRUE, 4.8, 120),
('ISKCON Auckland', 'REG002', 1989, 'Krishna', 'International Society for Krishna Consciousness temple dedicated to Lord Krishna with daily programs and festivals.', '16 Grotto Street, Freemans Bay', 'Auckland', '1011', '+64 9 378 7879', 'auckland@iskcon.org.nz', 'https://www.iskconauckland.org.nz', 'Govinda Das', 'temple@iskconauckland.org.nz', '+64 9 378 7879', 'Temple President', TRUE, 4.9, 156),
('Wellington Indian Association', 'REG003', 1975, 'Multi-deity', 'Wellington premier Indian cultural organization promoting Indian heritage, culture, and community activities.', 'Level 2, 126 Vivian Street', 'Wellington', '6011', '+64 4 385 9525', 'info@wellingtonindian.org.nz', 'https://www.wellingtonindian.org.nz', 'Rajesh Gupta', 'president@wellingtonindian.org.nz', '+64 4 385 9525', 'President', TRUE, 4.5, 78),
('Shiva Vishnu Temple Hamilton', 'REG004', 1998, 'Shiva', 'Beautiful temple dedicated to Lord Shiva with regular pujas and spiritual programs.', '45 Boundary Road, Claudelands', 'Hamilton', '3214', '+64 7 855 7788', 'info@hamiltontemple.org.nz', 'https://www.hamiltontemple.org.nz', 'Acharya Krishnan', 'acharya@hamiltontemple.org.nz', '+64 7 855 7788', 'Head Priest', TRUE, 4.7, 89),
('BAPS Shri Swaminarayan Mandir', 'REG005', 2005, 'Swaminarayan', 'Magnificent Swaminarayan temple serving the community with traditional worship and cultural programs.', '12 Mahoe Street, Te Aro', 'Wellington', '6011', '+64 4 384 9876', 'wellington@baps.org', 'https://www.baps.org/wellington', 'Swami Brahmanand', 'mandir@baps.org', '+64 4 384 9876', 'Temple Administrator', TRUE, 4.9, 134);

-- Insert temple services
INSERT INTO temple_services (temple_id, service_name) VALUES
(1, 'Daily Aarti'), (1, 'Weekly Bhajan'), (1, 'Festival Celebrations'), (1, 'Wedding Ceremonies'), (1, 'Sanskrit Classes'),
(2, 'Daily Aarti'), (2, 'Bhagavatam Classes'), (2, 'Festival Celebrations'), (2, 'Yoga Classes'), (2, 'Prasadam Distribution'),
(3, 'Cultural Programs'), (3, 'Festival Celebrations'), (3, 'Community Events'), (3, 'Language Classes'), (3, 'Youth Programs'),
(4, 'Daily Puja'), (4, 'Shiva Abhishek'), (4, 'Festival Celebrations'), (4, 'Meditation Sessions'), (4, 'Religious Counseling'),
(5, 'Daily Aarti'), (5, 'Satsang'), (5, 'Festival Celebrations'), (5, 'Cultural Programs'), (5, 'Youth Activities');

-- Insert temple facilities
INSERT INTO temple_facilities (temple_id, facility_name) VALUES
(1, 'Parking Available'), (1, 'Community Hall'), (1, 'Kitchen Facilities'), (1, 'Library'), (1, 'Audio/Visual Equipment'),
(2, 'Parking Available'), (2, 'Prasadam Hall'), (2, 'Bookstore'), (2, 'Garden/Outdoor Space'), (2, 'Children\'s Area'),
(3, 'Parking Available'), (3, 'Community Hall'), (3, 'Kitchen Facilities'), (3, 'Audio/Visual Equipment'), (3, 'Air Conditioning'),
(4, 'Parking Available'), (4, 'Meditation Hall'), (4, 'Library'), (4, 'Garden/Outdoor Space'), (4, 'Restrooms'),
(5, 'Parking Available'), (5, 'Community Hall'), (5, 'Kitchen Facilities'), (5, 'Children\'s Area'), (5, 'Audio/Visual Equipment');

-- Insert sample events/satsangs
INSERT INTO events (title, description, event_type, temple_id, organizer_devotee_id, start_date, end_date, start_time, end_time, location, city, max_participants, registration_fee) VALUES
('Janmashtami Celebration 2024', 'Grand celebration of Lord Krishna birthday with special pujas, bhajans, and cultural programs.', 'Festival', 2, 1, '2024-08-26', '2024-08-26', '18:00', '22:00', 'ISKCON Auckland', 'Auckland', 500, 0.00),
('Ganesha Chaturthi Puja', 'Special puja and celebration for Lord Ganesha with traditional rituals and prasadam.', 'Puja', 1, 3, '2024-09-07', '2024-09-07', '10:00', '13:00', 'Sanatan Dharm Mandir', 'Auckland', 200, 5.00),
('Bhagavad Gita Study Circle', 'Weekly study group discussing the teachings of Bhagavad Gita with spiritual insights.', 'Satsang', 4, 4, '2024-08-20', '2024-08-20', '19:00', '21:00', 'Shiva Vishnu Temple', 'Hamilton', 50, 0.00),
('Navratri Festival 2024', 'Nine-day celebration honoring Divine Mother with daily pujas, aarti, and cultural programs.', 'Festival', 1, 2, '2024-10-03', '2024-10-11', '18:30', '21:30', 'Sanatan Dharm Mandir', 'Auckland', 300, 10.00),
('Diwali Celebration', 'Festival of lights celebration with special pujas, cultural programs, and community feast.', 'Festival', 3, 5, '2024-11-01', '2024-11-01', '17:00', '22:00', 'Wellington Indian Association', 'Wellington', 400, 15.00);

-- Insert sample event registrations
INSERT INTO event_registrations (event_id, devotee_id, attendance_status, payment_status) VALUES
(1, 1, 'registered', 'paid'), (1, 2, 'registered', 'paid'), (1, 3, 'registered', 'paid'),
(2, 1, 'attended', 'paid'), (2, 4, 'registered', 'paid'),
(3, 4, 'attended', 'paid'), (3, 2, 'registered', 'paid'),
(4, 1, 'registered', 'paid'), (4, 3, 'registered', 'paid'), (4, 5, 'registered', 'paid'),
(5, 2, 'registered', 'paid'), (5, 5, 'registered', 'paid');

-- Insert sample discussions
INSERT INTO discussions (title, content, category, author_devotee_id, views_count, replies_count) VALUES
('Best places for sattvic food in Auckland?', 'Looking for recommendations for pure vegetarian restaurants that serve sattvic food in Auckland. Any suggestions?', 'General', 1, 45, 12),
('Organizing Karva Chauth vrat celebration', 'Planning to organize Karva Chauth celebration in our community. Looking for volunteers and suggestions for venue.', 'Cultural', 3, 32, 8),
('Sanskrit learning sangam in Wellington', 'Starting a Sanskrit learning group in Wellington. Interested devotees please join us every Saturday.', 'Spiritual', 2, 67, 15),
('Meditation techniques for beginners', 'Sharing some simple meditation techniques that have helped me in my spiritual journey. Hope this helps others.', 'Spiritual', 4, 89, 23),
('Temple volunteer opportunities', 'Our temple is looking for volunteers for upcoming festivals. Great way to do seva and connect with community.', 'Help', 5, 56, 18);

-- Insert sample discussion replies
INSERT INTO discussion_replies (discussion_id, author_devotee_id, content) VALUES
(1, 2, 'I highly recommend Govinda\'s restaurant in the city. They serve excellent sattvic food.'),
(1, 4, 'There\'s also a great place called Sattvic Kitchen in Newmarket. Very authentic.'),
(2, 1, 'I would love to help with the organization. Count me in!'),
(2, 5, 'We can use our community hall for the celebration. Let me know if you need it.'),
(3, 4, 'This is wonderful! I\'ve been wanting to learn Sanskrit. What time on Saturdays?'),
(3, 1, 'Great initiative! I can help with teaching basic Sanskrit grammar.'),
(4, 3, 'Thank you for sharing! The breathing technique you mentioned really works.'),
(5, 1, 'I\'m interested in volunteering. What kind of help do you need?');

-- Insert sample donations
INSERT INTO donations (devotee_id, temple_id, event_id, amount, donation_type, purpose, payment_method, payment_status) VALUES
(1, 1, NULL, 100.00, 'Annadaan', 'For daily prasadam distribution', 'Credit Card', 'completed'),
(2, 2, 1, 50.00, 'Festival', 'Janmashtami celebration expenses', 'Bank Transfer', 'completed'),
(3, 1, NULL, 75.00, 'Temple Maintenance', 'General temple upkeep', 'Credit Card', 'completed'),
(4, 4, NULL, 25.00, 'General', 'Monthly contribution', 'Online', 'completed'),
(5, 3, 5, 40.00, 'Festival', 'Diwali celebration support', 'Credit Card', 'completed'),
(1, 2, NULL, 200.00, 'Charity', 'Supporting underprivileged families', 'Bank Transfer', 'completed');

-- Insert sample temple reviews
INSERT INTO temple_reviews (temple_id, devotee_id, rating, review_text, visit_date) VALUES
(1, 1, 5, 'Beautiful temple with very peaceful atmosphere. The priests are knowledgeable and helpful.', '2024-07-15'),
(1, 2, 4, 'Great place for spiritual activities. The community is very welcoming.', '2024-07-20'),
(2, 3, 5, 'ISKCON Auckland is amazing! The daily programs are very inspiring and the prasadam is delicious.', '2024-08-01'),
(3, 4, 4, 'Wellington Indian Association does great work for the community. Cultural programs are excellent.', '2024-07-25'),
(4, 5, 5, 'Peaceful temple with beautiful Shiva murti. The meditation sessions are very helpful.', '2024-08-05');

-- Insert sample devotee activities
INSERT INTO devotee_activities (devotee_id, activity_type, activity_description, related_temple_id, related_event_id) VALUES
(1, 'temple_visit', 'Visited for morning darshan and puja', 1, NULL),
(1, 'event_attendance', 'Attended Janmashtami celebration', 2, 1),
(1, 'donation', 'Donated for Annadaan program', 1, NULL),
(2, 'discussion_post', 'Started Sanskrit learning group discussion', NULL, NULL),
(3, 'event_attendance', 'Participated in Ganesha Chaturthi puja', 1, 2),
(4, 'puja_performed', 'Led Bhagavad Gita study session', 4, 3),
(5, 'temple_visit', 'Attended evening aarti', 3, NULL);

-- Insert sample Panchang data
INSERT INTO panchang_data (date, tithi, nakshatra, yoga, karana, sunrise, sunset, moonrise, moonset, special_occasions) VALUES
('2024-08-26', 'Ashtami (8th day)', 'Rohini', 'Harshana', 'Bava', '07:15', '18:45', '23:30', '11:45', ARRAY['Janmashtami']),
('2024-09-07', 'Chaturthi (4th day)', 'Hasta', 'Shiva', 'Kaulava', '07:00', '18:50', '20:15', '08:30', ARRAY['Ganesha Chaturthi']),
('2024-10-03', 'Pratipada (1st day)', 'Ashwini', 'Vishkumbha', 'Bava', '06:45', '19:00', '18:45', '06:15', ARRAY['Navratri Begins']),
('2024-11-01', 'Amavasya (New Moon)', 'Swati', 'Parigha', 'Shakuni', '06:30', '19:15', '06:00', '19:30', ARRAY['Diwali', 'Lakshmi Puja']),
('2024-12-25', 'Dashami (10th day)', 'Uttara Ashadha', 'Brahma', 'Vanija', '06:15', '20:30', '15:45', '02:30', ARRAY['Christmas']);
