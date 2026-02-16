import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig";

export interface ITrip {
    _id : string,
    source : string,
    destination : string,
    availableSeats : number,
    date : string,
    time : string,
    day : string,
    price : number,
    driverProfile : {
      _id : string,
      user : {
        _id : string,
        firstName : string,
        lastName : string,
      }
    },
    vehicle : {
      _id : string,
      make : string ,
      model : string,
      plateNumber : string,
    }
  }
 export interface TripsResponse {
    data : {
      localizedTrips: ITrip[];
    }
  }
const useTrips = ()=>{
    const fetchTrips = async()=>
        await api.get<TripsResponse>("/trips")
        .then((res)=>
           res.data.data.localizedTrips ?? []
        );

    return useQuery<ITrip[],Error>(
            {
              queryKey : ["trips"],
              queryFn : fetchTrips
            }
          )

}
export default useTrips;