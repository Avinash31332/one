import { useEffect, useState } from "react";
import axios from "../../utils/api";

export default function EditCollegePage() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 530);
  const [formData, setFormData] = useState({
    collegeName: "",
    institutionType: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  // Resize handling for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 530);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch the logged-in admin's college data
  useEffect(() => {
    const fetchAdminCollegeData = async () => {
      try {
        const res = await axios.get("/api/admin/me", { withCredentials: true });
        const adminData = res.data;
        console.log(adminData);

        setFormData({
          collegeName: adminData.collegeName || "",
          institutionType: adminData.institutionType || "",
          address: adminData.address || "",
        });
      } catch (err) {
        alert("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminCollegeData();
  }, []);

  // Handle form submission to update college data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/admin/college", formData, {
        withCredentials: true,
      });
      alert(`College updated: ${res.data.collegeName}`);
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  // Styles for the component
  const styles = {
    mainShadow: {
      boxShadow: "0 0px 10px rgba(8, 112, 203, 0.09)",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={isSmallScreen ? { display: "block" } : styles.mainShadow}
      className={`${
        isSmallScreen ? "border-0" : "border-2 border-gray-300"
      } rounded-lg`}
    >
      <div className="w-full border-b-2 border-gray-300 p-2 flex items-center">
        <h2 className="text-medium font-medium text-blue-800">
          Edit College Info
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={`${
            isSmallScreen ? "flex-col" : ""
          } p-4 flex flex-wrap justify-start gap-[10px]`}
        >
          <input
            className="w-full rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 my-2"
            type="text"
            placeholder="College Name"
            value={formData.collegeName}
            required
            onChange={(e) =>
              setFormData({ ...formData, collegeName: e.target.value })
            }
          />
          <input
            className={`${
              isSmallScreen ? "w-full" : "w-1/2"
            } rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 my-2`}
            type="text"
            placeholder="Institution Type"
            value={formData.institutionType}
            required
            onChange={(e) =>
              setFormData({ ...formData, institutionType: e.target.value })
            }
          />
          <input
            className="w-full rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 my-2"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <div className="my-2 w-full flex justify-center">
          <button
            className="p-2 px-8 rounded bg-blue-600 text-gray-100 cursor-pointer hover:bg-blue-500"
            type="submit"
          >
            Update College
          </button>
        </div>
      </form>
    </div>
  );
}
