import { Role } from "@/constants/role";

export interface JobSeeker {
    experience: boolean;
    skills: string[];
    education: any[];
    prefrence?: string;
    resume?: string;
    resumeHeadline?: string;
    tags: string[];
}

export interface Recruiter {
    numberOfEmployees?: number;
    companyAddress?: string;
    companyDescription?: string;
    companyLogo?: string;
    companyName?: string;
    companyWebsite?: string;
    industryType?: string;
}

export interface PersonalDetails {
    role?: Role;
    jobSeeker: JobSeeker;
    recruiter: Recruiter;
}

export interface PersonalDetailsContextType {
    state: PersonalDetails;
    setRole: (role: Role) => void;
    updateJobSeeker: (data: Partial<JobSeeker>) => void;
    updateRecruiter: (data: Partial<Recruiter>) => void;
    handleNextStep:(path:string,role:Role)=>string;
    handlePreviousStep:(path:string,role:Role)=>string;
    getProgress:(path:string,role?:Role)=>number;

    
} 


export type Action = 
    | { type: 'SET_ROLE'; payload: Role }
    | { type: 'UPDATE_JOB_SEEKER'; payload: Partial<JobSeeker> }
    | { type: 'UPDATE_RECRUITER'; payload: Partial<Recruiter> }
    | { type: 'INIT_FROM_STORAGE'; payload: PersonalDetails }
    | { type: 'SET_PROGRESS'; payload: number };
