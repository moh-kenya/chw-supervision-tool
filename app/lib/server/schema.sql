-- Create location_hierarchy table
CREATE TABLE IF NOT EXISTS location_hierarchy (
    id SERIAL PRIMARY KEY,
    county VARCHAR(100) NOT NULL,
    sub_county VARCHAR(100) NOT NULL,
    ward VARCHAR(100) NOT NULL,
    chu_name VARCHAR(200) NOT NULL,
    facility_name VARCHAR(200),
    chu_code VARCHAR(50),
    chu_status VARCHAR(50),
    chas_present INTEGER,
    chas_trained INTEGER,
    chcs_present INTEGER,
    chcs_trained INTEGER,
    chps_present INTEGER,
    chps_trained INTEGER,
    households_monitored INTEGER,
    latitude DECIMAL(10, 6),
    longitude DECIMAL(10, 6),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(county, sub_county, ward, chu_name)
);

-- Create supervision_records table
CREATE TABLE IF NOT EXISTS supervision_records (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES location_hierarchy(id),
    supervisor_id VARCHAR(100) NOT NULL,
    supervisor_name VARCHAR(200),
    supervision_date DATE NOT NULL,
    scores JSONB NOT NULL,
    comments TEXT,
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_location_county ON location_hierarchy(county);
CREATE INDEX IF NOT EXISTS idx_location_subcounty ON location_hierarchy(sub_county);
CREATE INDEX IF NOT EXISTS idx_location_ward ON location_hierarchy(ward);
CREATE INDEX IF NOT EXISTS idx_location_chu ON location_hierarchy(chu_name);
CREATE INDEX IF NOT EXISTS idx_supervision_date ON supervision_records(supervision_date);
CREATE INDEX IF NOT EXISTS idx_supervision_status ON supervision_records(status);
