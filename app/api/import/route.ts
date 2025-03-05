import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { POSTGRES_CONFIG } from '@/app/config';

// Create a connection pool with specific settings
// Create a new pool with environment variables
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'supervisiontool',
  host: process.env.POSTGRES_HOST || '172.17.0.1',  // Default to Docker host IP
  database: process.env.POSTGRES_DB || 'supervisiondb',
  password: process.env.POSTGRES_PASSWORD || 'Teka2019.',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  connectionTimeoutMillis: 10000, // 10 seconds connection timeout
  statement_timeout: 30000,       // 30 seconds query timeout
  idle_in_transaction_session_timeout: 30000, // 30 seconds idle timeout
  max: 20,                       // max number of clients in the pool
  idleTimeoutMillis: 30000       // 30 seconds to close idle clients
});

console.log('Database config:', {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: process.env.POSTGRES_PORT
});

// Add error handler
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Test pool on startup
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Test the connection
async function testConnection() {
  const client = await pool.connect();
  try {
    await client.query('SELECT 1');
    console.log('Database connection successful');
  } finally {
    client.release();
  }
}

// Initial connection test
testConnection().catch(console.error);

async function setupDatabase() {
  const client = await pool.connect();
  try {
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
    `);
  } finally {
    client.release();
  }
}

async function importData(jsonData: any[]) {
  const BATCH_SIZE = 50; // Process 50 records at a time for better performance
  let client = null;
  let processedRows = 0;
  const totalRows = jsonData.length;
  
  try {
    console.log(`Starting import of ${totalRows} rows...`);
    client = await pool.connect();
    await client.query('BEGIN');

    // Process data in batches
    for (let i = 0; i < jsonData.length; i += BATCH_SIZE) {
      const batch = jsonData.slice(i, i + BATCH_SIZE);
      console.log(`Processing batch ${Math.floor(i/BATCH_SIZE) + 1} of ${Math.ceil(jsonData.length/BATCH_SIZE)}`);
      
      // Process each row in the batch
      for (const row of batch) {
      try {
        processedRows++;
        if (processedRows % 100 === 0) {
          console.log(`Processing row ${processedRows} of ${totalRows} (${Math.round(processedRows/totalRows*100)}%)`);
        }

        // Validate required fields
        if (!row.county || !row.sub_county || !row.ward || !row.chu) {
          console.warn('Skipping row due to missing required fields:', { row });
          continue;
        }

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
          'INSERT INTO chus (name, ward_id, facility_name, chas_present, chas_trained, chcs_present, chcs_trained, chps_present, chps_trained, households_monitored, latitude, longitude, status_name, code) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) ON CONFLICT (name, ward_id) DO UPDATE SET facility_name = EXCLUDED.facility_name, chas_present = EXCLUDED.chas_present, chas_trained = EXCLUDED.chas_trained, chcs_present = EXCLUDED.chcs_present, chcs_trained = EXCLUDED.chcs_trained, chps_present = EXCLUDED.chps_present, chps_trained = EXCLUDED.chps_trained, households_monitored = EXCLUDED.households_monitored, latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude, status_name = EXCLUDED.status_name, code = EXCLUDED.code',
          [
            row.chu,
            wardId,
            row.facility_name || null,
            parseInt(row.chas_present) || 0,
            parseInt(row.chas_trained) || 0,
            parseInt(row.chcs_present) || 0,
            parseInt(row.chcs_trained) || 0,
            parseInt(row.chps_present) || 0,
            parseInt(row.chps_trained) || 0,
            parseInt(row.households_monitored) || 0,
            parseFloat(row['lat_long.0']) || null,
            parseFloat(row['lat_long.1']) || null,
            row.status_name || null,
            row.code || null
          ]
        );
      } catch (rowError) {
        console.error(`Error processing row ${processedRows}:`, rowError, '\nRow data:', row);
        throw rowError;
      }
    } // end of batch loop

    // Commit after each batch
    await client.query('COMMIT');
    await client.query('BEGIN');
    }

    console.log('All rows processed, committing transaction...');
    await client.query('COMMIT');
    console.log('Import completed successfully!');
    return { success: true, processedRows };
  } catch (error) {
    console.error('Error during import, rolling back...', error);
    if (client) {
      try {
        await client.query('ROLLBACK');
      } catch (rollbackError) {
        console.error('Error during rollback:', rollbackError);
      }
    }
    throw error;
  } finally {
    if (client) {
      client.release();
    }
    console.log(`Import finished. Processed ${processedRows} of ${totalRows} rows.`);
  }
}

// Test database connection
async function testDbConnection() {
  let client;
  try {
    console.log('Attempting to connect to database...');
    
    client = await pool.connect();
    console.log('Connected to pool successfully');
    
    const result = await client.query('SELECT NOW() as current_time');
    console.log('Database query successful:', result.rows[0]);
    
    // Test if we can access our tables
    const tablesResult = await client.query('\
      SELECT table_name \
      FROM information_schema.tables \
      WHERE table_schema = $1\
    ', ['public']);
    
    const tables = tablesResult.rows.map(row => row.table_name);
    console.log('Available tables:', tables);
    
    if (!tables.includes('counties') || !tables.includes('sub_counties') || 
        !tables.includes('wards') || !tables.includes('chus')) {
      throw new Error('Required tables are missing. Please ensure all hierarchy tables exist.');
    }
    
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    if (error instanceof Error) {
      // Provide more specific error messages
      if (error.message.includes('ECONNREFUSED')) {
        throw new Error('Could not connect to PostgreSQL. Please check if it is running.');
      } else if (error.message.includes('password authentication failed')) {
        throw new Error('Database authentication failed. Please check credentials.');
      } else {
        throw new Error(`Database connection failed: ${error.message}`);
      }
    }
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

export async function POST(request: Request) {
  let client;
  try {
    // First test the connection
    console.log('API: Testing database connection...');
    await testDbConnection();
    
    console.log('API: Starting import process...');
    
    const data = await request.json();
    console.log('API: Received data for import:', {
      count: data.length,
      sampleRow: data[0]
    });

    console.log('API: Testing database connection with config:', {
      ...POSTGRES_CONFIG,
      password: '***' // Hide password in logs
    });

    // Test database connection first
    client = await pool.connect();
    console.log('API: Database connection successful');
    
    // Verify we can query the database
    const testResult = await client.query('SELECT 1 as test');
    console.log('API: Database query test result:', testResult.rows[0]);
    
    // Setup database tables
    console.log('API: Setting up database tables...');
    await setupDatabase();
    console.log('API: Database tables created successfully');
    
    // Import data
    console.log('API: Starting data import...');
    await importData(data);
    console.log('API: Data imported successfully');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API: Import error:', error);
    let errorMessage = 'Failed to import data';
    let errorDetails = error instanceof Error ? error.message : 'Unknown error';
    
    // Check for specific PostgreSQL errors
    if (error instanceof Error) {
      console.error('API: Error stack:', error.stack);
      
      if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Could not connect to database';
        errorDetails = 'Please check if PostgreSQL is running and accessible';
      } else if (error.message.includes('permission denied')) {
        errorMessage = 'Database permission error';
        errorDetails = 'Please check database user permissions';
      } else if (error.message.includes('ENOENT')) {
        errorMessage = 'Socket connection error';
        errorDetails = 'Could not connect to PostgreSQL socket';
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  } finally {
    if (client) {
      console.log('API: Releasing database connection');
      client.release();
    }
  }
}
