import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Example: Check for a token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;