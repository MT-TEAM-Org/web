"use client";

import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { api } from "./api";
import { AxiosRequestConfig } from "axios";

export const useGetQuery = <T>(
  key: string,
  url: string,
  config?: AxiosRequestConfig,
  options?: UseQueryOptions<T>
) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: () => api.get<T>(url, config),
    ...options,
  });
};

export const useApiMutation = <T, D = any>(
  method: "post" | "put" | "delete",
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
  options?: UseMutationOptions<T, Error, D>
) => {
  return useMutation<T, Error, D>({
    mutationFn: async (variables: D): Promise<T> => {
      switch (method) {
        case "post":
          return await api.post<T>(url, variables || data, config);
        case "put":
          return await api.put<T>(url, variables || data, config);
        case "delete":
          return await api.delete<T>(url, config);
      }
    },
    ...options,
  });
};
