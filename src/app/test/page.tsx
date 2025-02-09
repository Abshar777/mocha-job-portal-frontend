"use client";
import { check, login } from "@/api/auth";
import { RootState } from "@/store/store";
import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Page = () => {
  const userInfo = useSelector((state: RootState) => state.Auth.userInfo);
  const [clientUserInfo, setClientUserInfo] = useState<typeof userInfo | null>(null);

  useEffect(() => {
    setClientUserInfo(userInfo); // Ensures it only updates on the client
  }, [userInfo]);

  const handleLogin = async () => {
    try {
      const res = await login({ email: "absharameen625@gmail.com", password: "12345678" });
      console.log(res, "🟢 res");
      const token = res.data.token;
      localStorage.setItem("__accessToken", token);
      const checkRes = await check();
      console.log(checkRes, "🟢 checkRes");
    } catch (error) {
      console.log(error, "🔴 error");
      toast.error("Error logging in");
    }
  };

  return (
    <div className="flex bg-zinc-900 flex-col items-center justify-center h-screen">
      <Button color="primary" onClick={handleLogin}>
        Login
      </Button>
      <h1>{clientUserInfo?.email ?? "Loading..."}</h1>
    </div>
  );
};

export default Page;
