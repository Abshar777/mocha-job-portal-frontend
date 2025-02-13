import { Role } from "@/constants/role"

export type TPersnolDetails = {
    role: Role | undefined;
    jobSeeker?: TJobSeeker,
    recruiter?: TRecruiter,
}


export type TJobSeeker = {
    experience: boolean,
    education: {
        qualification: string,
        Phd?: {
            institute: string,
            year: number,
            percentage: number
        },
        diploma?: {
            institute: string,
            year: number,
            percentage: number
        },
        postGraduation?: {
            institute: string,
            year: number,
            percentage: number
        },
        graduation?: {
            institute: string,
            year: number,
            percentage: number
        },
        twelth?: {
            institute: string,
            year: number,
            percentage: number
        },
        tenth?: {
            board: string,
            year: number,
            percentage: number,
            medium: string,
        }
    }[],
    resume?: string,
    resumeHeadline?: string,
    prefrence?: {
        city: string,
        salary: number,
        preferedJobType: string,
    },
    skills: string[],
    tags: string[],
    gender?: string,
    age?: number,
    

}

export type TRecruiter = {
    companyName?: string,
    companyWebsite?: string,
    companyDescription?: string,
    industryType?: string[],
    companyLogo?: string,
    companyAddress?: {
        country: string,
        state: string,
        city: string,
        pincode: number,
    },
    numberOfEmployees?: number,

}