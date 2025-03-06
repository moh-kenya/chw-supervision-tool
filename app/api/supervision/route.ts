import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Create a new pool using environment variables
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB,
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Get location_id from location_hierarchy table
    const locationQuery = `
      SELECT id FROM location_hierarchy 
      WHERE county = $1 
      AND sub_county = $2 
      AND ward = $3 
      AND chu = $4
    `;
    
    const locationValues = [
      data.superVisionTeam?.county,
      data.superVisionTeam?.subCounty,
      data.superVisionTeam?.ward,
      data.superVisionTeam?.chu
    ];

    const locationResult = await pool.query(locationQuery, locationValues);
    const locationId = locationResult.rows[0]?.id;

    // Insert supervision record
    const insertQuery = `
      INSERT INTO supervision_records 
      (location_id, supervisor_id, supervisor_name, supervision_date, scores, comments, status) 
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id
    `;

    const values = [
      locationId,
      data.superVisionTeam?.supervisor_id || 'unknown',
      data.superVisionTeam?.supervisor_name,
      new Date(),
      JSON.stringify(data), // Store all form data in scores
      data.comments || '',
      data.status || 'completed'
    ];

    const result = await pool.query(insertQuery, values);

    return NextResponse.json({ 
      success: true, 
      message: 'Data saved successfully',
      data: {
        id: result.rows[0].id,
        county: data.superVisionTeam?.county,
        subCounty: data.superVisionTeam?.subCounty,
        ward: data.superVisionTeam?.ward,
        chu: data.superVisionTeam?.chu,
        updatedDate: data.updatedDate,
        status: data.status
      }
    });
  } catch (error) {
    console.error('Error processing supervision data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save data to database' },
      { status: 500 }
    );
  }
}
