import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/auth/hooks";
import type { RootState } from "../store/store";

const ProtectedRoute = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  console.log(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute