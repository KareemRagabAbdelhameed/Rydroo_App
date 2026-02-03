import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import rydroLogo from "../assets/images/Rydroo Logo.png"
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "./LanguageSwitcher";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/auth/hooks";
import type { RootState } from "../store/store";
import actAuthLogout from "../store/auth/act/actAuthLogout";
import { toast } from "react-toastify";
const  Navbar = ()=> {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isdropDownOpen,setIsDropDownOpen] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);


  const handleLogout = async () => {
    const result = await dispatch(actAuthLogout());
    
    if (actAuthLogout.fulfilled.match(result)) {
        toast.success(result.payload.message||"Logged out successfully!");
        navigate("/login");
    } else {
        toast.error(result.payload as string || "Failed to log out.");
    }
};

const firstLetter = user?.firstName ? user.firstName.charAt(0).toUpperCase() : '';

const toggleDropDown = ()=>{
  setIsDropDownOpen(!isdropDownOpen);
}

  return (
    <nav className="w-full bg-white font-ge">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center justify-between gap-6">
            {/* Right Side - Logo */}
          <div className="flex items-center gap-2">
            <img src={rydroLogo} alt="Logo" className="w-10 h-10 rounded-full " />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-lg">
            <a href="#" className="hover:text-maincolor">{t("home")}</a>
            <a href="#" className="hover:text-maincolor">{t("passengers")}</a>
            <a href="#" className="hover:text-maincolor">{t("drivers")}</a>
          </div>
          </div>

          {/* Left Side - Buttons */}
          <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />

            
            { !user ? 
            <>
            <Link to={"/register"} className="rounded-full bg-maincolor px-10 py-2 text-sm text-white">
             {t("register")}
            </Link>
            <Link to={"/login"} className="rounded-full border px-10 py-2 text-sm hover:bg-gray-100">
              {t("login")}
            </Link>
            </>
            : 
            <>
            {/* Avatar with the first letter (toggler) */}
      <div
        onClick={toggleDropDown}
        id="avatarButton"
        className="w-10 h-10 rounded-full cursor-pointer bg-maincolor text-white flex items-center justify-center font-bold text-lg"
      >
        {firstLetter}
      </div>
      <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              <LogOut className="w-4 h-4" />
              <span>{t("logout")}</span>
            </button>
            {isdropDownOpen && (
              <div className="absolute mt-28 w-48 z-10 bg-maincolor text-white rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
              <div>
                <div className="flex-1 px-3 py-3 text-sm dark:text-white">
                  <div>{user?.firstName} {user?.lastName}</div>
                  <div className="font-medium truncate">{user?.email}</div>
                </div>
              </div>
              </div>
            )}
            </>
            }
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col gap-4 p-4">
            <a href="#">{t("home")}</a>
            <a href="#">{t("passengers")}</a>
            <a href="#">{t("drivers")}</a>

            <hr />

            {!user ?
            <>
            <Link to={"/login"} className="rounded-full border px-4 py-2">
            {t("login")}
            </Link>
            <Link to={"/register"} className="rounded-full bg-maincolor px-4 py-2 text-white">
            {t("register")}
            </Link>
            </>
            : 
            <div className="flex items-center gap-2">
            {/* Avatar with the first letter (toggler) */}
      <div
        onClick={toggleDropDown}
        id="avatarButton"
        className="w-10 h-10 rounded-full cursor-pointer bg-maincolor text-white flex items-center justify-center font-bold text-lg"
      >
        {firstLetter}
      </div>
      <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              <LogOut className="w-4 h-4" />
              <span>{t("logout")}</span>
            </button>
           
            </div>
            }
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}
export default Navbar