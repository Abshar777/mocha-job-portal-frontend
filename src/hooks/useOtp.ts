'use client'

import { otpStatus, verifyOtp } from "@/api/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import store, { RootState } from "@/store/store";
import { SetUser } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { TUser } from "@/store/auth/type";

const OTP_EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes

const useOtp = (type: string) => {
    const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [resend, setResend] = useState(false);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const userInfo = useSelector((state: RootState) => state.Auth.userInfo);

    useEffect(() => {
        if (!userInfo) {
            redirect("/auth/login");
            return;
        }
        otpCheck();
    }, []);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [remainingTime]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const { data } = await verifyOtp({ otp: otp.join(""), email: userInfo?.email as string });
            if (data.success) {
                store.dispatch(SetUser({ ...userInfo as TUser, verified: true }));
                toast.success("OTP verified successfully");
                setOtp(Array(4).fill(""));
                if (type === "login") redirect("/");
            }
        } catch (error) {
            const err = error as AxiosError;
            const message = (err.response?.data as { message: string })?.message || "An unexpected error occurred.";
            toast.error(message);
        } finally {
            setIsPending(false);
        }
    };

    const otpCheck = async () => {
        try {
            const { data } = await otpStatus({ email: userInfo?.email as string });
            if (!data?.hasOtp && userInfo?.verified) {
                redirect("/");
                return;
            }
            startTimer(data.createdAt);
        } catch (error) {
            console.log("OTP Check Error:", error);
            setResend(true);
        } finally {
            setIsLoading(false);
        }
    };

    const startTimer = (createdAt: string) => {
        const expiryTime = new Date(createdAt).getTime() + OTP_EXPIRY_TIME;
        const now = Date.now();
        const timeLeft = Math.max(0, Math.floor((expiryTime - now) / 1000));
        setRemainingTime(timeLeft);
        setResend(timeLeft === 0);
    };

    return { handleSubmit, isPending, otp, setOtp, isLoading, resend, remainingTime };
};

export default useOtp;
