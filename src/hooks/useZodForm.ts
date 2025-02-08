"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const useZodForm = (
    schema: z.ZodSchema,
    mutation: Function,
    defaultValues?: z.infer<typeof schema>
) => {
    const { register, watch, handleSubmit, formState: { errors }, reset,setValue } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues
    });
    const onFormSubmit = handleSubmit(
        async (values) => mutation({ ...values }),
        (err) => {
            console.log(err,"err")
            Object.values(err).forEach((error) => {
                if (error) toast.error(error.message?.toString());
            });
        });
    return { register, watch, handleSubmit, errors, reset, onFormSubmit,setValue }
}

export default useZodForm;
