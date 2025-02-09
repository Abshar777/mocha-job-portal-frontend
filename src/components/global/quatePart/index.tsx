"use client"
import { quateImages } from "@/constants/authLayout";
import Image, { StaticImageData } from "next/image";
import React from "react";
import quate from "@/../public/loginFormImage.f7f800ccb930349b460a.png";
import TypingAnimation from "@/components/animation/typingAnimation";
import { Button } from "@heroui/react";
import logo from "@/../public/logo.png";
import Logo from "@/../public/svgs/logo.svg";

import { motion } from "framer-motion";
import { container_variants, item_variants } from "@/constants/framer-motion";
import { usePathname } from "next/navigation";
interface Props {}

const quotes = [
  "Unlock your potential with the right opportunity. Explore our job portal and take the first step towards your dream career!",
  "Your dream job is just a click away. Join us and start your journey today!",
  "Empower your future with the right skills. Discover opportunities that match your talents!",
  "Success is not just about what you accomplish, but what you inspire others to do. Find your path with us!",
  "Every great achievement was once considered impossible. Take the leap and explore new horizons!",
];

const index = (props: Props) => {
  const pathname = usePathname()
  console.log(pathname)
  const image = quateImages.find((item) => item.path === pathname)?.image as StaticImageData
  return (
    <motion.div
      variants={container_variants}
      initial={"hidden"}
      animate={"visible"}
      className="w-full md:grid hidden   grid-flow-col grid-rows-3 overflow-hidden  h-full gridAnim  relative z-[1] bg-background rounded-2xl col-span-2"
    >
      <div className="row-span-2">
        <div className="w-full flex  items-center relative justify-center h-full ">
          <div className="absolute top-0 scale-[.9] left-0 px-[1rem]">
            <Image src={Logo} alt="logo" className="object-contain h-full" />
          </div>
          <motion.div
            variants={item_variants}
            initial={"hidden"}
            animate={"visible"}
            className="overflow-hidden w-full h-full  p-[5rem]"
          >
            <Image
              src={image}
              alt="quate"
              className="object-contain random-moveAnimation  h-full"
            />

          </motion.div>
        </div>
      </div>

      <div className="w-full p-2 row-span-1 h-full">
        <div className="bg-secondary/5 py-[2.5rem]  px-[2rem] flex flex-col  gap-[1.5rem] text-secondary font-secondary  backdrop-blur-sm w-full h-full rounded-xl">
          <TypingAnimation quotes={quotes} />
          <motion.div
            variants={container_variants}
            initial={"hidden"}
            animate={"visible"}
            className="w-full   flex items-center justify-between"
          >
            <motion.div
              variants={item_variants}
              initial={"hidden"}
              animate={"visible"}
              className="img w-[6rem] h-[6rem] "

            >
              <Image src={logo} alt="quate" className="object-contain h-full" />
            </motion.div>

            <motion.div variants={item_variants} initial={"hidden"} animate={"visible"} className="">
              <Button
                color="primary"
                size="md"
                className="text-white shadow-primary "
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default index;
