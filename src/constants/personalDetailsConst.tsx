import { TJobSeeker, TRecruiter, TSteps } from "@/types/TPersonalDetails";
import Experience from "@/components/page-section/personalDetails/jobSeeker/experience";
import { JSX } from "react";
import PersonalDetails from "@/components/page-section/personalDetails/jobSeeker/persnolDets";
import Education from "@/components/page-section/personalDetails/jobSeeker/education";
import Resume from "@/components/page-section/personalDetails/jobSeeker/resume";
import Prefrence from "@/components/page-section/personalDetails/jobSeeker/prefrence";
import Skills from "@/components/page-section/personalDetails/jobSeeker/skils";
import CompanyAddress from "@/components/page-section/personalDetails/recruiter/CompanyAddress";
import About from "@/components/page-section/personalDetails/recruiter/about";
import Employees from "@/components/page-section/personalDetails/recruiter/employees";
import CompanyDets from "@/components/page-section/personalDetails/recruiter/CompanyDets";

export const jobSeekerInitialState: TJobSeeker = {
  experience: false,
  skills: [],
  education: [],
  prefrence: undefined,
  resume: undefined,
  resumeHeadline: undefined,
  tags: [],
};

export const recruiterInitialState: TRecruiter = {
  numberOfEmployees: undefined,
  companyAddress: undefined,
  companyDescription: undefined,
  companyLogo: undefined,
  companyName: undefined,
  companyWebsite: undefined,
  industryType: undefined,
};

export const jobSeekerSetps: TSteps[] = [
  {
    step: 1,
    id: "j-1",
    name: "Experience",
    title: "Work Experience",
  },
  {
    step: 2,
    id: "j-2",
    name: "DOB & Resume & City",
    title: "DOB & Resume & City",
  },
  {
    step: 3,
    id: "j-3",
    name: "Education",
    title: "Education",
  },

  {
    step: 4,
    id: "j-4",
    name: "Add Headline ",
    title: "Add Headline ",
  },
  {
    step: 5,
    id: "j-5",
    name: "Preferences ",
    title: "Preferences ",
  },
  {
    step: 6,
    id: "j-6",
    name: "Skills",
    title: "Skills",
  },
];

export const recruiterSetps: TSteps[] = [
  {
    step: 1,
    id: "r-1",
    name: "Company Information",
    title: "Company Information",
  },
  {
    step: 2,
    id: "r-2",
    name: "Company Address",
    title: "Company Address",
  },
  {
    step: 3,
    id: "r-3",
    name: "About",
    title: "About",
  },
  {
    step: 4,
    id: "r-4",
    name: "Employees",
    title: "Employees",
  },
];

export const experience = ["Fresher", "Experienced"];

export const components: Record<string, JSX.Element> = {
  "j-1": <Experience />,
  "j-2": <PersonalDetails />,
  "j-3": <Education />,
  "j-4": <Resume />,
  "j-5": <Prefrence />,
  "j-6": <Skills />,
  "r-1": <CompanyDets />,
  "r-2": <CompanyAddress />,
  "r-3": <About />,
  "r-4": <Employees />,
};
