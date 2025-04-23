"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  texts?: string[];
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
  texts = ["360", "GOLD", "PRO"],
}) => {
  const animationDuration = `${speed}s`;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervel = setInterval(() => {
      const nextIndex = index == texts.length - 1 ? 0 : index + 1;
      setIndex(nextIndex);
    }, 2000);
    return () => {
      clearInterval(intervel);
    };
  });

  const veriants = {
    initial: {
      translate: "0rem  10px",
      opacity: 0,
    },
    enter: {
      translate: "0rem  0px",
      opacity: 100,
    },
    exit: {
      translate: "0rem  -10px",
      opacity: 0,
    },
  };

  return (
    // <div
    //   className={`flex items-center justify-center relative   h-full w-full  ${
    //     disabled ? "" : "animate-shine"
    //   } ${className}`}
    //   style={{
    //     backgroundImage:
    //       "linear-gradient(120deg, rgba(255, 215, 0, 0.2) 40%, rgba(255, 223, 0, 1) 50%, rgba(255, 215, 0, 0.2) 60%)",
    //     backgroundSize: "200% 200%",
    //     WebkitBackgroundClip: "text",
    //     animationDuration: animationDuration,
    //   }}
    // >
    <AnimatePresence mode="wait">
      <motion.p
        // style={{
        //   backgroundImage:
        //     "linear-gradient(120deg, rgba(255, 215, 0, 0.2) 40%, rgba(255, 223, 0, 1) 50%, rgba(255, 215, 0, 0.2) 60%)",
        //   backgroundSize: "100% 100%",
        //   WebkitBackgroundClip: "text",
        //   animationDuration: animationDuration,
        // }}
        key={index}
        variants={veriants}
        initial={veriants.initial}
        animate={veriants.enter}
        exit={veriants.exit}
        transition={{
          transy: { type: "spring", stiffness: 500, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        className="font-medium text-md"
      >
        {texts[index]}
      </motion.p>
    </AnimatePresence>
    // </div>
  );
};

export default ShinyText;
