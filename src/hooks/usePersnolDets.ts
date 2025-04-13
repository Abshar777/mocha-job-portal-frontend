import { useZodFormV2 } from "./useZodForm"
import { companyInformationScheme, DobScheme, PrefrenceScheme } from "@/schema/persnolDetSchema"
import usePersonalDetails from "@/store/zustand/PersonalDetails"
import { useEffect } from "react"
import { z } from "zod"


export const useDobAndDets = () => {
    const { jobSeeker, updateJobSeeker } = usePersonalDetails()

    const { form, onFormSubmit, watch } = useZodFormV2(DobScheme, () => { }, {
        dob: jobSeeker.dob || "",
        country: jobSeeker.country || "India",
        resume: jobSeeker.resume || ""
    })

    const DobANDDetails = watch()
    useEffect(() => {
        if (DobANDDetails) {
            updateJobSeeker({
                ...jobSeeker,
                ...DobANDDetails
            })
        }
    }, [DobANDDetails.dob, DobANDDetails.country])

    return { form, onFormSubmit }
}



export const usePrefrence = () => {
    const { jobSeeker, updateJobSeeker } = usePersonalDetails()

    const fn = () => { }

    const { form, onFormSubmit, watch } = useZodFormV2(PrefrenceScheme, fn, {
        jobRole: jobSeeker.prefrence?.jobRole || "",
        city: jobSeeker.prefrence?.city || "",
        salary: jobSeeker.prefrence?.salary || 0
    });

    const prefrence = watch()
    useEffect(() => {
        if (prefrence) {
            updateJobSeeker({
                ...jobSeeker,
                prefrence: {
                    ...prefrence
                }
            })
        }
    }, [prefrence.city, prefrence.jobRole, prefrence.salary])

    return { form, onFormSubmit }
}


export const useCompanyInformation = () => {
    const { recruiter, updateRecruiter } = usePersonalDetails()

    const fn = () => { }

    const { form, onFormSubmit, watch,setValue } = useZodFormV2(companyInformationScheme, fn, {
        companyName: recruiter.companyName || "",
        companyWebsite: recruiter.companyWebsite || "",
        companyDescription: recruiter.companyDescription || "",
        address: recruiter.companyAddress?.address || "",
        country: recruiter.companyAddress?.country || "",
        city: recruiter.companyAddress?.city || "",
        pincode: String(recruiter.companyAddress?.pincode) || "",
        companyLogo: recruiter.companyLogo || "",
        industryType: recruiter.industryType || [],
        numberOfEmployees: recruiter.numberOfEmployees || 0
    })

    const companyInformation = watch()
    useEffect(() => {
        if (companyInformation) {
            updateRecruiter({
                ...recruiter,
                ...companyInformation,
                companyAddress: {
                    address: companyInformation.address,
                    country: companyInformation.country,
                    city: companyInformation.city,
                    pincode: Number(companyInformation.pincode)
                }
            })
        }
    }, [companyInformation.companyName, companyInformation.companyWebsite, companyInformation.companyDescription, companyInformation.address, companyInformation.country, companyInformation.city, companyInformation.pincode, companyInformation.companyLogo])

    return { form, onFormSubmit, setValue }


}   
