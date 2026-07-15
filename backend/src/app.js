import express from "express";
import morgan from "morgan"
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser"
import cors from 'cors'
import config from "./config/config.js";

const app = express();
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json())

// Support multiple origins: comma-separated in FRONTEND_URL env var
const allowedOrigins = (config.FRONTEND_URL || "http://localhost:5173")
    .split(",")
    .map(origin => origin.trim());
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Log and explicitly disable CORS for disallowed origins
        console.warn(`CORS origin rejected: ${origin}`);
        return callback(null, false);
    },
    credentials: true,
    // Use a safe status code for successful OPTIONS requests
    optionsSuccessStatus: 204
}))
app.use(cookieParser())

// Health check — frontend can verify backend is alive
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: Date.now() });
});

app.use("/api/auth/", authRouter)
export default app;
