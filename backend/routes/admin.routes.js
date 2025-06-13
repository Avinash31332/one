import express from "express";
import {
  allAdmins,
  allDrivers,
  allStudents,
  createDriver,
  createStudent,
  loginAdmin,
  registerAdmin,
  singleAdmin,
  getLoggedInAdmin,
  updateLoggedInAdmin,
} from "../controllers/admin.controllers.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", allAdmins);

// Register an Admin after college is registered
router.post("/register", registerAdmin);

//admin login
router.post("/login", loginAdmin);

// Fetch logged-in admin's data
router.get("/me", protect(["admin"]), getLoggedInAdmin);

//students routes
//all students
router.get("/student", protect(["admin"]), allStudents);

// Create Student
router.post("/student/create", protect(["admin"]), createStudent);

//driver routes
//all drivers
router.get("/driver", protect(["admin"]), allDrivers);

// Create Driver
router.post("/driver/create", protect(["admin"]), createDriver);

// Fetch a single admin profile (populated with students and drivers)
router.get("/:id", protect(["admin"]), singleAdmin);

// Update the logged-in admin's college data
router.put("/me", protect(["admin"]), updateLoggedInAdmin);

export default router;
