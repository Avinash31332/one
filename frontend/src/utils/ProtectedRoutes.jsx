import axios from "axios";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const response = axios.get("http://localhost:3000", {
    withCredentials: true,
  });
  return response ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
