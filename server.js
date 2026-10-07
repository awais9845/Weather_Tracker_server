import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import connectDB from "./config/ConnectDb.js";
import routes from "./routes/index.routes.js";

config();

const app = express();

const allowedOrigins = ["http://localhost:5173", process.env.LIVE_URI];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
connectDB();

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Weather Dashboard API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
