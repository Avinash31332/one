import jwt from "jsonwebtoken";

const JWT_SECRET = "hehe";

export const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role: role }, JWT_SECRET, { expiresIn: "7d" });
};
