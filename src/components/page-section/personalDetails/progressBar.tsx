"use client";
import React, { useEffect, useState } from "react";
import { Progress } from "@heroui/progress";
import { item_variants } from "@/constants/framer-motion";
import { motion } from "framer-motion";

interface Props {
  progress: number;
  section: number;
  length: number;
}

const ProgressBar = ({ progress, section, length }: Props) => {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    setCols(length);
  }, [length]);
  return (
    <motion.div
      style={{
        gridTemplateColumns: `repeat(${cols},1fr)`,
      }}
      variants={item_variants}
      initial="hidden"
      animate="visible"
      className={`w-full min-w-[30rem] scale-[.8] md:px-[6rem] px-[7rem]  h-full grid grid-cols-${cols} gap-2`}
    >
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className="w-full h-full flex items-center justify-center"
        >
          <Progress
            aria-label={`Progress bar for section ${index + 1}`}
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
