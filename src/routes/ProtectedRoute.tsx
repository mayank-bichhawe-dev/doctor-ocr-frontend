import { Navigate, Outlet } from "react-router-dom";
import { loadUserDataFromLocalStorage } from "../modules/auth/utils";

export default function ProtectedRoute() {
  const { accessToken } = loadUserDataFromLocalStorage();
  if (!accessToken) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
