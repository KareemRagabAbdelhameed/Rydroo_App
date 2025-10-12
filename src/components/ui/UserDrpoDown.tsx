import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/auth/hooks';
import type { RootState } from '../../store/store';
import { User, Settings, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import actAuthLogout from '../../store/auth/act/actAuthLogout';
import { toast } from 'react-toastify';

const UserDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const firstLetter = user?.firstName ? user.firstName.charAt(0).toUpperCase() : '';

  return (
    <div className="relative">
      {/* Avatar with the first letter (toggler) */}
      <div
        onClick={toggleDropdown}
        id="avatarButton"
        className="w-10 h-10 rounded-full cursor-pointer bg-maincolor text-white flex items-center justify-center font-bold text-lg"
      >
        {firstLetter}
      </div>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 z-10 bg-forthMainColor divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600">
          <div>
            <div className="flex-1 px-3 py-3 text-sm text-gray-900 dark:text-white">
              <div>{user?.firstName} {user?.lastName}</div>
              <div className="font-medium truncate">{user?.email}</div>
            </div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
            <li>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </a>
            </li>
          </ul>
          <div className="py-1">
            <button onClick={handleLogout} className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropDown;