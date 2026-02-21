import { useTranslation } from "react-i18next";
import heroImage from "../../assets/images/man-wearing-t-shirt-gesturing.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
const HeroSection = () => {
  const {t} = useTranslation();
  const [from,setFrom] = useState("");
  const [to,setTo] = useState("");
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
      className="bg-forthMainColor font-ge  px-4 md:px-16 flex flex-col-reverse md:flex-row items-center justify-between"
    >
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 mb-24">
        <h1 className="text-3xl md:text-6xl font-bold">{t("title")}</h1>

        <span className="inline-block bg-maincolor px-10 py-2 rounded-full text-lg md:text-2xl mt-6">
          {t("badge")}
        </span>

        <p className="text-lg md:text-3xl mt-6">
          {t("description")}
        </p>
        <div className="bg-white p-6 rounded-lg shadow-md mt-8 flex flex-col items-center">
          <button className=" px-4 rounded-md bg-black text-white py-2 mb-4 hover:opacity-90 transition">
            {t("searchTrips")}
          </button>
          <div className="relative w-full">
          
       
          <select
            value={from}
            onChange={(e)=>setFrom(e.target.value)}
            className="w-full bg-forthMainColor rounded py-2 px-3 mb-3 focus:outline-none"
            >
              <option value="">{t("fromPlaceholder")}</option>
              {fromCities.map((city)=> (
                <option key={city} value={city}>{t(`cities.${city}`)}</option>
              ))}
          </select>
          </div>
          
          <div className="relative w-full">
          
          <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full bg-forthMainColor rounded py-2 px-3 mb-3 focus:outline-none"
      >
        <option value="">{t("toPlaceholder")}</option>
        {toCities.map((city)=>(
          <option key={city} value={city}>{t(`cities.${city}`)}</option>
        ))}
      </select>
          </div>

          <button onClick={handleSearch} className="w-full bg-maincolor text-white py-2 rounded hover:opacity-90 transition">
            {t("bookNow")}
          </button>
        </div>
      </div>
      {/* Right side - Image */}
      <div className="w-full md:w-1/2 flex justify-center py-10">
        <img
          src={heroImage}
          alt="hero Image"
          className="w-[400px] h-[500px] md:w-[470px] md:h-[644px]  object-cover rounded-lg"
        />
      </div>
    </section>
  );
};
export default HeroSection;
