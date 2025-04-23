import { apiRoutes } from "@/constants/apiServices";
import { Services } from "@/constants/apiServices";
import { backendUrl } from "@/constants/variables";
import axiosInstance from "@/utils/axios";
import axios from "axios";

export const subscriptionApi = async () => {
    const { data } = await axios.get(`${backendUrl}${Services.COMPANY}${apiRoutes.subscription}/getAllSubscriptions`)
    return data;
}

export const createCheckoutSessionApi = async (subscriptionId: string) => {
    // @TESTING : for testing purpose when it is done change it to private api (axiosInstance)
    const { data } = await axios.post(`${backendUrl}${Services.COMPANY}${apiRoutes.subscription}/createCheckoutSession`, { subscriptionId })
    return data;
}

export const completeSubscriptionPaymentApi = async (sessionId: string) => {
        // @TESTING : for testing purpose when it is done change it to private api (axiosInstance)
    const { data } = await axios.post(`${backendUrl}${Services.COMPANY}${apiRoutes.subscription}/completeSubscriptionPayment`, { sessionId })
    return data;
}
