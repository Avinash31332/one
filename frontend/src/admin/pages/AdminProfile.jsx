import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/api";

function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const response = await axios.get("/api/admin/me");
        setAdmin(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAdmin();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!admin) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load admin data.
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-8">
        <p className="text-blue-700 font-medium text-lg">Admin Profile</p>
        <p className="text-gray-500">
          View and manage your profile information and associated data.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-lg font-medium text-gray-800 mb-2">
            Personal Info
          </p>
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-700">Name:</span>{" "}
              {admin.name || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {admin.email || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {admin.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-700">Address:</span>{" "}
              {admin.address || "N/A"}
            </p>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <p className="text-lg font-medium text-gray-800 mb-2">
            Institution Info
          </p>
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-700">College:</span>{" "}
              {admin.collegeName}
            </p>
            <p>
              <span className="font-medium text-gray-700">
                Institution Type:
              </span>{" "}
              {admin.institutionType}
            </p>
            <p>
              <span className="font-medium text-gray-700">Address:</span>{" "}
              {admin.address}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <p className="text-lg font-medium text-gray-800 mb-4">
          Associated Data
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/admin/dashboard/manage-data"
            className="flex-1 p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-center transition"
          >
            <p className="text-3xl font-bold text-blue-700">
              {admin.students?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Students Registered</p>
          </Link>

          <Link
            to="/admin/dashboard/manage-data"
            className="flex-1 p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg text-center transition"
          >
            <p className="text-3xl font-bold text-blue-700">
              {admin.drivers?.length || 0}
            </p>
            <p className="text-sm text-gray-600">Drivers Registered</p>
          </Link>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-16">
        <Link
          to={"/admin/auth"}
          className="px-16 py-2 bg-red-500 text-gray-100 text-lg rounded-lg cursor-pointer"
        >
          Logout
        </Link>
      </div>
    </div>
  );
}

export default AdminProfile;
