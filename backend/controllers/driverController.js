import Driver from "../models/driver.model.js";
import { generateToken } from "../utils/auth.utils.js";
import bcrypt from "bcryptjs";

export const loginDriver = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const driver = await Driver.findOne({ phone });
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = generateToken(driver._id, "driver");

    //cookie set
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ driver });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getDriverProfile = async (req, res) => {
  try {
    const driverId = req.user.id; // Make sure middleware sets req.user
    const driver = await Driver.findById(driverId)
      .select("-password")
      .populate("adminId");
    if (!driver) return res.status(404).json({ message: "Driver not found" });
    res.status(200).json({ driver });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
};

export const getSupportInfo = async (req, res) => {
  try {
    const driverId = req.user.id; // Already available from middleware
    const driver = await Driver.findById(driverId).populate("adminId");

    if (!driver || !driver.adminId) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const { name, email, phone, collegeName, institutionType, address } =
      driver.adminId;

    res.status(200).json({
      admin: { name, email, phone, collegeName, institutionType, address },
    });
  } catch (err) {
    console.error("Error fetching support info:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch support info", error: err.message });
  }
};
``;
