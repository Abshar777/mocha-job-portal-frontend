import { MutationFunction, MutationKey, QueryKey, useMutation, useMutationState, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { toast } from "sonner"

export const useMutationData = (mutationKey: MutationKey,
    mutationFn: MutationFunction<any, any>,
    queryKey?: QueryKey,
    onSuccess?: (data: any) => void
) => {
    const client = useQueryClient()
    const { mutate, isPending, isSuccess, isError, ...rest } = useMutation({
        mutationKey,
        mutationFn,
        onError(error) {
            const data = (error as unknown as AxiosError).response?.data as { message?: string }
            console.log(data, "error")
            if (data?.message) toast.error(data.message,)
            else toast.error("An unexpected error occurred.", {
                description: error.message?.toString()
            })


        },
        onSuccess(data) {
            if (onSuccess) onSuccess(data);
        },

        onSettled: async () => {
            return await client.invalidateQueries({ queryKey: queryKey, exact: true })
        }
    })
        return { mutate, isPending, isSuccess, isError, ...rest }
}


export const useMutationDataState = (mutationKey: MutationKey) => {
    const data = useMutationState({
        filters: {
            mutationKey
        },
        select(mutation) {
            return {
                variables: mutation.state.variables as any,
                status: mutation.state.status,
            };
        },
    })
    const latestVaribales = data[data.length - 1];
    return { latestVaribales }
}
