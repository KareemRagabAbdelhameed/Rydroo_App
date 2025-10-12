import { 
  Bell, Shield, Settings, HelpCircle, LifeBuoy, Star, X
  
} from "lucide-react";
import { useAppSelector } from "../../store/auth/hooks";
import type { RootState } from "../../store/store";


type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  
  const { user } = useAppSelector((state: RootState) => state.auth);

  

  return (
    <div
      className={`fixed top-0 left-0 z-50 min-h-screen w-64 p-4 pb-10 text-white bg-secondMainColor transition-transform duration-300 
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-4 right-4">
        <X className="w-6 h-6" />
      </button>

      {/* Profile Section */}
      <div className="flex flex-col items-center space-y-2 mt-2">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 bg-maincolor border-none"
        />
        <h2 className="text-lg font-semibold">{user?.firstName || "John"} {user?.lastName || "Doe"}</h2>
        <p>{user?.email || "Example@Gmail.com"}</p>
        {/* Stars */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>

      {/* Items */}
      <div className="mt-4 space-y-2">
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10">
          <Shield className="w-5 h-5" />
          <span>Safety</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10">
          <HelpCircle className="w-5 h-5" />
          <span>Help</span>
        </a>
        <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10">
          <LifeBuoy className="w-5 h-5" />
          <span>Support</span>
        </a> 
      </div>

      {/* Driver Mode Button */}
      <div className="mt-4">
        <button className="w-full bg-maincolor text-secondMainColor font-semibold py-2 rounded-lg hover:bg-gray-100">
          Driver Mode
        </button>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mt-4 mb-10">
        {/* Facebook */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 48 48">
            <rect width="48" height="48" fill="#1877F2" rx="8" />
            <path
              d="M29 16h-4c-1.657 0-3 1.343-3 3v4h-4v5h4v12h6V28h4l1-5h-5v-3c0-.552.448-1 1-1h4v-5z"
              fill="#fff"
            />
          </svg>
        </a>

        {/* Instagram */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-14 h-14" viewBox="0 0 512 512">
            <defs>
              <linearGradient id="ig-gradient" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#FEDA75" />
                <stop offset="40%" stopColor="#FA7E1E" />
                <stop offset="70%" stopColor="#D62976" />
                <stop offset="100%" stopColor="#962FBF" />
              </linearGradient>
            </defs>
            <rect width="512" height="512" rx="120" fill="url(#ig-gradient)" />
            <path
              fill="white"
              d="M349.33 69.33H162.67C110.57 69.33 69.33 110.57 69.33 162.67v186.66c0 52.1 41.24 93.34 93.34 93.34h186.66c52.1 0 93.34-41.24 93.34-93.34V162.67c0-52.1-41.24-93.34-93.34-93.34zM432 349.33c0 45.74-37.26 83-83 83H163c-45.74 0-83-37.26-83-83V163c0-45.74 37.26-83 83-83h186c45.74 0 83 37.26 83 83v186.33z"
            />
            <path
              fill="white"
              d="M256 164c-50.65 0-92 41.35-92 92s41.35 92 92 92 92-41.35 92-92-41.35-92-92-92zm0 152c-33.14 0-60-26.86-60-60s26.86-60 60-60 60 26.86 60 60-26.86 60-60 60zm94-152a22 22 0 1 1-22-22 22 22 0 0 1 22 22z"
            />
          </svg>
        </a>

        {/* LinkedIn */}
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" viewBox="0 0 48 48">
            <rect width="48" height="48" fill="#0A66C2" rx="8" />
            <path
              d="M14 19h5v15h-5V19zm2.5-7c1.6 0 2.5 1.1 2.5 2.4 0 1.4-.9 2.6-2.5 2.6h-.1c-1.6 0-2.5-1.2-2.5-2.6C14 13.1 14.9 12 16.5 12zM34 19.1c-2.7 0-3.9 1.5-4.6 2.6h-.1V19h-5v15h5v-8c0-2.1.4-4.1 3-4.1s2.7 2.2 2.7 4.2v7.9h5v-8.5c0-4.3-2.3-7.5-6-7.5z"
              fill="#fff"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
