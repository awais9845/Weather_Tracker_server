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
    origin: allowedOrigins,
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
