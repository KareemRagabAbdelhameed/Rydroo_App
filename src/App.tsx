import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Home";
import { ToastContainer } from "react-toastify";
import VerifyOtp from "./pages/VerifyOtp";
import ProtectedRoute from "./validation/ProtectedRoute";
import {  useState } from "react";
import SplashScreen from "./pages/Home/SplachScreen";
import BookRide from "./pages/BookRide";
import Confirmation from "./pages/Confirmation";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  

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
          <Route path="/trips/:id" element={<BookRide />} />
          <Route path="/trips/:id/done" element={<Confirmation />} />
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