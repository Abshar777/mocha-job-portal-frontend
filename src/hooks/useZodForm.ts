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
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues
    });
    const { register, watch, handleSubmit, formState: { errors }, reset, setValue } = form
    const onFormSubmit = handleSubmit(
        async (values) => mutation({ ...values }),
        (err) => {
            Object.values(err).forEach((error) => {
                if (error) toast.error(error.message?.toString());
            });
        });
    return { register, form, watch, handleSubmit, errors, reset, onFormSubmit, setValue }
}



export const useZodFormV2 = <T extends z.ZodSchema>(
  schema: T,
  mutation: Function,
  defaultValues?: z.infer<T>
) => {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const { handleSubmit, formState, ...rest } = form;

  const onFormSubmit = handleSubmit(
    async (values) => mutation(values),
    (err) => {
      Object.values(err).forEach((error: any) => {
        if (error?.message) toast.error(error.message.toString());
      });
    }
  );

  return { form, formState,errors:formState.errors, onFormSubmit, ...rest };
};




export default useZodForm;
