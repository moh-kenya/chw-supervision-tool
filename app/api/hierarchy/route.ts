import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { POSTGRES_CONFIG } from '@/app/config';

const pool = new Pool(POSTGRES_CONFIG);

export async function GET() {
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
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching hierarchy:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hierarchy data' },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}
