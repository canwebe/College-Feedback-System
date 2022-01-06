import { Navigate } from "react-router-dom";

const RequireAuth = ({ children, redirectTo, user }) => {
  return user ? children : <Navigate to={redirectTo} replace />;
};

export default RequireAuth;
