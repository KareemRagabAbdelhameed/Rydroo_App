import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import { ToastContainer } from "react-toastify";
import VerifyOtp from "./pages/VerifyOtp";
import ProtectedRoute from "./validation/ProtectedRoute";
import {  useState } from "react";
import SplashScreen from "./pages/Home/SplachScreen";
import Confirmation from "./pages/Confirmation";
import CompletDriverProfile from "./pages/CompletDriverProfile";
import { useTranslation } from "react-i18next";
import TripsPage from "./pages/trips";
import TripDetails from "./pages/trips/TripDetails";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const {i18n} = useTranslation();
  

  const handleFinishSplash = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleFinishSplash} />;
  }

  return (
    <div dir={i18n.language==="ar" ? "rtl" : "ltr"} className="overflow-x-hidden dark:bg-gray-900 min-h-screen">
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trips" element={<TripsPage />} />
      <Route path="/trips/:id" element={<TripDetails />} />
        <Route element={<ProtectedRoute />}>
          
          <Route path="/trips/:id/done" element={<Confirmation />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/complete-driver-profile" element={<CompletDriverProfile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;