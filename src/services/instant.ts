import axios, { AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const baseInstance = axios.create({
  baseURL,
});

baseInstance.interceptors.response.use(({ data }) => data);

baseInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
});

interface ApiRequestMethods {
  get<T>(url: string, request?: AxiosRequestConfig): Promise<T>;
  post<T, K>(url: string, data?: K, config?: AxiosRequestConfig): Promise<T>;
  put<T, K>(url: string, data?: K, config?: AxiosRequestConfig): Promise<T>;
  patch<T, K>(url: string, data?: K, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, request?: AxiosRequestConfig): Promise<T>;
}

export const apiRequest: ApiRequestMethods = {
  get: (url, request) => {
    console.log("🧸 get", { url, request });
    return baseInstance.get(url, request);
  },
  post: (url, data, config) => {
    console.log("🐈 post", { url, data, config });
    return baseInstance.post(url, data, config);
  },
  put: (url, data, config) => {
    console.log("🐶 put", { url, data, config });
    return baseInstance.put(url, data, config);
  },
  patch: (url, data, config) => {
    console.log("🐰 patch", { url, data, config });
    return baseInstance.patch(url, data, config);
  },
  delete: (url, request) => baseInstance.delete(url, request),
};
