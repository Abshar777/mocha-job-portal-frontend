"use client";
import { check, login } from "@/api/auth";
import { conformPasswordAccessApi } from "@/api/password";
import { RootState } from "@/store/store";
import { Button } from "@heroui/react";
import { signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Page = () => {
  const handleClick = async () => {
    try {
      const { data } = await conformPasswordAccessApi();
      console.log(data, "data");
    } catch (error) {
      toast.error("Something went wrong", {
        description: (error as Error).message?.toString(),
      });
      console.log(error, "error");
    }
  };
  return (
    <div className="flex bg-zinc-900 flex-col items-center justify-center h-screen">
      <Button color="primary" onPress={handleClick}>
        Login
      </Button>
    </div>
  );
};

export default Page;
