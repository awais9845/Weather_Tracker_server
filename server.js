import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import routes from "./routes/index.routes.js";
import connectDB from "./config/connectDb.js";

config();
connectDB();

const app = express();
console.log(process.env.LIVE_URI);
app.use(
  cors({
    origin: [
      // "http://localhost:5173",
      // "https://weather-tracker-client.vercel.app",
      process.env.LIVE_URI,
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Weather Dashboard API is running...");
});

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });
export default app;
