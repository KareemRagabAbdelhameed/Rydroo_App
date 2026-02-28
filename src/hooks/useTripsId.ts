import type { ITrip } from './useTrips';
import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig"
import i18n from "../i18n";

interface ISingleTrip {
    data: ITrip
  }
const useTripsId = (id:string | undefined)=>{
    const fetchTripdById = async()=>
       await api.get(`/trips/${id}`,{
        headers : {
            "Accept-Language" : i18n.language
        }
       }).then((res)=>res.data);

    return useQuery<ISingleTrip,Error>({
        queryKey : ["trips",id,i18n.language],
        queryFn : fetchTripdById
    })
}
export default useTripsId;