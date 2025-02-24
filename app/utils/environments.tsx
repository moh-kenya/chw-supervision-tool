const environments = {
  APP_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://backend-moh.karimkkanji.com/v1',
  APP_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '671b69380019aff6cad1',
  APP_KEY: process.env.NEXT_APPWRITE_KEY,
  DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  COLLECTION_ID: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID
};

// Validate required environment variables
if (!environments.APP_KEY) {
  console.error('Missing required environment variable: NEXT_APPWRITE_KEY');
}

export default environments;
