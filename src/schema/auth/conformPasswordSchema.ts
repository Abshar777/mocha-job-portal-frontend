import { z } from "zod";

const conformPasswordSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], 
});

export type conformPasswordSchemaType = z.infer<typeof conformPasswordSchema>
export default conformPasswordSchema;
