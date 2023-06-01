import { axiosInstance, axiosResponseBody } from "./apiConnection"
import { RegisterType, WaitListType, LoginType, TwitterIdType } from "./types"

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
        axiosInstance
            .post<LoginType>(url, postData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(axiosResponseBody),
}

export const AuthRequest = {
    get: (url: string, token: string) =>
        axiosInstance
            .get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(axiosResponseBody),
}

export const TwitterIdRequest = {
    post: (url: string, postData: TwitterIdType) =>
        axiosInstance
            .post<TwitterIdType>(url, postData, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(axiosResponseBody),
}
