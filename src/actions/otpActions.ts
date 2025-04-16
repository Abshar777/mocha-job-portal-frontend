"use client";
import { otpStatus } from "@/api/auth";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export const otpCheck = async (email: string) => {
    try {
        const { data, verified } = await otpStatus({ email: email });
        console.log(data, "data ")

        if (!data?.hasOtp && verified) {
            redirect('/');
        }

        return { data, verified };
    } catch (error) {
        console.log("🔴 error in otp check", (error as Error).message);
        const err = error as AxiosError;
        const verified = (err.response?.data as { verified: boolean })?.verified;
        if (verified) redirect('/');
        return { error: (error as Error).message };

    }
};