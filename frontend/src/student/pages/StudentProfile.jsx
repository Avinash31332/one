import { useEffect, useState } from "react";
import api from "../../utils/api"; // use configured axios instance

export default function StudentProfilePage() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/api/student/profile", { withCredentials: true })
      .then((res) => {
        setStudent(res.data.student);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err);
        setError("Failed to load profile.");
      });
  }, []);

  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!student)
    return <div className="p-6 text-center text-gray-500">Loading...</div>;

  const admin = student.adminId;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-green-700">Student Profile</h2>

      {/* Student Details */}
      <div className="bg-white rounded-2xl shadow-md p-6 space-y-2 border border-gray-200 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-800">Student Details</h3>
        <p>
          <span className="font-medium text-gray-600">Name:</span>{" "}
          {student.name}
        </p>
        <p>
          <span className="font-medium text-gray-600">Email:</span>{" "}
          {student.email}
        </p>
        <p>
          <span className="font-medium text-gray-600">Phone:</span>{" "}
          {student.phone}
        </p>
        <p>
          <span className="font-medium text-gray-600">Branch:</span>{" "}
          {student.branch || "N/A"}
        </p>
        <p>
          <span className="font-medium text-gray-600">Year:</span>{" "}
          {student.academicYear || "N/A"}
        </p>
        <p>
          <span className="font-medium text-gray-600">Institution Type:</span>{" "}
          {student.institutionType}
        </p>
      </div>

      {/* Admin Details */}
      {admin && (
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-2 border border-gray-200 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-gray-800">Admin Details</h3>
          <p>
            <span className="font-medium text-gray-600">Name:</span>{" "}
            {admin.name}
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
        </div>
      )}
    </div>
  );
}
