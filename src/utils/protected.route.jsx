import { Navigate } from "react-router-dom";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (user) {
          return children;
        }
        if (!user) {
          return <Navigate to="/login" replace />;
        }
        return;
      }}
    />
  );
};

export default ProtectedRoute;
