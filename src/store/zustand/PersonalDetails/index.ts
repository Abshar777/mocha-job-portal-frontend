// store/personalDetails.ts
"use client"
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "@/constants/role";
import { TJobSeeker, TRecruiter, TPersnolDetails, TSteps } from "@/types/TPersonalDetails";
import { jobSeekerInitialState, jobSeekerSetps, recruiterInitialState, recruiterSetps } from "@/constants/personalDetailsConst";

interface PersonalDetailsState extends TPersnolDetails {
    setRole: (role: Role) => void;
    loading: boolean;
    disabled: boolean;
    setDisabled: (disabled: boolean) => void;
    setLoading: (loading: boolean) => void;
    updateJobSeeker: (details: any) => void;
    updateRecruiter: (details: any) => void;
    reset: () => void;
    role: Role | undefined;
    jobSeeker: TJobSeeker;
    recruiter: TRecruiter;
    step: number;
    steps: TSteps[] | null;
    nextStep: () => void;
    previousStep: () => void;
}

const usePersonalDetails = create<PersonalDetailsState>()(
    persist(
        (set) => ({
            loading: false,
            disabled: false,
            setLoading: (loading) => set({ loading }),
            setDisabled: (disabled) => set({ disabled }),
            role: undefined,
            jobSeeker: {
                experience: false,
                skills: [],
                education: [],
                prefrence: undefined,
                resume: undefined,
                tags: [],
            },
            recruiter: {
                numberOfEmployees: undefined,
                companyAddress: undefined,
                companyDescription: undefined,
                companyLogo: undefined,
                companyName: undefined,
                companyWebsite: undefined,
                industryType: undefined,
            },
            step: 0,
            steps: null,
            nextStep: () => set((state) => {
                if (state.loading || state.disabled) return { step: state.step };
                if (state.step <= (state.steps?.length || 0) - 1) {
                    return { step: state.step + 1, disabled: true }
                }
                return { step: state.step }
            }),
            previousStep: () => set((state) => {
                if (state.loading) return { step: state.step };
                if (state.step > 0) {
                    return { step: state.step - 1 }
                }
                return { step: state.step }
            }),
            setRole: (role) => {
                const steps = role === Role.JOBSEEKER ? jobSeekerSetps : recruiterSetps;
                return set({ role, steps })
            },
            updateJobSeeker: (details) =>
                set((state) => {
                    const data = {
                        ...state.jobSeeker,
                        ...details,
                    }
                    return ({
                        jobSeeker: data,
                    })
                }),
            updateRecruiter: (details) =>
                set((state) => {
                    const data = {
                        ...state.recruiter,
                        ...details,
                    }
                    return ({
                        recruiter: data
                    })
                }),
            reset: () =>
                set({
                    role: undefined,
                    jobSeeker: jobSeekerInitialState,
                    recruiter: recruiterInitialState,
                    step: 0,
                }),
        }),
        {
            name: "personal-details",
            partialize: (state) => ({
                role: state.role,
                jobSeeker: state.jobSeeker,
                recruiter: state.recruiter,
                step: state.step,
                steps: state.steps,
                disabled: state.disabled,
            }),
        }
    )
);

export default usePersonalDetails;
