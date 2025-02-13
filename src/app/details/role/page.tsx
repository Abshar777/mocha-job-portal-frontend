"use client";
import BlurText from "@/components/animation/blurText";
import React from "react";
import { motion } from "framer-motion";
import { container_variants } from "@/constants/framer-motion";
import Container from "@/components/global/personalDetails/container";
import jobSeekerImg from "@/../public/jobSeeker.png";
import AnimatedButton from "@/components/animation/animatedButton";
import recruiterImg from "@/../public/recuirter.png";
import { Role } from "@/constants/role";
import usePersnolDetails from "@/hooks/usePersnolDets";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";




const page = () => {
  const { Roles, isLoading, updateRole, role:selectedRole,handleNextStep } = usePersnolDetails();
  const pathname=usePathname();
  const router=useRouter();

  const handleNext = () => {
    if(selectedRole) {
      const nextPath=handleNextStep(pathname,selectedRole as Role);
      router.push(nextPath);
    }
    else toast.error("plase select role")
   }

  return (
    <motion.div
      variants={container_variants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center gap-4 mt-2"
    >
      <BlurText
        delay={0.05}
        animateBy="letters"
        direction="bottom"
        className="text-secondary md:text-4xl text-2xl font-bold capitalize"
        text="What is your role?"
      />
      <div className="grid grid-cols-2 gap-4">
        {Roles.map((role) => (
          <Container
            disabled={isLoading}
            key={role}
            selected={role == selectedRole}
            title={
              role === Role.JOBSEEKER ? "I'am A Job Seeker" : "For Recruitment"
            }
            description={
              role === Role.JOBSEEKER
                ? " I am Here To Find Job"
                : "I'am Here To Recruit"
            }
            img={role === Role.JOBSEEKER ? jobSeekerImg : recruiterImg}
            className="w-full"
            onClick={() => updateRole(role)}
          />
        ))}
      </div>
      <div className="px-[7rem] w-full">
        <AnimatedButton
          disabled={!selectedRole}
          isLoading={isLoading}
          text="Next"
          color="primary"
          size="lg"
          className="w-full"
          onClick={handleNext}
        />
      </div>
    </motion.div>
  );
};

export default page;
