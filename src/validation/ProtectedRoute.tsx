import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/auth/hooks";
import type { RootState } from "../store/store";
import AuthPopup from "../components/ui/AuthPopup";
import { useState } from "react";

const ProtectedRoute = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  if (!user) {
    return (
      <AuthPopup 
        isOpen={isPopupOpen} 
        onClose={() => {
          setIsPopupOpen(false);
          navigate(-1);
        }} 
      />
    );
  }
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
export default ProtectedRoute;
