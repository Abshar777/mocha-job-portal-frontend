"use client";
import Container from "@/components/page-section/personalDetails/container";
import expericedImg from "@/../public/experinced.png";
import fresherImg from "@/../public/fresher.png";
import { experience } from "@/constants/personalDetailsConst";
import usePersonalDetails from "@/store/zustand/PersonalDetails";
import { useEffect } from "react";
const Experience = () => {
  const { jobSeeker, setDisabled, previousStep, nextStep, updateJobSeeker } =
    usePersonalDetails();
  useEffect(() => {
    setDisabled(false);
  }, [jobSeeker.experience]);
  const isExperienced = jobSeeker.experience;
  const handleExperience = (exp: string) => {
    updateJobSeeker({
      experience: exp === "Experienced",
    });
  };
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
