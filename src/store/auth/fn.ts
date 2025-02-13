import { PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "./type";
import { Role } from "@/constants/role";


export const setUser=(state:{userInfo:TUser | undefined},{payload}:PayloadAction<TUser>)=>{
    console.log(payload,"🟢 payload")
    state.userInfo={...payload}
    console.log(state.userInfo,"🟢 state.userInfo")
    // localStorage.setItem("user",JSON.stringify(payload))
}


export const logoutUser=(state:{userInfo:TUser | undefined})=>{
    state.userInfo=undefined
    // localStorage.removeItem("user")
}

export const updateUser=(state:{userInfo:TUser | undefined},{payload}:PayloadAction<Partial<TUser>>)=>{
    state.userInfo={
        name:(payload.name || state.userInfo?.name) as string,
        email:(payload.email || state.userInfo?.email) as string,
        role:(payload.role || state.userInfo?.role) as Role,
        _id:(payload._id || state.userInfo?._id) as string,
        verified:(payload.verified || state.userInfo?.verified) as boolean,
        profilePicture:payload.profilePicture || state.userInfo?.profilePicture,
    }

}




