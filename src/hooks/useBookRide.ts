// hooks/useBookRide.ts
import { useMutation } from "@tanstack/react-query";
import api from "../config/axiosConfig";

interface BookRidePayload {
  id: string;
  seats: number;
}

interface BookRideResponse {
  status: string;
  message: string;
  data: {
    tripId: string;
    remainingSeats: number;
  };
}

const useBookRide = () => {
  const patchBooking = async (
    payload: BookRidePayload
  ): Promise<BookRideResponse> => {
    const { id, seats } = payload;
    const res = await api.patch(`/trips/${id}/book`, { seats });
    return res.data;
  };

  return useMutation<BookRideResponse, any, BookRidePayload>({
    mutationFn: patchBooking,
  });
};

export default useBookRide;
