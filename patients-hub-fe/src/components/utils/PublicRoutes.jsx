import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth";
function PublicRoute() {
  const [auth] = useContext(AuthContext);
  const location = useLocation();
  return auth.user ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
}

export default PublicRoute;
