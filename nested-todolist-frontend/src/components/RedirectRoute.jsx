import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const RedirectRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
};

export default RedirectRoute;
