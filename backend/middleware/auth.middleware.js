import jwt from "jsonwebtoken";

const JWT_SECRET = "hehe";

export const protect = (roles = []) => {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded); // Log the decoded token to inspect its structure

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.user = decoded;
      console.log(decoded); // Attach the decoded user information (including adminId)
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
