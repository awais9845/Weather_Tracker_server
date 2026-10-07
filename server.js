import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectDB from "./config/ConnectDb.js";
import routes from "./routes/index.routes.js";

config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://weather-tracker-client.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
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
