"use client";
import React from "react";
import { Progress } from "@heroui/progress";
import { item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";

interface Props {
  progress: number;
  section: number;
  length: number;
}

const ProgressBar = ({ progress, section, length }: Props) => {
  return (
    <motion.div
      variants={item_variants}
      initial="hidden"
      animate="visible"
      className={`w-full scale-[.8] md:px-[6rem] px-[2rem]  h-full grid grid-cols-5 gap-2`}
    >
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="w-full h-full flex items-center justify-center"
        >
          <Progress
            aria-label={`Progress bar for section ${index + 1}`}
            disableAnimation={section != index}
            classNames={{
              track: `bg-primary/10 ${
                section >= index && "shadow-[-1px_1px_9px_2px_#39311c]"
              }`,
            }}
            color="primary"
            value={section === index ? progress : section > index ? 100 : 0}
          />
        </div>
      ))}
    </motion.div>
  );
};

export default ProgressBar;
