import { Check } from "lucide-react";
import { Link } from "react-router-dom";


const Confirmation = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      
      {/* Circle with check */}
      <div className="w-32 h-32 rounded-full bg-orange-400 flex items-center justify-center mb-8 shadow-lg">
        <Check className="w-16 h-16 text-white" strokeWidth={3} />
      </div>

      {/* Text */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Confirmed!
      </h1>

      <p className="text-gray-500 text-center mb-12">
        Thank you for riding with us
      </p>

      {/* Button */}
      <Link to={"/"} className="
          w-full max-w-sm
          bg-orange-400 text-white text-center
          py-4 rounded-full
          text-lg font-medium
          hover:bg-orange-500
          transition
        ">
      
        Done
      
      </Link>
    </div>
  );
};

export default Confirmation;
