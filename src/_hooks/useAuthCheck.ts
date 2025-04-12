"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import useReissue from "./useReissue";
import { useAuthStore } from "@/utils/Store";
import { useQueryClient } from "@tanstack/react-query";

const fetchAuthCheck = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}api/me`, {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
  return response;
};

const useAuthCheck = () => {
  const { mutate: reissue } = useReissue();
  const queryClient = useQueryClient();
  const { logout } = useAuthStore();
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };

  const query = useQuery({
    queryKey: ["authCheck"],
    queryFn: fetchAuthCheck,
    enabled: !!getToken(),
    retry: false,
    staleTime: 1000 * 60 * 10, // 10분 fresh 유지
    gcTime: 1000 * 60 * 15, // 15분간 캐시데이터 유지
    refetchOnMount: true,
  });

  useEffect(() => {
    if (
      axios.isAxiosError(query.error) &&
      query.error.response?.status === 401
    ) {
      reissue();
      return;
    }

    if (query.isError && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      queryClient.invalidateQueries({ queryKey: ["authCheck"] });
      queryClient.invalidateQueries({ queryKey: ["inquiriesList"] });
      queryClient.invalidateQueries({ queryKey: ["myPostList"] });
      queryClient.invalidateQueries({ queryKey: ["myCommentList"] });
      logout();
    }
  }, [query.isError]);

  return query;
};

export default useAuthCheck;
