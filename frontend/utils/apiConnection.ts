import axios, { AxiosResponse } from 'axios';

// axios instance
export const axiosInstance = axios.create({
  baseURL: 'https://api.shillstreet.com/',
  headers: {
    'Content-Type': 'Application/json'
  },
  withCredentials: true,
});

// the response body
export const axiosResponseBody = (response: AxiosResponse) => response.data;