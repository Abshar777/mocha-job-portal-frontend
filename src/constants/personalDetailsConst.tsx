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
import CompanyDets from "@/components/page-section/personalDetails/recruiter/CompanyDets";
import IndustryType from "@/components/page-section/personalDetails/recruiter/industryType";

export const jobSeekerInitialState: TJobSeeker = {
  experience: false,
  skills: [],
  education: [],
  prefrence: undefined,
  resume: undefined,
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
    name: "DOB & Resume & Country",
    title: "DOB & Resume & Country",
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
    name: "Preferences ",
    title: "Preferences ",
  },
  {
    step: 5,
    id: "j-5",
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
    name: "Industry Type",
    title: "Industry Type",
  },
];

export const experience = ["Fresher", "Experienced"];

export const components: Record<string, JSX.Element> = {
  "j-1": <Experience />,
  "j-2": <PersonalDetails />,
  "j-3": <Education />,
  "j-4": <Prefrence />,
  "j-5": <Skills />,
  "r-1": <CompanyDets />,
  "r-2": <CompanyAddress />,
  "r-3": <About />,
  "r-4": <IndustryType />,
};

export const education = [
  "Doctrate/PhD",
  "Masters/Post-graduation",
  "Graduation/Diploma",
  "12th",
  "10th",
  "10th Below",
];

export const jobRoles = [
  // 👨‍💻 Tech & Software
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mobile App Developer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Engineer",
  "AI Engineer",
  "Cybersecurity Analyst",
  "System Administrator",
  "IT Support Specialist",
  "Network Engineer",
  "Product Manager",
  "UI/UX Designer",
  "QA Engineer / Tester",
  "Blockchain Developer",
  "Game Developer",

  // 💼 Business & Management
  "Business Analyst",
  "Project Manager",
  "Operations Manager",
  "HR Manager",
  "Recruiter",
  "Sales Manager",
  "Marketing Manager",
  "Digital Marketing Specialist",
  "Content Strategist",
  "Social Media Manager",
  "Customer Success Manager",
  "Client Relationship Manager",

  // 📊 Finance & Accounting
  "Accountant",
  "Financial Analyst",
  "Auditor",
  "Investment Banker",
  "Tax Consultant",
  "Payroll Specialist",

  // 🏥 Healthcare
  "Doctor",
  "Nurse",
  "Pharmacist",
  "Medical Lab Technician",
  "Radiologist",
  "Physiotherapist",
  "Healthcare Administrator",

  // 🎨 Design & Creative
  "Graphic Designer",
  "UI Designer",
  "Motion Designer",
  "Video Editor",
  "Animator",
  "3D Artist",
  "Photographer",
  "Content Writer",
  "Copywriter",

  // 🚚 Logistics & Supply Chain
  "Supply Chain Manager",
  "Logistics Coordinator",
  "Warehouse Manager",
  "Procurement Specialist",
  "Inventory Analyst",

  // 🏗 Construction & Engineering
  "Civil Engineer",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Architect",
  "Site Supervisor",
  "Structural Engineer",

  // 📚 Education & Training
  "Teacher",
  "Lecturer",
  "Academic Counselor",
  "Corporate Trainer",
  "Instructional Designer",

  // ✈️ Travel & Hospitality
  "Hotel Manager",
  "Chef",
  "Travel Consultant",
  "Flight Attendant",
  "Tour Guide",

  // 🛍 Retail & E-commerce
  "Store Manager",
  "Cashier",
  "E-commerce Specialist",
  "Customer Service Executive",

  // 🧪 Research & Science
  "Research Analyst",
  "Lab Technician",
  "Environmental Scientist",
  "Biotech Engineer",
];

