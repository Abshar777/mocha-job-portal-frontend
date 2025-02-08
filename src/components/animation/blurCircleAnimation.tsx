"use client";

import { useMotionValue, useSpring, useTransform } from "framer-motion";

import { motion } from "framer-motion";
import { useEffect } from "react";

const BlurCircleAnimation = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);


  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const circle1X = useTransform(smoothMouseX, [-500, 500], [-50, 50]);
  const circle1Y = useTransform(smoothMouseY, [-500, 500], [-50, 50]);
  const circle2X = useTransform(smoothMouseX, [-500, 500], [50, -50]);
  const circle2Y = useTransform(smoothMouseY, [-500, 500], [50, -50]);

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX - window.innerWidth / 2);
    mouseY.set(clientY - window.innerHeight / 2);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <>
   
      <div className=" " />
      <motion.div

        className="absolute animate-float bg-[#7933bb52] z-[0] -right-[5rem] -top-[15rem] blur-3xl w-[30rem] h-[30rem] rounded-full"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: circle1X,
          y: circle1Y,
        }}
      />
      <motion.div
        className="absolute animate-float bg-[#94bb336f] z-[0] -left-[5rem] -bottom-[15rem] blur-3xl w-[30rem] h-[30rem] rounded-full"
        animate={{
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: circle2X,
          y: circle2Y,
        }}
      />
      {/* <motion.div
        className="absolute bg-[#3394bb57] z-[0]  blur-3xl w-[20rem] h-[20rem] rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          x: useTransform(smoothMouseX, [-500, 500], [-30, 30]),
          y: useTransform(smoothMouseY, [-500, 500], [-30, 30]),
        }}
      /> */}
    </>
  );
};

export default BlurCircleAnimation;
