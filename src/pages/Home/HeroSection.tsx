import { useTranslation } from "react-i18next";
import heroImage from "../../assets/images/homee.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
const HeroSection = () => {
  const { t } = useTranslation();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const navigate = useNavigate();

  const fromCities = ["suez"];

  const toCities = ["moneib", "marg", "ramses", "salam", "zagazig"];

  const handleSearch = () => {
    if (!from || !to) return;

    const lang = i18n.language;

    const sourceText = t(`cities.${from}`, { lng: lang });
    const destinationText = t(`cities.${to}`, { lng: lang });

    navigate(
      `/trips?source=${encodeURIComponent(
        sourceText
      )}&destination=${encodeURIComponent(destinationText)}`
    );
  };

  return (
    <section
      className="bg-forthMainColor font-ge px-4 md:px-16 flex flex-col-reverse md:flex-row items-center justify-between py-12 md:py-0 min-h-[85vh]"
    >
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center py-8 md:py-16">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight text-secondMainColor">
          {t("title")}
        </h1>

        <div className="mt-6">
          <span className="inline-block bg-maincolor text-white px-8 py-3 rounded-full text-xl md:text-3xl font-bold shadow-md">
            {t("badge")}
          </span>
        </div>

        <p className="text-xl md:text-3xl mt-8 text-secondMainColor font-medium max-w-xl">
          {t("description")}
        </p>

        <div className="bg-white p-8 rounded-3xl shadow-xl mt-10 flex flex-col items-center w-full max-w-xl border border-gray-100">
          <div className="bg-black text-white px-8 py-2 rounded-full mb-6 text-sm font-bold">
            {t("searchTrips")}
          </div>

          <div className="flex flex-col gap-4 w-full mb-6">
            <div className="relative w-full">
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full bg-forthMainColor rounded-xl py-3 px-4 focus:outline-none border-none text-lg font-medium"
              >
                <option value="">{t("fromPlaceholder")}</option>
                {fromCities.map((city) => (
                  <option key={city} value={city}>{t(`cities.${city}`)}</option>
                ))}
              </select>
            </div>

            <div className="relative w-full">
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full bg-forthMainColor rounded-xl py-3 px-4 focus:outline-none border-none text-lg font-medium"
              >
                <option value="">{t("toPlaceholder")}</option>
                {toCities.map((city) => (
                  <option key={city} value={city}>{t(`cities.${city}`)}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            onClick={handleSearch} 
            className="w-full bg-maincolor text-white py-4 rounded-xl text-xl font-bold hover:bg-opacity-90 transition-all shadow-lg active:scale-95"
          >
            {t("bookNow")}
          </button>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center h-full">
        <img
          src={heroImage}
          alt="hero Image"
          className="w-full max-w-[450px] md:max-w-[700px] h-auto object-contain"
        />
      </div>
    </section>
  );
};
export default HeroSection;
