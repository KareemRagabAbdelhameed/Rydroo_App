import { Menu } from "lucide-react"
import UserDrpoDown from "./ui/UserDrpoDown"
type MenuButtonProps = {
    onOpen: () => void;
  };
const Navbar = ({ onOpen }: MenuButtonProps) => {
   
  return (
    <div>
      <div className="w-[90%] mx-auto flex justify-between">
        {/* for avatar and title  */}
        <div className="w-[270px] h-[60px] rounded-full p-4 my-8 bg-forthMainColor flex space-x-2">
            <UserDrpoDown />
            <h1>Good Morning, Mostafa</h1>
        </div>
        {/* for menu */}
        <button onClick={onOpen} className="bg-secondMainColor w-[52px] h-[52px] rounded-full my-8 flex items-center justify-center">
        <Menu className="text-white" />
        </button>
      </div>
    </div>
  )
}

export default Navbar
