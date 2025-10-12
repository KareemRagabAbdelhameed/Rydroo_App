import React from 'react';
import user from "../../assets/images/user2 1.png"
import { Check } from 'lucide-react';
const Destination: React.FC = () => {
  return (
   <div className='space-y-4 mt-8'>
    <h2 className='dark:text-white px-4'>Destination</h2>
     {/* // Main container styled for modern design (padding, shadows, responsive colors) */}
    <div className="p-4 bg-forthMainColor dark:bg-gray-800 rounded-xl dark:border-gray-700">
      
      {/* Outer Flex container: Aligns items horizontally (avatar/text group | car icon) */}
      <div className="flex items-center justify-between">
        
        {/* Left Side Group: Circle Avatar and Text Stack */}
        <div className="flex items-center space-x-4">
          
          {/* 1. Circle Avatar (Placeholder for initials) */}
          <div className="w-12 h-12 rounded-full bg-maincolor flex items-center justify-center font-semibold text-lg text-white shadow-md flex-shrink-0">
            <img src={user} alt="user Image" />
          </div>
          
            {/* H1 with dynamic color requirements */}
            <h1 className="text-xl font-bold text-secondMainColor dark:text-white leading-snug">
              How Many Passengers?
            </h1>
            
        </div>
        
        
        <div className="relative w-12 h-12 flex items-center justify-center text-white">
          {/* الخلفية البرتقالية/الذهبية للشارة */}
          <div className="absolute w-full h-full bg-amber-600 rounded-lg transform rotate-45 opacity-90" />
          {/* أيقونة Check في المنتصف */}
          <Check className="w-8 h-8 relative z-10" color="white" />
      </div>
        

      </div>
    </div>
   </div>
  );
};

export default Destination;