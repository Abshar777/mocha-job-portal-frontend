import { Services } from "@/constants/services"
import { backendUrl } from "@/constants/variables"
import axios from "axios"

export const forgetPasswordApi = async (data: any) => {
    const { data: response } = await axios.post(`${backendUrl}${Services.AUTH}/password/forgot`, data,
        { withCredentials: true }
    )
    return response;
}


export const conformPasswordApi = async (data: { email: string, newPassword: string }) => {
    const { data: response } = await axios.post(`${backendUrl}${Services.AUTH}/password/reset`, data,
        { withCredentials: true }
    )
    return response;
}

export const conformPasswordAccessApi = async (resetToken: string) => {
    try {
        console.log("accessing")
        const { data: response } = await axios.post(`${backendUrl}${Services.AUTH}/password/conformAccess`, { resetToken },
            { withCredentials: true }
        )
        return response;
    } catch (error) {
        return { data: false, message: "Something went wrong" }
    }
}
