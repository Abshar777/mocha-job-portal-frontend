"use client";
import BlurCircleAnimation from "@/components/animation/blurCircleAnimation";
import React from "react";
import MaskShaders from "@/components/ui/maskShaders";
import PersonalDetailsNav from "@/components/page-section/personalDetails/nav";
import { container_variants, item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/../public/svgs/logoDesignOnly.svg";
interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="bg-secondary text-background w-full h-screen overflow-hidden relative p-1">
      <div className="h-full gridAnim shades w-full overflow-hidden relative z-[1] bg-background rounded-xl">
        <MaskShaders />
        <div className="w-full  h-full relative flex items-center justify-center">
          <PersonalDetailsNav />
          <motion.div
            variants={container_variants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center gap-4"
          >
            <motion.div
              variants={item_variants}
              initial="hidden"
              animate="visible"
              className=""
            >
              <Image src={Logo} alt="logo" className="scale-[.8]" />
            </motion.div>
         
            {children}
          </motion.div>
        </div>
      </div>
      <BlurCircleAnimation />
    </div>
  );
};

export default layout;
