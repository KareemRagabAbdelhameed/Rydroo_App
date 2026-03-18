import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/axiosConfig";
import { toast } from "react-toastify";
type UpdateTripPayload = {
    id: string;
    tripData: any;
  };
const useUpdateTrip = ()=>{
    const updateTrip = async({id,tripData}:UpdateTripPayload)=>{
        const {data} = await api.patch(`trips/${id}`,tripData);
        return data;
    }

    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn : updateTrip,
        onSuccess : (data)=>{
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["trips"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Something went wrong");
          },
    })
}
export default useUpdateTrip;