import React, { useEffect } from 'react';
import { CalendarCheck, Clock, DollarSign } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import useTripsId from '../../hooks/useTripsId';
import useBookRide from '../../hooks/useBookRide';
import { toast } from 'react-toastify';

/* =======================
   Types
======================= */
interface RideInfoCardProps {
  icon: React.ReactNode;
  topText: string | number | undefined;
  bottomText: string | undefined;
}

interface Props {
  passengers: number;
}

/* =======================
   Small Card Component
======================= */
const RideInfoCard: React.FC<RideInfoCardProps> = ({
  icon,
  topText,
  bottomText,
}) => (
  <div className="flex flex-col items-center text-center space-y-4">
    <div className="w-24 h-24 rounded-full bg-thirdMainColor dark:bg-gray-700/50 flex items-center justify-center shadow-xl">
      {icon}
    </div>

    <div>
      <p className="text-xl font-semibold dark:text-amber-500">
        {topText}
      </p>
      <p className="text-base dark:text-amber-600">
        {bottomText}
      </p>
    </div>
  </div>
);

/* =======================
   Main Component
======================= */
const RideInfoSection: React.FC<Props> = ({ passengers }) => {
  const iconColor = "black";
  const { id } = useParams();
  const navigate = useNavigate();
  /* -------- Trip Data -------- */
  const {
    data: tripResponse,
    error: tripError,
    isLoading: tripLoading,
  } = useTripsId(id);

  /* -------- Booking Mutation -------- */
  const {
    mutate,
    isPending,
    error: bookingError,
    isSuccess,
  } = useBookRide();

  useEffect(() => {
    if (isSuccess && id) {
      navigate(`/trips/${id}/done`);
    }
  }, [isSuccess, id, navigate]);

  /* -------- Handlers -------- */
  const handleConfirmRide = () => {
    if (!id) return;

    mutate({
      id,
      seats: passengers,
    });
  };

  /* -------- States -------- */
  if (tripLoading) {
    return <p>Loading...</p>;
  }

  if (tripError) {
    return (
      <p className="text-red-500">
        {tripError.message}
      </p>
    );
  }

  const trip = tripResponse?.data;

  return (
    <div className="p-6 dark:bg-gray-900 min-h-[300px]">
      <h2 className="text-xl font-medium dark:text-amber-500 mb-8">
        Ride info
      </h2>

      {/* Info Cards */}
      <div className="flex justify-around items-start">
        <RideInfoCard
          icon={<CalendarCheck className="w-12 h-12" color={iconColor} />}
          topText={trip?.date}
          bottomText={trip?.day}
        />

        <RideInfoCard
          icon={<Clock className="w-12 h-12" color={iconColor} />}
          topText={trip?.time}
          bottomText="Time"
        />

        <RideInfoCard
          icon={<DollarSign className="w-12 h-12" color={iconColor} />}
          topText={`${trip?.price} EGP`}
          bottomText="Price"
        />
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirmRide}
        disabled={isPending}
        className="
          w-full p-6 rounded-full bg-maincolor
          text-white text-lg font-semibold mt-6 mb-4
          disabled:opacity-50
        "
      >
        {isPending ? "Booking..." : "Confirm Ride"}
      </button>

     

      {/* ❌ Error Message */}
      {bookingError && (
        toast.error(bookingError.response?.data?.error ||
            "Something went wrong")
      )}
    </div>
  );
};

export default RideInfoSection;
