import { Calendar, Clock, User, Star, Bus, ArrowLeft } from 'lucide-react';
import { type ITrip } from '../hooks/useTrips';
import { Link } from 'react-router-dom';

interface TripCardProps {
  trip: ITrip;
}
export function TripCard({ trip }: TripCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 group">
      <div className="p-6">
        {/* Header: Route & Price */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3 text-xl font-bold text-black">
            <span>{trip.source}</span>
            <ArrowLeft className="w-5 h-5 text-maincolor" />
            <span>{trip.destination}</span>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-bold text-maincolor">{trip.price} ج.م</span>
            <span className="text-xs text-gray-500">للفرد</span>
          </div>
        </div>
        {/* Time & Date Info */}
        <div className="flex gap-4 mb-6 bg-forthMainColor p-4 rounded-xl">
          <div className="flex items-center gap-2 text-black">
            <Calendar className="w-5 h-5 text-maincolor" />
            <div>
              <div className="text-xs text-gray-500">التاريخ</div>
              <div className="font-semibold">{trip.day}، {trip.date}</div>
            </div>
          </div>
          <div className="w-px bg-gray-200"></div>
          <div className="flex items-center gap-2 text-black">
            <Clock className="w-5 h-5 text-maincolor" />
            <div>
              <div className="text-xs text-gray-500">الموعد</div>
              <div className="font-semibold">{trip.time}</div>
            </div>
          </div>
        </div>
        {/* Description */}
        <p>يوجد <span className='text-maincolor font-semibold tex-lg'>{trip.availableSeats}</span> أماكن متاحة في الميكروباص</p>
        {/* Driver & Vehicle Info */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-brand-dark">{trip.driverProfile.user.firstName} {trip.driverProfile.user.lastName}</div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg">
            <Bus className="w-4 h-4" />
            <span>{trip.vehicle.make} {trip.vehicle.model} {trip.vehicle.plateNumber}</span>
          </div>
        </div>
        {/* Action */}
        <div className='w-full bg-maincolor text-white px-4 py-2 rounded-full text-center'>
        <Link to={`/trips/${trip._id}`} className="w-full flex justify-center">
          احجز مكانك
        </Link>
        </div>
      </div>
    </div>
  );
}