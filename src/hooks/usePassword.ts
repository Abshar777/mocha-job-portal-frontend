"use client";
import { useMutationData } from "./useMutation";
import { conformPasswordApi, forgetPasswordApi } from "@/api/password";
import { ApiResponse } from "@/types";
import useZodForm from "./useZodForm";
import forgetPasswordSchema from "@/schema/auth/forgetpassword";
import conformPasswordSchema from "@/schema/auth/conformPasswordSchema";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";

import { SetUser, UpdateUser } from "@/store/auth/authSlice";
import { TUser } from "@/store/auth/type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const usePassword = (type: "forget" | "conform") => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const { userInfo } = useSelector((state: RootState) => state.Auth);

  const schema =
    type === "forget" ? forgetPasswordSchema : conformPasswordSchema;
  const apiFn = type === "forget" ? forgetPasswordApi : conformPasswordApi;
  

  const { mutate, isPending } = useMutationData(
    ["password"],
    (data) => apiFn({ newPassword: data.password, email: data?.email as string }),
    "password",
    onSubmit
  );

  const { register, onFormSubmit, errors, reset,setValue } = useZodForm(schema, mutate);
  async function onSubmit(response: ApiResponse<any>) {
    console.log(response, "🟢 response");
    if (type === "forget") {
      const payload = {
        email: response.data.email,
      } as unknown as TUser;
      dispatch(SetUser(payload));

      router.push("/auth/otp");
    } else {
      router.push("/auth/login"); //WIRE_UP redirect to profile
    }
    const message =
      type === "forget"
        ? "email found , please check your email"
        : "Password changed successfully";
    toast.success(message);
  }

  return { mutate, isPending, register, onFormSubmit, errors, reset,setValue };
};
