import mongoose from "mongoose";
import config from "./config.js";

async function connectDatabase() {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Database connection failed:");
        if (error.name === 'MongoAuthenticationError') {
            console.error("   Authentication Error: Check your MongoDB credentials in the .env file");
            console.error(`   URI: ${config.MONGODB_URI.substring(0, 30)}...`);
        } else if (error.name === 'MongoServerError') {
            console.error("   Server Error:", error.message);
        } else {
            console.error("   Error:", error.message);
        }
        console.error("\n📋 Make sure your .env file has the correct MONGODB_URI");
        console.error("📖 Example: mongodb+srv://username:password@cluster.mongodb.net/database-name\n");
        
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
}

export default connectDatabase;