export const skills = [
  // 💻 Programming & Tech Skills
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "SQL",
  "NoSQL",
  "HTML",
  "CSS",
  "React",
  "Next.js",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "REST APIs",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Firebase",
  "Prisma",
  "Redis",
  "Kafka",
  "gRPC",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Azure",
  "CI/CD",
  "Linux",
  "Git",
  "WebSockets",
  "Jenkins",
  "Terraform",

  // 🤖 Data & AI Skills
  "Machine Learning",
  "Deep Learning",
  "Data Analysis",
  "Data Visualization",
  "Big Data",
  "Pandas",
  "NumPy",
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Natural Language Processing (NLP)",
  "Computer Vision",
  "Power BI",
  "Tableau",
  "Excel (Advanced)",

  // 🔒 Cybersecurity Skills
  "Network Security",
  "Penetration Testing",
  "Ethical Hacking",
  "Security Auditing",
  "SIEM Tools",
  "SOC Monitoring",
  "Incident Response",

  // 🎨 Design & Creative
  "UI Design",
  "UX Design",
  "Figma",
  "Adobe XD",
  "Sketch",
  "Illustrator",
  "Photoshop",
  "After Effects",
  "Blender",
  "Motion Graphics",
  "Video Editing",
  "3D Modeling",

  // 📈 Business, Finance & Marketing
  "Business Analysis",
  "Project Management",
  "Agile/Scrum",
  "Product Management",
  "Digital Marketing",
  "SEO",
  "SEM",
  "Email Marketing",
  "Google Ads",
  "Facebook Ads",
  "Copywriting",
  "Market Research",
  "Financial Analysis",
  "Accounting",
  "Bookkeeping",
  "Risk Management",

  // 🧠 Soft Skills (Super Important!)
  "Communication",
  "Teamwork",
  "Problem Solving",
  "Time Management",
  "Critical Thinking",
  "Leadership",
  "Adaptability",
  "Creativity",
  "Attention to Detail",
  "Presentation Skills",
  "Conflict Resolution",
  "Decision Making",
  "Customer Service",

  // 🚀 Others
  "Sales",
  "Negotiation",
  "CRM (e.g., Salesforce)",
  "HR Management",
  "Content Writing",
  "Language Skills (e.g., English, Spanish, Arabic, French)",
  "Public Speaking",
];

export const skillsByCategory = {
  Programming: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "Go",
    "Rust",
    "HTML",
    "CSS",
    "SQL",
    "NoSQL",
  ],

  WebDevelopment: [
    "React",
    "Next.js",
    "Angular",
    "Vue.js",
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    "REST APIs",
    "GraphQL",
  ],

  Databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Prisma", "Redis"],

  DevOps: [
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Linux",
    "Git",
    "Jenkins",
    "Terraform",
    "NGINX",
  ],

  CloudPlatforms: ["AWS", "GCP", "Azure"],

  DataAndAI: [
    "Machine Learning",
    "Deep Learning",
    "Data Analysis",
    "Data Visualization",
    "Big Data",
    "Pandas",
    "NumPy",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "NLP",
    "Computer Vision",
    "Power BI",
    "Tableau",
    "Excel (Advanced)",
  ],

  Cybersecurity: [
    "Network Security",
    "Penetration Testing",
    "Ethical Hacking",
    "Security Auditing",
    "SIEM Tools",
    "SOC Monitoring",
    "Incident Response",
  ],

  DesignCreative: [
    "UI Design",
    "UX Design",
    "Figma",
    "Adobe XD",
    "Sketch",
    "Illustrator",
    "Photoshop",
    "After Effects",
    "Motion Graphics",
    "Video Editing",
    "Blender",
    "3D Modeling",
  ],

  Marketing: [
    "Digital Marketing",
    "SEO",
    "SEM",
    "Email Marketing",
    "Google Ads",
    "Facebook Ads",
    "Copywriting",
    "Market Research",
  ],

  BusinessFinance: [
    "Business Analysis",
    "Project Management",
    "Agile/Scrum",
    "Product Management",
    "Financial Analysis",
    "Accounting",
    "Bookkeeping",
    "Risk Management",
  ],

  SoftSkills: [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Time Management",
    "Critical Thinking",
    "Leadership",
    "Adaptability",
    "Creativity",
    "Attention to Detail",
    "Presentation Skills",
    "Conflict Resolution",
    "Decision Making",
    "Customer Service",
  ],

  Other: [
    "Sales",
    "Negotiation",
    "CRM (Salesforce, Hubspot)",
    "HR Management",
    "Content Writing",
    "Public Speaking",
    "Language Skills (English, Spanish, Arabic, etc.)",
  ],
};



export const industryTypes = [
  "Agriculture",
  "Automotive",
  "Aviation",
  "Biotechnology",
  "Chemical",
  "Construction",
  "Consumer Goods",
  "Cybersecurity",
  "Defense",
  "E-commerce",
  "Education",
  "Electronics",
  "Energy",
  "Entertainment",
  "Environmental Services",
  "Fashion",
  "Finance",
  "Food & Beverage",
  "Gaming",
  "Government",
  "Healthcare",
  "Hospitality",
  "Information Technology",
  "Insurance",
  "Legal",
  "Logistics & Supply Chain",
  "Manufacturing",
  "Marine",
  "Marketing & Advertising",
  "Media & Broadcasting",
  "Mining",
  "Nonprofit",
  "Oil & Gas",
  "Pharmaceuticals",
  "Real Estate",
  "Retail",
  "Robotics",
  "Software",
  "Sports",
  "Telecommunications",
  "Textile",
  "Tourism",
  "Transportation",
  "Utilities",
  "Venture Capital",
  "Wholesale",
];
