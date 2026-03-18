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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentPage from "./pages/paymentPage";
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Drivers from "./admin/pages/Drivers";
import AdminTrips from "./admin/pages/Trips";
import AddTrip from "./admin/pages/AddTrip";
import UpdateTrip from "./admin/pages/updateTrip";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
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
      <Elements stripe={stripePromise}>
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trips" element={<TripsPage />} />
      <Route path="/trips/:id" element={<TripDetails />} />
      
        <Route element={<ProtectedRoute />}>
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/payment/:id/done" element={<Confirmation />} />

        <Route path="/admin" element={<AdminLayout />}>
  <Route path="dashboard" element={<Dashboard />} />
  <Route path="trips" element={<AdminTrips />} />
  <Route path="trips/add-trip" element ={<AddTrip />} />
  <Route path="trips/update-trip/:id" element ={<UpdateTrip />} />
  <Route path="drivers" element={<Drivers />} />
</Route>
        </Route>

        

        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyOtp />} />
        <Route path="/complete-driver-profile" element={<CompletDriverProfile />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </Elements>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default App;