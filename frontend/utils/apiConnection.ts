import axios, { AxiosResponse } from 'axios';

// axios instance
export const axiosInstance = axios.create({
  baseURL: 'https://api.shillstreet.com/',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'Application/json'
  }
});

// the response body
export const axiosResponseBody = (response: AxiosResponse) => response.data;