import type { ITrip } from './useTrips';
import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig"
interface ISingleTrip {
    data: ITrip
  }
const useTripsId = (id:string | undefined)=>{
    const fetchTripdById = async()=>
       await api.get(`/trips/${id}`).then((res)=>res.data);

    return useQuery<ISingleTrip,Error>({
        queryKey : ["trips",id],
        queryFn : fetchTripdById
    })
}
export default useTripsId;