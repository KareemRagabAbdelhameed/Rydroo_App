import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig";

export interface ITrip {
  _id: string;
  source: string;
  destination: string;
  availableSeats: number;
  date: string;
  time: string;
  day: string;
  price: number;
  driverProfile: {
    _id: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
    };
  };
  vehicle: {
    _id: string;
    make: string;
    model: string;
    plateNumber: string;
  };
}

interface Filters {
  source?: string;
  destination?: string;
}

const useTrips = (filters?: Filters) => {
  const fetchTrips = async () => {
    const res = await api.get("/trips", {
      params: filters,
    });

    return res.data.data ?? [];
  };

  return useQuery<ITrip[], Error>({
    queryKey: ["trips", filters], 
    queryFn: fetchTrips,
  });
};

export default useTrips;