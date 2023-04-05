import { axiosInstance, axiosResponseBody } from "./apiConnection";
import { RegisterType } from "./types";

// register requests
export const registerRequest = {
  post: (url: string, postData: RegisterType) =>
  axiosInstance.post<RegisterType>(url, postData).then(axiosResponseBody),
};