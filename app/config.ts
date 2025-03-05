// Database Configuration
export const POSTGRES_CONFIG = {
  user: process.env.POSTGRES_USER || 'supervisiontool',
  host: '172.17.0.1',  // Host machine IP from container
  database: process.env.POSTGRES_DB || 'supervisiondb',
  password: process.env.POSTGRES_PASSWORD || 'Teka2019.',
  port: 5432,
  // Connection settings
  connectionTimeoutMillis: 5000,
  statement_timeout: 10000,
  query_timeout: 10000,
  // Pool configuration
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  keepAlive: true // Keep connection alive
};

// Only log non-sensitive configuration
console.log('Database Configuration:', {
  host: POSTGRES_CONFIG.host,
  database: POSTGRES_CONFIG.database,
  port: POSTGRES_CONFIG.port,
  max: POSTGRES_CONFIG.max,
  connectionTimeoutMillis: POSTGRES_CONFIG.connectionTimeoutMillis
});
