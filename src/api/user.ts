"use client"
import { apiRoutes, Services } from "@/constants/services";
import { TJobSeeker, TRecruiter } from "@/types/TPersonalDetails";
import axiosInstance from "@/utils/axios";
import { v4 as uuid } from "uuid";

export const uploadFile = async (file: File) => {
    const fileName = `${uuid()}__${file.name}`
    const ContentType = file.type;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("ContentType", ContentType);
    const { data } = await axiosInstance.post(`${Services.USER}${apiRoutes.util}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}


export const checkCompanyNameOrWebsite = async (companyName: string, companyWebsite: string) => {
    const { data } = await axiosInstance.post(`${Services.USER}${apiRoutes.user}/ExistsCompany`, {
        companyName, companyWebsite
    });
    return data;
}


export const addRoleAndPersonalDetails = async (role: string, jobSeeker: TJobSeeker, recruiter: TRecruiter) => {
    const { data } = await axiosInstance.post(`${Services.USER}${apiRoutes.user}/personal-details`, {
        role, jobSeeker, recruiter
    });
    return data;
}

