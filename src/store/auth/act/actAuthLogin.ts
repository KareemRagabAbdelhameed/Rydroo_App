import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import api from "../../../config/axiosConfig";
type TFormData = {
    email : string,
    password : string,
}



const actAuthLogin = createAsyncThunk(
    "auth/actAuthLogin",
   async (formData : TFormData,thunk)=>{
        const {rejectWithValue} = thunk;
        try {
            const res =await api.post("user/login",formData);
            console.log(res.data);
            return res.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                console.log(error.response.data);
                return rejectWithValue(error.response.data.error); // يرجع الرسالة من السيرفر
              }
              return rejectWithValue("Something went wrong");
        }
    }
);
export default actAuthLogin;