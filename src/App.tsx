import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
      </Routes>
      </div>
  )
}

export default App
