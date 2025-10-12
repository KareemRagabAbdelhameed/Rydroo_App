import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import { ToastContainer } from "react-toastify";
import VerifyOtp from "./pages/VerifyOtp";
import ProtectedRoute from "./validation/ProtectedRoute";
import { useAppSelector } from "./store/auth/hooks";
import type { RootState } from "./store/store";
import { useEffect, useState } from "react";
import SplashScreen from "./pages/Home/SplachScreen";
import BookRide from "./pages/BookRide";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Use this to get the current location
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!showSplash) {
      // List of routes that don't require login
      const publicRoutes = ["/login", "/register", "/verify"];
      
      // If the user is logged in and they are on a public route, redirect them to home
      if (user && publicRoutes.includes(location.pathname)) {
        navigate("/");
      } 
      // If the user is not logged in and they are on a protected route, redirect to login
      else if (!user && !publicRoutes.includes(location.pathname)) {
        navigate("/login");
      }
    }
  }, [showSplash, user, navigate, location.pathname]);

  const handleFinishSplash = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleFinishSplash} />;
  }

  return (
    <div className="overflow-x-hidden dark:bg-gray-900 min-h-screen">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-ride" element={<BookRide />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;