import { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "./type";


export const setUser=(state:{userInfo:TUser | undefined},{payload}:PayloadAction<TUser>)=>{
    if(!payload) return;
    state.userInfo={...payload}
    // localStorage.setItem("user",JSON.stringify(payload))
}


export const logoutUser=(state:{userInfo:TUser | undefined})=>{
    state.userInfo=undefined
    // localStorage.removeItem("user")
}