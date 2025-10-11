// SplashScreen.tsx

import React, { useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import logoImage from '../../assets/images/logo.png';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [styles, api] = useSpring(() => ({
    opacity: 0,
    transform: 'scale(0.8)',
  }));

  // Start the animation when the component mounts
  useEffect(() => {
    api.start({
      opacity: 1,
      transform: 'scale(1)',
      config: { duration: 1400 },
    });

    // Set a timeout to finish the splash screen
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [api, onFinish]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-maincolor dark:bg-gray-900">
      <animated.img 
        src={logoImage} 
        alt="Splash Screen Image" 
        className="max-w-xs md:max-w-md" 
        style={styles} 
      />
    </div>
  );
};

export default SplashScreen;