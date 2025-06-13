import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/auth.utils.js";

// Login Student
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(student._id, "student");
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ student });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Get Student Profile
export const getStudentProfile = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId)
      .select("-password")
      .populate("adminId");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json({ student });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
};
// Get Support Info for Student
export const getStudentSupport = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId).populate("adminId");

    if (!student || !student.adminId) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const { name, email, phone, collegeName, institutionType, address } =
      student.adminId;

    res.status(200).json({
      admin: { name, email, phone, collegeName, institutionType, address },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch support info", error: err.message });
  }
};
