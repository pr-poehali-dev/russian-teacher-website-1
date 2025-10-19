CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    category_id VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_certificates_category ON certificates(category_id);
