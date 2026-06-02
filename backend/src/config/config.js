import dotenv from "dotenv";
dotenv.config()
if(!process.env.BACKEND_PORT){
    console.log("BACKEND_PORT not found");
}
if(!process.env.MONGODB_URI){
    console.log("MONGODB_URI not found");
}
if(!process.env.GOOGLE_CLIENT_ID){
    console.log("GOOGLE_CLIENT_ID not found");
}
if(!process.env.GOOGLE_CLIENT_SECRET){
    console.log("GOOGLE_CLIENT_SECRET not found");
}
if(!process.env.GOOGLE_REFRESH_TOKEN){
    console.log("GOOGLE_REFRESH_TOKEN not found");
}

if(!process.env.GOOGLE_EMAIL_USER){
    console.log("GOOGLE_EMAIL_USER not found");
}

const config ={
    BACKEND_PORT:process.env.BACKEND_PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN:process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_EMAIL_USER:process.env.GOOGLE_EMAIL_USER,

}

export default config;