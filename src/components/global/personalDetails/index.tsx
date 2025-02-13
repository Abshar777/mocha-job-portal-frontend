"use client";
import PersonalDetailsNav from "./nav";
import Image from "next/image";
import Logo from "@/../public/svgs/logoDesignOnly.svg";
import ProgressBar from "./progressBar";
import { container_variants, item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";
import { usePersonalDetailsContext } from "@/context/personalDetails/PersonalDetailsProvider";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const index = ({ children }: { children: React.ReactNode }) => {
  const {getProgress,state}=usePersonalDetailsContext();
  const [progress, setprogress] = useState(0);
  const pathname=usePathname();
  
  useEffect(()=>{
    setprogress(_=>getProgress(pathname,state.role))
  },[pathname])
  return (
    <div className="w-full  h-full relative flex items-center justify-center">
      <PersonalDetailsNav />
      <motion.div
        variants={container_variants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center gap-4"
      >
        <motion.div variants={item_variants} initial="hidden" animate="visible" className="scale-[.8]">
          <Image src={Logo} alt="logo" className="" />
        </motion.div>
        <ProgressBar length={5} progress={progress} section={0} />
        {children}
      </motion.div>

    </div>
  );
};

export default index;
