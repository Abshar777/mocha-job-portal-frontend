"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import errorImage from "@/../public/svgs/404.svg";
import serverError from "@/../public/svgs/500.svg";
import { useCompleteSubscriptionPayment } from "@/hooks/useSubscription";
import { Spinner } from "@heroui/react";
import { completeSubscriptionPaymentApi } from "@/api/subscription";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const cancel = searchParams.get("cancel");
  const [isLoading, setIsLoading] = useState(true);
  const { mutate, isPending, isSuccess, isError, ...rest } =
    useCompleteSubscriptionPayment();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Payment successful");
      router.push("/recruiter/jobs");
    }
    setIsLoading(false);
  }, [isSuccess, router]);
  
  useEffect(() => {
    if (session_id) {
      mutate(session_id);
    }
  }, [session_id]);
  return (
    <div className="flex flex-1 w-full h-full items-center justify-center">
      {isPending || (isLoading && <Spinner size="lg" color="primary" />)}
      {isError && <Image src={errorImage} alt="error" />}
      {cancel && <Image src={serverError} alt="error" />}
    </div>
  );

  // if (isPending)
  //   return (
  //     <div className="flex flex-1 w-full h-full items-center justify-center">
  //       <Spinner size="lg" color="primary" />
  //     </div>
  //   );
  // if (isError) {
  //   return (
  //     <div className="flex flex-1 w-full h-full items-center justify-center">
  //       <Image src={serverError} alt="error" />
  //     </div>
  //   );
  // }
  // if (cancel || !session_id) {
  //   return (
  //     <div className="flex flex-1 w-full h-full items-center justify-center">
  //       <Image src={errorImage} alt="error" />
  //     </div>
  //   );
  // }
};

export default page;
