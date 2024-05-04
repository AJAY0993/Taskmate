import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../reducer/userSlice";
import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  if (!isAuthenticated) return <Navigate to={"/login"} replace />;
  return children;
}

export default ProtectRoute;
