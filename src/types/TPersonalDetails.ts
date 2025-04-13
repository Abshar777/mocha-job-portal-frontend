import { Role } from "@/constants/role"
import { JSX } from "react";

export type TPersnolDetails = {
    role: Role | undefined;
    jobSeeker?: TJobSeeker,
    recruiter?: TRecruiter,
}


export type TJobSeeker = {
    experience: boolean,
    education: string[],
    resume?: string,
    prefrence?: {
        city: string,
        salary: number,
        jobRole: string,
    },
    skills: string[],
    tags: string[],
    gender?: string,
    age?: number,
    dob?: string,
    country?: string,
}

export type TRecruiter = {
    companyName?: string,
    companyWebsite?: string,
    companyDescription?: string,
    industryType?: string[],
    companyLogo?: string,
    companyAddress?: {
        country: string,
        city: string,
        pincode: number,
        address: string,
    },
    numberOfEmployees?: number,

}

export type TSteps = {
    step: number,
    id: string,
    name:string,
    title: string,
    children?: TSteps[]
}


