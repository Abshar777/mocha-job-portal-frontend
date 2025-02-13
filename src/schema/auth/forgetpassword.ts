import { z } from "zod";

const forgetPasswordSchema = z.object({
    email: z.string().email(),
})

export type forgetPasswordSchemaType = z.infer<typeof forgetPasswordSchema>
export default forgetPasswordSchema;
