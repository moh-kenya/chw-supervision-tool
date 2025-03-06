import { NextResponse } from 'next/server';
import pool from '@/app/lib/server/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const county = searchParams.get('county');
    const subCounty = searchParams.get('subCounty');
    const ward = searchParams.get('ward');

    // Get a client from the pool
    const client = await pool.connect();

    try {
      if (!county) {
        // Return all counties
        const result = await client.query(
          'SELECT DISTINCT county FROM location_hierarchy ORDER BY county'
        );
        return NextResponse.json({ counties: result.rows.map(row => row.county) });
      }

      if (!subCounty) {
        // Return sub-counties for the specified county
        const result = await client.query(
          'SELECT DISTINCT sub_county FROM location_hierarchy WHERE county = $1 ORDER BY sub_county',
          [county]
        );
        return NextResponse.json({ subCounties: result.rows.map(row => row.sub_county) });
      }

      if (!ward) {
        // Return wards for the specified sub-county
        const result = await client.query(
          'SELECT DISTINCT ward FROM location_hierarchy WHERE county = $1 AND sub_county = $2 ORDER BY ward',
          [county, subCounty]
        );
        return NextResponse.json({ wards: result.rows.map(row => row.ward) });
      }

      // Return CHUs for the specified ward
      const result = await client.query(
        'SELECT DISTINCT chu_name FROM location_hierarchy WHERE county = $1 AND sub_county = $2 AND ward = $3 ORDER BY chu_name',
        [county, subCounty, ward]
      );
      return NextResponse.json({ chus: result.rows.map(row => row.chu_name) });

    } finally {
      // Always release the client back to the pool
      client.release();
    }
  } catch (error) {
    console.error('Error in location API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location data' },
      { status: 500 }
    );
  }
}
