-- Additional indexes and constraints for better performance and data integrity

-- Add foreign key constraints with proper naming
ALTER TABLE devotee_spiritual_practices 
ADD CONSTRAINT fk_devotee_practices_devotee 
FOREIGN KEY (devotee_id) REFERENCES devotees(id) ON DELETE CASCADE;

ALTER TABLE devotee_interests 
ADD CONSTRAINT fk_devotee_interests_devotee 
FOREIGN KEY (devotee_id) REFERENCES devotees(id) ON DELETE CASCADE;

-- Add check constraints for data validation
ALTER TABLE devotees 
ADD CONSTRAINT chk_devotees_gender 
CHECK (gender IN ('male', 'female', 'other', 'prefer-not-to-say'));

ALTER TABLE events 
ADD CONSTRAINT chk_events_type 
CHECK (event_type IN ('Festival', 'Puja', 'Satsang', 'Cultural', 'Educational', 'Charity'));

ALTER TABLE event_registrations 
ADD CONSTRAINT chk_attendance_status 
CHECK (attendance_status IN ('registered', 'attended', 'cancelled'));

ALTER TABLE event_registrations 
ADD CONSTRAINT chk_payment_status 
CHECK (payment_status IN ('pending', 'paid', 'refunded'));

ALTER TABLE donations 
ADD CONSTRAINT chk_donation_type 
CHECK (donation_type IN ('General', 'Annadaan', 'Temple Maintenance', 'Festival', 'Charity'));

ALTER TABLE donations 
ADD CONSTRAINT chk_donation_payment_status 
CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded'));

ALTER TABLE temple_reviews 
ADD CONSTRAINT chk_rating_range 
CHECK (rating  'failed', 'refunded'));

ALTER TABLE temple_reviews 
ADD CONSTRAINT chk_rating_range 
CHECK (rating >= 1 AND rating <= 5);

-- Add composite indexes for better query performance
CREATE INDEX idx_devotees_city_active ON devotees(city, is_active);
CREATE INDEX idx_temples_city_verified ON temples(city, is_verified);
CREATE INDEX idx_events_date_city ON events(start_date, city);
CREATE INDEX idx_events_temple_date ON events(temple_id, start_date);
CREATE INDEX idx_discussions_category_created ON discussions(category, created_at DESC);
CREATE INDEX idx_donations_devotee_date ON donations(devotee_id, created_at DESC);
CREATE INDEX idx_activities_devotee_type ON devotee_activities(devotee_id, activity_type);
CREATE INDEX idx_event_registrations_devotee ON event_registrations(devotee_id, registration_date DESC);

-- Add unique constraints
ALTER TABLE temple_reviews 
ADD CONSTRAINT uk_temple_devotee_review 
UNIQUE (temple_id, devotee_id);

ALTER TABLE event_registrations 
ADD CONSTRAINT uk_event_devotee_registration 
UNIQUE (event_id, devotee_id);

-- Add triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_devotees_updated_at 
    BEFORE UPDATE ON devotees 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_temples_updated_at 
    BEFORE UPDATE ON temples 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at 
    BEFORE UPDATE ON events 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_discussions_updated_at 
    BEFORE UPDATE ON discussions 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add function to update temple ratings
CREATE OR REPLACE FUNCTION update_temple_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE temples 
    SET rating = (
        SELECT ROUND(AVG(rating)::numeric, 2)
        FROM temple_reviews 
        WHERE temple_id = NEW.temple_id
    ),
    total_reviews = (
        SELECT COUNT(*)
        FROM temple_reviews 
        WHERE temple_id = NEW.temple_id
    )
    WHERE id = NEW.temple_id;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_temple_rating_trigger
    AFTER INSERT OR UPDATE OR DELETE ON temple_reviews
    FOR EACH ROW EXECUTE FUNCTION update_temple_rating();

-- Add function to update event participant count
CREATE OR REPLACE FUNCTION update_event_participants()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE events 
        SET current_participants = current_participants + 1
        WHERE id = NEW.event_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE events 
        SET current_participants = current_participants - 1
        WHERE id = OLD.event_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_event_participants_trigger
    AFTER INSERT OR DELETE ON event_registrations
    FOR EACH ROW EXECUTE FUNCTION update_event_participants();

-- Add function to update discussion reply count
CREATE OR REPLACE FUNCTION update_discussion_replies()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE discussions 
        SET replies_count = replies_count + 1
        WHERE id = NEW.discussion_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE discussions 
        SET replies_count = replies_count - 1
        WHERE id = OLD.discussion_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_discussion_replies_trigger
    AFTER INSERT OR DELETE ON discussion_replies
    FOR EACH ROW EXECUTE FUNCTION update_discussion_replies();
