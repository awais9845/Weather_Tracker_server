import express from "express";
import { getWeather } from "../controller/weather.controller.js";
import { authMiddleware } from "../middlewares/Auth.middleware.js";

const router = express.Router();

router.post("/getCondition", authMiddleware, getWeather);

export default router;
