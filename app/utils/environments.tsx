const environments = {
    APP_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? 'development',
    APP_PROJECT:
        process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? 'http://localhost:3000',
    APP_KEY: process.env.NEXT_APPWRITE_KEY ?? 'CHW Supervision Tool',
};

export default environments;
