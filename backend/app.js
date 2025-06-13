import express from "express";
import dotenv from "dotenv";
import CollegeRegistration from "./routes/college.routes.js";
import adminRouter from "./routes/admin.routes.js";
import studentRouter from "./routes/student.routes.js";
import driverRouter from "./routes/driver.routes.js";
import db from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// Load environment variables
dotenv.config();

// Initialize the database
db();

// App and port setup
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for all domains
app.use(
  cors({
    origin: true, // Allow all domains
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Routes
app.use("/api/college", CollegeRegistration);
app.use("/api/admin", adminRouter);
app.use("/api/student", studentRouter);
app.use("/api/driver", driverRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
