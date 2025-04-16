"use client";
import { useDispatch } from "react-redux";
import loginSchema from "@/schema/auth/login.schema";
import registerSchema from "@/schema/auth/register.schema";
import {  login, register as registerApi } from "@/api/auth";
import { useMutationData } from "./useMutation";
import useZodForm from "./useZodForm";
import { SetUser } from "@/store/auth/authSlice";
import { toast } from "sonner";
import { AppDispatch } from "@/store/store";
import { ApiResponse } from "@/types";
import {  useRouter } from "next/navigation";

export const useAuth = (type: "login" | "register") => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const schema = type === "login" ? loginSchema : registerSchema;
    const apiFn = type === "login" ? login : registerApi;
    const { mutate, isPending } = useMutationData(['user'],
        (data) => apiFn(data),
        ['user'],
        onSubmit
    )
    const { register, onFormSubmit, errors, reset } = useZodForm(schema, mutate)
    function onSubmit(response: { data: ApiResponse<any> }) {
        const AuthApiResponse = response?.data
        const token = AuthApiResponse?.token as string;

        localStorage.setItem("__accessToken", token);
        if (AuthApiResponse.data.verified) {
            console.log("verified")
            router.push("/")
        } else {
            console.log("not verified")
            router.push("/auth/otp")
            
        }
        reset()
        dispatch(SetUser(AuthApiResponse.data))
        const message = type === "login" ? "User logged in successfully" : "User registered successfully"
        toast.success(message);

    }

 
    return { register, onFormSubmit, errors, reset, isPending }



}

