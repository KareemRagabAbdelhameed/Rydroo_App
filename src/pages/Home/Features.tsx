import { ShieldCheck, Clock, Wallet, Armchair } from 'lucide-react'
import { motion } from 'framer-motion'
const features = [
  {
    icon: ShieldCheck,
    title: 'مواقف منظمة',
    description:
      'كل المواقف العامة في مصر متسجلة عندنا بمواعيدها وأسعارها الرسمية.',
  },
  {
    icon: Clock,
    title: 'مواعيد دقيقة',
    description:
      'اعرف مواعيد انطلاق الميكروباصات والأتوبيسات قبل ما تنزل من بيتك.',
  },
  {
    icon: Wallet,
    title: 'أسعار واضحة',
    description:
      'شوف الأسعار الرسمية لكل خط وقارن بين المواقف المختلفة بسهولة.',
  },
  {
    icon: Armchair,
    title: 'سهولة الوصول',
    description: 'خرائط توضح أماكن المواقف وأقرب موقف ليك في أي محافظة.',
  },
]
export function Features() {
  return (
    <section className="py-20 bg-white rounded-t-[3rem]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            ليه تختار رايدرو؟
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            بنساعدك تلاقي أقرب موقف ليك وتعرف مواعيده وأسعاره بكل سهولة.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="bg-[#fcfaf7] p-8 rounded-3xl hover:bg-forthMainColor transition-all text-center group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-maincolor" />
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
