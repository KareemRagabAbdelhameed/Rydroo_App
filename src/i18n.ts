import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import  LanguageDetector  from 'i18next-browser-languagedetector';
import translationEN from "./locale/en/translation.json"
import translationAR from "./locale/ar/translation.json"
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next) 
  .init({
    resources,
    fallbackLng: "ar",

    interpolation: {
      escapeValue: false 
    },
    detection: {
      order: ["cookie", "localStorage", "navigator"],
      caches: ["cookie"], // هنا التخزين
    },
  });

  export default i18n;