import { z } from "zod";

const signUpSchema = z.object({
    name: z.string().min(2, "name must be contain 2 latters"),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long')

})

export type signUpSchemaType = z.infer<typeof signUpSchema>
export default signUpSchema;