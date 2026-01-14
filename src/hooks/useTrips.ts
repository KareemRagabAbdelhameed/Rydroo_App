import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig";

interface ITrip {
    _id : string,
    destination : string,
    availableSeats : number,
    date : string,
    time : string,
    day : string
  }
  interface TripsResponse {
    data : {
      trips: ITrip[];
    }
  }
const useTrips = ()=>{
    const fetchTrips = async()=>
        await api.get<TripsResponse>("/trips")
        .then((res)=>
           res.data.data.trips ?? []
        );

    return useQuery<ITrip[],Error>(
            {
              queryKey : ["trips"],
              queryFn : fetchTrips
            }
          )

}
export default useTrips;