import dotenv from "dotenv";
dotenv.config()

const requiredEnvVars = [
    'BACKEND_PORT',
    'MONGODB_URI',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GOOGLE_REFRESH_TOKEN',
    'GOOGLE_EMAIL_USER'
];

const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(envVar => console.error(`   - ${envVar}`));
    console.error('\n📋 Please create a .env file with all required variables.');
    console.error('📖 Reference: .env.example for the required format.\n');
    if (process.env.NODE_ENV === 'production') {
        process.exit(1);
    }
}

const config = {
    BACKEND_PORT: process.env.BACKEND_PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_EMAIL_USER: process.env.GOOGLE_EMAIL_USER,
};

export default config;