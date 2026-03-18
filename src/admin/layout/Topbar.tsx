import { Link } from "react-router-dom";
import rydrooLogo from "../../assets/images/Rydroo Logo.png"
const Topbar = () => {
    return (
      <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
        <h2 className="text-lg font-semibold text-gray-700">
          Admin Panel
        </h2>
  
        <div className="flex items-center gap-2">
            <Link to={"/"}><img src={rydrooLogo} alt="Logo" className="w-10 h-10 rounded-full " /></Link>
          </div>
      </header>
    );
  };
  
  export default Topbar;