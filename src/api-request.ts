import axios, { Method, AxiosResponse } from "axios";

export interface QueryFilter {
  page: number;
  search?: string;
  limit?: number;
};

export interface UploadedData {
  postId: number;
  id: string;
  recordId: number;
  name: string;
  email: string;
  body: string;
};

export interface UploadedDataList {
  page: number;
  pageCount: number;
  pageSize: number;
  data: UploadedData[]
};

const request = <T>({ method, url, data, headers, params, } : {
  method: Method, url: string, data?: any, headers?: any, params?: any
}):
  Promise<AxiosResponse<T>> => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_HOST,
    });
    return api.request<T>({
      method,
      url,
      params,
      headers,
      data,
    });
  };

export default request;
