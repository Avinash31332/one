import { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.css"; // Import the CSS with animation and SVG styles

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/admin/login", { email, password });
      alert("Logged in as: " + res.data.admin.name);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* SVG Decorations */}
      <svg className="svg-shape top-left" viewBox="0 0 200 200">
        <path
          fill="#90caf9"
          d="M44.8,-65.2C58.4,-55.2,69.6,-43.1,72.1,-29.7C74.6,-16.4,68.4,-1.8,63.3,12.2C58.1,26.2,53.9,39.6,44.7,50.4C35.4,61.2,21.2,69.4,6.5,70.9C-8.2,72.4,-22.4,67.2,-36.8,59.5C-51.1,51.7,-65.7,41.4,-73.1,27.8C-80.6,14.1,-80.9,-2.8,-73.4,-17.3C-65.8,-31.9,-50.4,-44.1,-35.5,-55.3C-20.7,-66.5,-10.3,-76.7,2.5,-80.1C15.4,-83.5,30.7,-80.1,44.8,-65.2Z"
          transform="translate(100 100)"
        />
      </svg>

      <svg className="svg-shape bottom-right" viewBox="0 0 200 200">
        <path
          fill="#e1bee7"
          d="M37.1,-59.4C47.8,-52.3,55.6,-41.2,63.2,-28.4C70.9,-15.6,78.4,-1.2,76.3,11.9C74.3,24.9,62.8,36.6,51.1,46.4C39.4,56.2,27.6,64.2,14.6,67.4C1.6,70.7,-12.6,69.1,-26.8,64.2C-40.9,59.2,-55,50.8,-62.5,38.7C-70.1,26.6,-71.2,10.7,-69.2,-4.9C-67.3,-20.5,-62.4,-35.8,-52.8,-45.9C-43.1,-56.1,-28.6,-61,-14.1,-64.6C0.5,-68.1,35.5,-66.5,37.1,-59.4Z"
          transform="translate(100 100)"
        />
      </svg>

      {/* Login Card */}
      <div className="login-card animate-fade-in">
        <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold transition duration-150"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
