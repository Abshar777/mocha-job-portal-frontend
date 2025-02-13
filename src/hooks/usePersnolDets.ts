"use client";
import { useState } from "react";
import { Role } from "@/constants/role";
import { useRouter } from "nextjs-toploader/app";
import { usePersonalDetailsContext } from "@/context/personalDetails/PersonalDetailsProvider";

const usePersonalDetails = () => {
    const Roles = [Role.JOBSEEKER, Role.RECRUITER];
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const { state, setRole, updateJobSeeker, updateRecruiter,handleNextStep,handlePreviousStep } = usePersonalDetailsContext();
    const { role, jobSeeker, recruiter } = state;

    const updateRole = (newRole: Role) => {
        setRole(newRole);
    };

    const updateUserProfile = async () => {
        return {};
    };

    const setLoading = (value: boolean) => setIsLoading(value);
    

    return { 
        Roles, 
        isLoading, 
        updateRole, 
        updateJobSeeker, 
        updateRecruiter, 
        role, 
        jobSeeker, 
        recruiter,
        updateUserProfile,
        setLoading,
        handleNextStep,
        handlePreviousStep
    };
};

export default usePersonalDetails;
