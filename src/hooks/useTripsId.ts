import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig"
interface ITrip {
    data:{
        _id : string,
        destination : string,
        availableSeats : number,
        date : string,
        time : string,
        day : string,
        price : number,
        currency : string,
    }
  }
const useTripsId = (id:string | undefined)=>{
    const fetchTripdById = async()=>
       await api.get(`/trips/${id}`).then((res)=>res.data);

    return useQuery<ITrip,Error>({
        queryKey : ["trips",id],
        queryFn : fetchTripdById
    })
}
export default useTripsId;