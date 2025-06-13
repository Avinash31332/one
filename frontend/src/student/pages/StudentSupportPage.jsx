import { useEffect, useState } from "react";
import api from "../../utils/api"; // Adjust path as needed

const StudentSupportPage = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    api
      .get("/api/student/support", { withCredentials: true }) // Fetch support info
      .then((res) => setAdmin(res.data.admin))
      .catch((err) => console.error("Support info fetch error:", err));
  }, []);

  if (!admin) return <div className="p-4">Loading support info...</div>;

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Student Support</h2>

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-3 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
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
          <span className="font-medium text-gray-600">College Name:</span>{" "}
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
      </div>
    </div>
  );
};

export default StudentSupportPage;
