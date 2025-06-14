import Admin from "../models/admin.model.js";
import College from "../models/collegeRegistration.model.js";
import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.utils.js";
import Driver from "../models/driver.model.js";

// Fetch single admin profile (with populated students and drivers)
export const singleAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id)
      .populate("students")
      .populate("drivers");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json(admin);
  } catch (err) {
    return res.status(500).json({
      message: "Error in fetching admin data",
      error: err,
    });
  }
};

// Fetch all admins
export const allAdmins = async (req, res) => {
  try {
    const adminId = req.user.adminId;
    console.log(adminId);
    const admins = await Admin.find();
    return res.status(200).json(admins);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Register admin and college
export const registerAdmin = async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    collegeName,
    institutionType,
    address,
  } = req.body;

  if (!institutionType || !collegeName) {
    return res
      .status(400)
      .json({ message: "College name and type are required" });
  }

  if (
    !name ||
    !email ||
    !phone ||
    !password ||
    !collegeName ||
    !institutionType
  ) {
    return res
      .status(401)
      .json({ message: "Please fill all the required fields." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // saltRounds = 10

    const admin = await Admin.create({
      name,
      email,
      phone,
      password: hashedPassword,
      collegeName,
      institutionType,
      address: address,
    });

    // Optionally link college to admin if needed
    // await College.findByIdAndUpdate(collegeId, { admin: admin._id });

    res.status(201).json(admin);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create admin", error: err.message });
  }
};

// Admin login and token generation
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(admin._id, "admin");

    // Set token as cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None", //for cross-site cookies
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ admin });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Update logged-in admin's college data
export const updateLoggedInAdmin = async (req, res) => {
  try {
    const { collegeName, institutionType, address } = req.body;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user.id, // Use logged-in user's ID from the token
      { collegeName, institutionType, address },
      { new: true }
    );

    if (!updatedAdmin)
      return res.status(404).json({ message: "Admin not found" });

    res.json(updatedAdmin);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Get the logged-in admin's data
export const getLoggedInAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id) // Get admin using the token ID
      .populate("students")
      .populate("drivers");

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch admin", error: err.message });
  }
};

// Fetch all students
export const allStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return res.status(200).json(students);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Create student under a specific admin
export const createStudent = async (req, res) => {
  const adminId = req.user.id; // Get adminId from the decoded token (protected route)

  const {
    name,
    email,
    phone,
    branch,
    academicYear,
    institutionType,
    password,
  } = req.body;

  if (!adminId)
    return res.status(400).json({ message: "Admin ID is required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      phone,
      branch,
      academicYear,
      institutionType,
      adminId, // Link student to the admin
      password: hashedPassword,
    });

    // Add student reference to admin
    await Admin.findByIdAndUpdate(adminId, {
      $push: { students: student._id },
    });

    res.status(201).json(student);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create student", error: err.message });
  }
};

// Fetch all drivers
export const allDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find();
    return res.status(200).json(drivers);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Create driver under a specific admin
export const createDriver = async (req, res) => {
  const { name, email, phone, institutionType, password } = req.body;
  const adminId = req.user.id; // Get adminId from token payload (set by middleware)

  if (!adminId) {
    return res.status(400).json({ message: "Admin ID is required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const driver = await Driver.create({
      name,
      email,
      phone,
      institutionType,
      adminId,
      password: hashedPassword,
    });

    // Add driver reference to admin
    await Admin.findByIdAndUpdate(adminId, {
      $push: { drivers: driver._id },
    });

    res.status(201).json(driver);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create driver",
      error: err.message,
    });
  }
};
