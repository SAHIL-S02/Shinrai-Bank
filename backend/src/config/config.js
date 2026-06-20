import dotenv from "dotenv";
dotenv.config()



const config = {
    BACKEND_PORT: process.env.BACKEND_PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_URI: process.env.JWT_URI,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_EMAIL_USER: process.env.GOOGLE_EMAIL_USER,
    AZURE_COMMUNICATION_CONNECTION_STRING: process.env.AZURE_COMMUNICATION_CONNECTION_STRING,
    EMAIL_SENDER:process.env.EMAIL_SENDER,
};

export default config;