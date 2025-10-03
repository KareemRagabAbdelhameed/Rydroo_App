import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import HomePage from "./pages/Home"

const App = () => {
  return (
    <body className="dark:bg-gray-900">
    <div className="overflow-x-hidden">
      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/register" element = {<Register />} />
        <Route path="/login" element = {<Login />} />
      </Routes>
      </div>
      </body>
  )
}

export default App
