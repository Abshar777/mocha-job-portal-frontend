"use client";
import AnimatedButton from "@/components/animation/animatedButton";
import { item_variants } from "@/constants/framer-motion";
import { education } from "@/constants/personalDetailsConst";
import { cn } from "@/lib/utils";
import usePersonalDetails from "@/store/zustand/PersonalDetails";
import { motion } from "framer-motion";
import React from "react";

interface Props {}

const Education = (props: Props) => {
  const { updateJobSeeker, jobSeeker } = usePersonalDetails();
  return (
    <motion.div variants={item_variants} className="w-full">
      <div className="flex w-screen md:px-[2rem]  px-[1rem]  md:w-[40vw] items-center justify-center  flex-wrap gap-2 ">
        {education.map((edu) => (
          <AnimatedButton
            key={edu}
            text={edu}
            isLoading={false}
            className={cn(
              "w-fit text-sm  ",
              !jobSeeker.education.includes(edu)
                ? "text-white bg-[#424242] shadow-[0_0_10px_1px_#ffffff10]"
                : "text-black shadow-[0_0_13px_0_#ffffff59] bg-white"
            )}
            onClick={() =>
              updateJobSeeker({
                education: jobSeeker.education.includes(edu)
                  ? jobSeeker.education.filter((e) => e !== edu)
                  : [...jobSeeker.education, edu],
              })
            }
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Education;
