// StudentDriverForm.jsx
import { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css"; // for background & SVGs

export default function Test() {
  const [mode, setMode] = useState("student"); // 'student' or 'driver'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    academicYear: "",
    institutionType: "",
    adminId: "",
    password: "",
  });

  const handleToggle = () => {
    setMode((prev) => (prev === "student" ? "driver" : "student"));
    setFormData({
      name: "",
      email: "",
      phone: "",
      branch: "",
      academicYear: "",
      institutionType: "",
      adminId: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        mode === "student" ? "/api/student/create" : "/api/driver/create";
      const res = await axios.post(url, formData);
      alert(
        `${mode === "student" ? "Student" : "Driver"} created: ${res.data.name}`
      );
    } catch (err) {
      alert(err.response?.data?.message || "Creation failed");
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* SVG Animations */}
      <svg className="svg-shape top-left" viewBox="0 0 200 200">
        <path
          fill="#BBDEFB"
          d="M40,-70C50,-60,60,-50,70,-40C80,-30,90,-20,90,-10C90,0,80,10,70,20C60,30,50,40,40,50C30,60,20,70,10,80C0,90,-10,90,-20,90C-30,90,-40,80,-50,70C-60,60,-70,50,-80,40C-90,30,-100,20,-100,10C-100,0,-90,-10,-80,-20C-70,-30,-60,-40,-50,-50C-40,-60,-30,-70,-20,-80C-10,-90,0,-100,10,-100C20,-100,30,-90,40,-70Z"
        />
      </svg>
      <svg className="svg-shape bottom-right" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="100" fill="#E1BEE7" />
      </svg>

      {/* Form Card */}
      <div className="login-card animate-fade-in">
        <h2 className="text-center text-2xl font-bold text-blue-600 mb-4">
          {mode === "student" ? "Create Student" : "Create Driver"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            required
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {mode === "student" && (
            <>
              <input
                type="text"
                placeholder="Branch"
                value={formData.branch}
                required
                onChange={(e) =>
                  setFormData({ ...formData, branch: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder="Academic Year"
                value={formData.academicYear}
                required
                onChange={(e) =>
                  setFormData({ ...formData, academicYear: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}
          <input
            type="text"
            placeholder="Institution Type"
            value={formData.institutionType}
            required
            onChange={(e) =>
              setFormData({ ...formData, institutionType: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Admin ID"
            value={formData.adminId}
            required
            onChange={(e) =>
              setFormData({ ...formData, adminId: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create {mode === "student" ? "Student" : "Driver"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {mode === "student"
            ? "Want to create a driver?"
            : "Want to create a student?"}{" "}
          <button
            type="button"
            onClick={handleToggle}
            className="text-blue-600 underline hover:text-blue-800 transition"
          >
            Switch
          </button>
        </p>
      </div>
    </div>
  );
}
