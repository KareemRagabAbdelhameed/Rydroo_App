import { Route, Routes, useNavigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import HomePage from "./pages/Home"
import { ToastContainer } from "react-toastify"
import VerifyOtp from "./pages/VerifyOtp"
import ProtectedRoute from "./validation/ProtectedRoute"
import { useAppSelector } from "./store/auth/hooks"
import type { RootState } from "./store/store"
import { useEffect, useState } from "react"
import SplashScreen from "./pages/Home/SplachScreen"

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    // هذه الدالة ستُستدعى بعد انتهاء شاشة البداية
    if (!showSplash) {
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    }
  }, [showSplash, user, navigate]);

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
          {/* Add more protected routes here */}
        </Route>
        <Route path="/register" element = {<Register />} />
        <Route path="/verify" element = {<VerifyOtp />} />
        <Route path="/login" element = {<Login />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
      </div>
  )
}

export default App
