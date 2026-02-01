import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import api from "../../../config/axiosConfig";
interface IFormData  {
    firstName : string,
    lastName : string,
    email : string,
    password : string,
    role : "user" | "driver"
}
const actAuthRegister = createAsyncThunk(
    // prifix for it
    "auth/actAuthRegister",
     async (formData : IFormData,thunk)=>{
        const {rejectWithValue} = thunk;
        try {
            const res = await api.post("user/signup",formData);
            console.log(res.data);
            return res.data;
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                console.log(error.response.data);
                return rejectWithValue(error.response.data.error); // يرجع الرسالة من السيرفر
              }
              return rejectWithValue("Something went wrong");
        }

     });
export default actAuthRegister;