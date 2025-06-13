import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  loginStudent,
  getStudentProfile,
  getStudentSupport,
} from "../controllers/studentController.js";

const router = express.Router();

router.post("/login", loginStudent);
router.get("/profile", protect(["student"]), getStudentProfile);
router.get("/support", protect(["student"]), getStudentSupport);

export default router;
