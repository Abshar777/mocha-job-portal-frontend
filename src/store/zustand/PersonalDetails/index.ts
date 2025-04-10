// store/personalDetails.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "@/constants/role";
import { TJobSeeker, TRecruiter, TPersnolDetails, TSteps } from "@/types/TPersonalDetails";
import { jobSeekerInitialState, jobSeekerSetps, recruiterInitialState, recruiterSetps } from "@/constants/personalDetailsConst";

interface PersonalDetailsState extends TPersnolDetails {
    setRole: (role: Role) => void;
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
            role: undefined,
            jobSeeker: jobSeekerInitialState,
            recruiter: recruiterInitialState,
            step: 0,
            steps: null,
            nextStep: () => set((state) => ({ step: state.step + 1 })),
            previousStep: () => set((state) => ({ step: state.step - 1 })),
            setRole: (role) => {
                const steps = role === Role.JOBSEEKER ? jobSeekerSetps : recruiterSetps;
                // console.log(steps)
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
                set((state) => ({
                    recruiter: {
                        ...details,
                        ...state.recruiter,
                    },
                })),
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
            }),
        }
    )
);

export default usePersonalDetails;
