-- Create tables for the hierarchy
CREATE TABLE IF NOT EXISTS counties (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS sub_counties (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  county_id INTEGER REFERENCES counties(id),
  UNIQUE(name, county_id)
);

CREATE TABLE IF NOT EXISTS wards (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sub_county_id INTEGER REFERENCES sub_counties(id),
  UNIQUE(name, sub_county_id)
);

CREATE TABLE IF NOT EXISTS chus (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  ward_id INTEGER REFERENCES wards(id),
  facility_name TEXT,
  chas_present INTEGER,
  chas_trained INTEGER,
  chcs_present INTEGER,
  chcs_trained INTEGER,
  chps_present INTEGER,
  chps_trained INTEGER,
  households_monitored INTEGER,
  latitude NUMERIC,
  longitude NUMERIC,
  status_name TEXT,
  code TEXT,
  UNIQUE(name, ward_id)
);
