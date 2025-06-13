import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  getSupportInfo,
  getDriverProfile,
  loginDriver,
} from "../controllers/driverController.js";

const router = express.Router();

//login
router.post("/login", loginDriver);
router.get("/profile", protect(["driver"]), getDriverProfile);
router.get("/support", protect(["driver"]), getSupportInfo); // 🆕 Support route

export default router;
