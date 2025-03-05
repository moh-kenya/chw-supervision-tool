import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
});

export const setupDatabase = async () => {
  const client = await pool.connect();
  try {
    // Create tables for each level of the hierarchy
    await client.query(`
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
        UNIQUE(name, ward_id)
      );
    `);
  } finally {
    client.release();
  }
};

export const importCsvToPostgres = async (jsonData: any[]) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const row of jsonData) {
      // Insert county and get ID
      const countyResult = await client.query(
        'INSERT INTO counties (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id',
        [row.county]
      );
      const countyId = countyResult.rows[0].id;

      // Insert sub_county and get ID
      const subCountyResult = await client.query(
        'INSERT INTO sub_counties (name, county_id) VALUES ($1, $2) ON CONFLICT (name, county_id) DO UPDATE SET name = EXCLUDED.name RETURNING id',
        [row.sub_county, countyId]
      );
      const subCountyId = subCountyResult.rows[0].id;

      // Insert ward and get ID
      const wardResult = await client.query(
        'INSERT INTO wards (name, sub_county_id) VALUES ($1, $2) ON CONFLICT (name, sub_county_id) DO UPDATE SET name = EXCLUDED.name RETURNING id',
        [row.ward, subCountyId]
      );
      const wardId = wardResult.rows[0].id;

      // Insert CHU
      await client.query(
        'INSERT INTO chus (name, ward_id, facility_name) VALUES ($1, $2, $3) ON CONFLICT (name, ward_id) DO UPDATE SET facility_name = EXCLUDED.facility_name',
        [row.chu, wardId, row.facility]
      );
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getHierarchyData = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT 
        c.name as county,
        sc.name as sub_county,
        w.name as ward,
        chu.name as chu,
        chu.facility_name
      FROM counties c
      LEFT JOIN sub_counties sc ON sc.county_id = c.id
      LEFT JOIN wards w ON w.sub_county_id = sc.id
      LEFT JOIN chus chu ON chu.ward_id = w.id
      ORDER BY c.name, sc.name, w.name, chu.name;
    `);
    return result.rows;
  } finally {
    client.release();
  }
};

export const queryPostgres = async (query: string, values: any[] = []) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query, values);
    return result.rows;
  } finally {
    client.release();
  }
};
