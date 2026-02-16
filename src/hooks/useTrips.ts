import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig";
import { useTranslation } from "react-i18next";
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
  const { i18n } = useTranslation();
    const fetchTrips = async()=>
        await api.get<TripsResponse>("/trips")
        .then((res)=>
           res.data.data.localizedTrips ?? []
        );

    return useQuery<ITrip[],Error>(
            {
              queryKey : ["trips",i18n.language],
              queryFn : fetchTrips
            }
          )

}
export default useTrips;