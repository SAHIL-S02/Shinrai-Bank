import dotenv from "dotenv";
dotenv.config()




const config ={
    BACKEND_PORT:process.env.BACKEND_PORT,
    MONGODB_URI:process.env.MONGODB_URI,

}

export default config;