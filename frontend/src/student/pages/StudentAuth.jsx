import { useState } from "react";
import axios from "../../utils/api";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminLogin.css"; // reusing SVG styles

export default function StudentAuth() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/student/login", formData);
      alert("Logged in as: " + res.data.student.name);
      navigate("/student");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="admin-login-wrapper">
      {/* SVG Backgrounds */}
      <svg className="svg-shape top-left" viewBox="0 0 200 200">
        <path
          fill="#a5d6a7"
          d="M36.3,-66.3C47.1,-57.2,57.5,-47.1,62.2,-35C66.9,-22.9,65.9,-8.7,61.8,4.2C57.7,17.1,50.6,28.7,41.3,40.2C32.1,51.7,20.7,63.1,7.1,66.7C-6.5,70.2,-21.2,65.9,-30.2,56.3C-39.1,46.6,-42.3,31.7,-48.2,18.2C-54,4.7,-62.5,-7.3,-62.4,-19.5C-62.2,-31.7,-53.4,-44,-42.3,-53.5C-31.2,-63,-17.6,-69.8,-3.4,-65.7C10.8,-61.6,21.5,-46.5,36.3,-66.3Z"
          transform="translate(100 100)"
        />
      </svg>
      <svg className="svg-shape bottom-right" viewBox="0 0 200 200">
        <path
          fill="#ffe082"
          d="M41.1,-72.4C55.4,-62.7,70.3,-55.8,75.4,-44.1C80.5,-32.4,75.8,-16.2,69.3,-3.5C62.7,9.2,54.3,18.4,47.6,29.7C40.9,41,35.8,54.5,25.7,64.2C15.5,73.9,0.3,79.8,-15.5,81.8C-31.4,83.9,-47.9,82.1,-57.9,71.4C-67.9,60.8,-71.4,41.2,-72.8,23.6C-74.3,5.9,-73.7,-9.7,-65.5,-20.4C-57.3,-31,-41.4,-36.7,-28.6,-44.4C-15.8,-52.2,-5.9,-62.1,6.2,-70.6C18.3,-79.1,36.6,-86.3,41.1,-72.4Z"
          transform="translate(100 100)"
        />
      </svg>

      <div className="login-card animate-fade-in">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
          Student Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
          <Input
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={`Enter ${label}`}
      />
    </div>
  );
}
