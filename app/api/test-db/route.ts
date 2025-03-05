import { NextResponse } from 'next/server';
import pool from '@/app/lib/server/db';

export async function GET() {
  try {
    // Test the connection
    const client = await pool.connect();
    
    // Try to query the location_hierarchy table
    const result = await client.query('SELECT COUNT(*) FROM location_hierarchy;');
    const count = result.rows[0].count;
    
    client.release();
    
    return NextResponse.json({ 
      status: 'success',
      message: 'Database connection successful',
      recordCount: count
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Failed to connect to database'
    }, { status: 500 });
  }
}
