import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/auth/hooks";
import type { RootState } from "../store/store";

const ProtectedRoute = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute