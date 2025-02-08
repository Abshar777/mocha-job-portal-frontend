import { Role } from "@/constants/role";

export interface TUser {
    _id: string,
    email: string,
    name: string,
    role: Role.JOBSEEKER | Role.RECRUITER,
    verified: boolean,
    profilePicture: string,
}