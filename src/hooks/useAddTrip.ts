import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/axiosConfig"
import { toast } from "react-toastify";

const useAddTrip = ()=>{
    const addTrip = async(tripData:any)=>{
        const {data} = await api.post("/trips",tripData)
        return data;
    }
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ["addTrip"],
        mutationFn : addTrip,

        onSuccess: (data) => {
            toast.success(data.message || "Trip added successfully");
            queryClient.invalidateQueries({
              queryKey: ["trips"],
            });
        },

        onError: (error: any) => {
            const message =
              error?.response?.data?.message || "Something went wrong";
      
            toast.error(message);
          },
    })
}
export default useAddTrip