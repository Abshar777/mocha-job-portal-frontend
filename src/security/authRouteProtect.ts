"use client"
import { check } from "@/api/auth";
import { SetUser } from "@/store/auth/authSlice";
import store from "@/store/store";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const authRouteProtect = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        (async () => {
            const { data } = await check()
            if (data) {
                store.dispatch(SetUser(data))
                if (data.verified) {
                    router.push("/")
                    return;
                } else {
                    router.push("/auth/otp")
                    return;
                }

            }
            setIsLoading(false)
        })()
    }, [])
    return {isLoading}


}

