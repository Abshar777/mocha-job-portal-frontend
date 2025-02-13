import axiosInstance from "@/utils/axios"
import axios from "axios"
import { Services } from "@/constants/services"
import { Role } from "@/constants/role"

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const register = async (data: { email: string, password: string, name?: string }) => {
    return await axios.post(`${backendUrl}${Services.AUTH}/auth/register`, data, {
        withCredentials: true
    })
}




export const login = async (data: { email: string, password: string }) => {
    return await axios.post(`${backendUrl}${Services.AUTH}/auth/login`, data, {
        withCredentials: true
    })
}





export const check = async () => {
    const { data: { data, token } } = (await axiosInstance.get(`${Services.AUTH}/auth/check`, {
        withCredentials: true
    }));
    return { data, token }

}



export const logout = async () => {
    return await axiosInstance.post(`${backendUrl}${Services.AUTH}/logout`, {}, {
        withCredentials: true
    });
}



export const getRereshToken = async () => await axios.post(`${backendUrl}${Services.AUTH}/auth/token`, {}, { withCredentials: true });



export const verifyOtp = async (data: { otp: string, email: string }) => await axiosInstance.post(`${Services.AUTH}/otp/verify?email=${data.email}`, data, { withCredentials: true })


export const otpStatus = async (data: { email: string }) => {
    const { data: res } = await axiosInstance.get(`${Services.AUTH}/otp/status?email=${data.email}`, { withCredentials: true })
    return { data: res.data, success: res.success, verified: res.verified }
}


export const resendOtpApi = async (data: { email: string }) => {
    const { data: res } = await axiosInstance.post(`${Services.AUTH}/otp/resend`, { email: data.email }, { withCredentials: true })
    return { data: res.data, success: res.success }
}


export const setRole = async (data: { role: Role }) => {
    const { data: res } = await axiosInstance.put(`${Services.AUTH}/auth/role`, data, { withCredentials: true })
    return { data: res.data, success: res.success }
}

export const getRole = async () => {
    const { data: res } = await axiosInstance.get(`${Services.AUTH}/auth/role`, { withCredentials: true })
    return { data: res.data, success: res.success }
}


export const OAuthLogin = async (token: string,provider:string) => {
    return await axios.post(`${backendUrl}${Services.AUTH}/auth/oauth-login`, {
        token,
        provider,
    }
    )
}
