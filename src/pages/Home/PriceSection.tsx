import { useTranslation } from "react-i18next";
import priceImage from "../../assets/images/priceImage.png";

const PriceSection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-forthMainColor font-ge px-4 md:px-16 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between">
      {/* Text side */}
      <div className="w-full md:w-1/2 text-center md:text-right">
        <h2 className="text-3xl md:text-6xl font-bold leading-tight">
          {t("priceSection.title")}
        </h2>

        <span className="inline-block bg-maincolor text-white px-8 py-3 rounded-full text-lg md:text-2xl mt-6 font-bold">
          {t("priceSection.badge")}
        </span>
      </div>

      {/* Image side */}
      <div className="w-full md:w-1/2 flex justify-center py-10">
        <img
          src={priceImage}
          alt="Price Section"
          className="w-[300px] h-[380px] md:w-[400px] md:h-[500px] object-contain"
        />
      </div>
    </section>
  );
};

export default PriceSection;
