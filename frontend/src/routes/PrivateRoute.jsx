import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ redirectTo }) => {
  const { token } = useSelector((state) => state.auth);

  return token ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
