import { useTranslation } from "react-i18next";
import { MoveLeft, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import mansouraImage from "../../assets/images/mansouraImage.png";
import zagazigImage from "../../assets/images/zagazigImage.png";
import ramsesImage from "../../assets/images/ramsesImage.jpeg";

const DestinationsSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  const destinations = [
    {
      id: 1,
      image: mansouraImage,
      from: "السويس",
      fromEn: "Suez",
      to: "المنصورة",
      toEn: "Mansoura",
      price: "٩٠",
      priceEn: "90",
    },
    {
      id: 2,
      image: zagazigImage,
      from: "السويس",
      fromEn: "Suez",
      to: "الزقازيق",
      toEn: "Zagazig",
      price: "٩٠",
      priceEn: "90",
    },
    {
      id: 3,
      image: ramsesImage,
      from: "السويس",
      fromEn: "Suez",
      to: "رمسيس",
      toEn: "Ramses",
      price: "٩٠",
      priceEn: "90",
    },
  ];

  return (
    <section className="bg-forthMainColor font-ge px-4 md:px-16 py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 text-center md:text-start">
          {/* Title block - First in DOM ensures Right in RTL and Left in LTR */}
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:text-start"
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black">
              {t("destinations.title")}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 font-medium">
              {t("destinations.subtitle")}
            </p>
          </motion.div>

          {/* View All - Second in DOM ensures Left in RTL and Right in LTR */}
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mt-6 md:mt-0"
          >
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-maincolor font-bold text-xl md:text-2xl transition-colors group-hover:text-secondMainColor">
                {t("destinations.viewAll")}
              </span>
              <div className={`text-maincolor transition-transform ${isRtl ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                {isRtl ? <MoveLeft size={28} /> : <MoveRight size={28} />}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center group"
            >
              <div className="relative w-full rounded-[32px] overflow-hidden shadow-xl bg-white transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                {/* Image Container */}
                <div className="h-56 md:h-64 w-full relative overflow-hidden">
                  <img
                    src={dest.image}
                    alt={isRtl ? dest.to : dest.toEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Price Badge Overlay - Always on the left */}
                  <div className="absolute top-6 left-6 bg-maincolor text-white px-6 py-2 rounded-xl font-bold text-lg md:text-xl shadow-lg border border-white/20 backdrop-blur-sm bg-opacity-90">
                    {isRtl ? `يبدأ من ${dest.price} ج` : `Starts from ${dest.priceEn} EGP`}
                  </div>
                </div>

                {/* Route Info Section */}
                <div className={`p-6 flex items-center justify-between bg-white ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* In RTL: [Destination] <- [Origin] */}
                  {/* In LTR: [Origin] -> [Destination] */}
                  <span className="text-xl md:text-2xl font-bold text-gray-800">
                    {isRtl ? dest.from : dest.toEn}
                  </span>
                  <div className="text-maincolor mx-4">
                    {isRtl ? <MoveLeft className="w-8 h-8 md:w-10 md:h-10" /> : <MoveRight className="w-8 h-8 md:w-10 md:h-10" />}
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-gray-800">
                    {isRtl ? dest.to : dest.fromEn}
                  </span>
                </div>
              </div>

              {/* Enhanced Action Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-maincolor text-white px-12 py-3 rounded-2xl text-xl font-bold mt-8 hover:bg-secondMainColor transition-colors w-full md:w-fit shadow-lg"
              >
                {t("destinations.bookNow")}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
