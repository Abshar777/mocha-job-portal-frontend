"use client";
import BlurText from "@/components/animation/blurText";
import React, { useEffect } from "react";
import Container from "@/components/page-section/personalDetails/container";
import jobSeekerImg from "@/../public/jobseeker.png";
import AnimatedButton from "@/components/animation/animatedButton";
import recruiterImg from "@/../public/recuirter.png";
import { Role, Roles } from "@/constants/role";
import usePersonalDetails from "@/store/zustand/PersonalDetails";
import { motion } from "framer-motion";
import { item_variants } from "@/constants/framer-motion";
const RolePage = () => {
  const {
    setRole,
    role: currentRole,
    nextStep,
    steps,
    setDisabled,
  } = usePersonalDetails();

  useEffect(() => {
    if (currentRole) {
      setDisabled(false);
    }
  }, [currentRole]);
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {Roles.map((role) => (
          <Container
            key={role}
            selected={currentRole == role}
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
            onClick={() => {
              setRole(role);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default RolePage;
