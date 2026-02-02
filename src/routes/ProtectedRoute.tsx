import { Navigate, Outlet } from "react-router-dom";
import { getUserByLocalStorage } from "../modules/auth/utils";

export default function ProtectedRoute() {
  const { accessToken } = getUserByLocalStorage();

  if (!accessToken) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
