import { useEffect, useState } from "react";
import axios from "../../utils/api";

export default function StudentDriverCreate() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 530);
  const [mode, setMode] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    academicYear: "",
    institutionType: "",
    // adminId: "",
    password: "",
  });

  useEffect(() => {
    const handleResize = () => {
      const small = window.innerWidth <= 530;
      setIsSmallScreen(small);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => {
    setMode((prev) => (prev === "student" ? "driver" : "student"));
    setFormData({
      name: "",
      email: "",
      phone: "",
      branch: "",
      academicYear: "",
      institutionType: "",
      // adminId: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url =
        mode === "student"
          ? "/api/admin/student/create"
          : "/api/admin/driver/create";
      const res = await axios.post(url, formData, { withCredentials: true });
      alert(
        `${mode === "student" ? "Student" : "Driver"} created: ${res.data.name}`
      );
    } catch (err) {
      alert(err.response?.data?.message || "Creation failed");
    }
  };

  const styles = {
    mainShadow: {
      boxShadow: "0 0px 10px rgba(8, 112, 203, 0.09)",
    },
  };

  return (
    <div
      style={isSmallScreen ? { display: "block" } : styles.mainShadow}
      className={`
        ${isSmallScreen ? "border-0" : "border-2 border-gray-300"}
        rounded-lg`}
    >
      <div
        className={`
        w-full border-b-2 border-gray-300 p-2 flex items-center`}
      >
        <h2 className="text-medium font-medium text-blue-800">
          {mode === "student" ? "Create Student" : "Create Driver"}
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div
          className={`
        ${isSmallScreen ? "flex-col" : ""}
          p-4 flex flex-wrap justify-start gap-[10px]`}
        >
          <input
            className={`
              ${isSmallScreen ? "w-full" : "w-full"}
              rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 border-1 border-gray-300 my-2`}
            type="text"
            placeholder="Full Name"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            className={`
              ${isSmallScreen ? "w-full" : "w-1/2"}
              rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 border-1 border-gray-300 my-2 `}
            type="email"
            placeholder="Email"
            value={formData.email}
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            className={`
              ${isSmallScreen ? "w-full" : "w-1/3"}
              rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 border-1 border-gray-300 my-2`}
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            required
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          {mode === "student" && (
            <>
              <input
                className="rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 border-1 border-gray-300 my-2 w-full"
                type="text"
                placeholder="Branch"
                value={formData.branch}
                required
                onChange={(e) =>
                  setFormData({ ...formData, branch: e.target.value })
                }
              />
              <input
                className={`
                  ${
                    isSmallScreen ? "w-full" : "w-1/4"
                  } rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 border-1 border-gray-300 my-2`}
                type="text"
                placeholder="Academic Year"
                value={formData.academicYear}
                required
                onChange={(e) =>
                  setFormData({ ...formData, academicYear: e.target.value })
                }
              />
            </>
          )}
          <input
            className={`${isSmallScreen ? "w-full" : "w-1/2"}
            rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 border-1 border-gray-300 my-2`}
            type="text"
            placeholder="Institution Type"
            value={formData.institutionType}
            required
            onChange={(e) =>
              setFormData({ ...formData, institutionType: e.target.value })
            }
          />
          {/* <input
            className={`
              rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 border-1 border-gray-300 my-2 w-full`}
            type="text"
            placeholder="Admin ID"
            value={formData.adminId}
            required
            onChange={(e) =>
              setFormData({ ...formData, adminId: e.target.value })
            }
          /> */}
          <input
            className={`
              ${isSmallScreen ? "w-full" : "w-1/2"}
              rounded p-2 border-0 outline-0 text-gray-600 bg-gray-100 border-1 border-gray-300 my-2`}
            type="password"
            placeholder="Password"
            value={formData.password}
            required
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="my-2 w-full flex flex-col  gap-[10px] items-center justify-center">
          <button
            className="p-2 px-8 rounded bg-blue-600 text-gray-100 cursor-pointer hover:bg-blue-500"
            type="submit"
          >
            Create {mode === "student" ? "Student" : "Driver"}
          </button>
          <p className="p-2 text-[14px]">
            {mode === "student"
              ? "Want to create a driver?"
              : "Want to create a student?"}{" "}
            <button
              className="text-blue-700 cursor-pointer underline"
              type="button"
              onClick={handleToggle}
            >
              Switch
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}
