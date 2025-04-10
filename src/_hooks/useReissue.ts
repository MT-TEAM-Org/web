"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const handleReissue = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/token/regenerate`,
    {},
    {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("accessToken") ||
          localStorage.getItem("refreshToken")
        }`,
      },
    }
  );
  return response;
};

const useReissue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: handleReissue,
    retry: false,
    onSuccess: (data) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.setItem("accessToken", data.headers.authorization);
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("accessToken");
      }
    },
  });
};

export default useReissue;
