import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import HomePage from "./pages/Home"
import { ToastContainer } from "react-toastify"
import VerifyOtp from "./pages/VerifyOtp"

const App = () => {
  return (
    <div className="overflow-x-hidden dark:bg-gray-900 min-h-screen">
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/verify" element = {<VerifyOtp />} />
        <Route path="/login" element = {<Login />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
      </div>
  )
}

export default App
