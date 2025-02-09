import axiosInstance from "@/utils/axios"
import axios from "axios"
import { Services } from "@/constants/services"

const backgroundUrl=process.env.NEXT_PUBLIC_BACKEND_URL

export const register = async (data:{email:string,password:string,name?:string}) => {
    return await axios.post(`${backgroundUrl}${Services.AUTH}/auth/register`, data,{
        withCredentials:true
    })
}




export const login = async (data:{email:string,password:string}) => {
    return await axios.post(`${backgroundUrl}${Services.AUTH}/auth/login`, data,{
        withCredentials:true
    })
}





export const check = async () => {        
    const {data:{data,token}}= (await axiosInstance.get(`${Services.AUTH}/auth/check`,{
        withCredentials:true
    }));
    return {data,token}

}



export const logout = async () => {    
    return await axiosInstance.post(`${backgroundUrl}${Services.AUTH}/logout`,{},{
        withCredentials:true
    });
}



export const getRereshToken=async()=>await axios.post(`${backgroundUrl}${Services.AUTH}/auth/token`,{},{withCredentials:true});



export const verifyOtp=async(data:{otp:string,email:string})=>await axiosInstance.post(`${Services.AUTH}/otp/verify?email=${data.email}`,data,{withCredentials:true})


export const otpStatus=async(data:{email:string})=>{
    const {data:res} = await axiosInstance.get(`${Services.AUTH}/otp/status?email=${data.email}`,{withCredentials:true})
    return {data:res.data,success:res.success}
}


export const resendOtp=async(data:{email:string})=>await axiosInstance.post(`${Services.AUTH}/otp/resend`,{email:data.email},{withCredentials:true})