import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get(url, config).then((response) => response.data),

  post: <T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post(url, data, config).then((response) => response.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete(url, config).then((response) => response.data),
};

// export const useApiQuery = <T>(
//   key: string,
//   url: string,
//   config?: AxiosRequestConfig,
//   options?: UseQueryOptions<T, Error>
// ) => {
//   return useQuery<T, Error>(key, () => api.get<T>(url, config), options);
// };

// export const useApiMutation = <T>(
//   method: "post" | "put" | "delete",
//   url: string,
//   data?: any,
//   config?: AxiosRequestConfig,
//   options?: UseMutationOptions<T, Error, any>
// ) => {
//   const mutationFn = async () => {
//     switch (method) {
//       case "post":
//         return await api.post<T>(url, data, config);
//       case "put":
//         return await api.put<T>(url, data, config);
//       case "delete":
//         return await api.delete<T>(url, config);
//     }
//   };

//   return useMutation<T, Error, any>(mutationFn, options);
// };
