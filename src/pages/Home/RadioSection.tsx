import { useTranslation } from "react-i18next";
import { Volume2 } from "lucide-react";

const RadioSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-forthMainColor font-ge px-4 md:px-16 py-16 md:py-24 flex flex-col items-center text-center">
      <div className="max-w-4xl w-full flex flex-col items-center">
        {/* Section Title */}
        <h2 className="text-2xl md:text-5xl font-bold text-secondMainColor mb-6 leading-tight max-w-3xl">
          {t("radioSection.title")}
        </h2>

        {/* Section Description */}
        <p className="text-lg md:text-2xl text-secondMainColor font-medium mb-12 leading-relaxed max-w-4xl">
          {t("radioSection.description")}
        </p>

        {/* Audio Visualizer Component */}
        <div className="relative flex flex-col items-center">
          <div className="bg-black text-white px-10 py-4 rounded-full flex items-center gap-6 shadow-xl mb-6">
            
            
            {/* Simple Sound Wave Animation */}
            <div className="flex items-center gap-1 h-8 md:h-10">
              <div className="w-1 bg-white rounded-full animate-[soundWave_1.2s_infinite] h-4"></div>
              <div className="w-1 bg-white rounded-full animate-[soundWave_0.8s_infinite_0.1s] h-8"></div>
              <div className="w-1 bg-white rounded-full animate-[soundWave_1s_infinite_0.2s] h-6"></div>
              <div className="w-1 bg-white rounded-full animate-[soundWave_0.7s_infinite_0.3s] h-10"></div>
              <div className="w-1 bg-white rounded-full animate-[soundWave_1.1s_infinite_0.4s] h-5"></div>
              <div className="w-1 bg-white rounded-full animate-[soundWave_0.9s_infinite_0.5s] h-7"></div>
              <div className="w-1 bg-white rounded-full animate-[soundWave_1.3s_infinite_0.2s] h-3"></div>
            </div>

            <Volume2 className="w-8 h-8 md:w-10 md:h-10" />
          </div>

          {/* Decorative Orange Stroke */}
          <div className="mt-2">
            <svg width="200" height="20" viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12C40 4 100 20 140 12C180 4 196 12 196 12" stroke="#ea963e" strokeWidth="12" strokeLinecap="round" opacity="0.9"/>
            </svg>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes soundWave {
          0%, 100% { height: 30%; }
          50% { height: 100%; }
        }
      `}} />
    </section>
  );
};

export default RadioSection;
