"use client";
import { item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedButton from "../animation/animatedButton";
import OtpInput from "../global/form-generator/otp-input";
import useOtp from "@/hooks/useOtp";
import Authloading from "@/app/auth/loading";
const OtpForm = () => {
  const { handleSubmit, isPending, resend, otp, setOtp, remainingTime, resendOtp, isResendLoading } = useOtp();


  return (
    <form onSubmit={handleSubmit} className="w-full  flex flex-col gap-4">
      <OtpInput disabled={resend} otpLength={4} setOtp={setOtp} otp={otp} />


      <motion.div
        variants={item_variants}
        initial={"hidden"}
        animate={"visible"}
        className="w-full  px-[4rem]"
      >
        <AnimatedButton
          disabled={resend}
          isLoading={isPending || isResendLoading}
          text="Verify"
          loadingText={isResendLoading ? "Resending" : "Verifying"}
          color="primary"
          size="lg"
          type="submit"
        />
      </motion.div>

      <div className="flex items-center justify-between px-[4rem]">
        <p  className="text-sm  ">
          Didn't receive the code?
          <span onClick={resendOtp} className=" cursor-pointer ms-2 text-primary underline">Resend</span>
        </p>
        <p className="text-sm">{remainingTime}s</p>
      </div>

    </form>
  );
};

export default OtpForm;
