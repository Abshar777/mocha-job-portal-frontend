import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "./type";
import { logoutUser, setUser } from "./fn";



const initialState:{userInfo:TUser | undefined}={
    userInfo:undefined,
}


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        SetUser:setUser,
        LogoutUser:logoutUser
    }
})

export const {SetUser,LogoutUser}= authSlice.actions
export default authSlice.reducer