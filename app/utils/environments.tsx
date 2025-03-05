const environments = {
  // Add any environment variables needed for the application here
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000'
};

export default environments;
