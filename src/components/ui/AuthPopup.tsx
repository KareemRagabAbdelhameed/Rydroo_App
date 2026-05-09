import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-ge">
      {/* Overlay to close when clicking outside */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-40 transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div 
        className="relative bg-white rounded-3xl shadow-xl w-full max-w-lg px-8 py-10 md:py-12 flex flex-col items-center text-center z-10 border border-gray-100"
      >
        <h3 className="text-xl md:text-2xl font-bold text-secondMainColor mb-10 leading-snug">
          {t('authPopup.title')}
        </h3>
        
        <div className="flex flex-row items-center justify-center gap-4 w-full">
          {/* Register Button (Right in RTL) */}
          <button 
            onClick={() => {
              navigate('/register', { replace: true });
            }}
            className="flex-1 bg-maincolor text-white rounded-full py-2.5 px-6 text-base md:text-lg font-bold hover:bg-opacity-90 transition-all"
          >
            {t('register')}
          </button>

          {/* Login Button (Left in RTL) */}
          <button 
            onClick={() => {
              navigate('/login', { replace: true });
            }}
            className="flex-1 bg-white border border-secondMainColor text-secondMainColor rounded-full py-2.5 px-6 text-base md:text-lg font-bold hover:bg-gray-50 transition-all"
          >
            {t('login')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
