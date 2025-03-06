const { Pool } = require('pg');

const pool = new Pool({
  user: 'supervisiontool',
  host: '172.17.0.1',
  database: 'supervisiondb',
  password: 'Teka2019.',
  port: 5432,
});

async function checkTables() {
  try {
    console.log('Checking tables...');
    const client = await pool.connect();
    
    // Check each table in the hierarchy
    const tables = ['counties', 'sub_counties', 'wards', 'chus'];
    
    for (const table of tables) {
      const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`${table}: ${result.rows[0].count} records`);
      
      // Show sample data
      const sample = await client.query(`SELECT * FROM ${table} LIMIT 2`);
      console.log(`Sample data from ${table}:`, sample.rows);
    }
    
    client.release();
  } catch (err) {
    console.error('Error checking tables:', err);
  } finally {
    await pool.end();
  }
}

checkTables();
