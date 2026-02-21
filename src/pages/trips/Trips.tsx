import { Button } from '../../components/ui/Button';
import { TripCard } from '../../components/TripCard';
import { motion } from 'framer-motion';
import useTrips from '../../hooks/useTrips';
import Loader from '../../components/ui/Loader';
import { useSearchParams } from 'react-router-dom';

export function Trips() {
  const [searchParams] = useSearchParams();

  const source = searchParams.get("source") || undefined;
  const destination = searchParams.get("destination") || undefined;
  const {data:tripsData , error , isLoading} = useTrips({
    source,
    destination
  });
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
          {tripsData?.length===0 ? <p className='text-center text-maincolor text-lg font-semibold'>هذه الرحلة غير متوفرة الان </p>: tripsData!.map((trip, index) => (
            <motion.div
              key={trip._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TripCard key={trip._id} trip={trip} />
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
