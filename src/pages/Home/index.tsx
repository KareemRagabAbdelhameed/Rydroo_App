import Navbar from "../../components/Navbar"
import Header from "./Header"
import Position from "./Position"
import BookTrip from "./BookTrip"
import Trips from "./Trips"
import BottomNavbar from "../../components/BottomNavbar"
import { useState } from "react"
import Drawer from "./Drawer"

const HomePage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="overflow-x-hidden">
      <Navbar onOpen={() => setIsOpen(true)} />
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Header />
      <Position />
      <BookTrip />
      <Trips />
      <BottomNavbar />
    </div>
  )
}

export default HomePage
