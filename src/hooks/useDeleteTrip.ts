import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/axiosConfig";
import { toast } from "react-toastify";

const useDeleteTrip = ()=>{
    const deleteTrip = async(id:string)=>{
        const {data} = await api.patch(`/trips/${id}/cancel`);
        return data;
    }

    const queryClient = useQueryClient();
    return useMutation({
        mutationKey : ["cancelTrip"],
        mutationFn : deleteTrip,
        onSuccess: (data) => {
            toast.success(data.message || "Trip cancelled successfully");
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
export default useDeleteTrip;