import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectDB from "./config/ConnectDb.js";
import routes from "./routes/index.routes.js";

config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  // "https://weather-tracker-client.vercel.app",
  process.env.LIVE_URI,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const cleanOrigin = origin.replace(/\/$/, "");
      const isAllowed = allowedOrigins.some(
        (allowed) => allowed.replace(/\/$/, "") === cleanOrigin
      );
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Weather Dashboard API is running...");
});

export default app;
