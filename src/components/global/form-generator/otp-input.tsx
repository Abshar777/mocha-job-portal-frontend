"use client";
import { Input } from "@/components/ui/input";
import { container_variants } from "@/constants/framer-motion";
import { item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

interface Props {
  otpLength: number;
  setOtp: (otp: string[]) => void;
  otp: string[];
  disabled?: boolean;
}

const OtpInput = ({ otpLength, setOtp, otp,disabled }: Props) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    const newOtp = [...otp];

    pastedData.split("").forEach((char, index) => {
      if (index < 4) {
        newOtp[index] = char;
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = char;
        }
      }
    });

    setOtp(newOtp);
    // Focus last filled input or first empty one
    const lastIndex = Math.min(pastedData.length, 4) - 1;
    if (lastIndex >= 0) {
      inputRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <motion.div
      variants={item_variants}
      initial={"hidden"}
      animate={"visible"}
      className=" flex px-[4rem] gap-2"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <motion.div
          variants={item_variants}
          initial={"hidden"}
          animate={"visible"}
          className="w-full"
          key={index}
        >
          <Input
            disabled={disabled}
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            maxLength={1}
            className="h-[4.5rem] rounded-3xl ps-[2.5rem] overflow-visible text-secondary bg-foreground flex items-center justify-center  text-xl"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OtpInput;
