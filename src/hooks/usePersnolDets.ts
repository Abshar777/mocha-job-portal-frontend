import { useZodFormV2 } from "./useZodForm"
import { companyInformationScheme, DobScheme, PrefrenceScheme } from "@/schema/persnolDetSchema"
import usePersonalDetails from "@/store/zustand/PersonalDetails"
import { useEffect } from "react"
import { addRoleAndPersonalDetails, checkCompanyNameOrWebsite } from "@/api/user"
import { useQueryData } from "./useQueryData"
import { useMutationData } from "./useMutation"
import { Role } from "@/constants/role"
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
        if (DobANDDetails.dob.trim() === "" || DobANDDetails.country.trim() === "" || DobANDDetails.resume.trim() === "") {
            setDisabled(true)
        } else {
            setDisabled(false)
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
        if (prefrence.city.trim() === "" || prefrence.jobRole.trim() === "" || prefrence.salary === 0) {
            setDisabled(true)
        } else {
            setDisabled(false)
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
    const { recruiter, updateRecruiter, setDisabled, setLoading, step } = usePersonalDetails();

    const fn = () => { };

    const { refetch, error, isPending } = useQueryData(["companyName", recruiter.companyName], () => checkCompanyNameOrWebsite((recruiter.companyName || ""), (recruiter.companyWebsite || "")), {
        enabled: !!recruiter.companyName || !!recruiter.companyWebsite,

    })

    const { form, onFormSubmit, watch, setValue, formState, errors, setError } = useZodFormV2(
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
        switch (step) {
            case 1:
                if (recruiter?.companyName?.trim?.() === "" || recruiter?.companyLogo?.trim?.() === "" || recruiter?.numberOfEmployees === 0) {
                    setDisabled(true)
                } else {
                    if (Object.keys(errors).length > 0) {
                        setDisabled(true)
                    } else {
                        setDisabled(false)
                    }
                }
                break;
            case 2:
                if (recruiter?.companyAddress?.address?.trim?.() === "" || recruiter?.companyAddress?.country?.trim?.() === "" || recruiter?.companyAddress?.city?.trim?.() === "" || recruiter?.companyAddress?.pincode?.toString()?.trim?.() === "") {
                    setDisabled(true)
                } else {
                    if (Object.keys(errors).length > 0) {
                        setDisabled(true)
                    } else {
                        setDisabled(false)
                    }
                }
                break;
            case 3:
                // check website url is valid or not
                if (recruiter?.companyDescription?.trim?.() === "" || recruiter?.companyWebsite?.trim?.() === "") {
                    setDisabled(true)
                } else {
                    if (Object.keys(errors).length > 0) {
                        setDisabled(true)
                    } else {
                        setDisabled(false)
                    }
                }
                break;

        }
    }, [step, recruiter.companyName, recruiter.companyWebsite, recruiter.companyDescription, recruiter.companyAddress, recruiter.companyLogo, recruiter.industryType, recruiter.numberOfEmployees,])

    useEffect(() => {
        if (error) {
            setError("companyName", { message: "company name already exists " })
            setError("companyWebsite", { message: "company website already exists" })
        }
        if (isPending) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [error, isPending])



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
        if (companyInformation.companyName || companyInformation.companyWebsite) {

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





export const useAddRoleAndPersonalDetails = () => {
    const { jobSeeker, updateJobSeeker, setDisabled, setLoading, role, recruiter, updateRecruiter, step, } = usePersonalDetails();

    const { mutate, isPending } = useMutationData(
        ["personalDetails"],
        () => addRoleAndPersonalDetails(role as Role, jobSeeker, recruiter),
        ["personalDetails"],
        (data) => {
            if (role === Role.JOBSEEKER) {
                updateJobSeeker(data)
            } else {
                updateRecruiter(data)
            }
        }
    )




    useEffect(() => {
        setLoading(isPending)

    }, [isPending])

    return { mutate, MutationLoading: isPending }
}   
