import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth";
import Navbar from "../Navbar/Navbar";
function PrivateRoute() {
  const [auth] = useContext(AuthContext);
  const location = useLocation();
  return auth.user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;
