import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestRoute = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return (
      <Navigate
        to={
          role === "ADMIN"
            ? "/dashboard"
            : role === "USER"
            ? "/dashboard"
            : "/"
        }
        replace
      />
    );
  }

  return <Outlet />;
};

export default GuestRoute;
