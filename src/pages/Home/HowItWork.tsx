import { Search, CalendarCheck, Bus } from 'lucide-react'
const steps = [
  {
    icon: Search,
    title: 'ابحث عن موقفك',
    description: 'حدد مكان الانطلاق والوصول وشوف المواقف المتاحة.',
  },
  {
    icon: CalendarCheck,
    title: 'اعرف المواعيد',
    description: 'شوف مواعيد انطلاق الميكروباصات والأتوبيسات والأسعار.',
  },
  {
    icon: Bus,
    title: 'روح الموقف وسافر',
    description: 'توجه للموقف في الميعاد واستمتع برحلة مريحة.',
  },
]
export function HowItWorks() {
  return (
    <section className="py-20 bg-[#F5EDE4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ازاي تستخدم رايدرو؟
          </h2>
          <p className="text-gray-600 text-lg">
            3 خطوات بسيطة تفصلك عن رحلتك الجاية
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-maincolor -z-0 transform -translate-y-1/2"></div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-white rounded-full border-4 border-maincolor flex items-center justify-center mb-6 shadow-lg">
                <step.icon className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 max-w-xs text-lg">
                {step.description}
              </p>

              {/* Step Number Badge */}
              <div className="absolute top-0 right-1/4 md:right-10 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold border-2 border-white">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
