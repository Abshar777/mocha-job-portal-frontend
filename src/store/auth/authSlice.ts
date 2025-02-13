import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "./type";
import { logoutUser, setUser, updateUser } from "./fn";


const initialState:{userInfo:TUser | undefined}={
    userInfo:undefined,
}


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        SetUser:setUser,
        LogoutUser:logoutUser,
        UpdateUser:updateUser
        
    }
})

export const {SetUser,LogoutUser,UpdateUser}= authSlice.actions
export default authSlice.reducer