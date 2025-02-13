import { Role } from "@/constants/role";
import { createSlice } from "@reduxjs/toolkit";
import { setRole, updateJobSeeker, updateEmployer } from "./fn";
import { TPersnolDetails } from "./type";

const initialState: TPersnolDetails = {
    role: undefined,
    jobSeeker: {
        experience: false,
        skills: [],
        education:[],
        prefrence:undefined,
        resume:undefined,
        resumeHeadline:undefined,
        tags:[]
    },
    recruiter: {
        numberOfEmployees:undefined,
        companyAddress:undefined,
        companyDescription:undefined,
        companyLogo:undefined,
        companyName:undefined,
        companyWebsite:undefined,
        industryType:undefined,
        
    }
}

const persnolDetailsSlice = createSlice({
    name: "persnolDetails",
    initialState,
    reducers: {
        SetRole: setRole,
        UpdateJobSeeker: updateJobSeeker,
        UpdateEmployer: updateEmployer
    }
})

export const { SetRole, UpdateJobSeeker, UpdateEmployer } = persnolDetailsSlice.actions
export default persnolDetailsSlice.reducer