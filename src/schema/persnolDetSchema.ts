import { cities, countries } from "@/constants/countries";
import { jobRoles } from "@/constants/personalDetailsConst";
import { z } from "zod";

export const DobScheme = z.object({
    dob: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be in dd-mm-yyyy format"),
    resume: z.string(),
    country: z.string().refine((val) => countries.includes(val), {
        message: "Invalid country",
    }),
});


export const PrefrenceScheme = z.object({
    jobRole: z.string().refine((val) => jobRoles.includes(val), {
        message: "Invalid job role",
    }),
    city: z.string().refine((val) => cities.includes(val), {
        message: "Invalid city",
    }),
    salary: z.number().min(0, "Salary must be greater than 0"),
});



export const companyInformationScheme=z.object({
    companyName:z.string().min(1,"Company name is required"),
    companyWebsite:z.string().url("Company website must be a valid URL"),
    companyDescription:z.string().min(5,"Company description is required"),
   
    address:z.string().min(1,"Company address is required"),
    country:z.string().refine((val) => countries.includes(val), {
        message: "Invalid country",
    }),
    city:z.string().refine((val) => cities.includes(val), {
        message: "Invalid city",
    }),
    pincode:z.string().min(6,"Company pincode must be at least 6 digits"),
    companyLogo:z.string().url("Company logo must be a valid URL"),
    industryType:z.array(z.string()).min(1,"Industry type is required"),
    numberOfEmployees:z.number().min(1,"Employee count is required"),
})

