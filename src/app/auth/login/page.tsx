"use client";
import Image from "next/image";
import Logo from "@/../public/svgs/dark-logo.svg";
import { motion } from "framer-motion";
import { container_variants, item_variants } from "@/constants/framer-motion";
import LoginForm from "@/components/forms/loginForm";


const page = () => {

  return (
    <div className="w-full relative z-[1] h-full flex flex-col items-center justify-center">
      <div className="absolute md:hidden flex justify-center  w-full  bottom-0 scale-[.9] left-0 ">
        <Image src={Logo} alt="logo" className="object-contain h-full" />
      </div>
      <motion.div
        variants={container_variants}
        initial={"hidden"}
        animate={"visible"}
        className=" h-full flex flex-col md:p-1 p-2 gap-6 items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.h1
            variants={item_variants}
            className="text-3xl  font-secondary  font-bold capitalize"
          >
            login
          </motion.h1>
          <motion.p
            variants={item_variants}
            className="text-foreground/60 text-center text-sm"
          >
            Enter your details below to login to your account
          </motion.p>
        </div>
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default page;
