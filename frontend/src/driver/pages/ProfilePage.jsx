import { useEffect, useState } from "react";
import api from "../../utils/api"; // Make sure this uses your custom axios instance
import { Link } from "react-router-dom";
const ProfilePage = () => {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    api
      .get("/api/driver/profile", { withCredentials: true })
      .then((res) => setDriver(res.data.driver))
      .catch((err) => console.error("Profile fetch error:", err));
  }, []);

  if (!driver) return <div className="p-4">Loading...</div>;

  const admin = driver.adminId;

  return (
    <div className="p-4 space-y-6 flex flex-col">
      <h2 className="text-2xl font-bold text-blue-700">Driver Profile</h2>
      {/* Driver Details Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-2 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Your Details
        </h3>
        <p>
          <span className="font-medium text-gray-600">Name:</span> {driver.name}
        </p>
        <p>
          <span className="font-medium text-gray-600">Email:</span>{" "}
          {driver.email}
        </p>
        <p>
          <span className="font-medium text-gray-600">Phone:</span>{" "}
          {driver.phone}
        </p>
        <p>
          <span className="font-medium text-gray-600">Institution Type:</span>{" "}
          {driver.institutionType}
        </p>
      </div>
      {/* Admin Details Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-2 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Admin Details
        </h3>
        <p>
          <span className="font-medium text-gray-600">Name:</span> {admin.name}
        </p>
        <p>
          <span className="font-medium text-gray-600">Phone:</span>{" "}
          {admin.phone}
        </p>
        <p>
          <span className="font-medium text-gray-600">College Name:</span>{" "}
          {admin.collegeName}
        </p>
        <p>
          <span className="font-medium text-gray-600">Institution Type:</span>{" "}
          {admin.institutionType}
        </p>
      </div>
      <div className="w-full flex items-center justify-center mt-16">
        <Link
          to={"/driver/login"}
          className="px-16 py-2 bg-red-500 text-gray-100 text-lg mb-8 rounded-lg cursor-pointer"
        >
          Logout
        </Link>
      </div>{" "}
    </div>
  );
};

export default ProfilePage;
