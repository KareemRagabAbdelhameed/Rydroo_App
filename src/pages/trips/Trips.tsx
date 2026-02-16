import { Button } from '../../components/ui/Button';
import { TripCard } from '../../components/TripCard';
import { motion } from 'framer-motion';
import useTrips from '../../hooks/useTrips';
import Loader from '../../components/ui/Loader';
// Mock Data
// const MOCK_TRIPS: Trip[] = [
//   {
//     id: '1',
//     from: 'القاهرة',
//     to: 'الإسكندرية',
//     description: 'رحلة مباشرة ومريحة، مكيف هواء، واي فاي مجاني، مقاعد واسعة.',
//     price: 120,
//     date: '25 أكتوبر 2023',
//     day: 'الجمعة',
//     time: '08:00 ص',
//     availableSeats : 5,
//     driverName: 'محمد أحمد',
//     driverRating: 4.8,
//     vehicleType: 'تويوتا هايس'
//   },
//   {
//     id: '2',
//     from: 'الجيزة',
//     to: 'الغردقة',
//     description: 'أتوبيس سياحي فاخر، وجبة خفيفة ومشروبات، توقف واحد للاستراحة.',
//     price: 350,
//     date: '26 أكتوبر 2023',
//     day: 'السبت',
//     time: '10:30 ص',
//     availableSeats : 7,
//     driverName: 'علي حسن',
//     driverRating: 4.9,
//     vehicleType: 'مرسيدس MCV'
//   },
//   {
//     id: '3',
//     from: 'القاهرة',
//     to: 'المنصورة',
//     description: 'أسرع طريق، ميكروباص حديث، سائق محترف، التزام بالمواعيد.',
//     price: 90,
//     date: '25 أكتوبر 2023',
//     day: 'الجمعة',
//     time: '07:00 ص',
//     availableSeats : 12,
//     driverName: 'إبراهيم السيد',
//     driverRating: 4.7,
//     vehicleType: 'تويوتا كوستر'
//   },
//   {
//     id: '4',
//     from: 'الإسكندرية',
//     to: 'القاهرة',
//     description: 'رحلة عودة، مكيف، شاشات عرض، USB لشحن الموبايل.',
//     price: 120,
//     date: '25 أكتوبر 2023',
//     day: 'الجمعة',
//     time: '05:00 م',
//     availableSeats : 4,
//     driverName: 'سعيد محمود',
//     driverRating: 4.6,
//     vehicleType: 'تويوتا هايس'
//   },
//   {
//     id: '5',
//     from: 'القاهرة',
//     to: 'العين السخنة',
//     description: 'رحلة اليوم الواحد، انطلاق مبكر، عودة في نفس اليوم مساءً.',
//     price: 150,
//     date: '27 أكتوبر 2023',
//     day: 'الأحد',
//     time: '06:00 ص',
//     availableSeats : 1,
//     driverName: 'كريم عادل',
//     driverRating: 4.9,
//     vehicleType: 'ميني باص'
//   },
//   {
//     id: '6',
//     from: 'طنطا',
//     to: 'القاهرة',
//     description: 'مواصلات يومية، اشتراكات متاحة، مواعيد دقيقة.',
//     price: 60,
//     date: '25 أكتوبر 2023',
//     day: 'الجمعة',
//     time: '07:30 ص',
//     availableSeats : 13,
//     driverName: 'محمود علي',
//     driverRating: 4.5,
//     vehicleType: 'تويوتا ميكروباص'
//   }
// ];
export function Trips() {
  const {data:tripsData , error , isLoading} = useTrips();
  if(error){
    return <p>error</p>
  }
  if(isLoading){
    return <Loader />
  }
  return (
    <div className="min-h-screen bg-[#F5EDE4] pb-20">
      
      {/* Trips Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tripsData!.map((trip, index) => (
            <motion.div
              key={trip._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TripCard trip={trip} />
            </motion.div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            عرض المزيد من الرحلات
          </Button>
        </div>
      </div>
    </div>
  );
}
