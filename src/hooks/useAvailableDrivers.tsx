import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosConfig"

export interface IAvailableDrivers  {
    _id : string,
    user: {
        firstName : string,
        lastName : string,
    }
}

const useAvailableDrivers = ()=>{
    const fetchAvailableDrivers = async()=>{
        const res = await api.get("/driver/getAvailableDrivers");
        return res.data.data ?? [];
    }

    return useQuery<IAvailableDrivers[],Error>({
        queryKey : ["availableDrivers"],
        queryFn : fetchAvailableDrivers
    })
}

export default useAvailableDrivers;