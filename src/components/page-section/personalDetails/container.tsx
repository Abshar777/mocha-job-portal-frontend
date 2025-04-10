"use client";
import { item_variants } from "@/constants/framer-motion";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import Image, { StaticImageData } from "next/image";

interface Props {
  selected: boolean;
  className?: string;
  img?: StaticImageData | string;
  title: string;
  description?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Container = ({
  title,
  description,
  img,
  selected,
  className,
  onClick,
  disabled,
}: Props) => {
  return (
    <motion.div variants={item_variants} className="w-full ">
      <Button
        disabled={disabled}
        onPress={onClick}
        className={cn(
          "flex ring-white disabled:opacity-50 hover:disabled:opacity-50 disabled:cursor-not-allowed rounded-xl md:px-4 px-2 relative overflow-hidden py-10 bg-foreground cursor-pointer",
          selected && "bg-primary shadow-[0_0_15px_4px_#f7cb1d29]",
          className || ""
        )}
      >
        <div className="flex w-full justify-between items-center">
          <div className="flex-col  flex items-start  md:justify-start justify-center ">
            <h1 className="text-secondary md:text-lg text-base font-semibold capitalize">
              {title}
            </h1>
            <p className="text-secondary/50 text-sm capitalize">
              {description}
            </p>
          </div>
          {img && (
            <div className="img_c  justify-end  w-[5rem] p-1 overflow-hidden h-[5rem]">
              <Image
                src={img}
                alt="jobSeeker"
                className="h-full object-contain"
              />
            </div>
          )}
        </div>
      </Button>
    </motion.div>
  );
};

export default Container;
