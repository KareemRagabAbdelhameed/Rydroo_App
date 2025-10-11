import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/axiosConfig";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";

 const actAuthLogout = createAsyncThunk(
    "auth/actAuthLogout",
    async (_, {rejectWithValue }) => {
        const user = Cookies.get("user");
        if(!user){
            return ;
        }
      try {
      const res =  await api.post("user/logout");
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
  export default actAuthLogout;