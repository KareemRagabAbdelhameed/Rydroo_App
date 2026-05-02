import { useTranslation } from "react-i18next";
import impressImage from "../../assets/images/impress.png";

const SafetySection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-forthMainColor font-ge px-4 md:px-16 py-12 md:py-20 flex flex-col items-center">
      {/* Top Badge */}
      <div className="bg-white px-6 py-2 rounded-full shadow-sm mb-6 border border-gray-100">
        <span className="text-secondMainColor font-bold text-lg">
          {t("safetySection.badge")}
        </span>
      </div>

      {/* Section Title */}
      <h2 className="text-3xl md:text-5xl font-bold text-secondMainColor mb-12 text-center">
        {t("safetySection.title")}
      </h2>

      {/* Main Content Card */}
      <div className="bg-maincolor w-full max-w-6xl rounded-[40px] md:rounded-[60px] overflow-hidden flex flex-col md:flex-row items-center relative min-h-[400px]">
        
        {/* Image Content - First in RTL DOM = Right Side */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-end h-full pt-8 md:pt-0">
          <img
            src={impressImage}
            alt="Safety representation"
            className="w-full h-auto object-contain max-h-[400px] md:max-h-[500px]"
          />
        </div>

        {/* Text Content - Second in RTL DOM = Left Side */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col items-center md:items-start text-center md:text-right">
          <h3 className="text-2xl md:text-4xl font-bold text-secondMainColor mb-6 leading-tight w-full">
            {t("safetySection.cardTitle")}
          </h3>
          <p className="text-lg md:text-xl text-secondMainColor font-medium mb-8 leading-relaxed max-w-lg w-full">
            {t("safetySection.cardDescription")}
          </p>
          
          {/* Decorative Wave (SVG) */}
          <div className="mb-10 w-full flex justify-center md:justify-start">
            <svg width="160" height="16" viewBox="0 0 160 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12C30 4 60 14 80 12C100 10 130 2 156 8" stroke="#FCEFE2" strokeWidth="8" strokeLinecap="round"/>
            </svg>
          </div>

          <div className="w-full flex justify-center md:justify-start">
            <button className="bg-black text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors">
              {t("safetySection.button")}
            </button>
          </div>
        </div>
      </div>


    </section>
  );
};

export default SafetySection;
