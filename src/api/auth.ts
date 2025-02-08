import axiosInstance from "@/utils/axios"
import axios from "axios"
import { Services } from "@/constants/services"

const backgroundUrl=process.env.NEXT_PUBLIC_BACKEND_URL

export const register = async (data:{email:string,password:string,name?:string}) => {
    return await axios.post(`${backgroundUrl}${Services.AUTH}/auth/register`, data)
}




export const login = async (data:{email:string,password:string}) => {
    return await axios.post(`${backgroundUrl}${Services.AUTH}/auth/login`, data)
}





export const check = async () => {        
    const {data:{data,token}}= await axiosInstance.get(`${Services.AUTH}/check`);
    return {data,token}
}


export const logout = async () => {    
    return await axiosInstance.post(`${Services.AUTH}/logout`);
}


export const getRereshToken=async()=>await axios.post(`${Services.AUTH}/token`);

