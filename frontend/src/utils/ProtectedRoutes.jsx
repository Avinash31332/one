import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const response = axios.get("https://one-6hcr.onrender.com", {
    withCredentials: true,
  });
  return response ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
