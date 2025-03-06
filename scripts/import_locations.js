const fs = require('fs');
const { Pool } = require('pg');
const { parse } = require('csv-parse');
const path = require('path');

// Database configuration
const pool = new Pool({
  user: 'supervisiontool',
  host: '172.17.0.1',
  database: 'supervisiondb',
  password: 'Teka2019.',
  port: 5432,
});

// Function to import data
async function importLocationData(filePath) {
  const client = await pool.connect();
  
  try {
    // Create a readable stream
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Parse CSV data
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    }, async (err, records) => {
      if (err) {
        console.error('Error parsing CSV:', err);
        return;
      }

      console.log(`Found ${records.length} records to import`);

      // Process each record
      for (const record of records) {
        try {
          // Extract latitude and longitude from lat_long fields
          const latitude = record['lat_long.0'] || null;
          const longitude = record['lat_long.1'] || null;

          await client.query(
            `INSERT INTO location_hierarchy (
              county, sub_county, ward, chu_name, facility_name, 
              chu_code, chu_status, chas_present, chas_trained,
              chcs_present, chcs_trained, chps_present, chps_trained,
              households_monitored, latitude, longitude
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            ON CONFLICT (county, sub_county, ward, chu_name) DO UPDATE SET
              facility_name = EXCLUDED.facility_name,
              chu_code = EXCLUDED.chu_code,
              chu_status = EXCLUDED.chu_status,
              chas_present = EXCLUDED.chas_present,
              chas_trained = EXCLUDED.chas_trained,
              chcs_present = EXCLUDED.chcs_present,
              chcs_trained = EXCLUDED.chcs_trained,
              chps_present = EXCLUDED.chps_present,
              chps_trained = EXCLUDED.chps_trained,
              households_monitored = EXCLUDED.households_monitored,
              latitude = EXCLUDED.latitude,
              longitude = EXCLUDED.longitude,
              updated_at = CURRENT_TIMESTAMP`,
            [
              record.facility_county,
              record.facility_subcounty,
              record.facility_ward,
              record.name, // CHU name
              record.facility_name,
              record.code,
              record.status_name,
              parseInt(record.chas_present) || 0,
              parseInt(record.chas_trained) || 0,
              parseInt(record.chcs_present) || 0,
              parseInt(record.chcs_trained) || 0,
              parseInt(record.chps_present) || 0,
              parseInt(record.chps_trained) || 0,
              parseInt(record.households_monitored) || 0,
              parseFloat(latitude) || null,
              parseFloat(longitude) || null
            ]
          );
        } catch (error) {
          console.error('Error inserting record:', error);
          console.error('Problem record:', record);
        }
      }

      console.log('Import completed');
      client.release();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error:', error);
    client.release();
    process.exit(1);
  }
}

// Get the CSV file path from command line argument
const csvFilePath = process.argv[2];
if (!csvFilePath) {
  console.error('Please provide the path to your CSV file');
  process.exit(1);
}

// Run the import
importLocationData(csvFilePath);
