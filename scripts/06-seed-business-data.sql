-- Seed sample data for business submissions
-- This script populates the businesses table with initial data

INSERT INTO businesses (
   business_name, category, description, address, city, phone, email, website,
   owner_name, owner_email, owner_phone, operating_hours, special_offers, services, social_media, images, status, created_at, is_active, approved_at, rating
) VALUES
(
   'BizApps365 Ltd.', 'IT', 'IT solutions', '156 Amesbury Drive, Churton Park', 'Wellington', '000', 'sales@bizapps365.com', 'https://www.bizapps365.co.nz',
   'Bhawesh Tiwari', 'bhawesh.sengg@gmail.com', '000000', NULL, NULL, NULL, NULL, ARRAY['https://drive.google.com/open?id=1FXwibVaTncIy4h7UuSKTjIoBA7D4Qf4h'], 'approved', '2025-07-06 16:41:56+12', TRUE, '2025-07-06 16:41:56+12', 4.5
),
(
   'Insurewise Ltd', 'Professional Services', 'Life and Health Insurance', '149 Tirohanga Road, Lower Hutt', 'Wellington', '0211212094', 'raj.insurewise@gmail.com', NULL,
   'Rajneesh Kumar', 'raj.insurewise@gmail.com', '0211212094', NULL, 'Life and Health Insurance', NULL, NULL, NULL, 'approved', '2025-07-08 13:16:08+12', TRUE, '2025-07-08 13:16:08+12', 4.5
),
(
   'Spirit of India', 'Restaurants & Food', 'Restaurant & baar', '139 dowse drive Maungaraki Lowe hutt 5010', 'Wellington', '02108971254', 'manager@spiritofindia.nz', 'Spiritofindia.nz',
   'Ram Sewak bhatt', 'ramsewakbhatt2@gmail.com', '02108971254', '11:30 to 2:30 then 4: to 9:pm', NULL, ARRAY['Indian cuisine'], '{"facebook": "Spirit Of India", "instagram": "Spirit Of India"}', ARRAY['https://drive.google.com/open?id=1m5ZKGMWPJZ1efmhbkn0gGQhqMhvUN3Jr'], 'approved', '2025-07-08 16:04:32+12', TRUE, '2025-07-08 16:04:32+12', 4.5
),
(
   'Natraj School of Dance', 'Arts & Culture', 'Indian classical Bharatanatyam School', '1025 High Street, Avalon', 'Wellington', '021817252', 'natrajschoolofdance@gmail.com', 'https://natrajschoolofdance.co.nz/',
   'Prabha Ravi', 'natrajschoolofdance@gmail.com', '021817252', 'Evenings and weekends', 'Bharatanatyam lessons and performances including arangetram', NULL, '{"facebook": "https://www.facebook.com/natrajschoolofdance"}', ARRAY['https://drive.google.com/open?id=1f1bUbQU8-1De_N49iPJemyzB9SFZ64qi', 'https://drive.google.com/open?id=15BbkM62LdOkr-zt1D-RSWLGBh2GLSoTb', 'https://drive.google.com/open?id=15kOCwyCgA2WrRIY2VfzCQPzxYub_h-Wd', 'https://drive.google.com/open?id=1vnmUEHuiMRqCFzYXnaLshyM9wxMHg7L-', 'https://drive.google.com/open?id=1dYY0-kuyD6PjYiboLJJdRn7p0amgz8Wl'], 'approved', '2025-07-08 17:10:58+12', TRUE, '2025-07-08 17:10:58+12', 4.5
),
(
   'Grow Consultancy Limited', 'Professional Services', 'Governance & Management Consultancy', '1025 High Street, Avalon, Lower Hutt, 5011', 'Wellington', '021817252', 'growconsultancylimited@gmail.com', NULL,
   'Prabha Ravi', 'growconsultancylimited@gmail.com', '021817252', '9 to 5pm Mon- Fri', 'Independent Director, Governance Training, Strategy development and Implementation, workshop/seminar facilitation, coach, Business/market development, Panel/guest speaker, MC.', NULL, NULL, ARRAY['https://drive.google.com/open?id=1fAKO5dcsoyJm7uNU-dWhn88k1rlT0GFl', 'https://drive.google.com/open?id=1ZTeePXeu44D6AP2u_ErCmR0K3okNrcTw', 'https://drive.google.com/open?id=1-s1FStJetmOSapQkDCEhNCH39t2piLJn'], 'approved', '2025-07-08 17:19:14+12', TRUE, '2025-07-08 17:19:14+12', 4.5
);
