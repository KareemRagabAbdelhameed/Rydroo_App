import { useTranslation } from "react-i18next";
import priceImage from "../../assets/images/priceImage.png";

const PriceSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-forthMainColor font-ge px-4 md:px-16 py-12 md:py-20 flex flex-col items-center">
      
      {/* Header Badge */}
      <div className="bg-white px-6 py-2 rounded-full shadow-sm mb-6 border border-gray-100">
        <span className="text-secondMainColor font-bold text-lg">
          {t("priceSection.header")}
        </span>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        
        {/* Text side - Appears on Right in RTL */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right order-2 md:order-1">
          <h2 className="text-3xl md:text-6xl font-bold leading-tight mb-8">
            {t("priceSection.title")}
          </h2>

          <div className="flex flex-col items-center md:items-start mb-8">
            <span className="inline-block bg-maincolor text-white px-10 py-3 rounded-full text-lg md:text-2xl font-bold mb-6 shadow-md">
              {t("priceSection.badge")}
            </span>
          </div>

          <div className="flex flex-col items-center md:items-start w-full">
             <p className="text-xl md:text-3xl text-secondMainColor font-bold mb-4 max-w-md">
               {t("priceSection.description")}
             </p>
            
            {/* Decorative Orange Stroke */}
            <div className="mt-2">
              <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12C40 4 100 20 140 12C180 4 196 12 196 12" stroke="#ea963e" strokeWidth="12" strokeLinecap="round" opacity="0.9"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Image side - Appears on Left in RTL */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-center order-1 md:order-2">
          <img
            src={priceImage}
            alt="Price Section"
            className="w-full max-w-[400px] h-auto md:w-[600px] md:h-auto object-contain"
          />
        </div>

      </div>
    </section>
  );
};



export default PriceSection;
