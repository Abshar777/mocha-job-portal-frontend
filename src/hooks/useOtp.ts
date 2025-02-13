'use client'

import { otpStatus, resendOtpApi, verifyOtp } from "@/api/auth";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import store, { RootState } from "@/store/store";
import { SetUser } from "@/store/auth/authSlice";
import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { TUser } from "@/store/auth/type";
import { useRouter } from "nextjs-toploader/app";


const OTP_EXPIRY_TIME = 1 * 60 * 1000; // 5 minutes

const useOtp = () => {
    const router = useRouter();
    const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
    const [isPending, setIsPending] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [resend, setResend] = useState(false);
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [isResendLoading, setIsResendLoading] = useState(false);
    const userInfo = useSelector((state: RootState) => state.Auth.userInfo);

    useEffect(() => {
        if (!userInfo) {
            redirect("/auth/login");
            return;
        }
        otpCheck(userInfo?.email as string);
    }, []);

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setResend(true);
            setOtp(Array(4).fill(""));
        }
    }, [remainingTime]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        try {
            const { data } = await verifyOtp({ otp: otp.join(""), email: userInfo?.email as string });
            if (data.success) {
                console.log(userInfo?.verified, "🟢 user info");
                const path = data.type=="FORGET_PASSWORD" ? "/auth/conform-password" : "/";
                console.log(path, "🟢 path");
                store.dispatch(SetUser({ ...userInfo as TUser, verified: true }));
                toast.success("OTP verified successfully");
                setOtp(Array(4).fill(""));
                router.push(path);
            }


        } catch (error) {
            console.log("🔴 error in verify otp", (error as Error).message);
            const err = error as AxiosError;
            const message = (err.response?.data as { message: string })?.message || "An unexpected error occurred.";
            toast.error(message);
            setIsPending(false);
        }
    };


    const otpCheck = async (email: string) => {
        try {
            console.log(userInfo, "🟢 user info");
            const { data, verified } = await otpStatus({ email: email });
            console.log(data, "data ")
            if (data.user) {
                store.dispatch(SetUser({ ...data.user }));
            }
            if (!data?.hasOtp && verified) {
                router.push("/");
                return;
            }
            console.log("🟢 otp check is done");
            setIsPending(false);
            setResend(false)
            startTimer(data.createdAt);

        } catch (error) {
            console.log("🔴 error in otp check", (error as Error).message);
            const err = error as AxiosError;
            const verified = (err.response?.data as { verified: boolean })?.verified;
            const user = (err.response?.data as { user: TUser })?.user;
            console.log(err, verified)
            if (user) store.dispatch(SetUser({ ...user }));
            if (!verified) setResend(true);
            else router.push("/");

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


    async function resendOtp() {
        setOtp(Array(4).fill(""));
        setIsResendLoading(true);
        try {
            const { data, success } = await resendOtpApi({ email: userInfo?.email as string });
            if (success) {
                setResend(false);
                setRemainingTime(data.createdAt);
                toast.success("OTP sent successfully");
                startTimer(data.createdAt);

            }
        } catch (error) {
            const err = error as AxiosError;
            const message = (err.response?.data as { message: string })?.message || "An unexpected error occurred.";
            toast.error(message);
        } finally {
            setIsResendLoading(false);
        }
    }


    return { handleSubmit, isPending, otp, setOtp, isLoading, resend, remainingTime, resendOtp, isResendLoading,otpCheck };

};

export default useOtp;
