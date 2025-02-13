"use client"
import { JobSeeker, Recruiter, PersonalDetails } from './types';
import { Role } from '@/constants/role';
import { jobSeekerRoutes, recruiterRoutes } from '@/constants/usePersnolDets';
import { useRouter } from 'nextjs-toploader/app';
export const updateJobSeekerData = (
    state: PersonalDetails,
    data: Partial<JobSeeker>
): PersonalDetails => {
    return {
        ...state,
        jobSeeker: {
            ...state.jobSeeker,
            ...data,
        },
    };
};

export const updateRecruiterData = (
    state: PersonalDetails,
    data: Partial<Recruiter>
): PersonalDetails => {
    return {
        ...state,
        recruiter: {
            ...state.recruiter,
            ...data,
        },
    };
};

export const updateRole = (
    state: PersonalDetails,
    role: Role
): PersonalDetails => {
    return {
        ...state,
        role,
    };
}; 


export const handleNextStep = (path: string,role: Role) => {
    if(role === Role.JOBSEEKER){
        const nextpath= jobSeekerRoutes.findIndex(route => route === path) + 1;
        return jobSeekerRoutes[nextpath];
    }else{
        const nextpath= recruiterRoutes.findIndex(route => route === path) + 1;
        return recruiterRoutes[nextpath];
    }
}


export const handlePreviousStep = (path: string,role: Role) => {
    const router = useRouter();
    if(role === Role.JOBSEEKER){
        const previouspath= jobSeekerRoutes.findIndex(route => route === path) - 1;
        return jobSeekerRoutes[previouspath];
    }else{
        const previouspath= recruiterRoutes.findIndex(route => route === path) - 1;
        return recruiterRoutes[previouspath];
    }
}


export const getProgress = (path: string,role?: Role) => {
    if(!role) return 10
    if(role === Role.JOBSEEKER){
        return jobSeekerRoutes.findIndex(route => route === path) + 1;
    }else{
        return recruiterRoutes.findIndex(route => route === path) + 1;
    }

}
