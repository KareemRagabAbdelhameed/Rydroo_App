import React from 'react';
import { CalendarCheck, Clock, DollarSign } from 'lucide-react';

// هذا المُكوِّن الفرعي يمثل كل بطاقة معلومات (التاريخ، الوقت، السعر)
interface RideInfoCardProps {
  icon: React.ReactNode;
  topText: string;
  bottomText: string;
}

const RideInfoCard: React.FC<RideInfoCardProps> = ({ icon, topText, bottomText }) => (
    <div className="flex flex-col items-center text-center space-y-4">
        {/* Circle Icon Container: خلفية دائرية خفيفة وأيقونة بيضاء */}
        <div className="w-24 h-24 rounded-full bg-thirdMainColor dark:bg-gray-700/50 flex items-center justify-center shadow-xl">
            {icon}
        </div>
        
        {/* Text Block */}
        <div>
            {/* النص العلوي (مثل التاريخ أو السعر) باللون الذهبي الداكن */}
            <p className="text-xl font-semibold dark:text-amber-500">
                {topText}
            </p>
            {/* النص السفلي (مثل اليوم أو العملة) بلون متناسق */}
            <p className="text-base dark:text-amber-600">
                {bottomText}
            </p>
        </div>
    </div>
);

const RideInfoSection: React.FC = () => {
    // لون الأيقونة: أبيض ليتناسب مع الخلفية الداكنة في الصورة
    const iconColor = "black";

    return (
        // الخلفية الداكنة الكاملة لتتماشى مع تصميم الصورة
        <div className="p-6 dark:bg-gray-900 min-h-[300px]">
            {/* العنوان "Ride info" */}
            <h2 className="text-xl font-medium dark:text-amber-500 mb-8">Ride info</h2>
            
            {/* Container for the three cards: توزيع متساوٍ ومحاذاة علوية */}
            <div className="flex justify-around items-start">
                
                {/* 1. بطاقة التاريخ واليوم */}
                <RideInfoCard 
                    icon={<CalendarCheck className="w-12 h-12" color={iconColor} />}
                    topText="22/9/2025"
                    bottomText="Monday"
                />

                {/* 2. بطاقة الوقت */}
                <RideInfoCard 
                    icon={<Clock className="w-12 h-12" color={iconColor} />}
                    topText="2:00 PM"
                    bottomText="Time"
                />

                {/* 3. بطاقة السعر والعملة */}
                <RideInfoCard 
                    icon={<DollarSign className="w-12 h-12" color={iconColor} />}
                    topText="65 EGP"
                    bottomText="Price"
                />
            </div>
            <button className='w-full p-6 rounded-full bg-maincolor text-white text-lg font-semibold mt-6 mb-6'>
                Confirm Ride
            </button>
        </div>
    );
};

export default RideInfoSection;