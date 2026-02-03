import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactCountryFlag from "react-country-flag";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang: "ar" | "en") => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
    setOpen(false);
  };

  const isArabic = i18n.language === "ar";

  return (
    <div className="relative">
      {/* Current language */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer text-sm select-none"
      >
        <ReactCountryFlag
          svg
          countryCode={isArabic ? "EG" : "GB"}
          className="text-lg"
        />
        <span>{isArabic ? "AR" : "EN"}</span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className={`absolute ${isArabic ? "right-0" : "left-0"} mt-2 w-24 rounded-lg border bg-white shadow`}>
          <button
            onClick={() => changeLanguage("ar")}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100"
          >
            <ReactCountryFlag svg countryCode="EG" />
            AR
          </button>

          <button
            onClick={() => changeLanguage("en")}
            className="flex w-full items-center gap-2 px-3 py-2 hover:bg-gray-100"
          >
            <ReactCountryFlag svg countryCode="GB" />
            EN
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
