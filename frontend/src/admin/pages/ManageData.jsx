import React, { useEffect, useState } from "react";
import {
  UserPlusIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import axios from "../../utils/api";

function ManageData() {
  const [students, setStudents] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [view, setView] = useState("students");
  const [sortOrder, setSortOrder] = useState("asc");
  const [academicYearFilter, setAcademicYearFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");
  const [institutionTypeFilter, setInstitutionTypeFilter] = useState("");
  const [rowsToShow, setRowsToShow] = useState(20);
  const [displayMode, setDisplayMode] = useState("20");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/admin/me", { withCredentials: true });
        const data = res.data;

        setStudents(Array.isArray(data.students) ? data.students : []);
        setDrivers(Array.isArray(data.drivers) ? data.drivers : []);
      } catch (error) {
        console.warn("Backend not reachable. Using dummy data.");
        setStudents([
          {
            _id: "s1",
            name: "Alice Johnson",
            email: "alice@example.com",
            phone: "9876543210",
            branch: "CSE",
            academicYear: "2nd",
            institutionType: "Engineering",
          },
        ]);
        setDrivers([
          {
            _id: "d1",
            name: "John Doe",
            email: "john@driver.com",
            phone: "1234567890",
            institutionType: "Engineering",
          },
        ]);
      }
    };

    fetchData();
  }, []);

  const filterAndSortData = (data, filters = {}) => {
    let filtered = data;
    if (filters.academicYear)
      filtered = filtered.filter(
        (s) => s.academicYear === filters.academicYear
      );
    if (filters.branch)
      filtered = filtered.filter((s) => s.branch === filters.branch);
    if (filters.institutionType)
      filtered = filtered.filter(
        (d) => d.institutionType === filters.institutionType
      );

    return filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  };

  const visibleStudents =
    displayMode === "all"
      ? filterAndSortData(students, {
          academicYear: academicYearFilter,
          branch: branchFilter,
        }).slice(0, rowsToShow)
      : filterAndSortData(students, {
          academicYear: academicYearFilter,
          branch: branchFilter,
        }).slice(0, parseInt(displayMode));

  const visibleDrivers =
    displayMode === "all"
      ? filterAndSortData(drivers, {
          institutionType: institutionTypeFilter,
        }).slice(0, rowsToShow)
      : filterAndSortData(drivers, {
          institutionType: institutionTypeFilter,
        }).slice(0, parseInt(displayMode));

  const allBranches = [...new Set(students.map((s) => s.branch))];
  const allYears = [...new Set(students.map((s) => s.academicYear))];
  const allInstitutions = [
    ...new Set([...students, ...drivers].map((i) => i.institutionType)),
  ];

  const handleLoadMore = () => setRowsToShow((prev) => prev + 20);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <p className="text-blue-700 font-medium text-lg">Create/Edit Data</p>
        <div className="flex gap-[20px] flex-wrap">
          {[
            {
              name: "Create Student",
              icon: UserPlusIcon,
              path: "/admin/dashboard/create-data",
            },
            {
              name: "Create Driver",
              icon: UserGroupIcon,
              path: "/admin/dashboard/create-data",
            },
            {
              name: "Edit college data",
              icon: BuildingOffice2Icon,
              path: "/admin/dashboard/edit-college-data",
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                to={item.path}
                className="create-data-buttons p-4 border border-gray-300 shadow rounded w-48 flex flex-col items-center hover:bg-gray-50"
              >
                <Icon className="icon h-8 w-8 mb-2" />
                <p className="text-center">{item.name}</p>
              </Link>
            );
          })}
        </div>

        {/* Toggle View */}
        <div className="mt-6 flex gap-4 items-center">
          <button
            onClick={() => setView("students")}
            className={`px-4 py-1 rounded ${
              view === "students"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            View Students
          </button>
          <button
            onClick={() => setView("drivers")}
            className={`px-4 py-1 rounded ${
              view === "drivers"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            View Drivers
          </button>
        </div>

        {/* Filters and Sorting */}
        <div className="mt-4 flex flex-wrap gap-4 items-center">
          {view === "students" ? (
            <>
              <select
                onChange={(e) => setAcademicYearFilter(e.target.value)}
                className="px-4 py-2 border-1 border-gray-200 bg-gray-100 rounded-xl"
                defaultValue=""
              >
                <option value="">Filter by Year</option>
                {allYears.map((y, i) => (
                  <option key={i} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setBranchFilter(e.target.value)}
                className="px-4 py-2 border-1 border-gray-200 bg-gray-100 rounded-xl"
                defaultValue=""
              >
                <option value="">Filter by Branch</option>
                {allBranches.map((b, i) => (
                  <option key={i} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <select
              onChange={(e) => setInstitutionTypeFilter(e.target.value)}
              className="px-4 py-2 border-1 border-gray-200 bg-gray-100 rounded-xl"
              defaultValue=""
            >
              <option value="">Filter by Institution Type</option>
              {allInstitutions.map((i, idx) => (
                <option key={idx} value={i}>
                  {i}
                </option>
              ))}
            </select>
          )}

          <select
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border-1 border-gray-200 bg-gray-100 rounded-xl"
            defaultValue="asc"
          >
            <option value="asc">Sort by Name (A-Z)</option>
            <option value="desc">Sort by Name (Z-A)</option>
          </select>

          <select
            onChange={(e) => {
              const val = e.target.value;
              setDisplayMode(val);
              if (val === "all") setRowsToShow(20);
            }}
            className="px-4 py-2 border-1 border-gray-200 bg-gray-100 rounded-xl"
            defaultValue="20"
          >
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
            <option value="50">50 rows</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Data Table */}
        <div className="mt-6">
          <p className="font-semibold text-gray-700 mb-2">
            All {view === "students" ? "Students" : "Drivers"}
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm rounded overflow-hidden">
              <thead>
                <tr className="bg-blue-100 text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Institution Type</th>
                  {view === "students" && (
                    <>
                      <th className="p-3">Branch</th>
                      <th className="p-3">Academic Year</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {(view === "students" ? visibleStudents : visibleDrivers).map(
                  (user, idx) => (
                    <tr
                      key={user._id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.institutionType}</td>
                      {view === "students" && (
                        <>
                          <td className="p-3">{user.branch}</td>
                          <td className="p-3">{user.academicYear}</td>
                        </>
                      )}
                    </tr>
                  )
                )}
              </tbody>
            </table>
            {displayMode === "all" &&
              rowsToShow <
                (view === "students"
                  ? visibleStudents.length
                  : visibleDrivers.length) && (
                <div className="text-center mt-4">
                  <button
                    className="px-4 py-1 bg-blue-600 text-white rounded"
                    onClick={handleLoadMore}
                  >
                    Load 20 more
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageData;
