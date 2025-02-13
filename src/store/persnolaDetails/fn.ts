import { PayloadAction } from "@reduxjs/toolkit";
import { Role } from "@/constants/role";
import { TJobSeeker, TRecruiter } from "./type";



export const setRole = (state: any, action: PayloadAction<Role>) => {
    state.role = action.payload;
}

export const updateJobSeeker = (state: any, action: PayloadAction<Partial<TJobSeeker>>) => {
    state.jobSeeker = {
        ...state.jobSeeker,
        ...action.payload
    };
}

export const updateEmployer = (state: any, action: PayloadAction<Partial<TRecruiter>>) => {
    state.recruiter = {
        ...state.recruiter,
        ...action.payload
    };
}
