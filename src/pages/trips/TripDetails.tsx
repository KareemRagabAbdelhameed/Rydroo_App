import { useParams } from "react-router-dom";
import { Calendar, Clock, User, Star, Bus, ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/Button";
import useTripsId from "../../hooks/useTripsId";
import Loader from "../../components/ui/Loader";

export default function TripDetails() {
  const { id } = useParams();
  const { data: trip, isLoading } = useTripsId(id);


  if (isLoading) return <Loader />
  if (!trip) return <div className="p-10 text-center">Trip not found</div>;

  return (
    <div className="min-h-screen bg-forthMainColor py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden">
        
        {/* Header */}
        <div className="bg-maincolor text-white p-8">
          <div className="flex items-center gap-4 text-3xl font-bold">
            <span>{trip.data.source}</span>
            <ArrowLeft className="w-6 h-6" />
            <span>{trip.data.destination}</span>
          </div>
          <p className="mt-2 text-white/80 text-sm">
            رحلة مميزة وآمنة مع أفضل السائقين
          </p>
        </div>

        <div className="p-8">

          {/* Date & Time */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl flex-1">
              <Calendar className="w-6 h-6 text-maincolor" />
              <div>
                <div className="text-sm text-gray-500">التاريخ</div>
                <div className="font-bold">
                  {trip.data.day}، {trip.data.date}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl flex-1">
              <Clock className="w-6 h-6 text-maincolor" />
              <div>
                <div className="text-sm text-gray-500">موعد الانطلاق</div>
                <div className="font-bold">{trip.data.time}</div>
              </div>
            </div>
          </div>

          {/* Seats & Price */}
          <div className="flex justify-between items-center mb-8 bg-forthMainColor p-6 rounded-2xl">
            <div>
              يوجد{" "}
              <span className="text-maincolor font-bold text-lg">
                {trip.data.availableSeats}
              </span>{" "}
              أماكن متاحة
            </div>
            <div className="text-2xl font-bold text-maincolor">
              {trip.data.price} ج.م
            </div>
          </div>

          {/* Driver Info */}
          <div className="border-t border-gray-100 pt-6 mb-8">
            <h3 className="text-lg font-bold mb-4">معلومات السائق</h3>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
              <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <div className="font-bold text-lg">
                  {trip.data.driverProfile.user.firstName}{" "}
                  {trip.data.driverProfile.user.lastName}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  سائق موثوق
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="border-t border-gray-100 pt-6 mb-8">
            <h3 className="text-lg font-bold mb-4">معلومات المركبة</h3>
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <Bus className="w-6 h-6 text-maincolor" />
              <div>
                <div className="font-semibold">
                  {trip.data.vehicle.make} {trip.data.vehicle.model}
                </div>
                <div className="text-sm text-gray-500">
                  رقم اللوحة: {trip.data.vehicle.plateNumber}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Button className="w-full text-lg py-6">
            احجز الآن
          </Button>

        </div>
      </div>
    </div>
  );
}
