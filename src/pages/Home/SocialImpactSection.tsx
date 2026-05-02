import { useTranslation } from "react-i18next";

const SocialImpactSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-forthMainColor font-ge px-4 md:px-16 py-16 md:py-24 flex flex-col items-center text-center">
      <div className="max-w-4xl w-full flex flex-col items-center">
        {/* Section Title */}
        <h2 className="text-2xl md:text-5xl font-bold text-secondMainColor mb-6 leading-tight">
          {t("socialImpact.title")}
        </h2>

        {/* Section Description */}
        <p className="text-lg md:text-2xl text-secondMainColor font-medium mb-10 leading-relaxed max-w-3xl">
          {t("socialImpact.description")}
        </p>

        {/* Decorative Stroke (SVG) */}
        <div className="mb-12">
          <svg width="220" height="24" viewBox="0 0 220 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12C40 4 100 20 140 12C180 4 210 12 216 12" stroke="#ea963e" strokeWidth="12" strokeLinecap="round" opacity="0.8"/>
          </svg>
        </div>

        {/* Action Button */}
        <button className="bg-black text-white px-12 py-4 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors shadow-lg">
          {t("socialImpact.button")}
        </button>
      </div>
    </section>
  );
};

export default SocialImpactSection;
