const { Pool } = require('pg');

const pool = new Pool({
  user: 'supervisiontool',
  host: '172.17.0.1',
  database: 'supervisiondb',
  password: 'Teka2019.',
  port: 5432,
});

async function testConnection() {
  try {
    console.log('Attempting to connect to PostgreSQL...');
    const client = await pool.connect();
    console.log('Connected successfully!');
    
    const result = await client.query('SELECT NOW()');
    console.log('Current time from database:', result.rows[0].now);
    
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Available tables:', tables.rows.map(row => row.table_name));
    
    client.release();
  } catch (err) {
    console.error('Connection error:', err);
  } finally {
    await pool.end();
  }
}

testConnection();
