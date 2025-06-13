import { useEffect, useState } from "react";
import api from "../../utils/api"; // Axios instance with baseURL and credentials

const SupportPage = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    api
      .get("/api/driver/support", { withCredentials: true })
      .then((res) => setAdmin(res.data.admin))
      .catch((err) => console.error("Support info fetch error:", err));
  }, []);

  if (!admin) return <div className="p-4">Loading support info...</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-blue-700">Support</h2>

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Contact Your Admin
        </h3>
        <p>
          <span className="font-medium text-gray-600">Name:</span> {admin.name}
        </p>
        <p>
          <span className="font-medium text-gray-600">Email:</span>{" "}
          {admin.email}
        </p>
        <p>
          <span className="font-medium text-gray-600">Phone:</span>{" "}
          {admin.phone}
        </p>
        <p>
          <span className="font-medium text-gray-600">College:</span>{" "}
          {admin.collegeName}
        </p>
        <p>
          <span className="font-medium text-gray-600">Institution Type:</span>{" "}
          {admin.institutionType}
        </p>
        <p>
          <span className="font-medium text-gray-600">Address:</span>{" "}
          {admin.address}
        </p>

        <div className="flex gap-4 mt-4">
          <a
            href={`tel:${admin.phone}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Call Admin
          </a>
          <a
            href={`mailto:${admin.email}`}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
          >
            Email Admin
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
