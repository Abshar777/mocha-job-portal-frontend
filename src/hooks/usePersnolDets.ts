import { useZodFormV2 } from "./useZodForm"
import { companyInformationScheme, DobScheme, PrefrenceScheme } from "@/schema/persnolDetSchema"
import usePersonalDetails from "@/store/zustand/PersonalDetails"
import { useEffect } from "react"
import { z } from "zod"


export const useDobAndDets = () => {
    const { jobSeeker, updateJobSeeker, setDisabled } = usePersonalDetails()

    const { form, onFormSubmit, watch, errors, trigger } = useZodFormV2(DobScheme, () => { }, {
        dob: jobSeeker.dob || "",
        country: jobSeeker.country || "India",
        resume: jobSeeker.resume || ""
    }, {
        mode: 'onChange',
        showToastOnError: false
    })
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [Object.keys(errors).length])

    const DobANDDetails = watch()
    useEffect(() => {
        if (DobANDDetails) {
            updateJobSeeker({
                ...jobSeeker,
                ...DobANDDetails
            })
        }
    }, [DobANDDetails.dob, DobANDDetails.country, DobANDDetails.resume])

    return { form, onFormSubmit }
}



export const usePrefrence = () => {
    const { jobSeeker, updateJobSeeker } = usePersonalDetails()

    const fn = () => { }

    const { form, onFormSubmit, watch, errors } = useZodFormV2(PrefrenceScheme, fn, {
        jobRole: jobSeeker.prefrence?.jobRole || "",
        city: jobSeeker.prefrence?.city || "",
        salary: jobSeeker.prefrence?.salary || 0
    });

    const prefrence = watch()
    const { setDisabled } = usePersonalDetails()
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

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [Object.keys(errors).length])

    return { form, onFormSubmit }
}


export const useCompanyInformation = () => {
    const { recruiter, updateRecruiter, setDisabled } = usePersonalDetails();

    const fn = () => { }

    const { form, onFormSubmit, watch, setValue, formState, errors } = useZodFormV2(
        companyInformationScheme,
        fn,
        {
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
        },
        {
            mode: 'onChange',
            showToastOnError: false
        }
    );

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [Object.keys(errors).length])

    const companyInformation = watch();
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

    return {
        form,
        onFormSubmit,
        setValue,
        errors: formState.errors,
        isValid: formState.isValid
    }
}   
