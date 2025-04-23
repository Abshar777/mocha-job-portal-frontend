"use client"
import { completeSubscriptionPaymentApi, createCheckoutSessionApi, subscriptionApi } from "@/api/subscription"
import { useQueryData } from "./useQueryData"
import { useEffect } from "react"
import { toast } from "sonner"
import { useMutationData } from "./useMutation"
import stripePromise from "@/utils/stripe";
import { useRouter } from "nextjs-toploader/app";


export const useSubscription = () => {
    const MINUTE = 1000 * 60;
    const { data, isPending, isFetched, refetch, isFetching, error, ...rest } = useQueryData(['subscription'], subscriptionApi, { staleTime: Infinity, gcTime: MINUTE * 60 });
    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
        if (isFetched) {
            console.log(data)
        }
    }, [isFetched, error])
    return { data, isPending, isFetched, refetch, isFetching, error, ...rest }
}


export const useCreateCheckoutSession = () => {
    const { mutate, isPending, isSuccess, isError, ...rest } = useMutationData(
        ['createCheckoutSession'],
        (subscriptionId: string) => createCheckoutSessionApi(subscriptionId),
        ['subscription', "company", "user"],
        async (data: { message: string, sessionId: string }) => {
            if (!data.sessionId) {
                return toast.error(data.message)
            }
            const stripe = await stripePromise;
            stripe?.redirectToCheckout({ sessionId: data.sessionId });
        }
    );

    return { mutate, isPending, isSuccess, isError, ...rest }
}


export const useCompleteSubscriptionPayment = () => {
    const router = useRouter();
    const { mutate, isPending, isSuccess, ...rest } = useMutationData(
        ['completeSubscriptionPayment'],
        (sessionId: string) => completeSubscriptionPaymentApi(sessionId),
        ['subscription', "company", "user"],
        (data: { message: string }) => {
            toast.success("payment succefully done, you can now post jobs")
            router.push('/recruiter/jobs');
        }
    )

    return { mutate, isPending, isSuccess, ...rest }
}
