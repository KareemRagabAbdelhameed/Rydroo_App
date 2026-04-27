import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig";
import i18n from "../i18n";

export interface ITrip {
  bookedSeats: never[];
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
    totalSeats: number;
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
      headers : {
        "Accept-Language" : i18n.language,
      }
    });

    return res.data.data ?? [];
  };

  return useQuery<ITrip[], Error>({
    queryKey: ["trips", filters,i18n.language], 
    queryFn: fetchTrips,
  });
};

export default useTrips;