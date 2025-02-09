export type ApiResponse<T extends any> = {
    data: T
    message: string
    status: number
    token?:string
}



