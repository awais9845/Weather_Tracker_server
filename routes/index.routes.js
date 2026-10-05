import express from "express";
import authRoutes from "./auth.routes.js";
import weatherRoute from "./weather.routes.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/weather", weatherRoute);

export default router;
