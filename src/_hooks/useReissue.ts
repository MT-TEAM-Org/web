"use client";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/utils/Store";

const handleReissue = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}api/token/regenerate`,
    {},
    {
      headers: {
        Authorization: localStorage.getItem("accessToken")
          ? localStorage.getItem("accessToken")
          : `Bearer ${localStorage.getItem("refreshToken")}`, // Bearer token for refresh token
      },
    }
  );
  return response;
};

const useReissue = () => {
  const queryClient = useQueryClient();
  const { logout, login } = useAuthStore();
  return useMutation({
    mutationFn: handleReissue,
    retry: false,
    onSuccess: (data) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.setItem("accessToken", data.headers.authorization);
      queryClient.refetchQueries({ queryKey: ["authCheck"] });
      login();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        queryClient.refetchQueries({ queryKey: ["authCheck"] });
        logout();
        queryClient.invalidateQueries({ queryKey: ["inquiriesList"] });
        queryClient.invalidateQueries({ queryKey: ["myPostList"] });
        queryClient.invalidateQueries({ queryKey: ["myCommentList"] });
      }
    },
  });
};

export default useReissue;
