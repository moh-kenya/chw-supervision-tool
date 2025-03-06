import { Pool } from 'pg';

// Create a new pool using environment variables
const pool = new Pool({
  user: 'supervisiontool',
  password: 'Teka2019.',
  host: '172.17.0.1',
  port: 5432,
  database: 'supervisiondb',
});

// Location hierarchy types
export interface LocationData {
  county: string;
  sub_county: string;
  ward: string;
  chu: string;
  chp_number?: string;
}

// Function to get all location hierarchy data
export async function getLocationHierarchy(): Promise<LocationData[]> {
  try {
    const query = `
      SELECT DISTINCT 
        county,
        sub_county,
        ward,
        chu,
        chp_number
      FROM location_hierarchy
      ORDER BY county, sub_county, ward, chu;
    `;
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching location hierarchy:', error);
    throw error;
  }
}

// Function to get CHPs by location
export async function getCHPsByLocation(county: string, subCounty: string, ward: string, chu: string): Promise<string[]> {
  try {
    const query = `
      SELECT chp_number
      FROM location_hierarchy
      WHERE county = $1
        AND sub_county = $2
        AND ward = $3
        AND chu = $4;
    `;
    
    const result = await pool.query(query, [county, subCounty, ward, chu]);
    return result.rows.map(row => row.chp_number);
  } catch (error) {
    console.error('Error fetching CHPs:', error);
    throw error;
  }
}

// Function to get unique counties
export async function getCounties(): Promise<string[]> {
  try {
    const query = 'SELECT DISTINCT county FROM location_hierarchy ORDER BY county;';
    const result = await pool.query(query);
    return result.rows.map(row => row.county);
  } catch (error) {
    console.error('Error fetching counties:', error);
    throw error;
  }
}

// Function to get sub-counties for a specific county
export async function getSubCounties(county: string): Promise<string[]> {
  try {
    const query = 'SELECT DISTINCT sub_county FROM location_hierarchy WHERE county = $1 ORDER BY sub_county;';
    const result = await pool.query(query, [county]);
    return result.rows.map(row => row.sub_county);
  } catch (error) {
    console.error('Error fetching sub-counties:', error);
    throw error;
  }
}

// Function to get wards for a specific sub-county
export async function getWards(county: string, subCounty: string): Promise<string[]> {
  try {
    const query = `
      SELECT DISTINCT ward 
      FROM location_hierarchy 
      WHERE county = $1 AND sub_county = $2 
      ORDER BY ward;
    `;
    const result = await pool.query(query, [county, subCounty]);
    return result.rows.map(row => row.ward);
  } catch (error) {
    console.error('Error fetching wards:', error);
    throw error;
  }
}

// Function to get CHUs for a specific ward
export async function getCHUs(county: string, subCounty: string, ward: string): Promise<string[]> {
  try {
    const query = `
      SELECT DISTINCT chu 
      FROM location_hierarchy 
      WHERE county = $1 AND sub_county = $2 AND ward = $3 
      ORDER BY chu;
    `;
    const result = await pool.query(query, [county, subCounty, ward]);
    return result.rows.map(row => row.chu);
  } catch (error) {
    console.error('Error fetching CHUs:', error);
    throw error;
  }
}

// Export the pool for use in other modules if needed
export default pool;
