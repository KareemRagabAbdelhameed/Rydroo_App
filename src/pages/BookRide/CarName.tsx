import React from 'react';
import car from "../../assets/images/carmix.png"
import avatar from "../../assets/images/avatarImage.png"
const CarName: React.FC = () => {
  return (
    // Main container styled for modern design (padding, shadows, responsive colors)
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
      
      {/* Outer Flex container: Aligns items horizontally (avatar/text group | car icon) */}
      <div className="flex items-center justify-between">
        
        {/* Left Side Group: Circle Avatar and Text Stack */}
        <div className="flex items-center space-x-4">
          
          {/* 1. Circle Avatar (Placeholder for initials) */}
          <div className="w-12 h-12 rounded-full bg-maincolor flex items-center justify-center font-semibold text-lg text-white shadow-md flex-shrink-0">
            <img src={avatar} alt="Avatar Image" />
          </div>
          
          {/* 2. Text Block: Title (h1) and Subtitle (p) */}
          <div className="flex flex-col">
            {/* H1 with dynamic color requirements */}
            <h1 className="text-xl font-bold text-secondMainColor dark:text-white leading-snug">
              Toyota Corolla 2024
            </h1>
            {/* Subtitle with muted color */}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Comfort | A/C Available
            </p>
          </div>
        </div>
        
        
          <img src={car} alt="Car Image" />
        

      </div>
    </div>
  );
};

export default CarName;