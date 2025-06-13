import express from "express";
import College from "../models/collegeRegistration.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const college = await College.find();
    return res.status(200).json(college);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Register a college (no admin initially)
// router.post("/register", async (req, res) => {
//   const { collegeName, institutionType, address } = req.body;

//   if (!institutionType || !collegeName) {
//     return res
//       .status(400)
//       .json({ message: "College name and type are required" });
//   }

//   try {
//     const college = await College.create({
//       collegeName,
//       institutionType,
//       address: address,
//     });

//     res.status(201).json(college);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to register college",
//       error: err.message,
//     });
//   }
// });

export default router;
