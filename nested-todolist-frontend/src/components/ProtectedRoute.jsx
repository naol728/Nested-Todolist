import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // Check auth token

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
