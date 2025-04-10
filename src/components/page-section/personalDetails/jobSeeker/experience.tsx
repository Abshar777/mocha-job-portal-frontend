"use client";
import Container from "@/components/page-section/personalDetails/container";
import expericedImg from "@/../public/experinced.png";
import fresherImg from "@/../public/fresher.png";
import AnimatedButton from "@/components/animation/animatedButton";
import { experience } from "@/constants/personalDetailsConst";
import { Button } from "@heroui/button";
import { ArrowLeftIcon } from "lucide-react";
import usePersonalDetails from "@/store/zustand/PersonalDetails";

const Experience = () => {
  const { jobSeeker, step, steps, previousStep, nextStep, updateJobSeeker } =
    usePersonalDetails();
  const isExperienced = jobSeeker.experience;
  const handleExperience = (exp: string) => {
    console.log(exp,exp === "Experienced");
    updateJobSeeker({
      experience: exp === "Experienced",
    });
  };
  console.log(jobSeeker.experience);
  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        {experience.map((exp) => (
          <Container
            onClick={() => handleExperience(exp)}
            key={exp}
            selected={isExperienced ? exp === "Experienced" : exp === "Fresher"}
            title={exp === "Experienced" ? "I'am Experienced" : "I'am Fresher"}
            description={
              exp !== "Experienced"
                ? " I am Have Work Experience"
                : "I'am Don Fresher"
            }
            img={exp !== "Experienced" ? expericedImg : fresherImg}
            className="w-full"
          />
        ))}
      </div>
    </>
  );
};

export default Experience;
