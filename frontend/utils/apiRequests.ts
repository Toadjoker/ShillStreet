import { axiosInstance, axiosResponseBody } from "./apiConnection"
import { RegisterType, WaitListType, LoginType } from "./types"

// register requests
export const registerRequest = {
    post: (url: string, postData: RegisterType) =>
        axiosInstance.post<RegisterType>(url, postData).then(axiosResponseBody),
}

export const waitListRequest = {
    post: (url: string, postData: WaitListType) =>
        axiosInstance.post<WaitListType>(url, postData).then(axiosResponseBody),
}

export const LoginRequest = {
    post: (url: string, postData: LoginType) =>
        axiosInstance.post<LoginType>(url, postData).then(axiosResponseBody),
}
