"use client";
import { useDispatch, useSelector } from "react-redux";
import loginSchema from "@/schema/auth/login.schema";
import registerSchema from "@/schema/auth/register.schema";
import { check, login, register as registerApi } from "@/api/auth";
import { useMutationData } from "./useMutation";
import useZodForm from "./useZodForm";
import { LogoutUser, SetUser } from "@/store/auth/authSlice";
import { toast } from "sonner";
import { AppDispatch, RootState } from "@/store/store";
import { ApiResponse } from "@/types";
import { redirect, usePathname, useRouter } from "next/navigation";

export const useAuth = (type: "login" | "register") => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const schema = type === "login" ? loginSchema : registerSchema;
    const apiFn = type === "login" ? login : registerApi;
    const { mutate, isPending } = useMutationData(['user'],
        (data) => apiFn(data),
        "user",
        onSubmit
    )
    const { register, onFormSubmit, errors, reset } = useZodForm(schema, mutate)
    function onSubmit(response: { data: ApiResponse<any> }) {
        const AuthApiResponse = response?.data
        const token = AuthApiResponse?.token as string;
        reset()
        localStorage.setItem("__accessToken", token);
        if (AuthApiResponse.data.verified) {
            router.push("/")
        } else {
            router.push("/auth/otp")
        }
        dispatch(SetUser(AuthApiResponse.data))
        const message = type === "login" ? "User logged in successfully" : "User registered successfully"
        toast.success(message);

    }
    return { register, onFormSubmit, errors, reset, isPending }



}

export const useCheckUser = async () => {
    const publicRoutes = ["/auth/login", "/auth/register"];
    const dispatch = useDispatch<AppDispatch>()
    const { userInfo } = useSelector((state: RootState) => state.Auth);
    console.log(userInfo, "🟢 userInfo");
    const path = usePathname()
    if (userInfo) {
        try {
            const { data } = await check()
            if (data) {
                dispatch(SetUser(data))
                if (data.verified && publicRoutes.includes(path)) {
                    return redirect("/")
                } else {
                    return redirect("/auth/otp")
                }
            }
            return true

        } catch (error) {
            console.log(error, "🔴 error in useCheckUser")
            dispatch(LogoutUser())
            return true
        }





    }
}
