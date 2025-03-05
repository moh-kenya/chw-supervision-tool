import { NextResponse } from 'next/server';
import { Pool } from 'pg';

export async function GET() {
  const pool = new Pool({
    user: 'supervisiontool',
    host: 'localhost',
    database: 'supervisiondb',
    password: 'Teka2019.',
    port: 5432
  });

  try {
    console.log('Testing database connection...');
    const client = await pool.connect();
    console.log('Connected to database');
    
    const result = await client.query('SELECT NOW() as time');
    console.log('Query result:', result.rows[0]);
    
    const tables = await client.query('SELECT table_name FROM information_schema.tables WHERE table_schema = $1', ['public']);
    console.log('Available tables:', tables.rows);
    
    client.release();
    
    return NextResponse.json({
      success: true,
      time: result.rows[0].time,
      tables: tables.rows
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await pool.end();
  }
}
