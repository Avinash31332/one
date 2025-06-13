import React from "react";
import ViewStudents from "./pages/ViewStudents";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Test from "./pages/Test";
import AdminAuth from "./pages/AdminAuth";
import "leaflet/dist/leaflet.css";
import StudentDriverCreate from "./admin/pages/StudentDriverCreate";
import AdminDashboard from "./admin/dashboard";
import HomePage from "./admin/pages/HomePage";
import ManageData from "./admin/pages/ManageData";
import EditCollegeData from "./admin/pages/EditCollegeData";
import Billing from "./admin/pages/Billing";
import AdminProfile from "./admin/pages/AdminProfile";
import DriverHome from "./driver/pages/HomePage";
import DriverInterface from "./driver/DriverInterface";
import DriverProfile from "./driver/pages/ProfilePage";
import DriverAuth from "./driver/pages/DriverAuth";
import SupportPage from "./driver/pages/SupportPage";
import StudentInterface from "./student/StudentInterface.jsx";
import StudentSupport from "./student/pages/StudentSupportPage.jsx";
import StudentProfile from "./student/pages/StudentProfile.jsx";
import StudentHome from "./student/pages/StudentHome.jsx";
import StudentAuth from "./student/pages/StudentAuth.jsx";

function App() {
  return (
    <div>
      <div>
        <Routes>
          {/* admin routes */}
          <Route path={"/"} element={<AdminAuth />} />
          <Route path={"/admin/students"} element={<ViewStudents />} />
          <Route path={"/admin/login"} element={<AdminLogin />} />
          <Route path={"/admin/auth"} element={<AdminAuth />} />
          <Route path={"/test"} element={<Test />} />
          <Route
            path={"/student-driver/create"}
            element={<StudentDriverCreate />}
          />
          <Route path="/admin/dashboard" element={<AdminDashboard />}>
            <Route path="" element={<HomePage />} />
            <Route path="manage-data" element={<ManageData />} />
            <Route path="create-data" element={<StudentDriverCreate />} />
            <Route path="edit-college-data" element={<EditCollegeData />} />
            <Route path="billing" element={<Billing />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          <Route path="/driver/login" element={<DriverAuth />} />
          <Route path="/student/login" element={<StudentAuth />} />

          {/* driver routes */}
          <Route path="/driver" element={<DriverInterface />}>
            <Route path="" element={<DriverHome />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="profile-page" element={<DriverProfile />} />
          </Route>

          {/* student routes */}
          <Route path="/student" element={<StudentInterface />}>
            <Route path="" element={<StudentHome />} />
            <Route path="support" element={<StudentSupport />} />
            <Route path="profile-page" element={<StudentProfile />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
